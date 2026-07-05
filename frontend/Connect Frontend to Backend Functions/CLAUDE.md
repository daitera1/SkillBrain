# Connect Frontend to Backend Functions

Use this once your backend functions exist:
Connect the SkillBrain frontend to the existing backend/logic functions.

Use these functions if available:
- generateSkillFile(knowledge, workflowType)
- runSkillOnScenario(skillFile, scenario, workflowType)

Expected behavior:
1. User enters company knowledge.
2. User chooses workflow type.
3. User clicks Generate Skill File.
4. The app calls generateSkillFile and displays the result.
5. User enters scenario.
6. User clicks Run Skill on Scenario.
7. The app calls runSkillOnScenario and displays:
   - decision
   - reasoning
   - nextAction
   - escalation
   - messageDraft or customerReply if available.

Add basic loading states:
- "Generating skill..."
- "Running skill..."

Add basic empty-state validation:
- If no knowledge is provided, show helpful message.
- If no skill file exists, ask user to generate a skill first.
- If no scenario is provided, ask user to enter a scenario.

Do not add external dependencies unless necessary.
