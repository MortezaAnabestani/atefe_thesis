import { useState } from "react";
import CrisisStage from "./components/CrisisStage";
import TrinityStage from "./components/TrinityStage";
import TaxonomyStage from "./components/TaxonomyStage";
import WorksGallery from "./components/WorksGallery";
import BridgeStage from "./components/BridgeStage";
import AcknowledgmentsStage from "./components/AcknowledgmentsStage";

// ========================================
// Main Application
// ========================================
export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const stages = [
    <CrisisStage key="crisis" onComplete={() => setCurrentStage(1)} />,
    <TrinityStage key="trinity" onComplete={() => setCurrentStage(2)} />,
    <TaxonomyStage key="taxonomy" onComplete={() => setCurrentStage(3)} />,
    <WorksGallery key="works" onComplete={() => setCurrentStage(4)} />,
    <BridgeStage key="bridge" onComplete={() => setCurrentStage(5)} />,
    <AcknowledgmentsStage key="ack" />,
  ];

  const stageNames = ["بحران ابرانگاره", "سه‌گانه مقدس", "نقشهٔ راه", "میدان عمل", "ساختن پل", "سپاس"];

  return (
    <div className="w-full h-screen overflow-hidden bg-black" dir="rtl">
      {stages[currentStage]}

      <div className="fixed top-4 right-4 z-50 flex gap-3 items-center">
        <button
          onClick={() => setShowNav(!showNav)}
          className="px-4 py-2 text-xs font-bold text-cyan-400 border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
        >
          {showNav ? "−" : "+"}
        </button>

        {showNav && (
          <div className="flex gap-2 bg-black/80 px-4 py-3 border border-cyan-400/30 rounded">
            {[...Array(6)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStage(i)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all"
                style={{
                  borderBottom: i === currentStage ? "2px solid #00F5D4" : "none",
                  color: i === currentStage ? "#00F5D4" : i < currentStage ? "#888" : "#444",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="text-xs font-bold text-gray-600">
          <span style={{ color: "#00F5D4" }}>{stageNames[currentStage]}</span>
          <span className="text-gray-700"> / {currentStage + 1} از 6</span>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 text-xs font-bold text-gray-700">
        [اسکرول یا صفحه‌پایین برای ادامه]
      </div>
    </div>
  );
}
