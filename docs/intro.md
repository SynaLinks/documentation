---
id: intro
sidebar_position: 1
slug: /
---

# Introduction

Let's start with HybridAGI in less than 5 minutes.

### What is HybridAGI?

HybridAGI is the first Programmable LLM-based Autonomous Agent that lets you program its behavior using a graph-based prompt programming approach. This state-of-the-art feature allows the AGI to efficiently use any tool while controlling the long-term behavior of the agent.

HybridAGI represents the future of hybrid architectures that combine the strengths of both machine learning models and explicit programming. This approach aims to bridge the gap between the impressive language generation abilities of Large Language Models (LLM) and the need for logical reasoning and decision-making capabilities. By integrating advanced machine learning models with explicit programming, HybridAGI systems excel in language generation, logical reasoning, and decision-making tasks.

### What you need to start

- An OpenAI API key or a working text generation endpoint
- [Git](https://git-scm.com/) and [Docker](https://www.docker.com/products/docker-desktop/)

## Try the demo using Docker

First, clone this repository to your local machine using the following command:

```shell
git clone https://github.com/SynaLinks/HybridAGI-app.git
```

### Set Up Your OpenAI API Key or Text Generation Endpoint

Before running the app, you need to set up your OpenAI API key.

- Rename the `.env.template` file to `.env.`
- Open the `.env` file in a text editor.
- Replace `my-openai-api-key` with your actual OpenAI API key.

If you want to use the private mode instead, set `PRIVATE_MODE` to `True` and setup your end-point url with `LOCAL_MODEL_URL`.

### Start the App

Navigate to the cloned repository:

```shell
cd HybridAGI-app
```

Now, you can start the app using Docker Compose:

```shell
docker-compose up
```

The app will build and run within a Docker container, and you'll see the Streamlit app URL in your terminal.

### Access the App

Open a web browser and enter the Streamlit app URL. By default, it should be https://localhost:8501. You'll be able to interact with HybridAGI via this web interface.

This demo show you an experimental program with self-programming capabilities.

### Inspect the Database

Open a new tab at https://localhost:8001 and connect to an existing database with the hostname `falkordb` and port `6379`.