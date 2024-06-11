---
sidebar_position: 1
---

# Sentence Transformer Embeddings
## Embeddings for text data

Sentence Transformer Embeddings are used for computing the vectors used in similarity retrieval. These embeddings are an essential component for each `HybridStore`, empowering you to fetch text data efficiently.

# Usage

```python
from hybridagi import SentenceTransformerEmbeddings

embeddings = SentenceTransformerEmbeddings(
    model_name_or_path = "sentence-transformers/all-MiniLM-L6-v2", # The name of the model to use
    dim = 384, # The dimension of the embeddings vector
    max_gpu_devices = 1, # The maximum number of GPU to use (default to 1)
    batch_size = 256, # The maximum of embeddings to compute in one batch (default to 256)
    max_seq_length = 256, # The maximum number of input tokens for the embeddings (default to 256) 
    normalize_embeddings = True, # Whether or not to normalize the embeddings (default to True)
)
```