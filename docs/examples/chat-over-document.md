---
sidebar_position: 1
---

# Chat Over Document

Learn how to build a simple chat over document app.

## Your First Application

In this initial application, you will construct a straightforward chat over document.

To begin, initiate a new project using your preferred Integrated Development Environment (IDE). Afterward, include a file named `main.cypher` at the root of your project. Start with an empty program; you'll update it later.

```javascript title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
// Structure declaration
(start)-[:NEXT]->(end)
```

Now create a new file called `answer.cypher`. This subprogram aims to answer based on the documents loaded inside the long-term memory. This simple process can be described as follows:

```javascript title="answer.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(similarity_search:Action {
    name:"Search for answer in the filesystem",
    tool:"DocumentSearch",
    prompt:"Elaborate on what you want to know"}),
(answer:Action {
    name:"Answer based on the above search",
    tool:"Speak",
    prompt:"Please answer based on the above search. \
If nothing is relevant, just say that you don't know"}),
// Structure declaration
(start)-[:NEXT]->(similarity_search),
(similarity_search)-[:NEXT]->(answer),
(answer)-[:NEXT]->(end)
```

Now it's time to update the main prompt program. We want to call our `answer` program but also ask the user if they want to know something else to continue the interaction. This process can be described with a conditional loop.

```javascript title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
// You can call programs by using 
// the name of the Cypher file as an index
(answer:Program {
    name:"Answer the Objective",
    program:"answer"}),
(ask_question:Action {
    name:"Ask what the User wants to know next",
    tool:"AskUser",
    prompt:"Do you want to know something else?",
    disable_inference:"true"}),
(is_finished:Decision {
    name:"Check if the User needs something else",
    question:"Does the User need anything else?"}),
(update_objective:Action {
    name:"Update the Objective with the new question",
    tool:"UpdateObjective",
    prompt:"Enter the new question to answer"})
// Structure declaration
(start)-[:NEXT]->(answer),
(answer)-[:NEXT]->(ask_question),
(ask_question)-[:NEXT]->(is_finished),
(update_objective)-[:NEXT]->(answer),
(is_finished)-[:NO]->(update_objective),
(is_finished)-[:YES]->(end)
```

In the updated `main.cypher` program, we've introduced an additional level of interaction to enhance the user experience. Let's break down the new components:

- `(answer:Program {name:"Answer the Objective", program:"answer"})`: This line declares a Program Node named "answer." This node is connected to a separate Cypher file named `answer.cypher`, which contains the logic for searching and providing answers based on the loaded documents in the long-term memory.

- `(ask_question:Action {name:"Ask what the User wants to know next", tool:"AskUser", prompt:"Do you want to know something else?", disable_inference:"true"})`: Here, we've added an Action Node named "ask_question." This node uses the "AskUser" tool to prompt the user with the question "Do you want to know something else?" The `disable_inference:"true"` makes sure to use this question by disabling the LLM inference.

- `(is_finished:Decision {name:"Check if the User needs something else", question:"Does the User need anything else?"})`: We've introduced a Decision Node named "is_finished." This node checks whether the user needs anything else, posing the question "Does the User need anything else?"

- `(update_objective:Action {name:"Update the Objective with the new question", tool:"UpdateObjective", prompt:"Enter the new question to answer"})`: Another Action Node named "update_objective" is added. This node uses the "UpdateObjective" tool to update the objective based on the new question entered by the user.

- `(start)-[:NEXT]->(answer)`: The program starts by flowing from the Start Node to the "answer" Program Node. This initiates the process of searching for an answer based on the documents in the long-term memory.

- `(answer)-[:NEXT]->(ask_question)`: After providing an answer, the program moves to the "ask_question" Action Node, prompting the user if they want to know something else.

- `(ask_question)-[:NEXT]->(is_finished)`: The flow then moves to the "is_finished" Decision Node, where the system checks if the user needs anything else.

- `(update_objective)-[:NEXT]->(answer)`: If the user expresses a desire to know something else, the program moves to the "update_objective" Action Node, allowing the user to enter a new question.

- `(is_finished)-[:NO]->(update_objective)`: If the user needs something else, the program loops back to the "update_objective" Action Node to handle the new question.

- `(is_finished)-[:YES]->(end)`: If the user doesn't need anything else, the program concludes by moving to the End Node.

This structure creates a continuous interaction loop where the system provides answers, checks if the user needs more information, and updates the objective based on the user's input. The use of decision nodes and loops enhances the program's adaptability to user queries and provides a dynamic conversational experience.