import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const challengeCategories = [
  {
    category: "Understand Risk",
    cards: [
      { src: "/Challenge 1.png", number: "Challenge Card 1", name: "Turning fragmented border signals into a single operational risk picture" },
      { src: "/Challenge 2.png", number: "Challenge Card 2", name: "Reducing false positives without increasing misses" },
      { src: "/Challenge 3.png", number: "Challenge Card 3", name: "Making scan images actionable at scale" },
      { src: "/Challenge 4.png", number: "Challenge Card 4", name: "Converting 'rules and circulars' into decision-ready knowledge" },
    ],
  },
  {
    category: "Investigate & Act",
    cards: [
      { src: "/Challenge 5.png", number: "Challenge Card 5", name: "Detecting trade-based fraud patterns beyond single shipments" },
      { src: "/Challenge 6.png", number: "Challenge Card 6", name: "Building legally defensible, explainable targeting recommendations" },
      { src: "/Challenge 7.png", number: "Challenge Card 7", name: "Moving from 'alerts' to investigation-ready evidence packs" },
      { src: "/Challenge 8.png", number: "Challenge Card 8", name: "Rapidly updating risk parameters as modus operandi evolves" },
      { src: "/Challenge 9.png", number: "Challenge Card 9", name: "Making passenger targeting effective without harming legitimate travel" },
    ],
  },
  {
    category: "Productivity & Ops. Flow",
    cards: [
      { src: "/Challenge 10.png", number: "Challenge Card 1", name: "Prioritising inspections across ports and modalities under limited capacity" },
      { src: "/Challenge 11.png", number: "Challenge Card 2", name: "Achieving interoperable data foundations without a 'rip and replace'" },
      { src: "/Challenge 12.png", number: "Challenge Card 3", name: "Scaling AI safely in a state enforcement environment" },
      { src: "/Challenge 13.png", number: "Challenge Card 4", name: "Improving targeting outcomes through structured feedback loops" },
    ],
  },
];

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = useCallback(async (e: React.MouseEvent, name: string, index: number) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>
        </div>
      </header>

      {/* Categorised cards */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex items-center justify-center">
        <div className="w-full max-w-[1600px] space-y-8">
          {challengeCategories.map((group) => (
            <div key={group.category}>
              <h2 className="text-lg font-bold text-foreground mb-3 px-1">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.cards.map((challenge, index) => {
                  const globalIndex = challengeCategories
                    .slice(0, challengeCategories.indexOf(group))
                    .reduce((sum, g) => sum + g.cards.length, 0) + index;
                  return (
                    <div
                      key={globalIndex}
                      className="rounded-xl border border-border bg-card text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 relative p-5 cursor-pointer"
                      onClick={() => setSelectedImg(challenge.src)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className={`absolute top-3 right-3 h-7 text-xs ${copiedIndex === globalIndex ? "text-green-600 border-green-300" : ""}`}
                        onClick={(e) => handleCopy(e, challenge.name, globalIndex)}
                      >
                        {copiedIndex === globalIndex ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </>
                        )}
                      </Button>
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide pr-16">
                        {challenge.number}
                      </p>
                      <p className="text-sm font-semibold text-primary font-display leading-snug mt-1.5">
                        {challenge.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image overlay */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Challenge card"
            className="max-w-[75vw] max-h-[75vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeCards;
