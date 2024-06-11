---
sidebar_position: 2
---

# Fake Embeddings
## Embeddings for testing purposes

Fake Embeddings are an indispensable resource for ensuring the smooth and efficient testing of your applications. They generate a random vector of the specified dimension, making them perfect for simulating real-world embeddings during the testing phase. By incorporating Fake Embeddings into your testing pipelines, you can effectively evaluate the functionality of your applications without the need for actual embeddings.

## Usage

```python
import unittest
from hybridagi import FakeEmbeddings

def test_embeddings():
    emb = FakeEmbeddings(dim=250)
    vector = emb.embed_text("hello world")
    assert len(vector) == 250
```

By integrating Fake Embeddings into your testing workflows, you can streamline your testing processes and ensure the robustness and reliability of your applications.