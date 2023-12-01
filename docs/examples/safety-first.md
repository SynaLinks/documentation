---
sidebar_position: 2
---

# Safety First

Learn how to implement a safety program.

## Implementing a Moderation Mechanism

In this example, we'll implement a simple safeguard procedure to prevent the AI system from acting if the objective can cause harm.

Let's imagine we already have a program called `fulfill_objective` that contains the prompting mechanism to realize the objective through planning and acting. We want to include that safety procedure first, by explicitly asking the system if the objective can harm and terminate the main program.

This can be done using this simple code snippet:

```cypher title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(is_objective_harmful:Decision {
    name:"Check if the Objective can harm",
    question:"Is the Objective harmful to a person or community of people?"}),
(fulfill_objective:Program {
    name:"Fulfill the Objective",
    program:"fulfill_objective"}),
// Structure declaration
(start)-[:NEXT]->(is_objective_harmful),
(is_objective_harmful)-[:NO]->(fulfill_objective),
(is_objective_harmful)-[:YES]->(end)
```

In this example, we simply halt the system if the objective does not align with this rule. But we could also try to better predict the outcomes of the objective to answer more accurately.

Here is the updated example:

```cypher title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(predict_outcomes:Action {
    name:"Predict the possible outcomes of the Objective",
    tool:"Predict",
    prompt:"Please elaborate on the possible outcomes of the Objective"}),
(is_objective_harmful:Decision {
    name:"Check if the Objective can harm",
    question:"Is the Objective harmful to a person or community of people?"}),
(fulfill_objective:Program {
    name:"Fulfill the Objective",
    program:"fulfill_objective"}),
// Structure declaration
(start)-[:NEXT]->(predict_outcomes),
(predict_outcomes)-[:NEXT]->(is_objective_harmful),
(is_objective_harmful)-[:NO]->(fulfill_objective),
(is_objective_harmful)-[:YES]->(end)
```

Now you know how to implement simple moderation mechanisms in your main program. Let us know if you come up with more ideas concerning this aspect!