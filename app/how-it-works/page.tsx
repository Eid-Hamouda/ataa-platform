"use client";

import Link from "next/link";
import { 
  UploadCloud, 
  Search, 
  Truck, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  User,
  HeartHandshake,
  Building2,
  ShieldCheck,
  Cpu,
  Smartphone
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-700 text-sm font-bold mb-6 shadow-sm">
            <Sparkles size={16} className="text-emerald-500" />
            <span>رحلة العطاء خطوة بخطوة</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.2]">
            كيف تحول منصة أثر تبرعاتك <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-emerald-600 to-teal-500">
              إلى أثر حقيقي؟
            </span>
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium max-w-3xl mx-auto">
            دورة عمل ذكية، مدروسة ومبسطة تضمن سهولة الإجراءات وسرعة الاستجابة لجميع أطراف المنظومة، من لحظة التقاط الصورة وحتى وصول التبرع لمستحقيه.
          </p>
        </div>
      </section>

      {/* 2. Timeline Process Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative border-r-4 border-emerald-100 pr-8 md:pr-12 space-y-16">
            
            {/* Step 1 */}
            <div data-aos="fade-right" className="relative group">
              <div className="absolute -right-[50px] md:-right-[66px] w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center text-xl md:text-2xl font-extrabold text-emerald-600 shadow-lg group-hover:scale-110 group-hover:border-emerald-300 transition-all">
                1
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group-hover:shadow-2xl group-hover:shadow-emerald-100/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <UploadCloud size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">التصنيف الذكي ورفع التبرع</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  يقوم المتبرع أو المنظمة برفع صورة العنصر الفائض (ملابس، أثاث، أدوات، كتب). تتولى خوارزميات الذكاء الاصطناعي تحليل الصورة، تصنيفها، وكتابة وصف دقيق لها تلقائياً لتوفير الوقت وتسهيل عملية البحث.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div data-aos="fade-left" className="relative group">
              <div className="absolute -right-[50px] md:-right-[66px] w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center text-xl md:text-2xl font-extrabold text-emerald-600 shadow-lg group-hover:scale-110 group-hover:border-emerald-300 transition-all">
                2
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group-hover:shadow-2xl group-hover:shadow-emerald-100/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                    <Search size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">طلبات الاحتياج والمطابقة</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  يستعرض المستفيدون المعتمدون (بعد مراجعة الإدارة) والجهات الخيرية المعروضات المتاحة، أو يقدمون طلبات احتياج محددة. يقوم النظام بعمل مطابقة فورية لربط التبرع بالشخص أو الجهة الأشد احتياجاً.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div data-aos="fade-right" className="relative group">
              <div className="absolute -right-[50px] md:-right-[66px] w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center text-xl md:text-2xl font-extrabold text-emerald-600 shadow-lg group-hover:scale-110 group-hover:border-emerald-300 transition-all">
                3
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group-hover:shadow-2xl group-hover:shadow-emerald-100/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Truck size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">النقل والتوصيل الميداني</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  بمجرد تأكيد المطابقة، يتم إرسال إشعار لشبكة المتطوعين أو المنظمات الشريكة لاستلام مهام نقل التبرعات من مواقع المتبرعين وإيصالها إلى عناوين المستفيدين بكل احترافية وسرية.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div data-aos="fade-left" className="relative group">
              <div className="absolute -right-[50px] md:-right-[66px] w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center text-xl md:text-2xl font-extrabold text-emerald-600 shadow-lg group-hover:scale-110 group-hover:border-emerald-300 transition-all">
                4
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group-hover:shadow-2xl group-hover:shadow-emerald-100/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">التأكيد والشفافية</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  عند إتمام عملية التسليم، يُرسل النظام إشعاراً فورياً للمتبرع يشكره على إسهامه، ويوثق اكتمال دورة التبرع بنجاح، لضمان أعلى مستويات الشفافية والموثوقية في العمل الخيري.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Roles Section (New) */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-400 font-bold tracking-wide mb-3 uppercase text-sm">منظومة متكاملة</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">كيف تستفيد من المنصة حسب دورك؟</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div data-aos="fade-up" data-aos-delay="0" className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-700 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">المتبرع</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> تبرع بضغطة زر واحدة.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> تتبع حالة تبرعاتك لحظة بلحظة.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> حافظ على سرية هويتك إن أردت.</li>
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-700 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">المستفيد</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" /> اطلب ما تحتاجه بكرامة وخصوصية.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" /> تصفح المعروضات المناسبة لك.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" /> استلم التبرعات حتى باب منزلك.</li>
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-700 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">المتطوع</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" /> اختر مهام التوصيل القريبة منك.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" /> مسارات منظمة عبر الخرائط.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" /> وثق ساعاتك التطوعية بسهولة.</li>
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-700 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">الجمعية الخيرية</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" /> إدارة التبرعات الواردة بكفاءة.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" /> لوحة تحكم شاملة للإحصائيات.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" /> توثيق الحالات واعتماد المستفيدين.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tech Highlights (New) */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Cpu data-aos="zoom-in" size={48} className="mx-auto mb-6 text-emerald-600" />
          <h2 data-aos="fade-up" className="text-3xl font-extrabold text-slate-900 mb-6">مدعومون بالذكاء الاصطناعي والأمان</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-slate-600 text-lg leading-relaxed font-medium max-w-2xl mx-auto mb-12">
            لا تقتصر المنصة على ربط الأشخاص ببعضهم، بل نستخدم أحدث التقنيات لضمان تجربة سلسة وآمنة تماماً.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
            <div data-aos="fade-left" data-aos-delay="200" className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 flex items-start gap-4">
              <Smartphone size={32} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">تطبيق وسائط ذكي</h4>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  التعرف التلقائي على محتوى الصور (Image Recognition) لتقليل الجهد البشري في كتابة وتصنيف التبرعات.
                </p>
              </div>
            </div>
            
            <div data-aos="fade-right" data-aos-delay="300" className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex items-start gap-4">
              <ShieldCheck size={32} className="text-blue-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">أمان وموثوقية البيانات</h4>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  تشفير كامل لبيانات المستخدمين، والتحقق بخطوتين، لضمان عدم مشاركة معلومات المستفيدين إلا مع الجهات المصرح لها.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div data-aos="zoom-in" className="relative bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[3rem] p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">هل أنت مستعد لبدء إحداث الفارق؟</h2>
              <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto font-medium">
                العملية أسهل مما تتخيل. انضم الآن إلى شبكتنا وكن السبب في رسم البسمة على وجه محتاج.
              </p>
              
              <div className="flex justify-center">
                <Link 
                  href="/auth/register"
                  className="group bg-white text-emerald-800 px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-slate-50 hover:shadow-xl transition-all flex items-center gap-3"
                >
                  ابدأ التبرع الآن
                  <ArrowLeft size={20} className="group-hover:-translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}