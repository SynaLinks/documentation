---
sidebar_position: 3
---

# Actions as Tool

Learn about tool based systems

## Learning how to operate Tools

By learning how to operate other pieces of software, AI is gaining the ability to perform numerous specialized tasks. By designing the tools adapted to its application a developer can create any specialized AI system.

This ability is the core of the current approach of LLM based Agents that use Tools as action. However, because LLMs lack of robust long-term planning capability an Agent can only interact with a limited set of tools.

HybridAGI changes that by providing long-term planning capabilities thanks to its symbolic components and is agnostic of the number of tools used because the prompts used to infer the inputs are provided at each step by the interpreter.

## Available Tools

Here is a list of the native Tools we designed for HybridAGI
<div align="center">

| Tool         | Description                               |
|--------------|:------------------------------------------:|
| `WriteFiles` | Write into files, or override if existing |
| `AppendFiles`|  Append data to files, or create if non-existing |
| `ReadFile` | Read data chunk by chunk (use multiple times to scroll) |
| `Shell` | Enable unix commands: [`cd`, `ls`, `mkdir`, `mv`, `pwd`, `rm`] |
| `Upload` | Archive and upload the target folder or file to the User |
| `ContentSearch` | Perform a similarity based search and fetch the content |
| `ReadProgram` | Read a program based on its name |
| `ProgramSearch` | Perform a similarity based search and list the top-5 most relevant |
| `LoadPrograms` | Load programs, override if existing |
| `CallProgram` | Call a program based on its name |
| `UpdateObjective` | Update the long-term objective |
| `UpdateNote` | Update the note (used as reminder) |
| `Predict` | Populate the prompt with intermediary data for reasoning |
| `RevertTrace` | Remove from the trace the N last steps |
| `ClearTrace` | Clear the trace from the prompt |
| `AskUser` | Ask a question to the user |
| `Speak` | Tell something to the User |
| `InternetSearch` | Perform a DuckDuckGo search |
</div>