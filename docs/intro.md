---
sidebar_position: 1
slug: "/"
---
# Introduction

## HybridAGI: The Programmable Neuro-Symbolic AGI for people who want AI to behave as expected

### What is HybridAGI?

HybridAGI is the first *Programmable LLM-based Autonomous Agent* that lets you program its behavior using a **graph-based prompt programming** approach. This state-of-the-art feature allows the LLM to efficiently use any tool while controlling the long-term behavior of the agent.

The new version of HybridAGI is now a DSPy component, learn more about [DSPy](https://dspy-docs.vercel.app/docs/intro) and how you can use it to optimize your prompt or finetune your model.

# FAQ

### What do you mean by neuro-symbolic AGI?

We believe that agent systems are the future of general artificial intelligence and robotics. Our goal is to build an agent system that solves real-world problems by using an intermediary language interpretable by both humans and machines. If we want to keep humans in the loop in the coming years, we need to design AI systems for that purpose. Coming from a robotic background, we understand how the debate in the ML community between multi-agent systems and neuro-symbolic ones will unfold.

### How is HybridAGI different from a toolbox?

Our aim is to develop an entire ecosystem around our technology. Like an autonomous car is composed of several sub-systems, robotic softwares are composed by different and complementary sub-systems coordinating themselves. With neuro-symbolic systems, you need to train your neural networks with the whole architecture to increase efficiency by taking into account the contraints and new knowledge created by this neuro-symbolic architecture. We plan to release soon small finetuned models to allow the system to accuratly navigate into the graph and with programming knowledge about our DSL to enable long-term planning agent. By lowering the costs of long-term agent workers, we enable new usecases for the entire industry.

### What is the difference between LangGraph and HybridAGI?

LangGraph, being a Python low-code framework, it is actually more complex to build a system with. Cypher, on the other hand, is designed to be easy for people to understand at a glance. More importantly, our DSL is designed to allow LLMs to read, write, and modify it on the fly without any prior training, enabling programs with self-healing or self-programming capability just to name a few. The graphs fit into a prompt and are semantically separated like code, requiring only 4 node types to describe the system of your choice. Additionally, automatic prompt optimization and fine-tuning are leveraged to their maximum capability by focusing solely on DSPy and removing LangChain from our codebase.

### What is the benefit of using HybridAGI over DSPy with Llama-index?

HybridAGI is specifically tailored for building interactive and reasoning agents quickly and effortlessly. The DSL allows for algorithmic flexibility while making it possible to describe every type of system without having to implement it from scratch. Plus, we focus our work on an open-source vector/graph database, allowing people and businesses to maintain control of their data.

### How does HybridAGI help me regarding the EU AI Act or future regulation on your country for non-EU?

Because this system can only execute actions that are in the graph, businesses can use the graph to classify the behavior of their AI system and document it. However, this is not sufficient, and you should always conduct specific safety tests in accordance with the safety practices of your domain, in particular red-teaming of the model. We plan to release tools to help regarding these aspects.

### Can HybridAGI be used for tasks other than robotics?

Yes, HybridAGI can be used for a wide range of tasks beyond robotics. The system is designed to be flexible and adaptable, making it suitable for any application that requires complex reasoning and decision-making, such as retrieval-augmented generation (RAG), chatbots, knowledge scrapers, personal assistants, and more generally, any agent-based application.

### How can I contribute to HybridAGI?

We encourage you to join our community on Discord to connect with other developers and share your ideas.

#### What you need to start?

- [Git](https://git-scm.com/downloads) and [Docker](https://www.docker.com/products/docker-desktop/), [Python](https://www.python.org/).

Additionally you can install [Ollama](https://ollama.com/) to run the examples, pull `mistral` model and start the ollama server.

### 1. Installation

```shell
git clone https://github.com/SynaLinks/HybridAGI
cd HybridAGI
virtualenv venv
source venv/bin/activate
pip install poetry # If you don't have it already
poetry install
```

### 2. Setup the Knowledge Base (needed for the system to work)

```
docker compose up
```

### 3. Run the tests to check your install

```
poetry run pytest -vv
```

### 4. Start programmming and optimizing or finetuning your model

You can start to learn more about [graph prompt programming](basics/graph-prompt-programming.md) is this first tutorial.

You have acces to many [remote LLMs](https://dspy-docs.vercel.app/api/category/language-model-api-clients) and [local LLMs](https://dspy-docs.vercel.app/api/category/local-language-model-clients).

See the [examples](https://github.com/SynaLinks/HybridAGI/tree/main/examples) to learn how HybridAGI use [DSPy](https://dspy-docs.vercel.app/) to enhance itself.