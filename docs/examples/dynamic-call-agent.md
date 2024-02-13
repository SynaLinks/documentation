---
sidebar_position: 4
---

# Dynamic Call Agent

Learn how to build an agent that dynamically calls primitive programs

### Managing a large or growing library of programs

With HybridAGI, the ability to act is limited to what's defined in its prompt program. But to expand its cognitive capabilities, we need to explore self-programming. Before diving into that, let's talk about dynamic program call.

When we're dealing with systems that learn or have lots of programs, managing each case in the main program becomes impractical. That's where dynamic program calls come in.

Let's take a closer look at an example to understand how this works in practice.

```javascript title="main.cypher"
// @desc: This is the main program
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(fulfill_objective:Program {
    name:"Fulfill the Objective",
    program:"fulfill_objective"}),
(ask_next_objective:Action {
    name:"Ask the next Objective", 
    tool:"AskUser",
    disable_inference:"true",
    prompt:"Do you want anything else?"}),
(is_assistance_needed:Decision {
    name:"Check if the User want something else",
    question:"Does the User need anything else?"}),
(update_objective:Action {
    name:"Update the Objective with the new User request",
    tool:"UpdateObjective",
    prompt:"Please update the Objective, be specific"}),
(start)-[:NEXT]->(fulfill_objective),
(fulfill_objective)-[:NEXT]->(ask_next_objective),
(ask_next_objective)-[:NEXT]->(is_assistance_needed),
(update_objective)-[:NEXT]->(fulfill_objective),
(is_assistance_needed)-[:YES]->(update_objective),
(is_assistance_needed)-[:NO]->(end)
```

In the provided `main.cypher` program, we're implementing dynamic program calls to manage a variety of user objectives efficiently. Let's break down the components:

- `(fulfill_objective:Program {name:"Fulfill the Objective", program:"fulfill_objective"})`: This line declares a Program Node named "fulfill_objective." This node is connected to a separate Cypher file named `fulfill_objective.cypher`, which contains the logic for fulfilling the user's objectives.

- `(ask_next_objective:Action {name:"Ask the next Objective", tool:"AskUser", disable_inference:"true", prompt:"Do you want anything else?"})`: Here, we have an Action Node named "ask_next_objective." This node utilizes the "AskUser" tool to prompt the user with the question "Do you want anything else?" The `disable_inference:"true"` ensures the direct use of this question without LLM inference.

- `(is_assistance_needed:Decision {name:"Check if the User wants something else", question:"Does the User need anything else?"})`: We've introduced a Decision Node named "is_assistance_needed." This node checks whether the user needs any further assistance, posing the question "Does the User need anything else?"

- `(update_objective:Action {name:"Update the Objective with the new User request", tool:"UpdateObjective", prompt:"Please update the Objective, be specific"})`: Another Action Node named "update_objective" is added. This node utilizes the "UpdateObjective" tool to update the objective based on the user's specific request.

- `(start)-[:NEXT]->(fulfill_objective)`: The program starts by flowing from the Start Node to the "fulfill_objective" Program Node. This initiates the process of fulfilling the user's objective.

- `(fulfill_objective)-[:NEXT]->(ask_next_objective)`: After fulfilling the objective, the program moves to the "ask_next_objective" Action Node, prompting the user if they want anything else.

- `(ask_next_objective)-[:NEXT]->(is_assistance_needed)`: The flow then moves to the "is_assistance_needed" Decision Node, where the system checks if the user needs any further assistance.

- `(update_objective)-[:NEXT]->(fulfill_objective)`: If the user expresses a desire for something else, the program moves to the "update_objective" Action Node, allowing the user to specify their new request.

- `(is_assistance_needed)-[:YES]->(update_objective)`: If the user requires further assistance, the program loops back to the "update_objective" Action Node to handle the new request.

- `(is_assistance_needed)-[:NO]->(end)`: If the user doesn't need anything else, the program concludes by moving to the End Node.

This structure enables the program to handle various user objectives dynamically by calling specific programs as needed, enhancing adaptability and user interaction.

Now that we've outlined the structure for the main program in main.cypher, let's delve into implementing the `fulfill_objective` program.

```javascript title="fulfill_objective.cypher"
// @desc: Fulfill the objective
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(program_search:Action {
    name:"Search for existing programs", 
    tool:"ProgramSearch",
    prompt:"Describe in ONE short sentence what needs to be done.

Ensure to use the following examples format to answer:
- Search the answer to the given question on internet
- Tell the answer to the User
- Nagivate into the given folder using `cd`
- Try to create the given folder
- Clarify the objective

Ensure to use the above format."}),
(call_program:Program {
    name:"Review the available programs from the search and select the most suitable one to fulfill the objective.",
    program:"call_program"}),
(is_objective_complete:Decision {
    name:"Determine if the objective has been successfully fulfilled. If not, loop back to search for alternative programs.",
    question:"Is the Objective complete?"}),
(start)-[:NEXT]->(program_search),
(program_search)-[:NEXT]->(call_program),
(call_program)-[:NEXT]->(is_objective_complete),
(is_objective_complete)-[:NO]->(program_search),
(is_objective_complete)-[:YES]->(end)
```

Here's how the `fulfill_objective` program is structured:

- `(program_search:Action {...})`: This Action Node initiates the process by prompting the system to search for existing programs that could fulfill the objective. The user is prompted to describe the objective in a short sentence using specific formatting guidelines. This description will guide the program search.

- `(call_program:Program {...})`: Once the search is complete, this Program Node facilitates the review of available programs based on the search results. The system selects the most suitable program to fulfill the objective. 

- `(is_objective_complete:Decision {...})`: After calling the selected program, this Decision Node evaluates whether the objective has been successfully fulfilled. If not, the system loops back to search for alternative programs.

- `(start)-[:NEXT]->(program_search)`: The program starts by flowing from the Start Node to the `program_search` Action Node.

- `(program_search)-[:NEXT]->(call_program)`: After searching for programs, the flow moves to the `call_program` Program Node to review and select the most suitable program.

- `(call_program)-[:NEXT]->(is_objective_complete)`: Once the program is called, the flow moves to the `is_objective_complete` Decision Node to determine if the objective has been fulfilled.

- `(is_objective_complete)-[:NO]->(program_search)`: If the objective is not complete, the program loops back to search for alternative programs.

- `(is_objective_complete)-[:YES]->(end)`: If the objective is complete, the program concludes by moving to the End Node.

This structure enables the `fulfill_objective` program to efficiently search for and call appropriate programs to fulfill the user's objective, ensuring adaptability and efficiency in handling various tasks.

The final piece of this project is the `call_program` procedure that handle errors during the call of the program.

```javascript title="call_program.cypher"
// @desc: Try to call a existing program
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(call_program:Action {
    name:"Call an existing program to fullfil the Objective", 
    tool:"CallProgram",
    prompt:"Please call the more appropriate program to fullfil the Objective.
Please, only use the program name and remove any parameter or file extension (the `.cypher`).
Remember to always try to call an existing program."}),
(is_successfully_called:Decision {
    name:"Check if the program have been successfuly called",
    question:"The program have been successfuly called?"}),
(try_again:Action {
    name:"Correct the program name and try again",
    tool:"CallProgram",
    prompt:"Please correct the program name.
Please, only use the program name and remove any parameter or file extension (the `.cypher`).
Remember to always try to call an existing program."}),
(start)-[:NEXT]->(call_program),
(call_program)-[:NEXT]->(is_successfully_called),
(try_again)-[:NEXT]->(is_successfully_called),
(is_successfully_called)-[:NO]->(try_again),
(is_successfully_called)-[:YES]->(end)
```

In addition to that, the [Primitives Pack](https://github.com/SynaLinks/primitives-pack) have been added to add basic functionnalities to the agent.

You can find the complete implementation in the following [repository](https://github.com/SynaLinks/dynamic-call-agent)

Do not hesitate to modify the prompt to fit your usecase and LLM.