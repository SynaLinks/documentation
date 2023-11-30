
# Safety First

Learn how to implement a safety program

## Implementing a moderation mechanism

In this example, we'll implement a simple safeguard procedure to prevent the AI system to act if the objective can harm.

Let's imagine we already have a program called `fullfil_objective` that contains the prompting mechanism to realize the objective through planning and acting. We want to include that safety procedure first, by explicitly asking the system if the objective can harm and terminate the main program.

This can be done using this simple code snippet:

```javascript title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(is_objective_harmfull:Decision {
    name:"Check if the Objective can harm",
    question:"Is the Objective harmfull to a person or community of people?"}),
(fullfil_objective:Program {
    name:"Fullfil the Objective",
    program:"fullfil_objective"}),
// Structure declaration
(start)-[:NEXT]->(is_objective_harmfull),
(is_objective_harmfull)-[:NO]->(fullfil_objective),
(is_objective_harmfull)-[:YES]->(end)
```

In this example, we simply shunt the system if the objective does not align with this rule. But we could also try to better predict the outcomes of the objective, in order to answer more accuratelly.

Here is the updated example:

```javascript title="main.cypher"
CREATE
// Nodes declaration
(start:Control {name:"Start"}),
(end:Control {name:"End"}),
(predict_outcomes:Action {
    name:"Predict the possible outcomes of the Objective",
    tool:"Predict",
    prompt:"Please, elaborate the possible outcomes of the Objective"}),
(is_objective_harmfull:Decision {
    name:"Check if the Objective can harm",
    question:"Is the Objective harmfull to a person or community of people?"}),
(fullfil_objective:Program {
    name:"Fullfil the Objective",
    program:"fullfil_objective"}),
// Structure declaration
(start)-[:NEXT]->(predict_outcomes),
(predict_outcomes)-[:NEXT]->(is_objective_harmfull),
(is_objective_harmfull)-[:NO]->(fullfil_objective),
(is_objective_harmfull)-[:YES]->(end)
```

Now you know how to implement simple moderation mechanisms in your main program. Let us know if you come up with more ideas concerning this aspect!