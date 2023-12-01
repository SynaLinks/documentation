---
sidebar_position: 3
---

# Turn-based Conversation
Learn how to implement a simple turn-based conversation.

## Emulating a Simple Multi-agent System

In this example, we are going to implement an algorithm that emulates a multi-agent system using our neuro-symbolic framework.

To emulate a turn-based conversation, you need to describe a loop with an exit condition. A classic example is the actor-critic scheme where an agent tries to answer while the other critiques its work.

```cypher title="conversation.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(actor:Program {
    name:"Answer the objective",
    program:"actor"}),
(critic:Program {
    name:"Critique the answer",
    program:"critic"}),
(is_objective_answered:Decision {
    name:"Check if the objective is correctly answered",
    question:"Is the objective correctly answered?"}),
// Structure declaration
(start)-[:NEXT]->(actor),
(actor)-[:NEXT]->(critic),
(critic)-[:NEXT]->(is_objective_answered),
(is_objective_answered)-[:NO]->(actor),
(is_objective_answered)-[:YES]->(end)
```

To implement this app properly, we use Program Nodes to implement the behavior of our agents in a separate file. This practice allows you to reduce implementation errors and easily modify the behavior of your agents.

Let's implement our agents by creating two files: `actor.cypher` and `critic.cypher`.

```cypher title="actor.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(answer:Action {
    name:"Answer the objective question",
    tool:"Speak",
    prompt:"Please answer the objective question, always reflect on your mistakes"}),
// Structure declaration
(start)-[:NEXT]->(answer),
(answer)-[:NEXT]->(end)
```

```cypher title="critic.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(critique:Action {
    name:"Critique the answer",
    tool:"Speak",
    prompt:"Please critique the above answer"}),
// Structure declaration
(start)-[:NEXT]->(critique),
(critique)-[:NEXT]->(end)
```

Now we can implement our main file and simply call our conversation program:

```cypher title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(conversation:Program {
    name:"Emulate a turn-based conversation",
    program:"conversation"}),
// Structure declaration
(start)-[:NEXT]->(conversation),
(conversation)-[:NEXT]->(end)
```

Now you can add personality to your agents by editing the tool's prompt or add the use of an additional tool. Feel free to explore the possibilities offered by our framework!