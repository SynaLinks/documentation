---
sidebar_position: 3
---

# Adding Custom Embeddings
## Create your own embeddings

When adding a custom embeddings, you will need to create an Object that inherit from `BaseEmbeddings`, here is the interface to follow:

```python
import abc
import numpy as np
from typing import Union, List

class BaseEmbeddings():
    
    def __init__(self, dim: int):
        self.dim = dim

    @abc.abstractmethod
    def embed_text(self, query_or_queries: Union[str, List[str]]) -> np._typing.NDArray:
        pass
    
    @abc.abstractmethod
    def embed_image(self, image_or_images: Union[np._typing.NDArray, List[np._typing.NDArray]]) -> np._typing.NDArray:
        pass
```