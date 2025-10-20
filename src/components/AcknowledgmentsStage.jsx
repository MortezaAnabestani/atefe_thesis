// ========================================
// Stage 6: Acknowledgments
// ========================================

import { useState, useEffect } from "react";

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
              محدودیت‌های پژوهش
            </h2>

            <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
              <p>
                نخست، نیاز مبرم به پژوهش‌های تاریخی و باستان‌شناسی دیجیتال برای کشف، احیاء و مستندسازی پیکرۀ
                آثار کُدبی فارسی وجود دارد.
              </p>

              <p>
                دوم، با گسترش این پیکره، می‌توان مطالعات موردیِ عمیق‌تری بر روی هر یک از گونه‌ها انجام داد تا
                چارچوب ارائه شده در این رساله را تکمیل و به چالش کشید.
              </p>

              <p>
                و در نهایت، و شاید مهم‌تر از همه، بحران «بدن شکننده» ما را به یک اقدام عملی فرا می‌خواند:
                تدوین سیاست‌های بایگانی دیجیتال و ایجاد زیرساخت‌های آموزشی و انتقادی برای تثبیت جایگاه این
                زیست‌بوم نوپا در جامعۀ ادبی ایران.
              </p>

              <p className="text-lg text-amber-900 font-bold border-r-4 border-amber-400 pr-6 py-4 bg-amber-50">
                این مسیرها، نه فقط پیشنهادهایی برای آینده، که ضرورت‌هایی حیاتی برای حفظ و فهم بخشی از میراث
                ادبی معاصر ما هستند.
              </p>

              <p className="text-center mt-12 text-amber-700 italic text-xl">با سپاس از همراه شما</p>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm">مهرماه 1404</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcknowledgmentsStage;
