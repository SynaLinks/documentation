---
sidebar_position: 1
slug: '/'
---

# Introduction

### What is HybridAGI?
HybridAGI is the first *Programmable LLM-based Autonomous Agent* that lets you program its behavior using a **graph-based prompt programming** approach. This state-of-the-art feature allows the AGI to efficiently use any tool while controlling the long-term behavior of the agent.

## Chat Demo: Quickstart in 5 simple steps (recommended)!

#### What you need to start?

- A MistralAI API key (get one at https://mistral.ai/)
- [Git](https://git-scm.com/downloads) and [Docker](https://www.docker.com/products/docker-desktop/)

### Installation

First, clone the chat repository with:

```shell
git clone https://github.com/SynaLinks/HybridAGI-chat
cd HybridAGI-chat
```

### Directory hierarchy

Then open the repository folder in your favorite IDE ([VSCodium](https://vscodium.com/) with the Neo4J plugin is a good start). 

```shell
📦HybridAGI-chat
┣ 📂archives  # This is where the AGI will save the archives when uploading file or folders
┣ 📂documentation # This is where you can put your pdf and documents for similarity search
┣ 📂programs # This is where you should put your Cypher programs
┣ 📂src # The source code of the UI
... the license and other files related to deployment
```

Note that these folders are shared with the application container, you should use them to share data between your filesystem and the AI system.

### Echo test program

Start with a simple echo test, create a `main.cypher` file inside the `programs` folder:

```javascript
// Nodes declaration
CREATE
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(echo_objective:Action {
  name:"Reformulate the Objective",
  tool:"Speak",
  prompt:"Please reformulate the objective using other words"}),
// Structure declaration
(start)-[:NEXT]->(echo_objective),
(echo_objective)-[:NEXT]->(end)
```

Learn more about Graph-based Prompt Programming by reading our [documentation](https://synalinks.github.io/documentation/basics/graph-prompt-programming).

### Deploy your app

Now it is time to deploy this app, just use the following command:

```shell
docker-compose up
```

## CLI Demo

To use the CLI demo, rename the `.env.template` file into `.env`, replace `your-api-key` with your actual MistralAI API key and use the following command:

```
docker compose run -it hybrid-agi-cli
```

### Inspect the database

Open your browser at `http://localhost:8001` and connect to an existing database with the hostname `hybrid-agi-db` and port `6379`.