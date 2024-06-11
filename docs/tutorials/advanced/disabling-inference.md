---
sidebar_position: 1
---

# Disabling Inference

Learn how and when to disable inference.

## When is Disabling Inference Needed?

Disabling inference means that instead of using the LLM to infer the tool's input parameters, we directly use the prompt provided in the program as input for the tool.

This process is necessary when using tools that do not require inputs, when you want to speed up the interaction, or when using a tool in a manner that doesn't need inference.

### Using Tools without Input

Sometimes, the tool does not require any input. In such cases, disabling inference becomes essential. This optional feature binds the prompt directly to the input of the tool, which is empty in that case.

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

### Speeding Up the Program

You can use this feature to accelerate your programs and enhance their responsiveness.
Or if you want to use a tool in a way that doesn't require inference at runtime. For example, this code snippet uses the `InternalShell` Tool to list the current working directory.

```javascript title="list_current_folder.cypher"
// @desc: List the current folder
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(list_folder:Action {
    name:"List the current working directory",
    tool:"InternalShell",
    prompt:"ls",
    disable_inference:"true"}),
(start)-[:NEXT]->(list_folder),
(list_folder)-[:NEXT]->(end)
```