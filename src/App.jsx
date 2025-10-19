import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Volume2, VolumeX } from "lucide-react";
import CrisisStage from "./components/CrisisStage";
import TrinityStage from "./components/TrinityStage";

const createSound = (frequency, duration, gain = 0.1) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.3, now + duration);
    gainNode.gain.setValueAtTime(gain, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {}
};

// ========================================
// Stage 1: Crisis
// ========================================

// ========================================
// Stage 2: Trinity
// ========================================

// ========================================
// Stage 3: Taxonomy with enhanced stars
// ========================================
const TaxonomyStage = ({ onComplete }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showTools, setShowTools] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0003, 1);
        if (newProgress === 1) {
          setTimeout(() => onComplete(), 1500);
        }
        return newProgress;
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [onComplete]);

  const genres = [
    {
      id: "algorithm",
      name: "متن به‌مثابۀ الگوریتم",
      desc: "معنا در خود الگوریتم نهفته است. هر خط، هر کلمه، عملیات منطقی.",
      detail:
        "فرم خود محتوا است. عروض‌الگوریتمی، کاهش‌پذیری، تکرار و تودرتویی. معنا در ساختار محاسباتی متولد می‌شود.",
      example: "بلبل‌زبان",
      pos: { x: 15, y: 20 },
      color: "#FF6B6B",
    },
    {
      id: "labyrinth",
      name: "متن به‌مثابۀ هزارتو",
      desc: "خواننده میان راه‌های متعدد و انشعابات گم می‌شود.",
      detail:
        "هر انتخاب به جهان‌های متفاوت منتهی می‌شود. روایت‌های غیرخطی. خواننده در فضای داخلی متن سرگردان است.",
      example: "روایت‌های شاخه‌ای",
      pos: { x: 70, y: 25 },
      color: "#4ECDC4",
    },
    {
      id: "worldplay",
      name: "متن به‌مثابۀ جهان-بازی",
      desc: "قواعن پنهان و سیستم‌های ریاضیاتی برای کشف.",
      detail:
        "معماهای منطقی، کدهای مخفی، پازل‌های درون‌مایه. خواننده باید آن‌ها را حل کند تا معنا را دستیابی کند.",
      example: "41148 و فرار بزرگ",
      pos: { x: 50, y: 45 },
      color: "#95E1D3",
    },
    {
      id: "performance",
      name: "متن به‌مثابۀ اجرا",
      desc: "نمایش‌پردازی در زمان واقعی، متنی که خود را نمایش می‌دهد.",
      detail: "انیمیشن‌های پویا، صوت‌های متناسب، واکنش لحظه‌ای. متن به یک رویداد زنده تبدیل می‌شود.",
      example: "آثار تعاملی پویا",
      pos: { x: 25, y: 65 },
      color: "#F38181",
    },
    {
      id: "collective",
      name: "متن به‌مثابۀ مشارکت جمعی",
      desc: "خواننده‌ها در ساختن داستان شریک‌اند.",
      detail: "هر مشارکت بخشی از اثر می‌شود. فرافکنی جمعی. متن یک فضای اجتماعی است، نه یک محصول انفرادی.",
      example: "نوشتارهای اجتماعی",
      pos: { x: 75, y: 70 },
      color: "#AA96DA",
    },
    {
      id: "geography",
      name: "متن به‌مثابۀ جغرافیا",
      desc: "فضایی سه‌بعدی برای پیمایش و کاوش.",
      detail: "ناوبری، نقشه‌کشی مکان‌ها، سرگردانی معنی‌خواه. خواننده در فضای سه‌بعدی متن حرکت می‌کند.",
      example: "دنیاهای سه‌بعدی",
      pos: { x: 15, y: 80 },
      color: "#FCBAD3",
    },
    {
      id: "embodied",
      name: "متن به‌مثابۀ فضای بدنمند",
      desc: "بدن خواننده به عنوان ابزار خواندن.",
      detail: "واقعیت مجازی، حس‌های فیزیکی، حضور بدن‌شده. خواندن یک تجربهٔ کاملاً بدنی و فیزیکی است.",
      example: "هفت‌خوان",
      pos: { x: 60, y: 85 },
      color: "#A8E6CF",
    },
  ];

  const starletters = "ابجدهوزحطیکلمنسعفصقرشتثخذضظغ";

  return (
    <div className="fixed inset-0 bg-black overflow-hidden" dir="rtl">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="absolute inset-0">
        {[...Array(300)].map((_, i) => {
          const isLetter = i % 3 === 0;
          const content = isLetter ? starletters[Math.floor(Math.random() * starletters.length)] : "•";

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: isLetter ? `${8 + Math.random() * 18}px` : `${1 + Math.random() * 2.5}px`,
                color: Math.random() > 0.55 ? "#00F5D4" : "#fff",
                opacity: 0.08 + Math.random() * 0.75,
                fontWeight: isLetter ? "700" : "normal",
                animation: `twinkle ${2 + Math.random() * 5}s infinite`,
                animationDelay: `${Math.random() * 3}s`,
                textShadow: Math.random() > 0.75 ? "0 0 15px currentColor" : "none",
                filter: isLetter ? "drop-shadow(0 0 2px rgba(0, 245, 212, 0.3))" : "none",
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="relative w-full h-full">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="absolute cursor-pointer group transition-all"
            style={{ left: `${genre.pos.x}%`, top: `${genre.pos.y}%` }}
          >
            <button
              onClick={() => setSelectedGenre(selectedGenre?.id === genre.id ? null : genre)}
              className="relative focus:outline-none"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: genre.color,
                borderRadius: "50%",
                boxShadow: `0 0 40px ${genre.color}, 0 0 60px ${genre.color}88, inset 0 0 20px rgba(255,255,255,0.5)`,
                border: "2px solid white",
                transition: "all 0.3s",
                transform: selectedGenre?.id === genre.id ? "scale(3)" : "scale(1)",
              }}
            />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <div className="text-cyan-400 text-xs font-bold bg-black/95 px-3 py-1 rounded border border-cyan-400/50">
                {genre.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-8 left-8">
        <button
          onClick={() => setShowTools(!showTools)}
          className="px-6 py-3 border-2 border-cyan-400 bg-black/80 hover:bg-cyan-400/10 transition-all text-cyan-400 font-bold text-sm"
        >
          🧰 جعبه‌ابزار ({showTools ? "−" : "+"})
        </button>

        {showTools && (
          <div className="absolute top-16 left-0 p-6 bg-black/95 border border-cyan-400 max-w-xs mt-2 z-10">
            <div className="text-cyan-400 text-xs font-bold mb-4 tracking-wider">شگردهای زیبایی‌شناختی</div>
            <div className="space-y-3">
              {[
                { name: "رابط کاربری", desc: "طراحی تعاملات، دکمه‌ها، و فضای کاربری" },
                { name: "طراحی فضایی", desc: "سازماندهی عناصر بصری و ساختار دیداری" },
                { name: "توالی زمانی", desc: "ریتم و پیش‌رفت و تعاقب روایی" },
                { name: "چندرسانگی", desc: "ترکیب متن، صورت، صدا و تصویر" },
                { name: "زیرساخت رویه‌ای", desc: "کد و منطق و الگوریتم زیرین" },
              ].map((tech, i) => (
                <div key={i} className="border-r-2 border-cyan-400 pr-3 py-2">
                  <div className="text-white text-sm font-bold">{tech.name}</div>
                  <div className="text-gray-400 text-xs">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedGenre && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-8 bg-gradient-to-b from-black/95 to-black border-2 max-w-2xl rounded-lg"
          style={{ borderColor: selectedGenre.color }}
        >
          <div className="mb-4">
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: selectedGenre.color }}>
              GENRE_{selectedGenre.id.toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{selectedGenre.name}</h2>
          </div>

          <p className="text-gray-300 mb-3 text-sm">{selectedGenre.desc}</p>
          <p className="text-gray-400 mb-4 text-xs">{selectedGenre.detail}</p>

          <div className="mb-4 p-3 bg-black/50 border-r-2" style={{ borderColor: selectedGenre.color }}>
            <span className="text-gray-500 text-xs font-bold">نمونه: </span>
            <span className="text-cyan-400 text-sm">{selectedGenre.example}</span>
          </div>

          <button
            onClick={() => setSelectedGenre(null)}
            className="text-gray-500 hover:text-cyan-400 text-xs transition-colors font-bold"
          >
            بستن [ESC]
          </button>
        </div>
      )}

      {scrollProgress < 0.9 && (
        <div className="absolute top-8 right-8 text-gray-600 text-xs font-bold">
          [{Math.round(scrollProgress * 100)}%] ادامه
        </div>
      )}
    </div>
  );
};

// ========================================
// Stage 4: Works Gallery
// ========================================
const WorksGallery = ({ onComplete }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0003, 1);
        if (newProgress === 1) {
          setTimeout(() => onComplete(), 1500);
        }
        return newProgress;
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [onComplete]);

  const works = [
    {
      id: "belbel",
      title: "بلبل‌زبان",
      subtitle: "متن به‌مثابۀ الگوریتم",
      year: "۱۴۰۱",
      author: "محسن کیاراسته",
      desc: "ترجمهٔ الگوریتمیک عروض فارسی. اولین تلاش برای تبدیل پیچیدهٔ‌ترین چالش شعر کلاسیک به منطق محاسباتی.",
      analysis:
        "ارزش این اثر نه در شعرهای ایجادشده، بلکه در معماری رویه‌ایش نهفته است. الگوریتم خود متن است.",
      color: "#FF6B6B",
    },
    {
      id: "tarikkhane",
      title: "تاریک‌خانۀ ماریا مینورسکی",
      subtitle: "بدن شکننده و بحران بایگانی",
      year: "۱۳۸۶",
      author: "سهند سریری",
      desc: "یک فسیل دیجیتال. اثری که دیگر در دسترس نیست و تنها از طریق شهادت و اسناد پیرامتنی می‌توانیم آن را بازسازی کنیم.",
      analysis:
        "سرنوشت این اثر، ضرورت سیاست‌های بایگانی دیجیتال را به یک واقعیت ملموس تبدیل می‌کند. متن ناپایدار است.",
      color: "#8B0000",
    },
    {
      id: "escape",
      title: "۴۱۱۴۸ و فرار بزرگ",
      subtitle: "متن به‌مثابۀ جهان-بازی",
      year: "۱۴۰۰-۱۴۰۲",
      author: "کمال سکون و سهند سریری",
      desc: "معمای ریاضیاتی و استراتژیک. خواننده تنها از طریق حل معماها و درگیری با قواعن پنهان می‌تواند به هدف برسد.",
      analysis: "لذت ادبی از حل و کاوش سیستم‌های منطقی نشئت می‌گیرد. متن یک بازی است.",
      color: "#4ECDC4",
    },
    {
      id: "haft",
      title: "هفت‌خوان",
      subtitle: "فضای بدنمند و واقعیت مجازی",
      year: "۱۴۰۳",
      author: "پژوهشگاه ادب پیشرو",
      desc: "تجربهٔ غوطه‌ورانه در واقعیت مجازی. خط‌های شعر عرفانی به فضایی تبدیل شده‌اند که بدن کاربر در آن حاضر است.",
      analysis: "مرز میان بدن فیزیکی و جهان متن محو می‌شود. خواندن یک تجربهٔ بدن‌شده است.",
      color: "#A8E6CF",
    },
    {
      id: "kamal",
      title: "کمال سکون",
      subtitle: "ترجمهٔ شعر عرفانی به تعامل فیزیکی",
      year: "۱۴۰۳-۱۴۰۴",
      author: "عاطفه (ایدهٔ‌پردازی)",
      desc: "یک شعر عرفانی کلاسیک از طریق فیزیک محاسباتی و تعامل بدنمند کاربر به یک تجربهٔ اجرایی تبدیل شده‌است.",
      analysis: "مفاهیم انتزاعی شعر از طریق الگوریتم به زیبایی‌شناسی رویه‌ای تبدیل می‌شوند.",
      color: "#FFD700",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black overflow-auto" dir="rtl">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
      `}</style>

      <div className="min-h-screen p-12 flex flex-col">
        <h1 className="text-3xl text-center text-cyan-400 mb-4 font-bold tracking-wider">میدان عمل</h1>
        <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
          کالبدشکافی پنج نمونهٔ برجستهٔ کُدبیات فارسی
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          {works.map((work) => (
            <div
              key={work.id}
              className="relative group cursor-pointer overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl"
              style={{
                borderColor: work.color,
                minHeight: "320px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={() => setSelectedWork(work)}
            >
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: work.color }}
              />

              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold tracking-widest mb-3" style={{ color: work.color }}>
                    {work.subtitle.toUpperCase()}
                  </div>
                  <h3 className="text-3xl text-white mb-2 font-bold">{work.title}</h3>
                  <div className="flex gap-4 text-xs text-gray-500 mb-6">
                    <span>{work.year}</span>
                    <span>•</span>
                    <span>{work.author}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{work.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t" style={{ borderColor: `${work.color}33` }}>
                  <div className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                    کلیک کنید برای تحلیل کامل →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={onComplete}
            className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-cyan-300 text-black text-lg font-bold hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
          >
            ادامه به ساختن پل →
          </button>
        </div>
      </div>

      {selectedWork && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-8 backdrop-blur-sm"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="max-w-3xl w-full p-12 border-2 relative"
            style={{ borderColor: selectedWork.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-5" style={{ backgroundColor: selectedWork.color }} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div
                    className="text-xs font-bold tracking-widest mb-2"
                    style={{ color: selectedWork.color }}
                  >
                    {selectedWork.subtitle}
                  </div>
                  <h2 className="text-4xl text-white font-bold">{selectedWork.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="text-gray-500 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="mb-8 pb-8 border-b" style={{ borderColor: `${selectedWork.color}33` }}>
                <div className="text-gray-400 mb-4">
                  <span className="text-xs font-bold">نویسندگی: </span>
                  <span className="text-white">{selectedWork.author}</span>
                  <span className="mx-2">|</span>
                  <span className="text-xs font-bold">سال: </span>
                  <span className="text-white">{selectedWork.year}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 mb-3">توضیح:</h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">{selectedWork.desc}</p>
              </div>

              <div
                className="p-6 border-r-4 mb-8"
                style={{ borderColor: selectedWork.color, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <h3 className="text-sm font-bold mb-3" style={{ color: selectedWork.color }}>
                  تحلیل:
                </h3>
                <p className="text-gray-300 leading-relaxed">{selectedWork.analysis}</p>
              </div>

              <button
                onClick={() => setSelectedWork(null)}
                className="text-gray-500 hover:text-cyan-400 font-bold text-sm transition-colors"
              >
                بستن [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {scrollProgress < 0.9 && (
        <div className="fixed bottom-8 right-8 text-gray-600 text-xs font-bold">
          [{Math.round(scrollProgress * 100)}%]
        </div>
      )}
    </div>
  );
};

// ========================================
// Stage 5: Bridge Building
// ========================================
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
    { text: "دگرگونی\nهستی‌شناختی", x: 10 },
    { text: "زبان\nمشترک", x: 25 },
    { text: "جعبه‌ابزار\nتحلیلی", x: 40 },
    { text: "گونه‌شناسی\nکارکردی", x: 55 },
    { text: "زیبایی‌شناسی\nمحاسباتی", x: 70 },
    { text: "نقد\nبومی", x: 85 },
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
                    <foreignObject x={x - 40} y="210" width="80" height="80">
                      <div
                        style={{
                          color: "#00F5D4",
                          fontSize: "11px",
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
          <div className="text-amber-700 text-sm font-bold opacity-70 mb-2">قدیم</div>
          <div className="text-amber-600 text-lg font-bold">
            سنت
            <br />
            نقد ادبی
            <br />
            فارسی
          </div>
        </div>

        <div className="absolute right-20 top-1/2 -translate-y-1/2 text-right">
          <div className="text-cyan-400 text-sm font-bold opacity-70 mb-2">جدید</div>
          <div className="text-cyan-300 text-lg font-bold">
            زیست‌بوم
            <br />
            دیجیتال
            <br />
            کُدبیات
          </div>
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

// ========================================
// Stage 6: Acknowledgments
// ========================================
const AcknowledgmentsStage = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-auto"
      dir="rtl"
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
      `}</style>

      <div className="min-h-screen p-12 flex items-center justify-center">
        <div
          className="max-w-2xl w-full"
          style={{
            opacity: isTransitioning ? 1 : 0,
            transform: isTransitioning ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <div className="bg-white/90 p-12 rounded-lg shadow-2xl border border-amber-200">
            <h2 className="text-3xl text-amber-900 mb-8 text-center border-b-2 border-amber-300 pb-6 font-bold">
              و سخن آخر...
            </h2>

            <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
              <p>
                نخست، از استاد گران‌قدر و فرزانه‌ام، دکتر محمود فتوحی رودمعجنی، عمیقاً سپاس‌گزاری می‌کنم. در
                مسیری که به دلیل نوپابودن، سرشار از تردید و ناشناخته‌ها بود، بزرگترین موهبت حضور ایشان برای
                من، نه صرفاً راهنمایی، که «باور» بود.
              </p>

              <p>
                همچنین، از استاد مشاور ارجمندم، دکتر احمد هاشمی، صمیمانه سپاسگزارم. ایشان به‌ویژه آن‌گاه‌ که
                بحث به افق‌های نوظهور هوش مصنوعی رسید، با دانش عمیق و راهنمایی‌های دقیق خود، به غنای نظری
                رساله افزودند.
              </p>

              <p>
                این راه، بی‌پناهِ مهر و شکیباییِ خانواده‌ام به سرانجام نمی‌رسید. یاد پدر و برادرم همیشه در
                قلبم زنده است.
              </p>

              <p className="text-lg text-amber-900 font-bold border-r-4 border-amber-400 pr-6 py-4 bg-amber-50">
                و در پایان، سخن از هم‌سفر و هم‌فکر این سال‌ها، مرتضای عزیزم، حدیث دیگری‌ست. این رساله را به او
                تقدیم می‌کنم؛ به او که بیش از همسر و به‌اندازه عشق، رفیق است.
              </p>

              <p className="text-center mt-12 text-amber-700 italic text-xl">– عاطفه –</p>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm">۲۵ مهر ۱۴۰۳</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
