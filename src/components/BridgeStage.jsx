// ========================================
// Stage 5: Bridge Building
// ========================================

import { useEffect, useState } from "react";

const BridgeStage = ({ onComplete }) => {
  const [bridgeProgress, setBridgeProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setBridgeProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0004, 1);
        return newProgress;
      });
      setScrollProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0003, 1);
        return newProgress;
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    if (bridgeProgress >= 1) {
      setTimeout(() => onComplete(), 2500);
    }
  }, [bridgeProgress, onComplete]);

  const milestones = [
    { text: "پیشنهاد «کُدبیات» \nبه‌مثابه یک ابرانگارهٔ جدید\n", x: 10 },
    { text: "معرفی «مادیت اجرایی»\n به‌مثابه\n جوهر امر کُدبی", x: 25 },
    { text: "معرفی «بلاغت رویه‌ای»\n برای تحلیل معنا\n در فرایند", x: 40 },
    { text: "محوریت‌بخشی به «کنش سخت‌پیما»\n در تولید معنا", x: 55 },
    { text: "صورت‌بندی شگردهای\n بیانی پنج‌گانۀ کدبیات", x: 70 },
    { text: "تدوین گونه‌شناسی\n بر اساس \n«استعارهٔ کارکردی متن»", x: 85 },
  ];

  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
      dir="rtl"
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { r: 12; opacity: 1; }
          50% { r: 16; opacity: 0.6; }
        }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-amber-900/30 via-transparent to-transparent" />
        <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-cyan-900/30 via-transparent to-transparent" />

        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
          <svg width="100%" height="300" className="absolute" viewBox="0 0 1000 300">
            <line
              x1="50"
              y1="150"
              x2={50 + bridgeProgress * 900}
              y2="150"
              stroke="#00F5D4"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 20px #00F5D4)" }}
            />

            {milestones.map((milestone, i) => {
              const milestoneProgress = (i + 1) / milestones.length;
              if (bridgeProgress >= milestoneProgress * 0.95) {
                const x = 50 + milestoneProgress * 900;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy="150"
                      r="12"
                      fill="#00F5D4"
                      style={{
                        filter: "drop-shadow(0 0 15px #00F5D4)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <line x1={x} y1="150" x2={x} y2="200" stroke="#00F5D4" strokeWidth="2" opacity="0.5" />
                    <foreignObject x={x - 70} y="210" width="140" height="180">
                      <div
                        style={{
                          color: "#00F5D4",
                          fontSize: "18px",
                          fontFamily: "'Vazirmatn', sans-serif",
                          textAlign: "center",
                          lineHeight: "1.3",
                          fontWeight: "bold",
                          animation: "fadeInUp 0.6s ease-out",
                        }}
                      >
                        {milestone.text}
                      </div>
                    </foreignObject>
                  </g>
                );
              }
              return null;
            })}
          </svg>
        </div>

        <div className="absolute left-20 top-1/2 -translate-y-1/2 text-left">
          <div className="text-amber-700 text-sm font-bold opacity-70 mb-2">ادبیات مکتوب</div>
          <div className="text-amber-600 text-lg font-bold">سنت نقد ادبی فارسی</div>
        </div>

        <div className="absolute right-20 top-1/2 -translate-y-1/2 text-right">
          <div className="text-cyan-400 text-sm font-bold opacity-70 mb-2">ادبیات الکترونیک</div>
          <div className="text-cyan-300 text-lg font-bold">نقد کُدَبی فارسی</div>
        </div>
      </div>

      {scrollProgress < 0.9 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="text-gray-600 text-sm font-bold mb-2">اسکرول کنید برای ساختن پل</div>
          <div className="text-cyan-400/50 text-xs font-bold">[{Math.round(bridgeProgress * 100)}%]</div>
        </div>
      )}

      {bridgeProgress >= 1 && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-pulse pointer-events-none">
          <div className="text-center">
            <div className="text-3xl text-cyan-400 font-bold mb-4">پل ساخته شد</div>
            <div className="text-gray-400 text-lg">مسیر برای تحلیل و کاوش تاریک‌تر بازگشایی شد...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeStage;
