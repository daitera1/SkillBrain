# Prompt: Convert Skill File to JSON

This makes your product look more "agent-ready."

You are SkillBrain.

Convert the following skill file into valid JSON for an AI agent.

Skill file:
{{SKILL_FILE}}

Return only valid JSON.

Use this schema:

{
  "skill_name": "",
  "purpose": "",
  "trigger": "",
  "required_inputs": [],
  "decision_rules": [
    {
      "condition": "",
      "action": ""
    }
  ],
  "procedure": [],
  "escalation_rules": [],
  "exceptions": [],
  "expected_output": [],
  "missing_information": [],
  "agent_safety_notes": []
}

Important rules:
- Return only JSON.
- Do not include markdown.
- Do not include comments.
- Do not invent unsupported rules.
