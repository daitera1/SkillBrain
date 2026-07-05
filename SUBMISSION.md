# SkillBrain Hackathon Submission

## Problem Statement

Companies store operational knowledge across multiple disconnected sources such as policies, documentation, tickets, chats, and employee experience. Traditional document search retrieves information but does not provide executable workflows for AI agents.

---

## Solution Approach

SkillBrain converts company knowledge into executable skill files.

Each generated skill contains:

- Triggers
- Inputs
- Decision rules
- Procedures
- Escalation paths
- Exceptions
- Expected outputs
- Agent safety notes

SkillBrain is not a document chatbot.

---

## Product Overview

SkillBrain enables organizations to transform business knowledge into structured workflows that AI agents can execute consistently and safely.

---

## Technology Overview

- React frontend
- Python/FastAPI backend
- LLM-based extraction
- Local JSON skill generation
- Scenario testing module

---

## Business Model Overview

- Free plan for experimentation
- Pro plan for teams
- Enterprise plan for organizations requiring collaboration, governance, and integrations

---

## Market and User Perspective

Initial users include support and operations teams.

Future expansion targets:

- Finance
- HR
- IT support
- Legal operations
- Healthcare administration
- Global enterprise AI teams

---

## Demo (Under 90 Seconds)

1. Upload refund policy.
2. Generate executable refund skill.
3. Run sample scenario.
4. Observe workflow execution.
5. View generated customer response.

Scenario:

- Purchase 10 days ago
- Damaged item
- Refund request: $120
- Non-VIP customer

Result:

- Requests photo evidence
- Escalates to manager
- Generates polite response
- Includes 3–5 business day processing estimate

---

## GStack / GBrain Usage

SkillBrain is inspired by GBrain, but adapted for business workflows.

GStack was used as a development process: specification, design, implementation, QA, and documentation.