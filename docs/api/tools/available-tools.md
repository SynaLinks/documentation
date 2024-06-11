# Available Tools

Agent's capability to perform various specialized tasks is expanding through the acquisition of skills in operating different software tools. Developers can create specialized AI systems by designing tools tailored to their applications.

This proficiency forms the foundation of the current approach for LLM-based Agents, employing Tools as actions. However, due to the limited long-term planning capabilities of LLMs, an Agent can only interact with a restricted set of tools.

HybridAGI transforms this limitation by providing robust long-term planning capabilities, thanks to its symbolic components. It remains agnostic to the number of tools used, as the prompts required to infer the inputs are provided at each step by the interpreter.

Here is a list of the native Tools we designed for HybridAGI
<div align="center">

| Tool         | Description                               |
|--------------|:------------------------------------------:|
| `WriteFile` | Write into a file, or override if existing |
| `AppendFile`|  Append data to a file, or create one if non-existing |
| `ReadFile` | Read data chunk by chunk (use multiple times to scroll) |
| `InternalShell` | Replicate unix commands to navigate inside the documents store: [`cd`, `ls`, `mkdir`, `mv`, `pwd`, `rm`, `tree`] |
| `CodeInterpreter` | Allow execution of Python code inside a Jupyter notebook |
| `Upload` | Archive and upload the target folder or file to the User |
| `DocumentSearch` | Perform a similarity based search in the filesystem and fetch the passages |
| `ReadProgram` | Read a program based on its name |
| `ProgramSearch` | Perform a similarity based search into the program memory |
| `PastActionSearch` | Perform a similarity based search into the trace memory |
| `WriteProgram` | Load a program, override if existing |
| `CallProgram` | Call a program based on its name |
| `UpdateObjective` | Update the long-term objective |
| `Predict` | Populate the prompt with intermediary data for reasoning |
| `RevertTrace` | Remove from the trace the N last steps |
| `ClearTrace` | Clear the trace from the prompt |
| `AskUser` | Ask a question to the user |
| `Speak` | Tell something to the User |
| `DuckDuckGoSearch` | Perform a DuckDuckGo search |
| `BrowseWebsite` | Scrap a website and read it (use multiple times to scroll) |

</div>

We are expanding this list, so feel free to suggest us more tools to add.
