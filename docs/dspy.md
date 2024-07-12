---
sidebar_position: 2
---

# Using DSPy with HybridAGI

## Programming not Prompting

**[DSPy](https://dspy-docs.vercel.app/)** is a machine learning framework for building LLM applications with a systematic approach by abstracting prompt engineering techniques and offering ways to evaluate your pipelines. Often when tackling a difficult task you will have to provide examples to your LLM, beside being time-consuming, handcrafting these examples can lead to the brittleness of your application specially if it involve numerous calls to LMs (like HybridAGI). When you change the pipeline, you will have to re-design the examples. DSPy change that by emphazing small multi-input/multi-output prompts with automatic building of examples allowing a better control and faster iteration.

## DSPy language models

### Local LMs

- `dspy.Ollama`: A easy to setup server. Perfect for a quick test of the system and starting to develop your project.

- `dspy.HFClientTGI`: A client to connect to the Text Generation Inference server from HuggingFace. 

- `dspy.dspy.HFClientVLLM`: A client to connect to the VLLM server.

- `dspy.HFModel`: The way to use the optimizer for finetuning, by loading your model in `huggingface` lib.

- For an exhaustive list of the local LMs provided by DSPy, check **[here](https://dspy-docs.vercel.app/api/category/local-language-model-clients)**

These language models are usefull when testing and developping your application.

Note: *Don't underestimate open-source models*, with DSPy optimizers they can compete with closed source models in some domains. Unless you are tackling a state-of-the-art problem, we advise you to **not use closed-source LMs** for testing and development. Due to DSPy optimization scheme involving numerous calls to LMs *the price for optimizing/finetuning your model can rise unexpectedly*.

### Remote LMs

Here we present some of the best remote LMs provided by DSPy:

- `dspy.Mistral`: They provide state-of-the-art models and the best open-source models for in-context learning, thus taking advantage of our architecture. You may consider them for production settings to run at lower costs. They also have a very good model for coding.

- `dspy.Anthropic`: They provide state-of-the-art models in coding/chat and have recently made a lot of work on mechanistic interpretabily an emerging field of research that intend to understand better LLMs.

- `dspy.OpenAI`: They provide state-of-the-art models, currently best LLMs of the market.

- `dspy.GROQ`: Fast inference for various open-source models.

- For an exhaustive list of the 20 LMs provided by DSPy, including LMs for AWS and Azure, check **[here](https://dspy-docs.vercel.app/api/category/language-model-api-clients)**

## Examples and datasets

Creating a small dataset for testing purposes:

```python
# the .with_input() serve as specifying that the objective field is the input to use in the intepreter forward pass
dataset = [
    Example(objective="What is the capital of France?").with_input("objective"),
]
```

Or import if from an external source, first import and initialize a DataLoader Object

```python
import dspy
from dspy.datasets import DataLoader

dl = DataLoader()
```
Loading a dataset from HuggingFace:

```python
code_alpaca = dl.from_huggingface(
    "HuggingFaceH4/CodeAlpaca_20K",
    split = ["train", "test"],
)

print(f"Splits in dataset: {code_alpaca.keys()}")
```
Loading a dataset from CSV:

```python
dolly_100_dataset = dl.from_csv("dolly_subset_100_rows.csv")

dolly_100_dataset = dl.from_csv(
    "dolly_subset_100_rows.csv",
    fields=("instruction", "context", "response"),
    input_keys=("instruction", "context")
)
```

Splitting a list of dspy.Example:

```python
splits = dl.train_test_split(dataset, train_size=0.8) # `dataset` is a List of dspy.Example
train_dataset = splits['train']
test_dataset = splits['test']
```

Sampling from a list of dspy.Example:
```python
sampled_example = dl.sample(dataset, n=5) # `dataset` is a List of dspy.Example
```

## Designing your metrics

Similar to the design of a loss function in a classic Deep Learning framework DSPy allow developers to define a metric function that will be used by the system to select the best examples to optimize/finetune your pipelines.

HybridAGI output 4 distinct elements:
- the `final_answer`, which contains the final answer of the program
- the `program_trace`, with contains the intermediate steps of the executed program
- the `chat_history`, which contains the chat history of the executed program
- the `finish_reason`, returns either "max iters" or "finish"

Which means that the prediction returned by the graph interpreter will gives you these 4 elements that you can include in your metrics to optimize every aspect of a conversational Agent.

For example, if you use your Agent as a RAG, you might want to check if the final answer was actually based on your retrieval pipelines and not made up by the LMs.

```python

class CheckAnswerPresentSignature(dspy.Signature):
    """Check if the answer is present in the provided trace"""
    context = dspy.InputField(desc="The context for the prediction")
    question = dspy.InputField(desc="Question to be answered")
    answer = dspy.InputField(desc="Answer for the question")
    correct = dspy.OutputField(
        desc="Is the answer factually correct based on the trace?",
        prefix="Correct[Yes/No]:",
    )

def check_answer_present(example, prediction):
    # This line means that we discard the example if the agent reached the max iterations
    # Meaning it was probably stuck in a loop
    if prediction.finish_reason == "max iters":
        return False
    # Check if the answer is actually based on the context
    judge = dspy.ChainOfThought(CheckAnswerPresentSignature)
    pred = judge(
        context=prediction.program_trace,
        question=example.objective,
        answer=prediction.final_answer,
    )
    return pred.correct.lower().strip().strip(".")=="yes"
```

Or if you are more focus on the interaction with your agent and the user, maybe you want to evaluate its helpfulness.

```python
class CheckHelpfullnessSignature(dspy.Signature):
    """Check if the interaction is helpful"""
    context = dspy.InputField(desc="The context for the prediction")
    objective = dspy.InputField(desc="The objective")
    chat_history = dspy.InputField(desc="The chat history")
    helpful = dspy.OutputField(
        desc="Is the interaction helpful for the user?",
        prefix="Helpful[Yes/No:]",
    )

def check_helpfulness(example, prediction, teacher_lm = Optional[dspy.LM]):
    # This line means that we discard the example if the agent reached the max iterations
    # Meaning it was probably stuck in a loop
    if prediction.finish_reason == "max iters":
        return False
    # Check if the interaction is actually helpful
    judge = dspy.ChainOfThought(CheckHelpfulnessSignature)
    pred = judge(
        context=prediction.program_trace,
        objective=example.objective,
        chat_history=prediction.chat_history,
    )
    return pred.helpful.lower().strip().strip(".")=="yes"
```

These metrics are only examples, we encourage you to customize your metric depending on the task you want to tackle. If you already have a dataset with the final answer or anything that can help you having better metric, we encourage you to use it. 

## DSPy optimizers

DSPy propose different optimizers that can optimize your prompt or finetune your models. Due to the nature of HybridAGI and the fact that our system is composed of a numerous prompts/modules we encourage users to only use a subset of DSPy optimizers:

- `dspy.BoostrapFewShot`: This optimizer will build automatically the examples for each modules (this process is called bootstraping) based on the input you give to the system, it stop when the number of examples specified is reached. If an assertion/suggestion error is raised during the execution of the optimizer or the metric returns `0.0` of `False` the example will be discarded.

- `dspy.BootstrapFewShotWithRandomSearch`: This optimizer will sample randomly bootstraped examples to find the best combinaison with respect to the provided metric. One of the best optimizers.

- `dspy.BoostrapFinetune`: This optimizer will finetune your model by tuning low rank matrices for each modules. This optimizer is usefull when you want to distillate LMs into smaller ones.

More information can be find in DSPy documentation **[here](https://dspy-docs.vercel.app/api/category/optimizers)**

Note: Keep in mind that you can use multiple optimizers one after another to optimize further your pipelines. 

Here is an example to known how to use them in HybridAGI:

```python
# Optimizing underlying prompts...

config = dict(max_bootstrapped_demos=4, max_labeled_demos=0)

optimizer = BootstrapFewShot(
    teacher_settings=dict({'lm': teacher_llm}),
    metric = program_success,
    **config,
)

interpreter = GraphProgramInterpreter(
    program_memory = program_memory,
    tools = tools,
)

compiled_interpreter = optimizer.compile(
    interpreter,
    trainset=dataset,
    valset=testset,
)

evaluate = dspy.evaluate.Evaluate(
    devset = testset, 
    metric = program_success,
    num_threads = 1,
    display_progress = True,
    display_table = 0,
)

# Evaluate baseline model
try:
    baseline_score = evaluate(interpreter)
except Exception:
    baseline_score = 0.0
# Evaluate optimized model
try:
    eval_score = evaluate(compiled_interpreter)
except Exception:
    eval_score = 0.0

print(f"Baseline: {baseline_score}")
print(f"Score: {eval_score}")
```

## DSPy assertions and suggestions

When optimizing HybridAGI with DSPy you will sometimes see an Assertion/Suggestion error raising, do not worry this is perfectly normal it means that the LMs didn't follow the instructions correctly and the example will be discarded.

In HybridAGI, DSPy assertions are only used when making a decision ensuring that the model answer the correct label. In the near future we will use a constrain grammar to ensure that the system choose one of the possible outcome combined with DSPy optimization to ensure a correct response.

## Loading & saving your DSPy model

To load your model into from the json file containing your boostraped examples, use this code:
```python
interpreter = GraphProgramInterpreter(
    program_memory = program_memory,
    tools = tools,
)

# Load your model if already existing
if os.path.exists("my_model.json"):
    interpreter.load("my_model.json")

```

If you want to save it for further use, use this code:
```python
compiled_interpreter.save("my_compiled_model.json")
```

Or make something more intelligent and save it only if it perform better:

```python
if eval_score > baseline_score:
    compiled_interpreter.save("my_model.json")
```