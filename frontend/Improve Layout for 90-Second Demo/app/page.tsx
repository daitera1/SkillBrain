"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import StepsSection from "@/components/StepsSection";
import WorkspaceSection from "@/components/WorkspaceSection";
import ScenarioSection from "@/components/ScenarioSection";
import WhySection from "@/components/WhySection";
import {
  WorkflowKey,
  generateSkillFile,
  runScenario,
  ScenarioDecision,
  refundDemoKnowledge,
  refundDemoScenario,
} from "@/lib/mockData";

export default function Home() {
  const [workflow, setWorkflow] = useState<WorkflowKey>("refund");
  const [knowledgeText, setKnowledgeText] = useState("");
  const [generatedSkill, setGeneratedSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [scenarioText, setScenarioText] = useState("");
  const [decision, setDecision] = useState<ScenarioDecision | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleWorkflowChange = (value: WorkflowKey) => {
    setWorkflow(value);
    setGeneratedSkill("");
    setDecision(null);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setDecision(null);
    window.setTimeout(() => {
      setGeneratedSkill(generateSkillFile(workflow, knowledgeText));
      setIsGenerating(false);
    }, 900);
  };

  const handleRun = () => {
    setIsRunning(true);
    window.setTimeout(() => {
      setDecision(runScenario(workflow, scenarioText));
      setIsRunning(false);
    }, 800);
  };

  const handleLoadRefundDemo = () => {
    setWorkflow("refund");
    setKnowledgeText(refundDemoKnowledge);
    setScenarioText(refundDemoScenario);
    setGeneratedSkill("");
    setDecision(null);
  };

  return (
    <main>
      <Hero onLoadDemo={handleLoadRefundDemo} />
      <StepsSection />
      <WorkspaceSection
        workflow={workflow}
        onWorkflowChange={handleWorkflowChange}
        knowledgeText={knowledgeText}
        onKnowledgeChange={setKnowledgeText}
        generatedSkill={generatedSkill}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />
      <ScenarioSection
        workflow={workflow}
        scenarioText={scenarioText}
        onScenarioChange={setScenarioText}
        decision={decision}
        isRunning={isRunning}
        onRun={handleRun}
        hasSkill={Boolean(generatedSkill)}
      />
      <WhySection />

      <footer className="border-t border-white/5 px-6 py-10 text-center text-xs text-slate-600">
        SkillBrain — hackathon demo. All generation shown here is simulated client-side.
      </footer>
    </main>
  );
}
