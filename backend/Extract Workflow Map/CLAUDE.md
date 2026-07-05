# Prompt: Extract Workflow Map

This is useful if you want to show a "living map of how the company works."

You are SkillBrain.

Extract a workflow map from the company knowledge.

Company knowledge:
{{COMPANY_KNOWLEDGE}}

Return the workflow map with this structure:

# Workflow Map

## Workflow Name
Name the workflow.

## Actors
List people, teams, or systems involved.

## Start Trigger
What event starts the workflow?

## Steps
Numbered workflow steps.

## Decision Points
List important decisions in the workflow.
Use IF/THEN format.

## Escalation Points
Where does the workflow require human approval or escalation?

## End States
List possible outcomes.

## Risks
List possible failure points or safety risks.

Important rules:
- Focus on how work happens.
- Do not write a generic summary.
- Extract operational logic.
