"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  MessageCircle, 
  Plus, 
  Minus, 
  Sparkles,
  PhoneCall
} from "lucide-react";

// بيانات الأسئلة الشائعة (يمكنك تعديلها أو الإضافة عليها لاحقاً)
const faqs = [
  {
    question: "ما هي منصة أثر وكيف تعمل؟",
    answer: "أثر هي منصة خيرية رقمية تربط بين الأشخاص أو الجهات التي تمتلك فائضاً من الموارد (ملابس، أثاث، كتب، إلخ) وبين الأفراد أو العائلات المتعففة. تعمل المنصة عبر السماح للمتبرع برفع صورة للعنصر، ويقوم الذكاء الاصطناعي بتصنيفه، ثم يتم توجيهه للمستفيد الأنسب وتوصيله عبر شبكة متطوعين."
  },
  {
    question: "هل استخدام المنصة مجاني بالكامل؟",
    answer: "نعم، منصة أثر مجانية بالكامل بنسبة 100% لجميع المستخدمين (متبرعين، مستفيدين، ومتطوعين). هدفنا الأساسي هو تعزيز التكافل المجتمعي وليس الربح المادي."
  },
  {
    question: "كيف تضمنون وصول التبرعات لمستحقيها الفعليين؟",
    answer: "نحن نأخذ هذا الأمر بجدية بالغة. جميع حسابات المستفيدين والجمعيات الخيرية تمر بعملية تدقيق صارمة من قبل الإدارة قبل اعتمادها. كما أن النظام التقني يعطي الأولوية للحالات الأكثر احتياجاً بناءً على بيانات موثقة."
  },
  {
    question: "هل يمكنني التبرع بأي شيء؟ وما هي الشروط؟",
    answer: "نستقبل التبرعات العينية بأنواعها (ملابس، أثاث، أجهزة كهربائية، حقائب، كتب). الشرط الوحيد الأساسي هو أن تكون المواد نظيفة، بحالة جيدة جداً، وصالحة للاستخدام الآمن احتراماً لكرامة المستفيد."
  },
  {
    question: "هل بياناتي ومعلوماتي الشخصية آمنة؟",
    answer: "بكل تأكيد. نحن نستخدم أحدث بروتوكولات التشفير لحماية بياناتك. كما يمكن للمتبرع اختيار إخفاء هويته (التبرع كمجهول) إذا رغب في ذلك، ولن تتم مشاركة بيانات المستفيدين إلا مع الجهة الموصلة في أضيق الحدود."
  },
  {
    question: "كيف يتم استخدام الذكاء الاصطناعي في المنصة؟",
    answer: "نستخدم تقنيات الرؤية الحاسوبية (Computer Vision) لتحليل صور التبرعات بمجرد رفعها. النظام يتعرف على نوع العنصر، لونه، وحالته، ويكتب وصفاً دقيقاً له ويضعه في التصنيف الصحيح لتوفير وقت المتبرع وتسهيل البحث للمستفيد."
  }
];

export default function FAQPage() {
  // حالة التحكم بفتح وإغلاق الأسئلة
  const [openIndex, setOpenIndex] = useState<number | null>(0); // السؤال الأول مفتوح افتراضياً

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-700 text-sm font-bold mb-6 shadow-sm">
            <HelpCircle size={16} className="text-emerald-500" />
            <span>نحن هنا لمساعدتك</span>
          </div>

          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.2]">
            الأسئلة الشائعة
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            جمعنا لك الإجابات على أكثر الأسئلة التي يطرحها مجتمعنا لتوفير وقتك وتسهيل تجربتك في منصة أثر.
          </p>
        </div>
      </section>

      {/* 2. FAQ Accordion Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100} // تأخير متسلسل للأسئلة
                  className={`bg-white border transition-all duration-300 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md ${
                    isOpen ? 'border-emerald-200 ring-2 ring-emerald-50' : 'border-slate-200/80 hover:border-emerald-100'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-right flex items-center justify-between gap-6 focus:outline-none"
                  >
                    <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {faq.question}
                    </h3>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  {/* إجابة السؤال مع تأثير طي انسيابي (Accordion Animation) */}
                  <div 
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Still Have Questions CTA */}
      <section className="py-16 mb-12 overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <div data-aos="zoom-in" className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="relative z-10">
              <MessageCircle size={40} className="mx-auto mb-5 text-emerald-400" />
              <h3 className="text-2xl font-extrabold mb-3">لم تجد إجابة لسؤالك؟</h3>
              <p className="text-slate-300 font-medium mb-8 max-w-md mx-auto">
                فريق الدعم الفني لدينا متواجد دائماً للإجابة على استفساراتك وتقديم المساعدة اللازمة.
              </p>

              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-lg"
              >
                <PhoneCall size={18} />
                تواصل معنا الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}