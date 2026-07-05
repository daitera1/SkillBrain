# GBRAIN.md

## Product Memory

SkillBrain is a Company Brain builder that converts fragmented company knowledge into executable AI skill files.

The project focuses on operational workflows rather than document retrieval.

---

## Theme

Transform business knowledge into executable workflows for AI agents.

---

## Product Rules

- SkillBrain is not a document chatbot.
- Every generated skill must contain structured workflow logic.
- Generated skills must include safety notes.
- Escalation rules must be explicit.
- Human review should remain available for sensitive decisions.

---

## Target Users

- Customer support teams
- Operations teams
- Internal AI platform teams
- SMEs adopting AI agents
- Enterprise workflow designers

---

## MVP Scope

The MVP supports:

- Knowledge upload
- Rule extraction
- Skill generation
- Scenario testing
- Executable workflow output

---

## What Not to Build

- General-purpose chatbot
- Enterprise deployment platform
- Full workflow automation engine
- Multi-agent orchestration
- Production integrations

---

## Demo Scenario

Refund handling.

Knowledge:

- Refunds allowed within 14 days.
- Damaged items require photo evidence.
- Refunds above $100 require manager approval.
- Used products receive store credit unless approved by manager.
- VIP customers receive faster processing.
- Respond politely with a 3–5 business day processing estimate.

Scenario:

- Purchase: 10 days ago
- Damaged item
- Refund: $120
- Customer is not VIP

Expected Result:

- Request photo evidence
- Escalate to manager
- Draft polite customer response
- Include processing time

---

## Design Principles

- Simple
- Transparent
- Structured
- Explainable
- Safe
- Business-focused

---

## Important Project Decisions

- Local logic for reliability
- Structured skill format over document retrieval
- Human-readable outputs
- Business workflow focus
- Inspired by GBrain while remaining company-specific