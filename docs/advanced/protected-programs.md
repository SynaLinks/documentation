---
sidebar_position: 3
---

# Protected Programs

Learn about protected programs.

## Why Do We Need Protected Programs?

When constructing an AI system with learning capabilities, you will need a way to prevent the system from modifying its own main prompting mechanism.

This feature is particularly crucial for safety reasons, as the main program is typically where safety procedures are implemented.

For this reason, we protect each program that depends on the main program. This check is performed through the dependency graph implemented in the program memory.

In our context, this means that a protected program cannot be called by `CallProgram`, modified by `WriteProgram`, and is not retrievable by `ProgramSearch`.

This constraint ensures that HybridAGI can only dynamically call programs disjoint from the main program. Feel free to check the dependency graph of your app!