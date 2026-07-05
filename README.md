# SkillBrain

## Overview

**SkillBrain** turns scattered company knowledge into executable AI skills, so agents can do real work safely and consistently.

**SkillBrain is not a document chatbot.** Instead of simply answering questions from documents, SkillBrain extracts how work is actually performed inside a company and converts that knowledge into structured, executable skill files for AI agents.

**SkillBrain is inspired by GBrain, but adapted for business workflows.**

---

## Problem

Organizations store operational knowledge across policies, SOPs, support tickets, chat messages, documentation, and employee experience. This information is fragmented, inconsistent, and difficult for AI agents to execute reliably.

Traditional document search helps users find information, but it does not define:
- when a workflow should start
- what information is required
- decision logic
- escalation rules
- safety constraints
- expected outputs

---

## Solution

SkillBrain converts company knowledge into executable skill files by extracting:

- Triggers
- Required inputs
- Decision rules
- Procedures
- Escalation paths
- Exceptions
- Expected outputs
- Agent safety notes

These structured skills allow AI agents to perform business workflows consistently instead of simply retrieving information.

---

## Main Features

- Knowledge extraction from company documents
- AI skill generation
- Structured workflow representation
- Decision rule extraction
- Escalation logic generation
- Scenario testing using sample cases
- Human-readable skill output

---

## Technology Stack

- Frontend: React
- Backend: Python / FastAPI
- AI Processing: LLM-based extraction pipeline
- Storage: Local JSON skill files
- Testing: Scenario simulator

---

## Running the Application

1. Clone the repository.
2. Install frontend and backend dependencies.
3. Start the backend service.
4. Start the frontend.
5. Upload company knowledge.
6. Generate an executable skill.
7. Test the generated skill using the built-in scenario tester.

---

## Demo Flow

Using the Refund Handling example:

1. Upload company refund policy.
2. SkillBrain extracts workflow rules.
3. Generate an executable refund skill file.
4. Run the sample customer scenario.
5. Observe decision execution and generated customer response.

---

## GStack / GBrain Usage

SkillBrain is inspired by GBrain, but adapted for business workflows.

Rather than building a knowledge chatbot, the project focuses on creating executable business skills.

GStack was used as a development process:

- Specification
- Design
- Implementation
- QA
- Documentation

This ensured a structured workflow throughout the hackathon.