# Add Skill Export Buttons

Optional, but good if you have time:
Add export controls to the generated skill file panel.

Add these buttons:
- Copy Markdown
- Download .md
- Copy JSON

For Copy JSON, convert the skill file into a simple JSON object with:
{
  "skillFile": "...",
  "workflowType": "...",
  "generatedAt": "..."
}

Use browser APIs only.
Do not add server logic.

Show a small "Copied!" feedback message after copy.
