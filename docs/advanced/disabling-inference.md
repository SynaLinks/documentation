---
sidebar_position: 3
---

# Disabling Inference

Learn how and when disabling the inference

## When disaling inference is needed?

Disabling the inference means that instead of using the LLM to infer the tool's input parameters we directly use the prompt provided in the program as input for the tool. 

This process is needed when using tools that don't need inputs, when you want to speed up the interaction or use a tool in a way that you don't need inference.

### Using Tools without input

Sometimes the Tool do not need any input. In that case, disabling the inference is needed. This optional feature bind the prompt directly to the input of the tool, which is empty in that case.

```javascript title="clear_trace.cypher"
// @desc: Cleanup the program trace
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(clear_trace:Action {
    name:"Clear the trace to start over",
    tool:"ClearTrace",
    prompt:"",
    disable_inference:"true"}),
(start)-[:NEXT]->(clear_trace),
(clear_trace)-[:NEXT]->(end)
```

### Speeding up the program

You can use this feature to speed up your programs and add more reactivity to them.
Or if you want to use a Tool in a way that don't need inference at runtime. For example, this code snippet use the `Shell` Tool to list the current working directory.

```javascript title="list_current_folder.cypher"
// @desc: List the current folder
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(list_folder:Action {
    name:"List the current working directory",
    tool:"Shell",
    prompt:"ls",
    disable_inference:"true"}),
(start)-[:NEXT]->(list_folder),
(list_folder)-[:NEXT]->(end)
```