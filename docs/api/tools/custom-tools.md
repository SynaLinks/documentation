# Custom Tools

In HybridAGI, each tool is a module that is optimized in the background when the interpreter calls it during optimization. Each tool is a DSPy module that is optimized in the background when the interpreter calls it during optimization.

To add a new tool to HybridAGI, there are two ways to do it. The first way is easier, while the other gives you more control but involves more code.

Let's see the easiest way first:

```python

def greet(**kwargs):
    """
    This function greets the person passed in as a parameter
    """
    name = kwargs["name"] # The function inputs need to use python **kwargs
    # Here goes your tool logic
    message = f"Hello, {name}. Nice to meet you!"
    print(message)
    # You have then to returns the output of your function as a dict
    output = {}
    output["message"] = message
    return output

my_custom_tool = Tool(
    name = "Greet", # The name of the tool
    signature = "name -> message", # The function signature (multi input/output are possible like in DSPy signature)
    instructions = "Greet a person", # The tool instruction
    func = greet, # And the callable function
    lm = my_lm # You can optionally use another LM to infer the inputs of the tool
)

```

The other way to create a custom tool gives you better control, for that you have to create an object that inherit from `BaseTool`:

```python
import abc
import dspy
from typing import Optional

class BaseTool(dspy.Module):

    def __init__(self, name: str):
        self.name = name

    @abc.abstractmethod
    def forward(
            self,
            trace: str,
            objective: str,
            purpose: str,
            prompt: str,
            disable_inference: bool = False,
            llm: Optional[dspy.LM] = None
        ) -> dspy.Prediction:
        pass
```

Here is the same example with the second method:

```python

import dspy
from typing import Optional
from hybridagi.tools import BaseTool
from hybridagi.output_parsers.prediction import PredictionOutputParser

def greet(name):
    """
    This function greets the person passed in as a parameter
    """
    message = f"Hello, {name}. Nice to meet you!"
    print(message)
    return message

class GreetSignature(dspy.Signature):
    """You will be given an objective, purpose and context
    Using the prompt to help you, you will infer the correct name"""
    objective = dspy.InputField(desc = "The long-term objective (what you are doing)")
    context = dspy.InputField(desc = "The previous actions (what you have done)")
    purpose = dspy.InputField(desc = "The purpose of the action (what you have to do now)")
    prompt = dspy.InputField(desc = "The action specific instructions (How to do it)")
    name = dspy.OutputField(desc = "The name of the person to greet")

class GreetTool(BaseTool):

    def __init__(
            self,
            lm = Optional[dspy.LM] = None,
        ):
        super().__init__(name = "Greet")
        self.predict = dspy.Predict(GreetSignature)
        self.prediction_parser = PredictionOutputParser()
    
    def forward(
            self,
            context: str,
            objective: str,
            purpose: str,
            prompt: str,
            disable_inference: bool = False,
        ) -> dspy.Prediction:
        """Method to perform DSPy forward prediction"""
        if not disable_inference:
            # Perform a DSPy prediction
            with dspy.context(lm=self.lm if self.lm is not None else dspy.settings.lm):
                # This allow the tool to use a different LM than the one you configured in DSPy
                # Allowing you to choose the best LM to infer the tool inputs
                pred = self.predict(
                    objective = objective,
                    context = context,
                    purpose = purpose,
                    prompt = prompt,
                )
            # Some parsing to clean up the prediction
            pred.name = self.prediction_parser.parse(pred.name, prefix = "Name:", stop = ["\n"])
            # Then we can call our python function
            message = greet(pred.name)
            # The tool always returns a dspy.Prediction with the tools's input and output to give to the system the 
            # possibility to enhance its reasoning by calling a tool multiple times.
            return dspy.Prediction(
                name = pred.answer
                message = message
            )
        else:
            # When disabling inference, we use the prompt given in the graph program as input
            message = self.greet(prompt)
            return dspy.Prediction(
                answer = prompt
                message = message
            )

my_custom_tool = GreetTool()
```
