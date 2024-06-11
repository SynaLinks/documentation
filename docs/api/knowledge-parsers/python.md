# Python Knowledge Parser

The python knowledge parser allows the system to build a knowledge graph from a python codebase by loading a folder at once.

## Usage

```python
from hybridagi import FactMemory
from hybridagi import SentenceTransformerEmbeddings

embeddings = SentenceTransformerEmbeddings(
    dim = 384,
    model_name_or_path = "sentence-transformers/all-MiniLM-L6-v2",
)

fact_memory = FactMemory(
    index_name = "hybrid_agi", 
    embeddings = embeddings,
)

parser = PythonKnowledgeParser(
    fact_memory = fact_memory,
)

parser.add_folders(["~/my_python_software"])

```