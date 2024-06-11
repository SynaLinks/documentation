---
sidebar_position: 4
---

# Install HybridAGI

### What you need to start?

- [Git](https://git-scm.com/downloads) and [Docker](https://www.docker.com/products/docker-desktop/), [Python](https://www.python.org/).

Additionally you can install [Ollama](https://ollama.com/) to run the examples, pull `mistral` model and start the ollama server.

### 1. Install
<!-- 
#### From pip

```
virtualenv venv
source venv/bin/activate
pip install git+https://github.com/SynaLinks/HybridAGI
```

#### From sources -->

```bash
git clone https://github.com/SynaLinks/HybridAGI
cd HybridAGI
virtualenv venv
source venv/bin/activate
pip install poetry # If you don't have it already
poetry install
```

### 2. Setup the Knowledge Base (needed for the system to work)

<!-- ```
docker run -p 6379:6379 -it --rm falkordb/falkordb:edge
``` -->
```bash
docker compose up
```

### 3. Start programmming your Agent

You can start to learn more about graph prompt programming in this **[first tutorial](tutorials/basics/graph-prompt-programming.md)** or with this **[Python notebook](https://github.com/SynaLinks/HybridAGI/blob/main/notebooks/first_steps.ipynb)**.