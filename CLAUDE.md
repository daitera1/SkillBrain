# gstack

gstack is installed at `~/.claude/skills/gstack`. Use `/browse` for all web browsing instead of Chrome MCP tools directly.

## Available gstack skills

- `/office-hours` — YC Office Hours — two modes
- `/plan-ceo-review` — CEO/founder-mode plan review
- `/plan-eng-review` — Eng manager-mode plan review
- `/plan-design-review` — Designer's eye plan review — interactive, like CEO and Eng review
- `/plan-devex-review` — Interactive developer experience plan review
- `/design-consultation` — Understands your product, researches the landscape, proposes a complete design system
- `/design-shotgun` — Generate multiple AI design variants, open a comparison board, collect structured feedback, and iterate
- `/design-html` — Design finalization: generates production-quality Pretext-native HTML/CSS
- `/design-review` — Designer's eye QA: finds visual inconsistency, spacing, hierarchy, AI slop patterns, slow interactions
- `/review` — Pre-landing PR review
- `/ship` — Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR
- `/land-and-deploy` — Land and deploy workflow
- `/canary` — Post-deploy canary monitoring
- `/benchmark` — Performance regression detection using the browse daemon
- `/benchmark-models` — Cross-model benchmark for gstack skills
- `/browse` — Fast headless browser for QA testing and site dogfooding
- `/connect-chrome` — Launch GStack Browser — AI-controlled Chromium with the sidebar extension baked in
- `/setup-browser-cookies` — Import cookies from your real Chromium browser into the headless browse session
- `/setup-deploy` — Configure deployment settings for /land-and-deploy
- `/setup-gbrain` — Set up gbrain for this coding agent
- `/sync-gbrain` — Keep gbrain current with this repo's code and refresh agent search guidance in CLAUDE.md
- `/qa` — Systematically QA test a web application and fix bugs found
- `/qa-only` — Report-only QA testing
- `/design-review` — (see above)
- `/investigate` — Systematic debugging with root cause investigation
- `/document-release` — Post-ship documentation update
- `/document-generate` — Generate missing documentation from scratch for a feature, module, or entire project
- `/codex` — OpenAI Codex CLI wrapper — three modes
- `/cso` — Chief Security Officer mode (security audit)
- `/autoplan` — Auto-review pipeline: runs CEO, design, eng, and DX review skills sequentially with auto-decisions
- `/plan-tune` — Self-tuning question sensitivity + developer psychographic for gstack
- `/careful` — Safety guardrails for destructive commands
- `/freeze` — Restrict file edits to a specific directory for the session
- `/unfreeze` — Clear the freeze boundary set by /freeze
- `/guard` — Full safety mode: destructive command warnings + directory-scoped edits
- `/gstack-upgrade` — Upgrade gstack to the latest version
- `/learn` — Manage project learnings
- `/retro` — Weekly engineering retrospective
- `/scrape` — Pull data from a web page
- `/skillify` — Codify the most recent successful /scrape flow into a permanent browser-skill on disk
- `/spec` — Turn vague intent into a precise, executable spec in five phases
- `/health` — Code quality dashboard
- `/make-pdf` — Turn any markdown file into a publication-quality PDF
- `/landing-report` — Read-only queue dashboard for workspace-aware ship
- `/pair-agent` — Pair a remote AI agent with your browser
- `/ios-clean` — Remove the DebugBridge SPM package and all #if DEBUG wiring from an iOS app
- `/ios-design-review` — Visual design audit for iOS apps on real hardware
- `/ios-fix` — Autonomous iOS bug fixer
- `/ios-qa` — Live-device iOS QA for SwiftUI apps
- `/ios-sync` — Regenerate the iOS debug bridge against the latest upstream gstack templates

## Coding Tasks

When spawning Claude Code sessions for coding work, tell the session to use gstack skills.

Examples:
- security audit: "Load gstack. Run /cso"
- code review: "Load gstack. Run /review"
- QA test a URL: "Load gstack. Run /qa https://..."
- build a feature end-to-end: "Load gstack. Run /autoplan, implement the plan, then run /ship"
- plan before building: "Load gstack. Run /office-hours then /autoplan. Save the plan, don't implement."
