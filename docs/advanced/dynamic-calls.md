---
sidebar_position: 1
---

# Dynamic Calls

Learn how to dynamically call programs

## When dynamic calls are needed?

If you are building a system that have an immense or a growing library of programs, it may become intracable to design a program that take into account each case.

In that case, dynamic calls can be done with the use of `CallProgram`, this tool use the name of the program as input to dynamically call a program.

In order for the system to known which program to call, you have two options:

- Directly use the tool's prompt by specifying each program name (which is only possible if you have a very specific taxonomy for program names that generalize well).
- Or add another steps to first perform a similarity search with `ProgramSearch`.

### Searching based on similarity

In order to search for existing programs, you should describe what the program does using the `ProgramSearch` tool.

```javascript title="program_search_example.cypher"
CREATE
// ...
(program_search:Action {
    name:"Search for existing programs", 
    tool:"ProgramSearch",
    prompt:"Please describe the program to fullfill the Objective in short sentence."}),
(is_program_implemented:Decision {
    name:"Check if the program to fullfil the Objective is implemented",
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

### Enhancing the program search

By default, the program memory use the entire Cypher program to create the embedding vector used by the similarity search. To refine the embedding of the program you can use the special token `// @desc:` at the beggining of the program to hardcode the string used to compute the embedding.

```javascript title="refining_program_description.cypher"
// You can add additionnal comments like a license or a docstring
// they will be ignored to compute the embedding vector
// @desc: The description of your program used to compute the vector
CREATE
// Your program goes here
// ...
```