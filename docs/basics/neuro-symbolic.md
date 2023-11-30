---
sidebar_position: 1
---
# Neuro-Symbolic AI Systems
Learn about neuro-symbolic AI systems

## What is a neuro-symbolic AI system?

Neuro-symbolic systems represent a hybrid approach to artificial intelligence (AI) that combines elements of both symbolic AI and connectionist (neural network) AI.

Neuro-symbolic AI systems are characterized by two types of components:

- The gradient based learnable functions (the neural networks)
- The functions that comes with symbolic implementation, or at least, a (possibly incomplete) symbolic specification of its functionality

By combining symbolic reasoning with neural network learning, these systems can effectively perform both deductive reasoning (logical inference) and inductive learning (pattern recognition).

## An explainable and controlled approach

Our approach takes inspiration from computer science and symbolic AI to overcome the limits of Large Language Models (LLMs). Our aim is to create safe, controlled and explainable AI systems that can run locally.

Our system is composed of a Domain Specific Language (DSL) for programming LLM based Agents that define the syntaxe of the graph programs. We define programs as a graph of action, involving the use of a tool, and explicit decision making steps that allow branching over the graph. The intepreter use the DSL along with the LLM to make probabilistic decisions and use tools according to the given program.

<figure>
<p align="center">
![The visual representation of the interaction between components](img/components.png)
<figcaption align = "center"><b>Fig.1 - The main components of our approach, in blue are the symbolic ones.</b></figcaption>
</p>
</figure>

In a nutshell, our system follows a graph in order to behave according to the provided instructions. If we represent a program as a network, interpreting it consists of finding the correct path within the graph. Which means that HybridAGI can *only* perform tasks that are described as a program providing a safe and controlled framework for AGI.

Thanks to our approach, developers can correct, enhance, and provide implicit knowledge to the LLM that would have been impossible to provide otherwise.