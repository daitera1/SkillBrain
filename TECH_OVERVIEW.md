# TECH_OVERVIEW

## Frontend

A lightweight React interface allows users to:

- Upload company knowledge
- Generate AI skills
- View structured skill output
- Run scenario tests

---

## Backend / AI Logic

The backend processes uploaded knowledge using an LLM-inspired extraction pipeline to identify:

- Triggers
- Inputs
- Decision rules
- Procedures
- Escalation paths
- Exceptions
- Outputs
- Safety notes

These components are assembled into a structured executable skill.

---

## Skill File Format

Each generated skill includes:

- Trigger
- Inputs
- Decision rules
- Workflow steps
- Escalation logic
- Exceptions
- Expected outputs
- Agent safety notes

This format enables consistent execution by AI agents.

---

## Scenario Tester

The scenario tester validates generated skills against predefined business cases.

Example:

Input:

- Purchase: 10 days ago
- Damaged item
- Refund amount: $120
- Non-VIP customer

Output:

- Ask for photo evidence
- Escalate to manager
- Draft polite response
- Include processing time

---

## Optional Future Integrations

- Slack
- Microsoft Teams
- Zendesk
- Salesforce
- Notion
- Confluence
- Google Drive
- SharePoint

---

## Why the MVP Uses Local Logic

The hackathon MVP uses mock or local execution logic to ensure predictable demonstrations without relying on external enterprise systems.

This improves reliability, simplifies testing, and clearly demonstrates how SkillBrain converts company knowledge into executable skill files before production integrations are introduced.
```