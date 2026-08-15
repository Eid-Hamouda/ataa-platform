"use client";

import Link from "next/link";
import { 
  HeartHandshake, ArrowLeft, ShieldCheck, Sparkles, RefreshCcw, 
  Users, Shirt, BookOpen, Sofa, Package, Heart, Building2, TrendingUp,
  UploadCloud, Wand2, Truck, Quote
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-emerald-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-teal-50/60 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-700 text-sm font-bold mb-8 shadow-sm">
                <Sparkles size={16} className="text-emerald-500" />
                <span>منصة أثر الخيرية لإدارة التبرعات</span>
              </div>
              
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.15] mb-8">
                شارك ما لا تحتاجه، <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-l from-emerald-600 to-teal-500">
                  ولبّي احتياج غيرك
                </span>
              </h1>
              
              <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                منصة موثوقة تربط المعروضات الخيرية بالطلبات الحقيقية. بفضل تقنيات الذكاء الاصطناعي، يمكنك إحداث تأثير حقيقي وتدوير الموارد بكفاءة عالية لبناء مجتمع متكافل.
              </p>
              
              <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/register"
                  className="group bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-3"
                >
                  ابدأ التبرع الآن 
                  <ArrowLeft size={20} className="group-hover:-translate-x-1.5 transition-transform" />
                </Link>
                <Link 
                  href="#how-it-works"
                  className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all flex items-center justify-center"
                >
                  كيف تعمل المنصة؟
                </Link>
              </div>
            </div>

            <div data-aos="zoom-in" data-aos-delay="200" className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-8 border-white">
              <img 
                src="/hero.png" 
                alt="عطاء مجتمعي" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4 animate-bounce-slow">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">عطاء مستمر</p>
                  <p className="text-xs text-slate-500 font-medium">خطوة بسيطة، أثر كبير</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-slate-100">
              <div data-aos="fade-up" data-aos-delay="0" className="text-center px-4">
                <div className="w-12 h-12 mx-auto bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <TrendingUp size={24} />
                </div>
                <p className="text-4xl font-extrabold text-slate-900 mb-2">+5,000</p>
                <p className="text-slate-500 font-medium">قطعة تم تدويرها</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="100" className="text-center px-4">
                <div className="w-12 h-12 mx-auto bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-4">
                  <Heart size={24} />
                </div>
                <p className="text-4xl font-extrabold text-slate-900 mb-2">+1,200</p>
                <p className="text-slate-500 font-medium">عائلة مستفيدة</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="200" className="text-center px-4">
                <div className="w-12 h-12 mx-auto bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <Users size={24} />
                </div>
                <p className="text-4xl font-extrabold text-slate-900 mb-2">+350</p>
                <p className="text-slate-500 font-medium">متبرع نشط</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="300" className="text-center px-4">
                <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                  <Building2 size={24} />
                </div>
                <p className="text-4xl font-extrabold text-slate-900 mb-2">+50</p>
                <p className="text-slate-500 font-medium">منظمة شريكة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (New Section) */}
      <section id="how-it-works" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-teal-600 font-bold tracking-wide mb-3 uppercase text-sm">آلية العمل</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              كيف تساهم في منصة أثر؟
            </h3>
            <p className="text-slate-600 text-lg">ثلاث خطوات بسيطة فقط تفصلك عن إحداث تغيير حقيقي في حياة الآخرين.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* خط واصل بين الخطوات (يظهر في الشاشات الكبيرة) */}
            <div data-aos="fade-in" data-aos-delay="300" className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-100 via-teal-200 to-emerald-100 z-0"></div>

            <div data-aos="fade-up" data-aos-delay="0" className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100/50 group-hover:scale-110 transition-transform">
                <UploadCloud size={40} className="text-emerald-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">1. صوّر وارفع</h4>
              <p className="text-slate-600 font-medium leading-relaxed px-4">التقط صورة للعنصر الذي تود التبرع به وارفعها للمنصة بسهولة تامة.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-teal-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-teal-100/50 group-hover:scale-110 transition-transform">
                <Wand2 size={40} className="text-teal-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">2. تصنيف ذكي</h4>
              <p className="text-slate-600 font-medium leading-relaxed px-4">يقوم الذكاء الاصطناعي بتصنيف العنصر وتحديد المستفيد الأنسب تلقائياً.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-blue-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50 group-hover:scale-110 transition-transform">
                <Truck size={40} className="text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">3. توصيل آمن</h4>
              <p className="text-slate-600 font-medium leading-relaxed px-4">يتولى المتطوعون أو المنظمات الشريكة استلام وتوصيل التبرع بأمان.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Categories Section */}
      <section className="bg-slate-900 py-24 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-emerald-400 font-bold tracking-wide mb-3 uppercase text-sm">التصنيفات الشائعة</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-2">الأقسام الأكثر طلباً وتبرعاً</h3>
            </div>
            <Link href="/auth/register" className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-2 transition-colors">
              عرض كل الاحتياجات <ArrowLeft size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div data-aos="fade-up" data-aos-delay="0" className="group bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-slate-700/50 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Shirt size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">الملابس والأزياء</h4>
              <p className="text-slate-400 text-sm font-medium">ملابس شتوية وصيفية لجميع الأعمار.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="group bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-slate-700/50 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <BookOpen size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">الكتب والأدوات</h4>
              <p className="text-slate-400 text-sm font-medium">كتب تعليمية، ومناهج مدرسية.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="group bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-slate-700/50 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Sofa size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">الأثاث المنزلي</h4>
              <p className="text-slate-400 text-sm font-medium">أجهزة وأثاث بحالة ممتازة.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" className="group bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-slate-700/50 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Package size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">متنوعة وأخرى</h4>
              <p className="text-slate-400 text-sm font-medium">ألعاب واحتياجات مجتمعية أخرى.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Success Stories / Testimonials (New Section) */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">أثرٌ يُرى ويُحكى</h2>
            <p className="text-slate-600 text-lg">شهادات نعتز بها من أفراد مجتمعنا الذين جربوا العطاء عبر منصتنا.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div data-aos="fade-up" data-aos-delay="0" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote size={40} className="text-emerald-100 absolute top-6 right-6" />
              <p className="text-slate-600 leading-relaxed font-medium mb-6 mt-4 relative z-10">
                "كان لدي الكثير من الملابس الشتوية الممتازة التي صغر مقاسها على أبنائي، من خلال المنصة تم تصنيفها بضغطة زر وإرسالها لعائلة محتاجة خلال 24 ساعة فقط!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">أ.م</div>
                <div>
                  <h5 className="font-bold text-slate-900">أحمد محمود</h5>
                  <p className="text-sm text-slate-500">متبرع نشط</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote size={40} className="text-emerald-100 absolute top-6 right-6" />
              <p className="text-slate-600 leading-relaxed font-medium mb-6 mt-4 relative z-10">
                "الذكاء الاصطناعي في المنصة يوفر علينا كجمعية خيرية ساعات طويلة من فرز التبرعات، الآن تصلنا التبرعات مصنفة وجاهزة للتوزيع المباشر."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">ج.خ</div>
                <div>
                  <h5 className="font-bold text-slate-900">جمعية الإحسان</h5>
                  <p className="text-sm text-slate-500">منظمة شريكة</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote size={40} className="text-emerald-100 absolute top-6 right-6" />
              <p className="text-slate-600 leading-relaxed font-medium mb-6 mt-4 relative z-10">
                "تجربة التطوع في توصيل الطلبات عبر المنصة منظمة جداً. الإشعارات وتحديد المواقع يسهل علينا إيصال الأمانات لأصحابها بسرعة."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">س.ع</div>
                <div>
                  <h5 className="font-bold text-slate-900">سارة علي</h5>
                  <p className="text-sm text-slate-500">متطوعة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div data-aos="zoom-in" className="relative bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-900/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                هل لديك أشياء فائضة عن حاجتك؟
              </h2>
              <p data-aos="fade-up" data-aos-delay="200" className="text-emerald-50 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                لا تدع فائض مواردك يذهب هدرًا. انضم اليوم إلى منصة أثر وساهم في رسم البسمة على وجه محتاج بضغطة زر واحدة.
              </p>
              
              <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/auth/register"
                  className="bg-white text-emerald-800 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl"
                >
                  أنشئ حسابك وتبرع الآن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}