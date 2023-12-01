---
sidebar_position: 1
slug: '/'
---

# Introduction

Let's delve into HybridAGI in less than 5 minutes.

### What is HybridAGI?

HybridAGI stands out as the first Programmable LLM-based Autonomous Agent, enabling you to program its behavior using a graph-based prompt programming approach. This cutting-edge feature empowers the AGI to effectively utilize any tool while maintaining control over the agent's long-term behavior.

HybridAGI represents the future of hybrid architectures, harmonizing the strengths of both machine learning models and explicit programming. This approach seeks to bridge the gap between the remarkable language generation capabilities of Large Language Models (LLM) and the necessity for logical reasoning and decision-making capabilities. By integrating advanced machine learning models with explicit programming, HybridAGI systems excel in language generation, logical reasoning, and decision-making tasks.

### What you need to start

- An OpenAI API key or a functional text generation endpoint
- [Git](https://git-scm.com/) and [Docker](https://www.docker.com/products/docker-desktop/)

## Try the demo using Docker

Begin by cloning this repository to your local machine using the following command:

```shell
git clone https://github.com/SynaLinks/HybridAGI-app.git
```

### Set Up Your OpenAI API Key or Text Generation Endpoint

Before running the app, you need to set up your OpenAI API key.

- Rename the `.env.template` file to `.env`.
- Open the `.env` file in a text editor.
- Replace `my-openai-api-key` with your actual OpenAI API key.

If you prefer to use the private mode instead, set `PRIVATE_MODE` to `True` and set up your end-point URL with `LOCAL_MODEL_URL`.

### Start the App

Navigate to the cloned repository:

```shell
cd HybridAGI-app
```

Now, you can launch the app using Docker Compose:

```shell
docker-compose up
```

The app will build and run within a Docker container, and you'll see the Streamlit app URL in your terminal.

### Access the App

Open a web browser and enter the Streamlit app URL. By default, it should be https://localhost:8501. You'll be able to interact with HybridAGI via this web interface.

This demo showcases an experimental program with self-programming capabilities.

### Inspect the Database

Open a new tab at https://localhost:8001 and connect to an existing database with the hostname `falkordb` and port `6379`.