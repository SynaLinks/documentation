---
sidebar_position: 2
---

# Dynamic Calls

Learn how to dynamically call programs.

## When Dynamic Calls are Needed?

If you are constructing a system with an extensive or expanding library of programs, it may become impractical to design a program that accounts for each case.

In such scenarios, dynamic calls can be made using the `CallProgram` tool, which uses the name of the program as input to dynamically call a program.

To inform the system which program to call, you have two options:

- Directly use the tool's prompt by specifying each program name (only feasible with a highly specific taxonomy for program names that generalizes well).
- Add another step to first perform a similarity search with `ProgramSearch`.

### Searching Based on Similarity

To search for existing programs, describe what the program does using the `ProgramSearch` tool.

```javascript title="program_search_example.cypher"
CREATE
// ...
(program_search:Action {
    name:"Search for existing programs", 
    tool:"ProgramSearch",
    prompt:"Please describe the program to fulfill the Objective in a short sentence."}),
(is_program_implemented:Decision {
    name:"Check if the program to fulfill the Objective is implemented",
    question:"Is the program already implemented?"}),
(tell_user:Action {
    name:"Tell the user you can't help him",
    tool:"Speak",
    prompt:"Sorry, I don't know how to help you",
    disable_inference:"true"}),
(call_program:Action {
    name:"Call an existing program to fulfill the Objective",
    tool:"CallProgram",
    prompt:"The name of the program to call"}),
// ...
(is_program_implemented)-[:YES]->(call_program),
(is_program_implemented)-[:NO]->(tell_user),
// ...
```

### Enhancing the Program Search

By default, the program memory uses the entire Cypher program to create the embedding vector used by the similarity search. To refine the embedding of the program, you can use the special token `// @desc:` at the beginning of the program to hardcode the string used to compute the embedding.

```javascript title="refining_program_description.cypher"
// You can add additional comments like a license or a docstring
// they will be ignored to compute the embedding vector
// @desc: The description of your program used to compute the vector
CREATE
// Your program goes here
// ...
```