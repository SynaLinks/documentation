---
sidebar_position: 3
---
# Cypher Cheatsheet

Here are some Cypher queries used to inspect the database.

To fetch every element of the graph (keep in mind that RedisGraph limit your query to avoid deadlocks with huge graphs)

```javascript
MATCH (n) RETURN n
```

To fetch every action using a particular tool, usefull for the `trace_memory`:

```javascript
MATCH (n:Action {tool:"Speak"}) RETURN n
```

To fetch every a document with its content, usefull for the `filesystem`:

```javascript
MATCH (n:Document {name:"/path/to/my_file.txt"})-[r:CONTAINS]->(m) RETURN n,r,m
```

If you have nice Cypher queries to share, feel free to tell us about so we can add other ones.