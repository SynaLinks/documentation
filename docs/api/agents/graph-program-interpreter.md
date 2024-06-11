# Graph Program Interpreter

The Graph Program Interpreter serves as the primary agent within the HybridAGI framework. Similar to how a Python interpreter processes a program line by line, this agent interprets a graph program node by node. This approach enables the agent to demonstrate explainable behavior, as it executes only the actions and decisions specified by the graph. The deterministic nature of this behavior is vital for the development of explainable systems and allows developers to improve and correct the agent's behavior without the need for fine-tuning.

In contrast to React agents, which depend heavily on the training of Language Language Models (LLMs) to manage new tasks, HybridAGI has the ability to direct the agent to act beyond the limits of its data distribution. This capability enables HybridAGI to handle previously unencountered tasks with ease and control.

By not permitting the agent system to decide which tool to use at each step, HybridAGI can accommodate an infinite number of tools. This is a significant advantage over React-based agent architectures or agents that rely on function calling. Furthermore, this mechanism allows for the use of smaller LLMs that have not been specifically trained to use function calling or tools.

## Usage

```python
from hybridagi import GraphProgramInterpreter
from hybridagi import ProgramMemory, TraceMemory
from hybridagi import SentenceTransformerEmbeddings
from hybridagi import AgentState

# The embeddings needed for the hybrid vector/graph memories
embeddings = SentenceTransformerEmbeddings(
    dim = 384,
    model_name_or_path = "sentence-transformers/all-MiniLM-L6-v2",
)

# The program memory is mandatory for the agent system
program_memory = ProgramMemory(
    index_name = "hybrid_agi",
    embeddings = embeddings,
    wipe_on_start = True,
)

# The trace memory is optional but useful to inspect the behavior of your agent
trace_memory = TraceMemory(
    index_name = "hybrid_agi",
    embeddings = embeddings,
    wipe_on_start = True,
)

tools = [
    # ...
    # The tools to use
]

agent_state = AgentState()

interpreter = GraphProgramInterpreter(
    program_memory = program_memory, # The program memory (mandatory)
    trace_memory = trace_memory, # The trace memory that records every step inside the graph database
    agent_state = agent_state, # The state of the agent, created if not provided
    tools = tools, # The tools to use
    entrypoint = "main", # The entrypoint of the interpreter
    num_history = 5, # The number of steps to include in the agent context (default is 5)
    max_iters = 20, # The maximum iterations of the agent (default is 20)
    add_final_step = True, # Whether or not to add an extra step for the final answer (default to True)
    commit_decision_steps = True, # Whether or not to include decision steps in the agent context (default is True)
    commit_program_flow_steps = True, # Whether or not to include the call and end program steps in the context (default is True)
    return_final_answer = True, # Whether or not to return the agent's final answer (default to True)
    return_program_trace = True, # Whether or not to return the agent trace (default to True)
    return_chat_history = True, # Whether or not to return the chat history (default to True)
    verbose = True, # Prints the interpreter steps if True
)


```