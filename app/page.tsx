import Link from "next/link";
import { HeartHandshake, ArrowRight, ShieldCheck, Sparkles, RefreshCcw, Users, PackageCheck, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* 1. Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6">
              شارك ما لا تحتاجه، <br />
              <span className="text-emerald-600">ولبّي احتياج غيرك</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl mb-8 leading-relaxed">
              منصة موثوقة تربط المعروضات الخيرية بالطلبات الحقيقية. يمكنك بفضل التصنيف التلقائي للصور إحداث تأثير حقيقي وتدوير الموارد بكفاءة عالية في مجتمعك.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/auth/register"
                className="bg-emerald-600 text-white px-7 py-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                ابدأ التبرع الآن <ArrowRight size={18} className="rotate-180" />
              </Link>
              <Link 
                href="/how-it-works"
                className="bg-white border border-slate-200 text-slate-700 px-7 py-4 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                تعرف على آلية العمل
              </Link>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <img 
              src="/hero.png" 
              alt="عطاء مجتمعي" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Banner */}
      <section className="bg-emerald-900 text-white py-12 my-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">+5,000</p>
            <p className="text-slate-300 text-sm">قطعة تم تدويرها</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">+1,200</p>
            <p className="text-slate-300 text-sm">عائلة مستفيدة</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">+350</p>
            <p className="text-slate-300 text-sm">متبرع نشط</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">+50</p>
            <p className="text-slate-300 text-sm">منظمة شريكة</p>
          </div>
        </div>
      </section>

      {/* 3. Feature Highlights Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">لماذا منصة عطاء؟</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-4">مميزات تجعل العمل الخيري أسرع وأكثر موثوقية</h2>
          <p className="text-slate-600">نعتمد على التكنولوجيا الحديثة لضمان كفاءة التوزيع وسرعة الاستجابة بين الأطراف المختلفة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Sparkles size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-3">تعرف ذكي بالصور</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              ارفع صورة العنصر ويتكفل الذكاء الاصطناعي بتحديد الفئة والتصنيف والوصف تلقائياً في ثوانٍ معدودة.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-3">أدوار مخصصة وآمنة</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              منظومة متكاملة تدعم المتبرعين، المستفيدين المعتمدين، المنظمات، المتطوعين، والإدارة بصلاحيات دقيقة.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <RefreshCcw size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-3">تتبع وتنبيهات فورية</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              إشعارات تلقائية فور اكتمال التوصيل وتأكيد الاستلام لضمان الشفافية العالية وثقة المجتمع.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Popular Categories Section */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">التصنيفات</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">الأقسام الأكثر طلباً وتبرعاً</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center hover:border-emerald-600 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold">👕</div>
              <h3 className="font-bold text-slate-900">الملابس والأزياء</h3>
              <p className="text-xs text-slate-500 mt-1">شتوي وصيفي لجميع الأعمار</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center hover:border-emerald-600 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold">📚</div>
              <h3 className="font-bold text-slate-900">الكتب والأدوات</h3>
              <p className="text-xs text-slate-500 mt-1">كتب تعليمية ومدرسية</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center hover:border-emerald-600 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold">🪑</div>
              <h3 className="font-bold text-slate-900">الأثاث المنزلي</h3>
              <p className="text-xs text-slate-500 mt-1">أجهزة وأثاث بحالة ممتازة</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center hover:border-emerald-600 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold">📦</div>
              <h3 className="font-bold text-slate-900">متنوعة وأخرى</h3>
              <p className="text-xs text-slate-500 mt-1">احتياجات مجتمعية مختلفة</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">هل لديك أشياء فائضة عن حاجتك؟</h2>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              لا تدع فائض مواردك يذهب هدرًا. انضم اليوم إلى منصة عطاء وساهم في رسم البسمة على وجه محتاج بضغطة زر واحدة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/auth/register"
                className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-md"
              >
                تبرع الآن
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}