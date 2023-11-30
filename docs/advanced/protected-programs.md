---
sidebar_position: 2
---

# Protected Programs

Learn about protected programs

## Why do we need protected programs?

When building an AI system with learning capability, you will need a way to prevent the system from modifying its own main prompting mechanism. 

This feature is particularly important for safety reasons, because the main program is where usually lie the safety procedures.

For that reason, we protect each program that depend on the main program. This check is performed thanks to the dependency graph implemented in the program memory.

In our context, it means that a protected program cannot be called by `CallProgram`, modified by `LoadProgram` and is not retreivable by `ProgramSearch`.

This constraint make that HybridAGI can only dynamically call programs disjoin from the main program. Feel free to check the dependency graph of your app!