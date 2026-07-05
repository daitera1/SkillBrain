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
  runSkillOnScenario,
  ScenarioDecision,
  refundDemoKnowledge,
  refundDemoScenario,
} from "@/lib/mockData";

export default function Home() {
  const [workflow, setWorkflow] = useState<WorkflowKey>("refund");
  const [knowledgeText, setKnowledgeText] = useState("");
  const [generatedSkill, setGeneratedSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [knowledgeError, setKnowledgeError] = useState<string | null>(null);

  const [scenarioText, setScenarioText] = useState("");
  const [decision, setDecision] = useState<ScenarioDecision | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [scenarioError, setScenarioError] = useState<string | null>(null);

  const handleWorkflowChange = (value: WorkflowKey) => {
    setWorkflow(value);
    setGeneratedSkill("");
    setDecision(null);
  };

  const handleKnowledgeChange = (value: string) => {
    setKnowledgeText(value);
    if (knowledgeError) setKnowledgeError(null);
  };

  const handleScenarioChange = (value: string) => {
    setScenarioText(value);
    if (scenarioError) setScenarioError(null);
  };

  const handleGenerate = () => {
    if (!knowledgeText.trim()) {
      setKnowledgeError(
        "Please paste some company knowledge before generating a skill file."
      );
      return;
    }
    setKnowledgeError(null);
    setIsGenerating(true);
    setDecision(null);
    window.setTimeout(() => {
      setGeneratedSkill(generateSkillFile(knowledgeText, workflow));
      setIsGenerating(false);
    }, 900);
  };

  const handleRun = () => {
    if (!generatedSkill) {
      setScenarioError("Generate a skill file first, then test it on a scenario.");
      return;
    }
    if (!scenarioText.trim()) {
      setScenarioError("Please enter a scenario to test the skill against.");
      return;
    }
    setScenarioError(null);
    setIsRunning(true);
    window.setTimeout(() => {
      setDecision(runSkillOnScenario(generatedSkill, scenarioText, workflow));
      setIsRunning(false);
    }, 800);
  };

  const handleLoadRefundDemo = () => {
    setWorkflow("refund");
    setKnowledgeText(refundDemoKnowledge);
    setScenarioText(refundDemoScenario);
    setGeneratedSkill("");
    setDecision(null);
    setKnowledgeError(null);
    setScenarioError(null);
  };

  return (
    <main>
      <Hero onLoadDemo={handleLoadRefundDemo} />
      <StepsSection />
      <WorkspaceSection
        workflow={workflow}
        onWorkflowChange={handleWorkflowChange}
        knowledgeText={knowledgeText}
        onKnowledgeChange={handleKnowledgeChange}
        generatedSkill={generatedSkill}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        error={knowledgeError}
      />
      <ScenarioSection
        workflow={workflow}
        scenarioText={scenarioText}
        onScenarioChange={handleScenarioChange}
        decision={decision}
        isRunning={isRunning}
        onRun={handleRun}
        hasSkill={Boolean(generatedSkill)}
        error={scenarioError}
      />
      <WhySection />

      <footer className="border-t border-white/5 px-6 py-10 text-center text-xs text-slate-600">
        SkillBrain — hackathon demo. All generation shown here is simulated client-side.
      </footer>
    </main>
  );
}
