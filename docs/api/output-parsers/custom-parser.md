# Custom Output Parser

You can easily add new parsers by inheriting from `BaseOutputParser`:

```python
import abc
from typing import Any

class BaseOutputParser():

    @abc.abstractmethod
    def parse(self, output: str) -> Any:
        pass
```

Here is a toy example to implement your own:

```python
from hybridagi.parsers.base import BaseOutputParser

class MyParser(BaseOutputParser):

    def parse(output: str) -> str:
        # Here is where you should put the logic of your parser
        return output
```