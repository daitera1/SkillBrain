You are SkillBrain, a Company Brain backend AI.

Your job is to convert scattered company knowledge into executable AI skill files.

You are NOT a document chatbot.
You should NOT simply summarize or answer questions from documents.

Instead, you must extract how work is done inside an organization.

From messy knowledge, identify:
- workflow trigger
- required inputs
- decision rules
- procedure steps
- exceptions
- escalation rules
- roles or responsible people
- expected outputs
- missing information
- risks or safety checks

Your output must be structured, practical, and usable by another AI agent.

When information is missing, clearly say what is missing.
Do not invent company rules that are not supported by the input.
You may make reasonable workflow suggestions, but label them as suggestions.

Always prefer clear, executable instructions over long explanation.

---

# Suggested Backend Flow

The backend should call AI in this sequence. Each named prompt lives in its
own subfolder under `backend/` as a `CLAUDE.md` file.

## Core flow

1. User pastes company knowledge.
2. Call the **Generate Executable Skill File** prompt.
3. Display the resulting skill file.
4. User enters a test scenario.
5. Call the **Test Skill on Scenario** prompt.
6. Display the agent decision.

```
User pastes knowledge
        ↓
Call: Generate Executable Skill File prompt
        ↓
Display skill file
        ↓
User enters test scenario
        ↓
Call: Test Skill on Scenario prompt
        ↓
Display agent decision
```

## Optional: keep skills current

1. User enters a policy update.
2. Call the **Update Existing Skill File** prompt.
3. Display the updated skill plus its change log.

```
User enters policy update
        ↓
Call: Update Existing Skill File prompt
        ↓
Display updated skill + change log
```

## Prompt catalog

Each prompt has a dedicated subfolder under `backend/`:

- `Generate Executable Skill File/` — Generate Executable Skill File
- `Test Skill on Scenario/` — Test Skill on Scenario
- `Update Existing Skill File/` — Update Existing Skill File
- `Extract Workflow Map/` — Extract Workflow Map
- `Convert Skill File to JSON/` — Convert Skill File to JSON
- `Demo-Friendly Refund Skill/` — Demo-Friendly Refund Skill

---

# Claude API Integration

Call Claude through the official Anthropic SDK (`@anthropic-ai/sdk`). The
SkillBrain system prompt (top of this file) is passed as `system`; each named
prompt goes in the `user` message.

> Model: use `claude-opus-4-8` (Anthropic's current default). Use
> `claude-sonnet-5` only if you need higher-volume/lower-cost production
> throughput. Do **not** use `claude-3-5-sonnet-latest` — it is outdated.

## Generate Skill File

```js
const response = await anthropic.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 16000,
  system: SYSTEM_PROMPT,
  messages: [
    {
      role: "user",
      content: generateSkillPrompt({
        workflowType,
        companyKnowledge,
      }),
    },
  ],
});
```

## Test Skill on Scenario

```js
const response = await anthropic.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 16000,
  system: SYSTEM_PROMPT,
  messages: [
    {
      role: "user",
      content: testSkillPrompt({
        skillFile,
        scenario,
      }),
    },
  ],
});
```

Notes:
- `max_tokens` set to 16000 keeps non-streaming requests under SDK HTTP
  timeouts while leaving room for full skill files. Lower it only if you have a
  reason to (e.g. cost caps on short outputs).
- Reading the reply: `response.content` is an array of blocks — pull text with
  `response.content.find(b => b.type === "text").text` rather than assuming
  `content[0]`.
