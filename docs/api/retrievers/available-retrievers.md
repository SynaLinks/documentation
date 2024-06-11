# Available Retrievers

## Comprehensive List of Retrievers

Retrievers are essential components within the HybridAGI ecosystem, as they are responsible for fetching relevant information from the long-term memory. They efficiently convert the user's query into a similarity vector and, if necessary, re-rank the results to ensure the highest level of accuracy and relevance. These retrievers are integrated into various tools, enabling the Agent system to utilize them with ease.

Currently, we offer four distinct retrievers, each catering to a specific type of information:

1. `DocumentRetriever`: This retriever extracts document chunks from the `FileSystem` memory, making it suitable for users who need to access and analyze text-based data.

2. `ActionRetriever`: The ActionRetriever retrieves past actions from the `TraceMemory` system, allowing users to review and learn from the Agent system's previous actions.

3. `EntityRetriever`: The EntityRetriever retrieves entity-related data from the `FactMemory` system, making it valuable for users who need to access information about specific entities.

4. `ProgramRetriever`: The ProgramRetriever retrieves programs from the `ProgramMemory` system, making it a useful resource for users who need to access and analyze code.

These retrievers are integrated into the following tools for the Agent system's convenience:

- `DocumentSearch`: Searches for and retrieves text-based data using the DocumentRetriever.
- `PastActionSearch`: Searches for and reviews the Agent system's previous actions using the ActionRetriever.
- `EntitySearch`: Searches for and retrieves information about specific entities using the EntityRetriever.
- `ProgramSearch`: Searches for and retrieves graph programs using the ProgramRetriever.