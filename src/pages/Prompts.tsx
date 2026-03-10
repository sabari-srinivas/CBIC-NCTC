import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import doubleDiamondGeneral from "@/assets/double_diamond_general.jpg";
import doubleDiamondAI from "@/assets/double_diamond_ai.jpeg";

const prompts = [
  {
    label: "LEARN",
    color: "border-l-primary",
    text: `Here is a deep research report for the topic we are going to discuss today. No action required. Use this report as additional context for your responses apart from web search and other resources.`,
  },
  {
    label: "WIDEN",
    color: "border-l-accent",
    text: `Act as a research aide for [selected challenge]. List key personas, top pains, current workarounds, and success metrics. Return 5 insights & 3 risks tailored to this challenge context.`,
  },
  {
    label: "DIAGNOSE",
    color: "border-l-primary",
    text: `Let's pick the [top-pain-point] for this challenge. For this pain, run a Five Whys. Propose 3 root-cause hypotheses and the disproof evidence for each. Specify the minimum data cut & owners to pull. Output a root-cause map, test plan, and privacy constraints.`,
  },
  {
    label: "IDEATION",
    color: "border-l-accent",
    text: `Generate and Cluster possible AI driven ideas into 3 Options:

1. Process (policy, ways of working),
2. Analytics/ML (forecast, optimise, recommend),
3. AI and Automation (Computer Vision, Retrieval augmented generation/Agentic AI, etc...).

Score each on Impact × Feasibility × Confidence × Time-to-Value. Recommend one pilot with the smallest integration surface and clearest value proof.`,
  },
  {
    label: "BRIEF",
    color: "border-l-primary",
    text: `For the recommended pilot, create a one-page pilot brief including: Target user(s), problem statement, success metrics & baselines, target uplift, key flow (5–7 steps), screens/components, sample UI copy, representative sample data, integration points, and relevant guardrails (GDPR/PCI, domain specific regulation boundaries, bias tests, fallback behaviour)`,
  },
  {
    label: "BUILD",
    color: "border-l-accent",
    text: `You are a product design expert. Using only the brief above, write a single [platform] product requirements prompt that includes: Product name + one liner description (actions, process, capabilities), who it's for, screens + key components, brand colors, main user flow, sample data, concise headlines/CTAs, UI instructions, success metric card, constraints (no PII). Return the [platform] prompt only.`,
  },
];

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            AI Tools + Rapid Builders — Double Diamond Prompts
          </h1>
        </div>
      </header>

      {/* Top: Double Diamond Images */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border overflow-hidden bg-background">
              <div className="px-3 py-2 bg-muted border-b border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Revamped Double Diamond — General Framework
                </p>
              </div>
              <img
                src={doubleDiamondGeneral}
                alt="Revamped Double Diamond general framework showing Discover, Define, Develop, Deliver phases"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-background">
              <div className="px-3 py-2 bg-muted border-b border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  AI Tools + Rapid Builders — From Abstract Ideas to Working Demos in Days
                </p>
              </div>
              <img
                src={doubleDiamondAI}
                alt="AI Tools + Rapid Builders double diamond: Sense, Decide, Frame, Build phases compressed to 4 hours - 4 days"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Prompts */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {prompts.map((prompt, index) => (
              <div
                key={prompt.label}
                className={`rounded-lg border border-border bg-card p-5 border-l-4 ${prompt.color} animate-fade-in`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-primary font-display">
                    {prompt.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(prompt.text, index)}
                    className={copiedIndex === index ? "text-copy-success" : "text-muted-foreground"}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                  {prompt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
