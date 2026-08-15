"use client";

import Link from "next/link";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Users, 
  Rocket, 
  CheckCircle2,
  HeartHandshake
} from "lucide-react";

export default function AboutPage() {
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
            <span>تعرف على منصة أثر</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.2]">
            نبني مجتمعاً متكافلاً عبر <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-emerald-600 to-teal-500">
              تدوير الموارد الذكية
            </span>
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium max-w-3xl mx-auto">
            منصة "أثر" هي مبادرة تقنية رائدة تهدف إلى سد الفجوة بين فائض الموارد لدى الأفراد والجهات، واحتياجات الأسر والأفراد المتعففة، محققةً أعلى معايير الشفافية والأثر المستدام.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-left" className="relative">
              {/* Decorative Image Placeholder / Graphic */}
              <div className="aspect-square md:aspect-[4/3] rounded-[2rem] bg-slate-100 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 mix-blend-multiply"></div>
                <img 
                  src="/hero.png"
                  alt="قصة منصة أثر" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div data-aos="zoom-in" data-aos-delay="300" className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <HeartHandshake size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">+100K</p>
                    <p className="text-sm font-medium text-slate-500">ساعة تطوعية تقنية</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-right">
              <h2 className="text-emerald-600 font-bold tracking-wide mb-3 uppercase text-sm">قصتنا</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-6">كيف بدأت فكرة "أثر"؟</h3>
              <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                <p>
                  بدأت الفكرة من ملاحظة بسيطة: هناك الكثير من الموارد والأشياء القيمة التي تتكدس في منازلنا ومؤسساتنا دون استخدام، في حين أن هناك عائلات وأفراد في أمس الحاجة إليها.
                </p>
                <p>
                  كانت المشكلة الأساسية هي غياب "حلقة الوصل" الموثوقة والسهلة. عمليات التبرع التقليدية كانت تتطلب جهداً في الفرز، والتوصيل، والبحث عن المستحقين.
                </p>
                <p>
                  من هنا ولدت "أثر". قررنا دمج التكنولوجيا الحديثة، وتحديداً تقنيات الذكاء الاصطناعي، لأتمتة عملية الفرز والتصنيف، وبناء منظومة لوجستية متكاملة تربط المتبرع بالجمعيات والمستفيدين بضغطة زر واحدة، ليتحول الفائض إلى أثر حقيقي ومستدام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div data-aos="fade-up" className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">رؤيتنا</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                الريادة الإقليمية في تمكين العمل الخيري المستدام، والاعتماد على الابتكار التكنولوجي وخوارزميات الذكاء الاصطناعي لإعادة تدوير السلع بكفاءة مطلقة تخدم المجتمع والبيئة معاً.
              </p>
            </div>

            {/* Mission Card */}
            <div data-aos="fade-up" data-aos-delay="150" className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">رسالتنا</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                خلق شبكة أمان مجتمعي شفافة وموثوقة، تسهل على المتبرعين تقديم دعمهم، وتضمن وصول المساعدات العينية لمستحقيها عبر مسارات لوجستية مدروسة ومنظومة تطوعية فعالة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-400 font-bold tracking-wide mb-3 uppercase text-sm">مبادئنا</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">القيم الجوهرية التي تقود عملنا</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div data-aos="fade-up" data-aos-delay="0" className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white">الشفافية المطلقة</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                نؤمن بحق المجتمع في تتبع مسار التبرعات والتأكد من وصولها للمستفيدين بوضوح تام دون أي حواجز.
              </p>
            </div>

            {/* Value 2 */}
            <div data-aos="fade-up" data-aos-delay="100" className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mb-6">
                <Leaf size={24} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white">الكفاءة والاستدامة</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                نعمل على تقليل الهدر من خلال إعادة تدوير المواد الصالحة للاستخدام وإطالة دورة حياتها لصالح المجتمع.
              </p>
            </div>

            {/* Value 3 */}
            <div data-aos="fade-up" data-aos-delay="200" className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white">الأمان والخصوصية</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                نحمي بيانات جميع الأطراف (متبرعين، مستفيدين، متطوعين) وفق أعلى معايير أمن المعلومات وحفظ الكرامة.
              </p>
            </div>

            {/* Value 4 */}
            <div data-aos="fade-up" data-aos-delay="300" className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Rocket size={24} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white">الابتكار التقني</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                نطوع أحدث تقنيات الذكاء الاصطناعي لتسريع وتسجيل وتوثيق العمليات الخيرية لضمان أفضل تجربة مستخدم.
              </p>
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
              <Users size={48} className="mx-auto mb-6 text-emerald-200" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">كن جزءاً من قصة النجاح</h2>
              <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto font-medium">
                سواء كنت فرداً، جمعية خيرية، أو متطوعاً، مكانك محفوظ بيننا لبناء مجتمع أكثر ترابطاً وتكافلاً.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/auth/register"
                  className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-slate-50 transition-all shadow-lg"
                >
                  انضم إلينا الآن
                </Link>
                <Link 
                  href="/contact"
                  className="bg-emerald-800/40 border border-emerald-400/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800/60 transition-all"
                >
                  تواصل مع الإدارة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}