---
sidebar_position: 4
---

# Graph Prompt Programming

Learn how to program HybridAGI

### Introducing Graph-based Prompt Programming

Graph-based Prompt Programming is the foundation of our technology. In this approach, a program is represented as a property graph, which consists of four key types of nodes, each serving a unique purpose:

- **Action Nodes**: Action nodes represent specific actions. These nodes are responsible for the use of a tool within the program. Each action node contains the name of the tool used, the purpose of the action and a description of how to infer the tool's input parameters.

- **Decision Nodes**: Decision nodes are used to make choices within the program. These nodes have outgoing edges that branch off to different paths or actions based on certain conditions or criteria. The labels on the outgoing edges of decision nodes specify the possible answers. These labels guide the flow of the program to different branches, creating a decision graph.

- **Control Nodes**: Control nodes help define the program's overall structure and execution flow. The Start Node marks the beginning of the program's execution. It doesn't perform an action but acts as an entry point. The End Node marks the conclusion or termination of the program. It doesn't perform an action but acts as an exit point.

- **Program Nodes**: These nodes represent the call to a subprogram. When the program flow reaches a program node, it jumps to the designated program's graph, executes it, and then returns to the calling program.

This formulation enables you to create complex programs by connecting nodes with edges and specifying logical conditions using labels on those edges.

## Your first graph-based prompt program

Now, let's dive into the practical aspect of graph-based prompt programming with your first program. In this example, you will learn the fundamental elements of creating a program using [Cypher](https://en.wikipedia.org/wiki/Cypher_(query_language)), a powerful and expressive language used in graph databases.

:::tip How to name your nodes?
The names of each node gives the purpose of the step to the system, and each node inside a sub-program need a unique name. If you need two or more nodes with the same name/purpose, you probably need a loop instead.
:::

```javascript title="hello_world.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}), // The entrypoint
(end:Control {name:"End"}), // The endpoint
(hello_world:Action {
    name:"Say hello to the User",
    tool:"Speak",
    prompt:"Say hello world in French"}),
// Structure declaration
(start)-[:NEXT]->(hello_world),
(hello_world)-[:NEXT]->(end)
```

In the provided Cypher code snippet, a simple program called "hello_world" is created. Let's break down what this program does:

- `CREATE`: This statement initializes the creation of a program graph.

- `(start:Control {name:"Start"})`: This line defines the Start Node, which acts as the entry point of your program. It doesn't perform an action but signifies where the program execution begins.

- `(end:Control {name:"End"})`: The End Node is defined here. It marks the conclusion or termination point of the program, where the program execution ends.

- `(hello_world:Action {name:"Say hello to the User", tool:"Speak", prompt:"Say hello world in French"})`: This line creates an Action Node named "hello_world." It represents a specific action, in this case, saying "Hello World in French" to the user. The tool attribute specifies the tool or function used to execute this action, which is "Speak" in this case.

- `(start)-[:NEXT]->(hello_world)`: This line creates a relationship between the Start Node and the "hello_world" Action Node. The `[:NEXT]` relationship signifies the program's flow, indicating that the execution should proceed from the Start Node to the "hello_world" Action Node.

- `(hello_world)-[:NEXT]->(end)`: Here, a similar relationship is established between the "hello_world" Action Node and the End Node, indicating that after executing the action, the program should terminate.

So, when you run this program, it starts at the Start Node, moves to the "hello_world" Action Node, which performs the action of saying "Hello World in French" and then proceeds to the End Node, completing the program.

## Leveraging explicit decision making steps

One of the particularity of our framework is the explicit decision making steps allowing the system to branch over the graph. This feature make decisions made by the LLM explicit, thus more explainable.

In the provided Cypher "clarify_objective" program, we are introducing explicit decision-making steps to allow the system to branch over the graph. This feature makes the decisions made by the LLM explicit, enhancing the program's explainability.

```javascript title="clarify_objective.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(is_anything_unclear:Decision {
    name:"Find out if there is anything unclear in the Objective", 
    question:"Is the Objective unclear?"}),
(ask_question:Action {
    name:"Ask question to clarify the objective",
    tool:"AskUser",
    prompt:"Pick one question to clarify the Objective"}),
(refine_objective:Action {
    name:"Clarify the given objective",
    tool:"UpdateObjective", 
    prompt:"The refined Objective"}),
// Structure declaration
(start)-[:NEXT]->(is_anything_unclear),
(ask_question)-[:NEXT]->(refine_objective),
(refine_objective)-[:NEXT]->(is_anything_unclear)
// The outgoing edges of decision nodes give
// the possible answers to the system
(is_anything_unclear)-[:YES]->(ask_question),
(is_anything_unclear)-[:NO]->(end),
// Decisions can have multiple arbitrary outcomes
(is_anything_unclear)-[:MAYBE]->(ask_question)
```

Let's break down what this program does:

- `(is_anything_unclear:Decision {name:"Find out if there is anything unclear in the Objective", question:"Is the Objective unclear?"})`: Creates a Decision Node named "is_anything_unclear." This node checks whether the objective is unclear, asking the question "Is the Objective unclear?".

- `(ask_question:Action {name:"Ask question to clarify the objective", tool:"AskUser", prompt:"Pick one question to clarify the Objective"})`: Creates an Action Node named "ask_question." If the objective is unclear, this node prompts the system to ask a question to clarify the objective, utilizing the "AskUser" tool.

- `(refine_objective:Action {name:"Clarify the given objective", tool:"UpdateObjective", prompt:"The refined Objective"})`: Creates another Action Node named "refine_objective." This node represents the action of clarifying the given objective, using the "UpdateObjective" tool.

- `(start)-[:NEXT]->(is_anything_unclear)`: Establishes a relationship between the Start Node and the "is_anything_unclear" Decision Node, indicating the flow of the program.

- `(ask_question)-[:NEXT]->(refine_objective)`: Creates a relationship between the "ask_question" Action Node and the "refine_objective" Action Node, signifying that after asking a question to clarify the objective, the system should proceed to refine the objective.

- `(refine_objective)-[:NEXT]->(is_anything_unclear)`: Establishes a loop by connecting the "refine_objective" Action Node back to the "is_anything_unclear" Decision Node. This loop allows the system to check again if the objective is unclear after attempting to clarify it.

- `(is_anything_unclear)-[:YES]->(ask_question)`: If the decision is "Yes" (the objective is unclear), the program flows to the "ask_question" Action Node to prompt further clarification.

- `(is_anything_unclear)-[:NO]->(end)`: If the decision is "No" (the objective is clear), the program flows to the End Node, concluding the program.

- `(is_anything_unclear)-[:MAYBE]->(ask_question)`: Introduces a "Maybe" outcome for the decision. If the system is uncertain whether the objective is unclear, it will loop back to the "ask_question" Action Node for further clarification.

This program structure enables the system to iteratively ask questions and refine the objective until it is clear.

Now let's use this program to build a simple app. For that, you need to implement a `main.cypher` file that will act as the entry point for the program.

```javascript title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(clarify_objective:Program {
    name:"Clarify the Objective if needed",
    program:"clarify_objective"}),
(answer:Action {
    name:"Answer the Objective",
    tool:"Speak",
    prompt:"Please answer the Objective"}),
// Structure declaration
(start)-[:NEXT]->(clarify_objective),
(clarify_objective)-[:NEXT]->(answer),
(answer)-[:NEXT]->(end)
```

Let's break down this main program:

- `(clarify_objective:Program {name:"Clarify the Objective if needed", program:"clarify_objective"})`: This line creates a Program Node that calls the program implemented in `clarify_objective.cypher`. After executing this sub-program, the program will resume to the next step.

- `(answer:Action {name:"Answer the Objective", tool:"Speak", prompt:"Please answer the Objective"})`: This line creates an Action Node that answers the Objective question.

- `(start)-[:NEXT]->(clarify_objective)`: This line establishes a relationship between the start Node and the `clarify_objective` Program Node, meaning that the program will start by calling the program.

- `(clarify_objective)-[:NEXT]->(answer)`: This line creates a relationship indicating that, after executing the `clarify_objective` program, the next step is to perform the `answer` action.

- `(answer)-[:NEXT]->(end)`: This line establishes a relationship indicating that, after answering the objective, the program should proceed to the `end` node.

Now you can implement almost any prompting mechanism using graphs! Your imagination is the only limit!