---
sidebar_position: 1
---
# Introduction to HybridAGI

## The Programmable Neuro-Symbolic AGI
### For people who want AI to behave as expected

<figure>
  <p align="center">
    ![HybridAGI fact memory](assets/architecture.svg)
    <figcaption align="center"><b>Fig.1 - HybridAGI's AgentOS architecture. The Graph Program Interpreter orchestrate every other component using tools as Action. It can also interact with the user during the execution of a program.</b></figcaption>
  </p>
</figure>

## What is HybridAGI?

HybridAGI is an AgentOS framework designed for creating explainable and deterministic agent systems suitable for real-world applications.

It is the first programmable LLM-based agent that enables you to define its behavior using a **graph-based prompt programming** approach. Unlike other frameworks that view agents as advanced chatbots, we have adopted a methodology that is rooted in computer science, cognitive sciences, and symbolic AI.

## Why HybridAGI?

We are not satisfied with the current trajectory of Agent-based systems that lack control and efficiency. Today's approach is to build reactive/MKRL agents that do what they want without any human control, resulting in infinite loops of nonsense because they tend to stay in their data distribution. Multi-agent systems try to solve that, but instead result in more nonsense and prohibitive costs due to the agents chitchatting with each other. Moreover, today's agents require fine-tuning to enhance/correct the behavior of the agent system. In contrast, with HybridAGI, the only thing you need to do is to modify the behavior graph.

We advocate that fine-tuning should be done only as a last resort when in-context learning fails to give you the expected result. Any person who has already fine-tuned a LLM knows that gathering data is hard, but having the right variability in your dataset is even harder, thus prohibiting most companies from leveraging this technology if they don't have many AI scientists. By rooting cognitive sciences into computer science concepts, without obfuscating them, we empower programmers to build the Agent system of their dreams by controlling the sequence of action and decision.

Our goal is to build an agent system that solves real-world problems by using an intermediary language interpretable by both humans and machines. If we want to keep humans in the loop in the coming years, we need to design Agent systems for that purpose.

### Deterministic approach & infinite number of tools

To us, an agent system is an intelligent/cognitive software that can process natural language and execute the tasks it has been programmed to perform. Just like with traditional software, the developer specifies the behavior of the application, and the system is not truly autonomous unless it has been programmed to be so. Programming the system not only helps the agent to carry out its tasks but also allows for the *formalization of the developer's intent*.

Our approach reduces the need for fine-tuning, as we can control the behavior of the system in a deterministic way from end to end. You will **not** find any React/MKRL agents in our implementation, unlike in traditional agent frameworks such as LangChain/LangGraph or Llama-Index. Furthermore, our approach enables the system to handle an unlimited number of tools, as we do not allow the system to decide which one to use at each step.

### Automatic optimization & hybrid vector/graph long-term memory

HybridAGI is also a machine learning framework that emphasizes the importance of evaluating and optimizing LLM-based systems thanks to the integration of DSPy. You can automatically optimize/fine-tune the prompts sent to the LLM based on the dataset/examples provided to the system*. For more information, please refer to our **[DSPy dedicated section](dspy)**.

We also emphasize the importance of centralizing knowledge into a hybrid vector/graph database powered by FalkorDB. This low-latency graph database allows the system to efficiently memorize and scale knowledge.

*Note: Our approach only optimizes/fine-tunes the atomic steps of the system, the sequence of actions and decisions is *always* controlled by the graph programs.

## Graph-based prompt programming

Graph-based Prompt Programming is one of the key features of HybridAGI, in its essence it is a programming language for LLM Agents that allow probabilistic conditional loops and multi-output decisions. This language is based on **[Cypher](https://en.wikipedia.org/wiki/Cypher_(query_language))** a well known language for graph databases. Like any programming language, it always start with a main program:

```javascript title='main.cypher'
// Nodes declaration
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(answer:Action {
    name:"Answer the objective's question",
    tool:"Speak",
    prompt:"Answer the objective's question"
}),
// Structure declaration
(start)-[:NEXT]->(answer),
(answer)-[:NEXT]->(end)
```

You can also describe conditional loops or multi-output choices using decision nodes like in this program:

```javascript title='clarify_objective.cypher.cypher'
// @desc: Clarify the objective if needed
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(is_anything_unclear:Decision {
    name:"Check if the objective is unclear", 
    question:"Is the objective still unclear?"
}),
(ask_question:Action {
    name:"Ask question to clarify the objective",
    tool:"AskUser",
    prompt:"Pick one question to clarify the Objective"
}),
(refine_objective:Action {
    name:"Clarify the given objective",
    tool:"UpdateObjective", 
    prompt:"The refined Objective"
}),
// Structure declaration
(start)-[:NEXT]->(is_anything_unclear),
(ask_question)-[:NEXT]->(refine_objective),
(refine_objective)-[:NEXT]->(is_anything_unclear),
// The outgoing edges of decision nodes give
// the possible answers to the system
(is_anything_unclear)-[:YES]->(ask_question),
// Decisions can have multiple arbitrary outcomes
(is_anything_unclear)-[:MAYBE]->(ask_question),
(is_anything_unclear)-[:NO]->(end)
```

And you can obviously also call other programs, here is an updated version of our main program:

```javascript title='main.cypher'
// Nodes declaration
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
// This node will call the `clarify_objective`
(clarify_objective:Program {
    name:"Clarify the objective if needed",
    program:"clarify_objective"
}),
(answer:Action {
    name:"Answer the objective's question",
    tool:"Speak",
    prompt:"Answer the objective's question"
}),
// Structure declaration
(start)-[:NEXT]->(clarify_objective),
(clarify_objective)-[:NEXT]->(answer),
(answer)-[:NEXT]->(end)
```

Here is the trace of the above example, note that the system can simulate user inputs to optimize/finetune itself without human intervention.

```
 --- Step 0 ---
Call Program: main
Program Purpose: What's the meaning of life?
 --- Step 1 ---
Call Program: clarify_objective
Program Purpose: Clarify the objective if needed
 --- Step 2 ---
Decision Purpose: Check if the objective is unclear
Decision Question: Is the objective still unclear?
Decision: MAYBE
 --- Step 3 ---
Action Purpose: Ask question to clarify the objective
Action: {
  "question": "Do you mean to ask about the philosophical or personal significance of life in general, or are you asking for guidance on finding personal fulfillment and satisfaction?",
  "answer": "I believe in seeking personal growth and happiness. For me, the meaning of life could be finding joy in relationships, pursuing passions, and making a positive impact on the world. However, this question is deeply philosophical and can have many interpretations."
}
 --- Step 4 ---
Action Purpose: Clarify the given objective
Action: {
  "new_objective": "Which aspects of personal growth, relationships, passions, and making a positive impact on the world should I focus on to find meaning and satisfaction in my life?",
  "observation": "Successfully updated"
}
 --- Step 5 ---
Decision Purpose: Check if the objective is unclear
Decision Question: Is the objective still unclear?
Decision: NO
 --- Step 6 ---
End Program: clarify_objective
 --- Step 7 ---
Action Purpose: Answer the objective's question
Action: {
  "message": "To find meaning and satisfaction in your life, consider focusing on various aspects of personal growth, relationships, passions, and making a positive impact on the world. Here are some suggestions for each area:\n\n1. Personal Growth: Continuously learn new skills, read books, travel, practice mindfulness, set goals, and engage in activities that challenge you and help you grow as an individual.\n2. Relationships: Nurture your existing relationships by actively listening, expressing gratitude, and showing empathy. Build new connections through networking, joining clubs or groups, and volunteering.\n3. Passions: Pursue hobbies or activities that bring you joy and fulfillment. Dedicate time to these passions regularly, and consider sharing them with others to expand your network and learn from their experiences.\n4. Making a Positive Impact on the World: Identify causes or issues that resonate with you and find ways to contribute to them. Volunteer, donate, spread awareness, or engage in activism. Remember that even small actions can make a significant difference.\n\nFeel free to ask any questions or clarifications regarding this response."
}
 --- Step 8 ---
End Program: main
```

HybridAGI output the chat history, along with the final answer and trace allowing DSPy to optimize every aspect of a conversational agent: the result, the intermediary steps but also the interaction with the user.

```json
[
  {
    "role": "User",
    "message": "What's the meaning of life?"
  },
  {
    "role": "AI",
    "message": "Do you mean to ask about the philosophical or personal significance of life in general, or are you asking for guidance on finding personal fulfillment and satisfaction?"
  },
  {
    "role": "User",
    "message": "I believe in seeking personal growth and happiness. For me, the meaning of life could be finding joy in relationships, pursuing passions, and making a positive impact on the world. However, this question is deeply philosophical and can have many interpretations."
  },
  {
    "role": "AI",
    "message": "To find meaning and satisfaction in your life, consider focusing on various aspects of personal growth, relationships, passions, and making a positive impact on the world. Here are some suggestions for each area:\n\n1. Personal Growth: Continuously learn new skills, read books, travel, practice mindfulness, set goals, and engage in activities that challenge you and help you grow as an individual.\n2. Relationships: Nurture your existing relationships by actively listening, expressing gratitude, and showing empathy. Build new connections through networking, joining clubs or groups, and volunteering.\n3. Passions: Pursue hobbies or activities that bring you joy and fulfillment. Dedicate time to these passions regularly, and consider sharing them with others to expand your network and learn from their experiences.\n4. Making a Positive Impact on the World: Identify causes or issues that resonate with you and find ways to contribute to them. Volunteer, donate, spread awareness, or engage in activism. Remember that even small actions can make a significant difference.\n\nFeel free to ask any questions or clarifications regarding this response."
  }
]
```

Learn more about Graph-based Prompt Programming, by following **[this guide](tutorials/basics/graph-prompt-programming.md)**

You can also explore this Python notebook and **[make your first steps](https://github.com/SynaLinks/HybridAGI/blob/main/notebooks/first_steps.ipynb)**.

## Memory-centric system

The memory is another aspect where HybridAGI is unique. First we centralize knowledge, documents, programs and traces into an hybrid vector/graph database. But we also provide for the system tools to interact with it, thanks to the behavior graph we can use an unlimited number of tools making possible to combine every memory into a unique Agent. Unlike other frameworks that view agents as chatbots we see them as software, as such the memory implemented are very different from others frameworks.

<figure>
  <p align="center">
    ![HybridAGI fact memory](assets/memories.svg)
    <figcaption align="center"><b>Fig.2 - HybridAGI's memories. Each memory system can be used in combinaiton with each other providing the best of vectors and graph retrieval.</b></figcaption>
  </p>
</figure>

You can find more information about our memory system in the **[dedicated section](tutorials/basics/knowledge-graph.md)**