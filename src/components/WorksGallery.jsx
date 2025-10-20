// ========================================
// Stage 4: Works Gallery
// ========================================

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const WorksGallery = ({ onComplete }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const works = [
    {
      id: "belbel",
      title: "بلبل‌زبان",
      subtitle: "متن به‌مثابۀ الگوریتم",
      year: "1399",
      author: "افشین خاشعی",
      desc: "ارزش زیباشناختی این اثر نه در محصول نهایی شعر، بلکه در کالبدشکافی «معماری رویه‌ای» آن نهفته است",
      analysis:
        "برای نخستین بار، پیچیده‌ترین چالش شعر کلاسیک یعنی «عروض فارسی» را به زبان الگوریتم ترجمه می‌کند",
      color: "#FF6B6B",
      motionType: "text",
      images: [
        "assets/images/works/bolbolzaban-1.jpg",
        "assets/images/works/bolbolzaban-3.jpg",
        "assets/images/works/bolbolzaban-4.jpg",
        "assets/images/works/bolbolzaban-6.jpg",
      ],
    },
    {
      id: "tarikkhane",
      title: " تاریک‌خانۀ ماریا مینورسکی",
      subtitle: "متن به‌مثابۀ هزارتو (داستان فرامتنی)",
      year: "1384",
      author: "فرهاد حیدری گوران",
      desc: "اثری که دیگر در دسترس نیست و تنها از طریق اسناد پیرامتنی می‌توانیم آن را بازسازی کنیم.",
      analysis:
        "امروز به یک فسیل دیجیتال بدل شده، مفهوم نظری «بدن شکننده» و بحران بایگانی را به یک واقعیت ملموس تبدیل کرد",
      color: "#8B0000",
      motionType: "text",
      images: ["assets/images/works/notfound.png"],
    },
    {
      id: "escape",
      title: "۴۱۱۴۸ و فرار بزرگ",
      subtitle: "متن به‌مثابۀ جهان-بازی",
      year: "1393-1395 و 1395",
      author: " مهدی فنایی و سید طه رسولی",
      desc: "زیبایی‌شناسی اثر بر پایۀ یک «سخت‌پیمایی» شکل می‌گیرد",
      analysis: "لذت ادبی از حل معماهای منطقی و درگیری استراتژیک با قواعد پنهان سیستم نشئت می‌گیرد",
      color: "#4ECDC4",
      motionType: "reader",
      images: [
        "assets/images/works/41148-1.jpg",
        "assets/images/works/41148-3.jpg",
        "assets/images/works/41148-4.jpg",
        "assets/images/works/41148-8.jpg",
        "assets/images/works/fararebozorg-1.jpg",
        "assets/images/works/fararebozorg-2.jpg",
        "assets/images/works/fararebozorg-7.jpg",
        "assets/images/works/fararebozorg-8.jpg",
      ],
    },
    {
      id: "haft",
      title: "هفت‌خوان",
      subtitle: "متن به‌مثابۀ فضای بدن‌مند",
      year: "1402",
      author: "شرکت vrex360 و گروه کدبیات",
      desc: "تجربهٔ غوطه‌ورانه در واقعیت مجازی.",
      analysis: "مرز میان بدن فیزیکی و جهان متن محو می‌شود. خواندن تبدیل به یک تجربهٔ بدن‌مند می‌شود.",
      color: "#A8E6CF",
      motionType: "author",
      images: ["/assets/images/works/vr.jpg"],
    },
    {
      id: "kamal",
      title: "کمال سکون",
      subtitle: "ترجمهٔ شعر عرفانی",
      year: "۱۴۰۴",
      author: "مرتضی عنابستانی",
      desc: "یک شعر عرفانی کلاسیک از طریق فیزیک محاسباتی و تعامل بدنمند کاربر به یک تجربهٔ اجرایی تبدیل شده‌است.",
      analysis: "مفاهیم انتزاعی شعر از طریق الگوریتم به زیبایی‌شناسی رویه‌ای تبدیل می‌شوند.",
      color: "#FFD700",
      motionType: "author",
      images: [
        "assets/images/works/kamalesokon-1.jpg",
        "assets/images/works/kamalesokon-2.jpg",
        "assets/images/works/kamalesokon-3.jpg",
        "assets/images/works/kamalesokon-4.jpg",
        "assets/images/works/kamalesokon-5.jpg",
        "assets/images/works/kamalesokon-6.jpg",
        "assets/images/works/kamalesokon-7.jpg",
        "assets/images/works/kamalesokon-8.jpg",
      ],
    },
  ];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % selectedWork.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + selectedWork.images.length) % selectedWork.images.length);
  };

  const handleCardClick = (work) => {
    setSelectedWork(work);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-auto" dir="rtl">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 0, 0, 0.6); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-float { animation: float 6s ease-in-out infinite; }
        .card-glow { animation: glow 3s ease-in-out infinite; }
        .slide-in { animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .card-hover-effect {
          position: relative;
          transition: all 0.3s ease;
        }

        .card-hover-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 80%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-hover-effect:hover::after {
          opacity: 1;
        }
      `}</style>

      {/* Hero Section */}
      <div className="min-h-screen p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl text-center font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-8 slide-in">
            کدبیات در زبان فارسی
          </h1>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
            کالبدشکافی پنج نمونهٔ برجستهٔ کُدبیات فارسی
          </p>
        </div>
      </div>

      {/* Works Grid - Immersive Display */}
      <div className="px-6 md:px-12 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {works.map((work, idx) => (
            <div
              key={work.id}
              className="relative group cursor-pointer card-hover-effect card-float"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => handleCardClick(work)}
            >
              {/* Glowing Border Effect */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-lg"
                style={{
                  background: `linear-gradient(45deg, ${work.color}22, ${work.color}44)`,
                  zIndex: -1,
                }}
              />

              {/* Card Container */}
              <div
                className="relative p-8 md:p-10 rounded-xl backdrop-blur-md border-2 overflow-hidden min-h-96 flex flex-col justify-between transition-all duration-500 group-hover:translate-y-[-8px]"
                style={{
                  borderColor: work.color,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  boxShadow: `inset 0 0 30px ${work.color}11`,
                }}
              >
                {/* Color Accent Top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${work.color}, transparent)` }}
                />

                <div>
                  <div
                    className="text-xs font-black tracking-widest mb-4 uppercase opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ color: work.color }}
                  >
                    ◆ {work.subtitle}
                  </div>
                  <h3
                    className="text-4xl md:text-5xl text-white mb-4 font-black leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                    style={{
                      backgroundImage: `linear-gradient(135deg, white, ${work.color})`,
                    }}
                  >
                    {work.title}
                  </h3>
                  <div className="flex gap-4 text-xs text-gray-500 mb-6 font-mono">
                    <span className="opacity-70">{work.year}</span>
                    <span>•</span>
                    <span className="opacity-70">{work.author}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {work.desc}
                  </p>
                </div>

                {/* Interactive Indicator */}
                <div className="mt-8 pt-6 border-t border-gray-600 flex justify-between items-center">
                  <div className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors font-bold">
                    فعال کن ↙
                  </div>
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all"
                    style={{ borderColor: work.color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: work.color }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Full Immersive Experience */}
      {selectedWork && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 md:p-8 backdrop-blur-sm slide-in"
          onClick={closeModal}
        >
          <div
            className="max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2 relative"
            style={{ borderColor: selectedWork.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Background Glow */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-50 blur-xl"
              style={{ backgroundColor: selectedWork.color, zIndex: -1 }}
            />

            <div
              className="relative p-8 md:p-12 min-h-[90vh] flex flex-col"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <X size={28} className="text-gray-400 group-hover:text-white" />
              </button>

              {/* Header Section */}
              <div className="mb-8 pb-8 border-b" style={{ borderColor: `${selectedWork.color}33` }}>
                <div
                  className="text-xs font-black tracking-widest mb-3 uppercase opacity-70"
                  style={{ color: selectedWork.color }}
                >
                  ◆ {selectedWork.subtitle}
                </div>
                <h2 className="text-5xl md:text-6xl text-white font-black mb-6 leading-tight">
                  {selectedWork.title}
                </h2>
                <div className="text-gray-400 flex gap-6 text-sm font-mono">
                  <div>
                    <span className="text-xs font-bold opacity-60">نویسندگی</span>
                    <div className="text-white font-bold">{selectedWork.author}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold opacity-60">سال</span>
                    <div className="text-white font-bold">{selectedWork.year}</div>
                  </div>
                </div>
              </div>

              {/* Image Gallery Section */}
              <div className="mb-12">
                <div className="relative group/gallery">
                  <div
                    className="relative rounded-xl overflow-hidden border-2 mb-6"
                    style={{ borderColor: selectedWork.color, aspectRatio: "16/9" }}
                  >
                    <img
                      src={selectedWork.images[currentImageIndex]}
                      alt={`${selectedWork.title} - تصویر ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover/gallery:opacity-20 transition-opacity"
                      style={{ backgroundColor: selectedWork.color }}
                    />
                  </div>

                  {/* Gallery Controls */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevImage}
                      className="p-3 rounded-lg hover:bg-gray-800 transition-colors group/btn"
                    >
                      <ChevronRight
                        size={24}
                        className="text-gray-400 group-hover/btn:text-white"
                        style={{ color: selectedWork.color }}
                      />
                    </button>

                    <div className="flex gap-2">
                      {selectedWork.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? "w-8" : ""
                          }`}
                          style={{
                            backgroundColor:
                              idx === currentImageIndex ? selectedWork.color : `${selectedWork.color}44`,
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextImage}
                      className="p-3 rounded-lg hover:bg-gray-800 transition-colors group/btn"
                    >
                      <ChevronLeft
                        size={24}
                        className="text-gray-400 group-hover/btn:text-white"
                        style={{ color: selectedWork.color }}
                      />
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 text-center mt-3 font-mono">
                    {currentImageIndex + 1} / {selectedWork.images.length}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-black text-gray-500 mb-4 uppercase tracking-wide">توضیح</h3>
                  <p className="text-gray-300 leading-relaxed text-base">{selectedWork.desc}</p>
                </div>

                <div
                  className="p-6 rounded-xl border-l-4 border-r-0"
                  style={{ borderColor: selectedWork.color, backgroundColor: `${selectedWork.color}11` }}
                >
                  <h3
                    className="text-sm font-black mb-4 uppercase tracking-wide"
                    style={{ color: selectedWork.color }}
                  >
                    تحلیل
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">{selectedWork.analysis}</p>
                </div>
              </div>

              {/* Close Hint */}
              <div className="mt-auto pt-6 text-center">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-cyan-400 font-bold text-sm transition-colors"
                >
                  بستن [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      {scrollProgress < 0.9 && (
        <div className="fixed bottom-8 right-8 text-gray-600 text-xs font-bold font-mono">
          <div className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center relative">
            <div
              className="absolute inset-1 rounded-full"
              style={{
                background: `conic-gradient(#4ECDC4 0deg, #4ECDC4 ${scrollProgress * 360}deg, transparent ${
                  scrollProgress * 360
                }deg)`,
              }}
            />
            <span className="relative text-white text-xs font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksGallery;
