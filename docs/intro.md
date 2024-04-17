---https://dspy-docs.vercel.app/docs/intro
sidebar_position: 1
slug: '/'
---

# Introduction

### What is HybridAGI?
HybridAGI is the first *Programmable LLM-based Autonomous Agent* that lets you program its behavior using a **graph-based prompt programming** approach. This state-of-the-art feature allows the AGI to efficiently use any tool while controlling the long-term behavior of the agent.

The new version of HybridAGI is now a DSPy component, learn more about [DSPy](https://dspy-docs.vercel.app/docs/intro) and how you can use it to optimize your prompt or finetune your model.

#### What you need to start?

- [Git](https://git-scm.com/downloads) and [Docker](https://www.docker.com/products/docker-desktop/), [Python](https://www.python.org/).

Additionally you can install [Ollama](https://ollama.com/) for the demon, pull `mistral` model and start the ollama server.

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

### 4. Start programmming & optimizing or finetuning your model

See the [examples](https://github.com/SynaLinks/HybridAGI/tree/main/examples) to learn how HybridAGI use [DSPy](https://dspy-docs.vercel.app/) to enhance itself.

You have acces to many [remote LLMs](https://dspy-docs.vercel.app/api/category/language-model-api-clients) and [local ones](https://dspy-docs.vercel.app/api/category/local-language-model-clients).

You can start to learn more about [graph prompt programming](basics/graph-prompt-programming.md) is this first tutorial.