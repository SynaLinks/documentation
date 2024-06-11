---
sidebar_position: 2
---

# Representing Knowledge

Explore the realm of knowledge representation.

## The Traditional Way to Represent Knowledge

Knowledge representation is pivotal in any AI application. Traditionally, knowledge was encoded into graphs using ontologies or property graph systems.

Due to the challenges in modeling a knowledge domain and the labor-intensive process of creating graph data, only specific domains with strict taxonomies still employ graph-based knowledge systems. Examples include biology or domains with highly interconnected data, such as social media and financial applications.

## Representing Knowledge with Vectors

With the advent of deep learning, unstructured knowledge (texts, posts, books, etc.) has become accessible to AI systems. However, neural networks represent data in a completely different way, using vectors.

<figure>
  <p align="center">
    ![The embedding vectors represented in 3D](../../assets/embeddings.png)
    <figcaption align="center"><b>Fig.1 - Vectors of words represented in 3 dimensions, illustrating this concept; similar words are close together.</b></figcaption>
  </p>
</figure>

This novel approach to represent and work with unstructured knowledge has given rise to new applications such as vector databases and similarity-augmented generation.

## Combining Vector and Graph Representations

The fusion of these two types of representation is fundamental to our vision of the future and the neuro-symbolic approach. This hybrid representation allows for similarity-based data retrieval strategies combined with precise and efficient strategies provided by graphs.

Our framework currently supports 4 types of knowledge store:

- **Filesystem:** Stores documents along with their folders, enabling the system to navigate its long-term memory using a shell. This hybrid approach allows the Agent to search for relevant chunks and read the entire file if needed, or even re-organise its memory.
  
- **Program Memory:** Stores the graph prompt programs and provides the dependency tree of HybridAGI's graph programs. The dependency tree allow the system to protect the main prompting mechanism and its dependencies from being modified by the Agent. Providing a safe enviroment for studying AGI with self-learning capabilities (application that program itself).

- **Trace Memory:** Stores the program traces and index each past action. Allowing the system to recall past actions between sessions.

- **Fact Memory:** Stores the knowledge triplets (also called predicates) with each entity being indexed allowing the system to search for factual knowledge. The memory allows for graph-based retrieval augmented generation (GraphRAG) combined with the determinism of our graph programs.

Each structure contains content indexed by the embedding vectors at their leaves, enabling the system to perform similarity-based searches like in a nowadays classic vector databases.

<figure>
  <p align="center">
    ![HybridAGI's long-term memory](../../assets/memories.svg)
    <figcaption align="center"><b>Fig.1 - HybridAGI's memories. Each memory system can be used in combinaiton with each other providing the best of vectors and graph retrieval.</b></figcaption>
  </p>
</figure>