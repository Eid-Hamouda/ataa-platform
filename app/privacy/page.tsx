"use client";

import Link from "next/link";
import { 
  Shield, 
  Database, 
  EyeOff, 
  Share2, 
  UserCog, 
  Cookie,
  Mail,
  Sparkles,
  LockKeyhole
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-emerald-900 text-white">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-700 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-sm">
            <LockKeyhole size={16} />
            <span>خصوصيتك أولويتنا</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            سياسة الخصوصية
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-emerald-100 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto mb-8">
            نحن في منصة "أثر" ندرك أهمية خصوصية بياناتك. تشرح هذه الوثيقة بوضوح وشفافية كيف نجمع معلوماتك، كيف نستخدمها، وكيف نحميها.
          </p>

          <div data-aos="zoom-in" data-aos-delay="300" className="inline-block text-emerald-200 text-sm font-medium bg-emerald-950/30 px-6 py-3 rounded-xl border border-emerald-800/50">
            آخر تحديث: أغسطس 2026
          </div>
        </div>
      </section>

      {/* 2. Privacy Content Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            
            {/* Block 1: Data Collection */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Database size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">1. المعلومات التي نجمعها</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    لتقديم خدمات المنصة بكفاءة، نقوم بجمع بعض المعلومات الأساسية عند التسجيل أو استخدام الخدمة، وتشمل:
                  </p>
                  <ul className="space-y-2 text-slate-600 text-sm font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> المعلومات الشخصية: (الاسم، البريد الإلكتروني، رقم الهاتف).</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> بيانات الموقع اللوجستية: (العناوين المستخدمة لاستلام وتسليم التبرعات).</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> بيانات المحتوى: (الصور والنصوص المرفقة مع التبرعات).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Block 2: Data Usage */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">2. كيف نستخدم معلوماتك؟</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    تُستخدم بياناتك حصرياً لتشغيل وتطوير المنصة، وتحديداً في:
                  </p>
                  <ul className="space-y-2 text-slate-600 text-sm font-medium mt-4">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> مطابقة التبرعات المعروضة مع طلبات الاحتياج بواسطة الذكاء الاصطناعي.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> تسهيل عملية النقل والتوصيل (تزويد المتطوعين بالعناوين).</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> إرسال إشعارات وتحديثات حول حالة التبرع.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Block 3: Data Sharing */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Share2 size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">3. مشاركة البيانات مع أطراف ثالثة</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    <strong className="text-slate-900">نحن لا نبيع بياناتك أبداً.</strong> لا يتم مشاركة بياناتك الشخصية إلا في أضيق الحدود ومع الأطراف المعنية مباشرة بدورة التبرع:
                  </p>
                  <ul className="space-y-2 text-slate-600 text-sm font-medium mt-4">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> <span className="font-bold text-slate-700">المتطوعون:</span> يحصلون فقط على معلومات التواصل والموقع الجغرافي اللازم للتوصيل.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> <span className="font-bold text-slate-700">الجمعيات الشريكة:</span> في حال كانت الجمعية هي المسؤولة عن استلام حالتك أو تبرعك.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Block 4: Security */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Shield size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">4. أمن البيانات وحمايتها</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    نتخذ تدابير أمنية تقنية وتنظيمية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به، أو التعديل، أو الإفصاح، أو الإتلاف. يشمل ذلك استخدام تقنيات التشفير المتقدمة للبيانات الحساسة وحفظها في خوادم آمنة.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 5: User Rights */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCog size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">5. حقوقك كمستخدم</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    لديك السيطرة الكاملة على بياناتك. يحق لك في أي وقت:
                  </p>
                  <ul className="space-y-2 text-slate-600 text-sm font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> الوصول إلى بياناتك الشخصية المسجلة لدينا.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> طلب تعديل أو تصحيح أي بيانات غير دقيقة.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> طلب حذف حسابك وكافة بياناتك المرتبطة به من خوادمنا بشكل نهائي.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Contact CTA Section */}
      <section className="py-16 mb-8 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div data-aos="zoom-in" className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-[3rem] p-10 md:p-12 text-center shadow-inner relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                <EyeOff size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">هل لديك مخاوف بشأن خصوصيتك؟</h3>
              <p className="text-slate-600 font-medium max-w-2xl mx-auto mb-8">
                نحن هنا للإجابة على كافة تساؤلاتك. يمكنك التواصل مع مسؤول الخصوصية في أي وقت للاستفسار عن كيفية معالجة بياناتك.
              </p>
              <Link 
                href="/contact"
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2"
              >
                <Mail size={20} />
                راسلنا على البريد الإلكتروني
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}