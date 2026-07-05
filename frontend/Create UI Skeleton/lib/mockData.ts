export type WorkflowKey = "refund" | "onboarding" | "incident" | "sales";

export interface WorkflowOption {
  value: WorkflowKey;
  label: string;
}

export const workflowOptions: WorkflowOption[] = [
  { value: "refund", label: "Customer Refund Handling" },
  { value: "onboarding", label: "New Employee Onboarding" },
  { value: "incident", label: "Incident Response (P1 Outage)" },
  { value: "sales", label: "Sales Lead Qualification" },
];

export const sampleKnowledge: Record<WorkflowKey, string> = {
  refund: `From #support-team channel (pinned by Priya):
- If order is under 30 days, just refund it, no questions asked
- Between 30-90 days we usually give store credit unless the item was damaged/defective, then still do a full refund but ask for a photo first
- Anything over $500 needs Finance sign-off before we release the refund, ping #finance-approvals
- If the customer is being abusive or threatens a chargeback/legal action, stop replying and hand it to a human lead immediately
- Always log the resolution + reason code in Zendesk under 'refund_reason'
- Payment refunds go through the Stripe dashboard; store credit is issued via the Loyalty app`,
  onboarding: `From onboarding-notes.docx (HR, last edited by Marcus):
- Day 1: send welcome email w/ laptop shipping tracking, add to Slack #new-hires, schedule IT setup call
- Day 1-3: assign a buddy, buddy sends an intro message within the first 24h
- Week 1: manager 1:1, complete compliance training in Workday, request building badge from Facilities
- If the laptop hasn't shipped by day 2, escalate to IT-ops on-call
- If the new hire is remote/international, coordinate with People Ops on local payroll + equipment customs
- Access to prod systems requires manager + security approval via an Okta ticket`,
  incident: `From incident-runbook (Eng wiki, owner: SRE team):
- P1 = customer-facing outage or data loss risk. P2 = degraded but workaround exists.
- On P1 trigger, page on-call via PagerDuty, open a #incident-<date> channel, appoint an Incident Commander
- Post a status update every 15 min in the channel and on statuspage.io
- If root cause touches payments or auth, security team must be looped in immediately
- Customers get a proactive email if the outage runs over 20 minutes, drafted by support-lead, approved by the IC
- After resolution: postmortem doc within 48h, blameless, shared in #eng-all`,
  sales: `From sales-playbook (Revenue Ops, updated by Dana):
- Qualify on BANT: Budget, Authority, Need, Timeline
- Company size under 10 employees -> route to self-serve/PLG funnel, not a rep
- Company size 10-500 -> standard AE queue
- Company size 500+ or inbound mentions 'enterprise', 'SSO', 'procurement' -> route to Enterprise AE + loop in Sales Eng
- If the lead is a competitor or a student doing research, mark disqualified, no follow-up
- Any prospect asking about security/compliance docs -> send the SOC2 packet automatically, then continue qualification`,
};

export const sampleScenario: Record<WorkflowKey, string> = {
  refund: `Hi, I ordered a blender 45 days ago and it arrived with a cracked lid. I want a full refund, not store credit. This is ridiculous, I've emailed twice already.`,
  onboarding: `New hire Sam starts Monday, fully remote from Portugal. IT says the laptop is stuck in customs and won't arrive until day 4.`,
  incident: `Our payment API is returning 500s for ~15% of checkout requests over the last 10 minutes. Error rate is climbing.`,
  sales: `Inbound demo request from a 2,000-person logistics company asking about SSO and their procurement process.`,
};

interface SkillBlueprint {
  name: string;
  trigger: string;
  rules: string[];
  steps: string[];
  escalation: string[];
  tools: string[];
  example: string;
}

const skillBlueprints: Record<WorkflowKey, SkillBlueprint> = {
  refund: {
    name: "Customer Refund Handling",
    trigger: "customer requests a refund or reports a billing/order issue",
    rules: [
      "If order age <= 30 days -> approve standard refund, no further checks",
      "If order age is 30-90 days -> offer store credit, unless item is damaged/defective",
      "If item is damaged or defective -> approve full refund regardless of window, request photo evidence",
      "If refund amount > $500 -> route to #finance-approvals before releasing funds",
    ],
    steps: [
      "Verify order ID and purchase date in the order system",
      "Check refund eligibility against the decision rules above",
      "If eligible, issue the refund via Stripe or store credit via the Loyalty app",
      "If not eligible, offer the closest alternative resolution",
      "Log the resolution and reason code in Zendesk",
    ],
    escalation: [
      "Customer is abusive, or threatens a chargeback or legal action",
      "Refund amount exceeds $500 and lacks Finance sign-off",
      "Fraud or repeat-refund pattern is suspected",
    ],
    tools: [
      "order_lookup(order_id)",
      "refund_processor(order_id, amount)",
      "crm_logger(ticket_id, resolution)",
    ],
    example: `Customer: "My order arrived broken, I want my money back."
Agent: verify order -> confirm damaged item -> approve full refund -> request photo -> log resolution`,
  },
  onboarding: {
    name: "New Employee Onboarding",
    trigger: "a new hire's start date is confirmed and onboarding needs to be kicked off",
    rules: [
      "Day 1 -> send welcome email, add to #new-hires, schedule IT setup call",
      "If laptop has not shipped by day 2 -> escalate to IT-ops on-call",
      "If hire is remote or international -> loop in People Ops for payroll + equipment customs",
      "Prod system access requires manager AND security approval via Okta",
    ],
    steps: [
      "Trigger welcome email with laptop tracking and Slack invite",
      "Assign a buddy who sends an intro message within 24h",
      "Schedule manager 1:1 and compliance training in Workday for week 1",
      "Request a building badge from Facilities",
      "Track equipment shipping status daily until delivered",
    ],
    escalation: [
      "Laptop or equipment delayed past the day-2 threshold",
      "International hire missing payroll/customs coordination",
      "Prod access requested without both required approvals",
    ],
    tools: [
      "workday_task(hire_id, task)",
      "okta_access_request(hire_id, system)",
      "slack_invite(hire_id, channel)",
    ],
    example: `Trigger: "Sam starts Monday, remote from Portugal."
Agent: kick off Day 1 checklist -> flag international -> notify People Ops -> monitor equipment shipping`,
  },
  incident: {
    name: "Incident Response (P1 Outage)",
    trigger: "a customer-facing outage or data-loss-risk signal is detected",
    rules: [
      "Customer-facing outage or data loss risk -> classify as P1; degraded-with-workaround -> P2",
      "Root cause touching payments or auth -> loop in Security immediately",
      "Outage duration > 20 minutes -> send proactive customer email, approved by the Incident Commander",
      "All P1s require a blameless postmortem within 48 hours",
    ],
    steps: [
      "Page on-call via PagerDuty and open a #incident-<date> channel",
      "Appoint an Incident Commander",
      "Post a status update every 15 minutes in-channel and on statuspage.io",
      "Coordinate mitigation with the relevant service owners",
      "Close out with a postmortem doc shared in #eng-all",
    ],
    escalation: [
      "Root cause involves payments, auth, or a security boundary",
      "Outage exceeds 20 minutes with no mitigation in sight",
      "Data loss or customer data exposure is suspected",
    ],
    tools: [
      "pagerduty_trigger(service, severity)",
      "statuspage_update(incident_id, message)",
      "incident_channel_create(date)",
    ],
    example: `Signal: "Checkout error rate climbing, payment API 500s."
Agent: classify P1 -> page on-call -> loop in Security (payments) -> post status update`,
  },
  sales: {
    name: "Sales Lead Qualification",
    trigger: "a new inbound or outbound lead needs qualification and routing",
    rules: [
      "Qualify on Budget, Authority, Need, Timeline (BANT)",
      "Company size < 10 -> route to self-serve/PLG funnel",
      "Company size 10-500 -> standard AE queue",
      "Company size 500+, or mentions 'enterprise' / 'SSO' / 'procurement' -> Enterprise AE + Sales Engineering",
      "Competitors or students doing research -> mark disqualified, no follow-up",
    ],
    steps: [
      "Capture company size, role, and stated need from the inbound form or call",
      "Match against routing rules to select the right queue",
      "If security/compliance is mentioned, send the SOC2 packet automatically",
      "Assign owner and log the qualification reasoning in the CRM",
    ],
    escalation: [
      "Deal qualifies for Enterprise track and needs Sales Engineering support",
      "Ambiguous BANT signals that need a human judgment call",
    ],
    tools: [
      "crm_create_lead(contact, company)",
      "soc2_packet_send(contact_email)",
      "route_to_queue(lead_id, queue)",
    ],
    example: `Lead: "2,000-person logistics company asking about SSO."
Agent: detect enterprise signal -> route to Enterprise AE -> loop in Sales Eng -> send SOC2 packet`,
  },
};

export function generateSkillFile(
  workflow: WorkflowKey,
  knowledgeText: string
): string {
  const blueprint = skillBlueprints[workflow];
  const trimmedContext = knowledgeText.trim();
  const context = trimmedContext
    ? trimmedContext.slice(0, 320) + (trimmedContext.length > 320 ? "…" : "")
    : "No knowledge provided — showing template structure only.";

  return `# Skill: ${blueprint.name}
trigger: "${blueprint.trigger}"
version: 0.1
source: company_knowledge_input

## Context (extracted from input knowledge)
${context}

## Decision Rules
${blueprint.rules.map((r, i) => `${i + 1}. ${r}`).join("\n")}

## Steps
${blueprint.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Escalation Policy
${blueprint.escalation.map((e) => `- ${e}`).join("\n")}

## Tools Required
${blueprint.tools.map((t) => `- ${t}`).join("\n")}

## Example Interaction
${blueprint.example}
`;
}

export interface ScenarioDecision {
  decision: string;
  reasoning: string;
  nextAction: string;
  escalation: { required: boolean; reason: string };
  messageDraft: string;
}

const riskWords = [
  "angry",
  "furious",
  "threat",
  "lawsuit",
  "legal action",
  "chargeback",
  "scam",
  "breach",
  "abusive",
];

function findDollarAmount(text: string): number | null {
  const match = text.match(/\$\s?([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

export function runScenario(
  workflow: WorkflowKey,
  scenarioText: string
): ScenarioDecision {
  const text = scenarioText.toLowerCase();
  const riskHit = riskWords.find((w) => text.includes(w));

  if (!scenarioText.trim()) {
    return {
      decision: "No scenario provided",
      reasoning: "The agent needs a scenario to evaluate against the generated skill file.",
      nextAction: "Enter a scenario and run the skill again.",
      escalation: { required: false, reason: "N/A" },
      messageDraft: "",
    };
  }

  if (workflow === "refund") {
    if (riskHit) {
      return {
        decision: "Escalate to human agent",
        reasoning: `Detected risk language ("${riskHit}") — policy requires human handling for abusive or legal-threat cases.`,
        nextAction: "Hand off to the on-call support lead and pause automated replies.",
        escalation: {
          required: true,
          reason: `Scenario matched an escalation trigger word: "${riskHit}".`,
        },
        messageDraft:
          "Hi, thank you for your patience with this — I'm looping in a member of our senior support team who will personally take care of this for you right away.",
      };
    }
    const amount = findDollarAmount(text);
    if (amount && amount > 500) {
      return {
        decision: "Hold for Finance sign-off",
        reasoning: `Refund amount ($${amount}) exceeds the $500 threshold that requires Finance approval before release.`,
        nextAction: "Open a request in #finance-approvals and notify the customer of a short delay.",
        escalation: {
          required: true,
          reason: "Refund amount exceeds the $500 auto-approval limit.",
        },
        messageDraft:
          "Thanks for flagging this — refunds over $500 need a quick internal sign-off. I've submitted it now and will confirm as soon as it clears, usually within one business day.",
      };
    }
    if (/damaged|broken|defective|cracked|shattered/.test(text)) {
      return {
        decision: "Approve full refund (damaged-item override)",
        reasoning: "Rule: damaged or defective items are refunded in full regardless of the 30/90-day window, pending photo evidence.",
        nextAction: "Request a photo of the damaged item, then process the refund via Stripe.",
        escalation: { required: false, reason: "Standard damaged-item path — no human needed unless evidence is inconclusive." },
        messageDraft:
          "So sorry your order arrived damaged! Could you send a quick photo so we can process this? Once we have it, I'll issue a full refund right away — no need to send the item back.",
      };
    }
    return {
      decision: "Approve based on standard refund window",
      reasoning: "No damage, risk language, or high-value flag detected — default order-age rule applies.",
      nextAction: "Confirm order date, then issue refund or store credit depending on the 30/90-day window.",
      escalation: { required: false, reason: "Falls within standard automated handling." },
      messageDraft:
        "Thanks for reaching out! I've checked your order and can go ahead and process this for you now.",
    };
  }

  if (workflow === "onboarding") {
    const delayed = /customs|delay|stuck|hasn't arrived|late/.test(text);
    const remote = /remote|international/.test(text);
    if (delayed) {
      return {
        decision: "Trigger IT escalation for equipment delay",
        reasoning: "Rule: if the laptop hasn't shipped or arrived by day 2, escalate to IT-ops on-call.",
        nextAction: "Open an IT-ops ticket, arrange a loaner laptop for day 1, and notify the manager.",
        escalation: { required: true, reason: "Equipment delay extends past the day-2 policy threshold." },
        messageDraft:
          "Heads up — the new hire's laptop is delayed past our day-2 threshold. I've opened an IT-ops ticket and arranged a loaner so day 1 isn't disrupted.",
      };
    }
    if (remote) {
      return {
        decision: "Proceed with onboarding, add international coordination step",
        reasoning: "Rule: remote/international hires require extra coordination with People Ops for payroll and equipment customs.",
        nextAction: "Loop in People Ops now, alongside the standard Day 1 checklist.",
        escalation: { required: false, reason: "Handled by standard remote-hire coordination path." },
        messageDraft:
          "Welcome to the team! Since you're joining us remotely, I've looped in People Ops to make sure payroll and equipment are sorted on your end too.",
      };
    }
    return {
      decision: "Proceed with standard Day 1 onboarding checklist",
      reasoning: "No delay or remote-hire signals detected — default onboarding path applies.",
      nextAction: "Send welcome email, assign buddy, schedule IT setup call.",
      escalation: { required: false, reason: "Standard path, no escalation needed." },
      messageDraft: "Welcome aboard! Your Day 1 checklist is ready and your buddy will reach out shortly.",
    };
  }

  if (workflow === "incident") {
    const paymentsOrAuth = /payment|auth|checkout|login/.test(text);
    const highErrorRate = /error rate|500s|outage|down|climbing/.test(text);
    if (paymentsOrAuth) {
      return {
        decision: "Declare P1 — loop in Security and Payments on-call",
        reasoning: "Rule: any root cause touching payments or auth requires immediate Security involvement, regardless of scope.",
        nextAction: "Page on-call, open an incident channel, appoint an Incident Commander, and notify Security.",
        escalation: { required: true, reason: "P1 classification with payments/auth impact — mandatory security loop-in." },
        messageDraft:
          "We're aware of an issue affecting checkout and are actively investigating. We'll share an update within 15 minutes.",
      };
    }
    if (highErrorRate) {
      return {
        decision: "Declare P1 — customer-facing outage",
        reasoning: "Rule: customer-facing outage or rising error rate meets the P1 bar.",
        nextAction: "Page on-call, open an incident channel, and begin 15-minute status updates.",
        escalation: { required: true, reason: "Customer-facing impact detected." },
        messageDraft: "We're currently investigating an issue impacting some users. Updates to follow shortly.",
      };
    }
    return {
      decision: "Classify as P2 — degraded, workaround available",
      reasoning: "No customer-facing outage or payments/auth signal detected — treated as degraded performance.",
      nextAction: "Assign to the owning team with standard priority, monitor for escalation triggers.",
      escalation: { required: false, reason: "No P1 criteria met." },
      messageDraft: "",
    };
  }

  // sales
  const enterpriseSignal = /enterprise|sso|procurement/.test(text);
  const sizeMatch = text.match(/(\d[\d,]*)\s*(?:-|to)?\s*(?:person|employee|people)/);
  const size = sizeMatch ? parseInt(sizeMatch[1].replace(/,/g, ""), 10) : null;

  if (enterpriseSignal || (size !== null && size >= 500)) {
    return {
      decision: "Route to Enterprise AE + Sales Engineering",
      reasoning: "Rule: company size 500+ or mentions of enterprise/SSO/procurement route to the Enterprise track.",
      nextAction: "Assign an Enterprise AE, loop in Sales Engineering, and send the SOC2 packet.",
      escalation: { required: true, reason: "Deal routed out of self-serve — needs Enterprise AE + Sales Eng review." },
      messageDraft:
        "Thanks for reaching out — given your team's size and requirements, I'm connecting you with our Enterprise team who can also walk through SSO and procurement details.",
    };
  }
  if (size !== null && size < 10) {
    return {
      decision: "Route to self-serve / PLG funnel",
      reasoning: "Rule: companies under 10 employees are routed to self-serve, not a rep.",
      nextAction: "Send self-serve signup link and onboarding guide.",
      escalation: { required: false, reason: "Self-serve path, no rep needed." },
      messageDraft: "Thanks for your interest! You can get started right away here — no sales call needed.",
    };
  }
  return {
    decision: "Route to standard AE queue",
    reasoning: "Default BANT qualification applies — no enterprise or self-serve signal detected.",
    nextAction: "Assign to the next available AE for a discovery call.",
    escalation: { required: false, reason: "Standard queue, no escalation needed." },
    messageDraft: "Thanks for your interest! I'll get you connected with one of our account executives shortly.",
  };
}
