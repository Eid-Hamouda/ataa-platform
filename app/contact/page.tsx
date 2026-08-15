"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  MessageSquare,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  // حالة لإظهار رسالة نجاح عند الإرسال (محاكاة)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يتم ربط النموذج بالباك إند (API) لاحقاً
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // إخفاء الرسالة بعد 5 ثوانٍ
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-bold mb-6">
            <MessageSquare size={16} />
            <span>نحن هنا لخدمتك</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            يسعدنا تواصلك معنا
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            سواء كان لديك استفسار، اقتراح، أو واجهت مشكلة تقنية، فريقنا متواجد دائماً للاستماع إليك وتقديم الدعم اللازم بأسرع وقت ممكن.
          </p>
        </div>
      </section>

      {/* 2. Contact Content Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Right Column: Contact Info Cards */}
            <div className="lg:w-1/3 space-y-6">
              <div data-aos="fade-left" data-aos-delay="300" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">البريد الإلكتروني</h3>
                <p className="text-slate-500 text-sm font-medium mb-4">للدعم الفني والاستفسارات العامة</p>
                <a href="mailto:support@athar-platform.com" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                  support@athar-platform.com
                </a>
              </div>

              <div data-aos="fade-left" data-aos-delay="400" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <Phone size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">رقم الهاتف</h3>
                <p className="text-slate-500 text-sm font-medium mb-4">أوقات العمل: من 9 صباحاً حتى 5 مساءً</p>
                <a href="tel:+966500000000" className="text-teal-600 font-bold hover:text-teal-700 transition-colors" dir="ltr">
                  +963 123 456 789
                </a>
              </div>

              <div data-aos="fade-left" data-aos-delay="500" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">المقر الرئيسي</h3>
                <p className="text-teal-600 font-bold">
                  دمشق، سوريا
                </p>
              </div>
            </div>

            {/* Left Column: Contact Form */}
            <div data-aos="fade-up" data-aos-delay="600" className="lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="text-emerald-500" size={24} />
                  <h2 className="text-3xl font-extrabold text-slate-900">أرسل لنا رسالة</h2>
                </div>

                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-500" />
                    <h3 className="text-2xl font-bold mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p className="font-medium text-emerald-700">شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-slate-700">الاسم الكامل</label>
                        <input 
                          type="text" 
                          id="name"
                          required
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                          placeholder="أدخل اسمك الكريم"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-right"
                          placeholder="example@mail.com"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-slate-700">الموضوع</label>
                      <select 
                        id="subject"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium appearance-none"
                      >
                        <option value="general">استفسار عام</option>
                        <option value="support">مشكلة تقنية / دعم فني</option>
                        <option value="partnership">طلب شراكة جمعية خيرية</option>
                        <option value="volunteer">التطوع مع المنصة</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-slate-700">الرسالة</label>
                      <textarea 
                        id="message"
                        rows={5}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium resize-none"
                        placeholder="اكتب رسالتك أو استفسارك هنا بوضوح..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2"
                    >
                      <span>إرسال الرسالة</span>
                      <Send size={18} className="rotate-180" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}