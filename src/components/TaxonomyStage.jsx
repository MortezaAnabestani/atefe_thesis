import { useState, useEffect } from "react";

const TaxonomyStage = ({ onComplete }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showTools, setShowTools] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0003, 1);
        if (newProgress === 1) {
          setTimeout(() => onComplete?.(), 1500);
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
      desc: "معنا در الگوریتم نهفته است. بنلادمتن و زیرساخت رویه‌ای.",
      detail: "",
      example: "بلبل‌زبان",
      pos: { x: 15, y: 20 },
      color: "#FF6B6B",
    },
    {
      id: "labyrinth",
      name: "متن به‌مثابۀ هزارتو",
      desc: "معنا در پیمایش فرامتنی نهفته است",
      detail: "",
      example: "تاریکخانۀ مینورسکی",
      pos: { x: 70, y: 25 },
      color: "#4ECDC4",
    },
    {
      id: "worldplay",
      name: "متن به‌مثابۀ جهان-بازی",
      desc: "معنا در زیرساخت رویه‌ای نهفته است و با تعامل کشف می‌شود",
      detail: "",
      example: "41148 و فرار بزرگ",
      pos: { x: 50, y: 45 },
      color: "#95E1D3",
    },
    {
      id: "performance",
      name: "متن به‌مثابۀ اجرا",
      desc: "معنا در ابژۀ مادی کلمات نهفته است و باید آن به حرکت درآورد",
      detail: "",
      example: "آثار تعاملی پویا",
      pos: { x: 25, y: 65 },
      color: "#F38181",
    },
    {
      id: "collective",
      name: "متن به‌مثابۀ مشارکت جمعی",
      desc: "معنا در یک خیزش جمعی نهفته است",
      detail: "",
      example: "نوشتارهای شبکه",
      pos: { x: 75, y: 70 },
      color: "#AA96DA",
    },
    {
      id: "geography",
      name: "متن به‌مثابۀ جغرافیای حضور",
      desc: "معنا در مکان به‌خصوصی نهفته است و باید به سراغش رفت",
      detail: "",
      example: "دنیاهای سه‌بعدی",
      pos: { x: 15, y: 80 },
      color: "#FCBAD3",
    },
    {
      id: "embodied",
      name: "متن به‌مثابۀ فضای بدنمند",
      desc: "معنا در ابژۀ مادی کلمات نهفته است و باید در تجربه‌ای بدن‌مند و غوطه‌ورانه آن را لمس کرد",
      detail: "",
      example: "هفت‌خوان",
      pos: { x: 60, y: 85 },
      color: "#A8E6CF",
    },
  ];

  const starletters = "ا0ب1ج1د0ه1و1ز0ح1ط0ی0ک0لم0ن1سع0فص1قر0شت1ث1خ1ذ0ض1ظ0غ";

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
                width: "48px",
                height: "48px",
                backgroundColor: genre.color,
                borderRadius: "50%",
                boxShadow: `0 0 40px ${genre.color}, 0 0 60px ${genre.color}88, inset 0 0 20px rgba(255,255,255,0.5)`,
                border: "2px solid white",
                transition: "all 0.3s",
                transform: selectedGenre?.id === genre.id ? "scale(3)" : "scale(1)",
              }}
            />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <div className="text-cyan-400 text-2xl font-bold bg-black/95 px-4 py-2 rounded border border-cyan-400/50">
                {genre.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-6 items-center">
        <button
          onClick={() =>
            setSelectedGenre(selectedGenre?.id === "codebias-def" ? null : { id: "codebias-def" })
          }
          className="relative px-6 py-3 text-purple-400 font-light text-2xl tracking-widest hover:tracking-normal transition-all rounded"
          style={{
            textShadow: "0 0 20px rgba(192, 132, 250, 0.4)",
            letterSpacing: "3px",
            background: "rgba(192, 132, 250, 0.1)",
            border: "1px solid rgba(192, 132, 250, 0.3)",
            boxShadow: "0 0 20px rgba(192, 132, 250, 0.15)",
          }}
        >
          تعریف کدبیات
          <span
            className="inline-block ml-3"
            style={{ opacity: selectedGenre?.id === "codebias-def" ? 1 : 0.6 }}
          >
            {selectedGenre?.id === "codebias-def" ? "▼" : "▲"}
          </span>
        </button>

        <button
          onClick={() => setShowTools(!showTools)}
          className="relative px-6 py-3 text-cyan-400 font-light text-2xl tracking-widest hover:tracking-normal transition-all rounded"
          style={{
            textShadow: "0 0 20px rgba(0, 245, 212, 0.4)",
            letterSpacing: "3px",
            background: "rgba(0, 245, 212, 0.1)",
            border: "1px solid rgba(0, 245, 212, 0.3)",
            boxShadow: "0 0 20px rgba(0, 245, 212, 0.15)",
          }}
        >
          جعبه ابزار
          <span
            className="inline-block ml-3"
            style={{
              opacity: showTools ? 1 : 0.6,
            }}
          >
            {showTools ? "▼" : "▲"}
          </span>
        </button>

        <button
          onClick={() => setSelectedGenre(selectedGenre?.id === "ai-context" ? null : { id: "ai-context" })}
          className="relative px-6 py-3 text-amber-500 font-light text-2xl tracking-widest hover:tracking-normal transition-all rounded"
          style={{
            textShadow: "0 0 20px rgba(255, 157, 92, 0.4)",
            letterSpacing: "3px",
            background: "rgba(255, 157, 92, 0.1)",
            border: "1px solid rgba(255, 157, 92, 0.3)",
            boxShadow: "0 0 20px rgba(255, 157, 92, 0.15)",
          }}
        >
          هوش مصنوعی
          <span
            className="inline-block ml-3"
            style={{ opacity: selectedGenre?.id === "ai-context" ? 1 : 0.6 }}
          >
            {selectedGenre?.id === "ai-context" ? "▼" : "▲"}
          </span>
        </button>
      </div>

      {showTools && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setShowTools(false)}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />
          <div
            className="relative z-10 max-w-6xl w-full p-12 rounded-lg max-h-[35rem] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(0, 245, 212, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 136, 255, 0.06) 0%, transparent 50%),
                rgba(0, 15, 30, 0.9)
              `,
              border: "1px solid rgba(0, 245, 212, 0.2)",
              boxShadow: `
                0 0 40px rgba(0, 245, 212, 0.15),
                inset 0 0 60px rgba(0, 245, 212, 0.03),
                0 0 80px rgba(0, 136, 255, 0.08)
              `,
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="mb-8">
              <div
                className="text-cyan-400 text-2xl mb-6 tracking-widest"
                style={{
                  textShadow: "0 0 15px rgba(0, 245, 212, 0.5)",
                  letterSpacing: "3px",
                }}
              >
                ≋ شگردهای زیبایی‌شناختی ≋
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "رابط کاربری",
                    desc: "طراحی تعاملات و فضای خواندن",
                    visual: "◇ ◆ ◇",
                    details: "دکمه‌ها، منو‌ها و ورودی‌هایی که خواننده را به درون اثر می‌کشانند",
                  },
                  {
                    name: "طراحی فضایی",
                    desc: "سازماندهی بصری و ساختار دیداری",
                    visual: "┌─────┐",
                    details: "موقعیت عناصر، لایه‌بندی، ترکیب‌بندی و هندسه‌ی اثر",
                  },
                  {
                    name: "توالی زمانی",
                    desc: "ریتم و تعاقب روایی",
                    visual: "→ ↓ ↘",
                    details: "سرعت انتقال، تاخیر‌، و پیشرفت روایت در طول زمان",
                  },
                  {
                    name: "چندرسانگی",
                    desc: "ترکیب متن، صوت، صدا و تصویر",
                    visual: "♪ ◌ ▓",
                    details: "تلفیق رسانه‌ها: منطقۀ تبادل",
                  },
                  {
                    name: "زیرساخت رویه‌ای",
                    desc: "کد و الگوریتم و منطق محاسباتی",
                    visual: "{ } ; =",
                    details: "الگوریتم‌های زیرین، منطق محاسباتی و بنلادمتن",
                  },
                ].map((tech, i) => (
                  <div
                    key={i}
                    className="relative pl-6 py-4 transition-all hover:pl-8 hover:scale-105 origin-right group/tech cursor-default"
                    style={{
                      borderLeft: `2px solid rgba(0, 245, 212, ${0.3 + i * 0.1})`,
                      background: "rgba(0, 245, 212, 0.02)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="text-cyan-200 text-2xl group-hover/tech:text-cyan-100 transition-colors"
                        style={{
                          textShadow: "0 0 10px rgba(0, 245, 212, 0.2)",
                        }}
                      >
                        {tech.name}
                      </div>
                      <div
                        className="text-cyan-400 text-xl opacity-0 group-hover/tech:opacity-100 transition-opacity"
                        style={{ textShadow: "0 0 8px rgba(0, 245, 212, 0.3)" }}
                      >
                        {tech.visual}
                      </div>
                    </div>
                    <div className="text-gray-500 text-lg leading-relaxed mb-2">{tech.desc}</div>
                    <div
                      className="text-cyan-600 text-lg opacity-0 group-hover/tech:opacity-100 transition-opacity max-h-0 group-hover/tech:max-h-20 overflow-hidden"
                      style={{ transitionProperty: "opacity, max-height" }}
                    >
                      {tech.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedGenre?.id === "codebias-def" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedGenre(null)}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />
          <div
            className="relative z-10 max-w-6xl w-full p-12 rounded-lg max-h-[35rem] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(168, 230, 207, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(0, 245, 212, 0.08) 0%, transparent 50%),
                rgba(5, 30, 30, 0.9)
              `,
              border: "1px solid rgba(0, 245, 212, 0.25)",
              boxShadow: `
                0 0 50px rgba(0, 245, 212, 0.2),
                inset 0 0 80px rgba(0, 245, 212, 0.05),
                0 0 100px rgba(0, 245, 212, 0.1)
              `,
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="mb-8">
              <div
                className="text-green-600 text-2xl mb-6 tracking-widest"
                style={{
                  textShadow: "0 0 20px rgba(0, 245, 212, 0.6)",
                  letterSpacing: "3px",
                }}
              >
                ◆ تعریف ◆
              </div>
              <h3
                className="text-3xl text-cyan-300 mb-8"
                style={{
                  textShadow: "0 0 15px rgba(0, 245, 212, 0.3)",
                  lineHeight: "2",
                }}
              >
                کدبیات آن نوع ادبیاتی است که:
              </h3>
            </div>

            <div className="space-y-6 mb-8">
              {[
                {
                  icon: "●",
                  text: "بدون زمینۀ محاسباتی و رایانشی امکان تکوین، نمایش و تجربه ندارد،",
                },
                {
                  icon: "●",
                  text: "با چاپ‌شدن، برخی ویژگی‌های هویت‌بخش خود را از دست می‌دهد،",
                },
                {
                  icon: "●",
                  text: "تعاملی و متکی‌بر رابط‌های کاربری دیجیتال است،",
                },
                {
                  icon: "●",
                  text: "سخت‌پیماست و پیمایش اثر، بخشی از تجربۀ ادبی‌ست،",
                },
                {
                  icon: "●",
                  text: "معمولاً چندرسانه‌ای است و سایر رسانه‌ها در خدمت رسانۀ کلام یا قصدی ادبی پیکربندی می‌شوند",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 py-3 transition-all hover:pl-10 group/item"
                  style={{
                    borderLeft: `2px solid rgba(0, 245, 212, ${0.3 + i * 0.12})`,
                    background: "rgba(0, 245, 212, 0.03)",
                  }}
                >
                  <div
                    className="text-cyan-400 text-2xl group-hover/item:text-cyan-200 transition-colors leading-relaxed"
                    style={{
                      textShadow: "0 0 10px rgba(0, 245, 212, 0.2)",
                    }}
                  >
                    <span className="text-green-500 ml-3">{item.icon}</span>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedGenre(null)}
              className="text-green-700 hover:text-green-600 text-2xl transition-colors mt-6 font-bold"
            >
              [بستن]
            </button>
          </div>
        </div>
      )}

      {selectedGenre?.id === "ai-context" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedGenre(null)}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />
          <div
            className="relative z-10 max-w-6xl w-full p-12 rounded-lg max-h-[35rem] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255, 157, 92, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
                rgba(30, 15, 5, 0.9)
              `,
              border: "1px solid rgba(255, 157, 92, 0.25)",
              boxShadow: `
                0 0 50px rgba(255, 157, 92, 0.2),
                inset 0 0 80px rgba(255, 157, 92, 0.05),
                0 0 100px rgba(255, 107, 53, 0.1)
              `,
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="mb-8">
              <div
                className="text-amber-600 text-2xl mb-6 tracking-widest"
                style={{
                  textShadow: "0 0 20px rgba(255, 157, 92, 0.6)",
                  letterSpacing: "3px",
                }}
              >
                ⟡ سطح نوظهور ⟡
              </div>
              <h3
                className="text-3xl text-amber-300 mb-8"
                style={{
                  textShadow: "0 0 15px rgba(255, 157, 92, 0.3)",
                  lineHeight: "1.8",
                }}
              >
                ظهور مدل‌های زبانی بزرگ، تعریف و گونه‌شناسی‌های کدبیات را به چالش می‌کشد
              </h3>
            </div>

            <div className="space-y-7 mb-8">
              {[
                {
                  title: "چالش‌های هستی‌شناختی",
                  text: "خلاقیت، عاملیت، و معنا در فضای تعامل هوش مصنوعی و انسان دوباره تعریف می‌شود",
                },
                {
                  title: "تعامل سه‌گانه",
                  text: "کاربر ↔ کد ↔ هوش مصنوعی. سه بازیگر در یک متن، هریک با عاملیت خود",
                },
                {
                  title: "سازوکارهای راهبری معنا",
                  text: "مؤلفان اکنون با مسائل تازه‌ای دربارۀ هدایت، مقاومت و عاملیت الگوریتم‌های مولد مواجه هستند",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 py-4 transition-all hover:pl-10 group/item"
                  style={{
                    borderLeft: `3px solid rgba(255, 157, 92, ${0.3 + i * 0.15})`,
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    className="text-amber-400 text-2xl mb-3 group-hover/item:text-amber-300 transition-colors"
                    style={{
                      textShadow: "0 0 12px rgba(255, 157, 92, 0.3)",
                    }}
                  >
                    {item.title}
                  </div>
                  <div className="text-gray-400 text-xl leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>

            <div
              className="text-xl text-gray-500 italic border-t border-amber-900/40 pt-6"
              style={{
                textShadow: "0 0 8px rgba(255, 157, 92, 0.1)",
              }}
            >
              با ظهور مدل‌های زبانی بزرگ، ماهیت متن و مؤلف بسیار پیچیده‌تر می‌شود
            </div>

            <button
              onClick={() => setSelectedGenre(null)}
              className="text-amber-700 hover:text-amber-600 text-2xl transition-colors mt-6"
            >
              [بستن]
            </button>
          </div>
        </div>
      )}

      {selectedGenre && selectedGenre.example && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 p-10 bg-gradient-to-b from-black/95 to-black border-2 max-w-3xl rounded-lg"
          style={{ borderColor: selectedGenre.color }}
        >
          <div className="mb-6">
            <div className="text-2xl font-bold tracking-widest mb-3" style={{ color: selectedGenre.color }}>
              GENRE_{selectedGenre.id.toUpperCase()}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{selectedGenre.name}</h2>
          </div>

          <p className="text-gray-300 mb-4 text-2xl">{selectedGenre.desc}</p>
          <p className="text-gray-400 mb-6 text-xl">{selectedGenre.detail}</p>

          <div className="mb-6 p-4 bg-black/50 border-r-2" style={{ borderColor: selectedGenre.color }}>
            <span className="text-gray-500 text-xl font-bold">نمونه: </span>
            <span className="text-cyan-400 text-2xl">{selectedGenre.example}</span>
          </div>

          <button
            onClick={() => setSelectedGenre(null)}
            className="text-gray-500 hover:text-cyan-400 text-2xl transition-colors font-bold"
          >
            بستن [ESC]
          </button>
        </div>
      )}

      {scrollProgress < 0.9 && (
        <div className="absolute top-12 right-12 text-gray-600 text-2xl font-bold">
          [{Math.round(scrollProgress * 100)}%] ادامه
        </div>
      )}
    </div>
  );
};

export default TaxonomyStage;
