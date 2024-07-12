---
sidebar_position: 4
---

# Install HybridAGI

### What you need to start?

- [Git](https://git-scm.com/downloads) and [Docker](https://www.docker.com/products/docker-desktop/), [Python](https://www.python.org/).

Additionally you can install [Ollama](https://ollama.com/) to run the examples, pull `mistral` model and start the ollama server.

### 1. Install using pip

```bash
pip install hybridagi
```

Note: Before installing `hybridagi` we recommand you to create a virtual environment using virtualenv, conda or your preferred environment manager.

### 2. Setup the Knowledge Base (needed for the system to work)

Then setup the knowledge base using docker:

```bash
docker run -p 6379:6379 -p 3000:3000 -it --rm falkordb/falkordb:edge
```
### 3. Start programmming your Agent

You can start to learn more about graph prompt programming in this **[first tutorial](tutorials/basics/graph-prompt-programming.md)** or with this **[Python notebook](https://github.com/SynaLinks/HybridAGI/blob/main/notebooks/first_steps.ipynb)**.