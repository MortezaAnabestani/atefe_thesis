import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ResearchPages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
  }, [currentPage]);

  const pages = [
    {
      title: "محدودیت‌های پژوهش",
      content: (
        <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">محدودیت اول: ماهیت موضوع</h3>
            <p>
              محدودیت اصلی این پژوهش، از ماهیت خودِ موضوع نشئت می‌گیرد: حوزه‌ای نوپا و پراکنده در زبان فارسی.
              این پژوهش برای تحلیل آثار، رویکردی مبتنی‌بر «مطالعۀ موردی» اتخاذ کرده و بر نمونه‌های شاخص و در
              دسترس تمرکز نموده‌ست.
            </p>
          </div>

          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">محدودیت دوم: پوشش ناکامل</h3>
            <p>
              این تحقیق ادعای ارائۀ یک تاریخ جامع و کامل از تمام تجربه‌های کُدَبی در ایران را ندارد. به‌ویژه
              در برخی گونه‌های شناسایی‌شده مانند «روایت‌های مکان‌مند» یا «نوشتار شبکه‌ای»، یافتن نمونه‌های
              برجستۀ فارسی در بازۀ زمانی این پژوهش ممکن نشد.
            </p>
          </div>

          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">محدودیت سوم: ماهیت شکننده آثار</h3>
            <p>
              چالش مهم دیگر، ماهیت فناپذیر و شکنندۀ این آثار است. عدم دسترسی مستقیم به آثار اولیه، تحلیل
              پدیدارشناختی را محدود کرده و ما را به تحلیل اسناد پیرامتنی متکی می‌سازد.
            </p>
          </div>

          <p className="text-lg text-amber-900 font-bold border-r-4 border-amber-400 pr-6 py-4 bg-amber-50">
            این محدودیت‌ها نه تنها نقاط ضعف این رساله هستند، که درهایی به سوی تحقیقات آتی و فرصت‌های نو
            می‌باشند.
          </p>
        </div>
      ),
    },
    {
      title: "پیشنهادات برای پژوهش‌های آینده",
      content: (
        <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">پیشنهاد اول: باستان‌شناسی دیجیتال</h3>
            <p>
              نیاز مبرم به پژوهش‌های تاریخی و باستان‌شناسی دیجیتال برای کشف، احیاء و مستندسازی پیکرۀ آثار
              کُدبی فارسی وجود دارد. این کار می‌تواند میراث ادبی ما را از فراموشی نجات دهد.
            </p>
          </div>

          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">پیشنهاد دوم: مطالعات عمیق‌تر گونه‌ها</h3>
            <p>
              با گسترش این پیکره، می‌توان مطالعات موردیِ عمیق‌تری بر روی هر یک از گونه‌ها انجام داد تا چارچوب
              ارائه شده در این رساله را تکمیل و به چالش کشید. به‌ویژه گونه‌های ناشناخته‌ای مانند روایت‌های
              مکان‌مند و نوشتار شبکه‌ای نیازمند توجه هستند.
            </p>
          </div>

          <div>
            <h3 className="text-xl text-amber-900 font-bold mb-3">پیشنهاد سوم: سیاست‌های بایگانی دیجیتال</h3>
            <p>
              بحران «بدن شکننده» ما را به یک اقدام عملی فرا می‌خواند: تدوین سیاست‌های بایگانی دیجیتال و ایجاد
              زیرساخت‌های آموزشی و انتقادی برای تثبیت جایگاه این زیست‌بوم نوپا در جامعۀ ادبی ایران.
            </p>
          </div>

          <p className="text-lg text-amber-900 font-bold border-r-4 border-amber-400 pr-6 py-4 bg-amber-50">
            این مسیرها، نه فقط پیشنهادهایی برای آینده، که ضرورت‌هایی حیاتی برای حفظ و فهم بخشی از میراث ادبی
            معاصر ما هستند.
          </p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-auto"
      dir="rtl"
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
        
        .background-text {
          position: fixed;
          color: rgba(180, 83, 9, 0.25);
          pointer-events: none;
          font-size: 1rem;
          line-height: 2;
          z-index: 0;
        }
      `}</style>

      {/* پس زمینۀ متن‌ها */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <p className="background-text" style={{ top: "15%", right: "5%", maxWidth: "30%" }}>
          بازگشت به تجربۀ خواندن متن در کاغذ
        </p>
        <p className="background-text" style={{ top: "40%", left: "5%", maxWidth: "35%" }}>
          شبیه‌سازی رسانۀ چاپ در رسانۀ الکترونیک
        </p>
        <p className="background-text" style={{ bottom: "15%", right: "3%", maxWidth: "32%" }}>
          تفاوت این متن با متن بخش‌های پیشین؟{" "}
        </p>
        <p className="background-text" style={{ bottom: "25%", left: "2%", maxWidth: "32%" }}>
          اثر کُدَبی pdf و epub نیست
        </p>
        <p className="background-text" style={{ top: "20%", left: "3%", maxWidth: "32%" }}>
          محتویات این صفحه را می‌توان چاپ کرد{" "}
        </p>
      </div>

      <div className="min-h-screen p-12 flex items-center justify-center relative z-10">
        <div className="w-full max-w-3xl">
          <div
            className="bg-white/90 p-12 rounded-lg shadow-2xl border border-amber-200"
            style={{
              opacity: isTransitioning ? 1 : 0,
              transform: isTransitioning ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-out",
            }}
          >
            <h2 className="text-3xl text-amber-900 mb-8 text-center border-b-2 border-amber-300 pb-6 font-bold">
              {pages[currentPage].title}
            </h2>

            <div>{pages[currentPage].content}</div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm">مهرماه 1404</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
              صفحه قبل
            </button>

            <div className="flex gap-2">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsTransitioning(false);
                    setTimeout(() => setCurrentPage(idx), 300);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentPage ? "bg-amber-700 w-8" : "bg-amber-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              صفحه بعد
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="text-center mt-6 text-amber-800">
            <p className="text-sm">
              صفحه {currentPage + 1} از {pages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPages;
