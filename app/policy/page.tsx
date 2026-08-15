"use client";

import Link from "next/link";
import { 
  ShieldAlert, 
  Lock, 
  UserCheck, 
  FileText, 
  ShieldCheck,
  Mail,
  ArrowLeft,
  Sparkles,
  Scale,
  Server
} from "lucide-react";

export default function PolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-slate-900 text-white">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-bold mb-6">
            <ShieldCheck size={16} />
            <span>الشفافية والأمان</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            سياسة الخصوصية وشروط الاستخدام
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto mb-8">
            نلتزم في منصة أثر بأعلى معايير الأمان وحماية البيانات لضمان تجربة موثوقة لجميع مستخدمينا.
          </p>

          <div data-aos="zoom-in" data-aos-delay="300" className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium bg-slate-800/50 w-fit mx-auto px-6 py-3 rounded-xl border border-slate-700/50">
            <FileText size={16} />
            <span>تاريخ النفاذ وآخر تحديث: أغسطس 2026</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Layout */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation (Sticky) */}
            <div className="lg:w-1/3 hidden lg:block">
              <div data-aos="fade-left" className="sticky top-24 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  <Scale className="text-emerald-600" />
                  محتويات الوثيقة
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#data-protection" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      جمع البيانات وحمايتها
                    </a>
                  </li>
                  <li>
                    <a href="#verification" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      اعتماد المستفيدين
                    </a>
                  </li>
                  <li>
                    <a href="#quality" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      معايير سلامة المواد
                    </a>
                  </li>
                  <li>
                    <a href="#intellectual-property" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      حقوق الملكية الفكرية
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Policies Content */}
            <div className="lg:w-2/3 space-y-8">
              
              <div id="data-protection" data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">1. جمع البيانات وحمايتها</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  نحن نلتزم بحماية خصوصية جميع المستخدمين. لا يتم جمع سوى البيانات الضرورية لتقديم الخدمات (مثل الاسم، البريد الإلكتروني، ومعلومات التواصل اللوجستية). يتم تشفير كافة بيانات الحسابات وتخزينها بأمان تام وفق أحدث المعايير التقنية المعمول بها.
                </p>
                <div className="mt-6 bg-slate-50 p-4 rounded-xl flex items-start gap-3 border border-slate-100">
                  <Server size={20} className="text-slate-400 shrink-0 mt-1" />
                  <p className="text-sm text-slate-500 leading-relaxed">تُخزن البيانات في خوادم سحابية آمنة ومحمية بجدران حماية متقدمة، ولا يتم مشاركتها مع أي أطراف تسويقية خارجية بأي شكل من الأشكال.</p>
                </div>
              </div>

              <div id="verification" data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserCheck size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">2. شروط اعتماد المستفيدين والمنظمات</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  تخضع جميع طلبات تسجيل المستفيدين والحسابات الخاصة بهم لتدقيق ومراجعة دقيقة ومباشرة من قبل فريق إدارة المنصة. لا يُسمح بتقديم طلبات أو تخصيص موارد إلا بعد اعتماد الحساب رسمياً لضمان توجيه الدعم لمستحقيه الفعليين.
                </p>
              </div>

              <div id="quality" data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldAlert size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">3. معايير سلامة وصلاحية المواد المتبرع بها</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  يشترط في كافة العناصر والأدوات والملابس المعروضة للتبرع عبر المنصة أن تكون بحالة جيدة، نظيفة، صالحة للاستخدام الآمن، وخالية من أي عيوب تهدد سلامة المستفيد النهائي. يحق لإدارة المنصة حجب أو رفض أي عنصر لا يتوافق مع معايير الجودة والسلامة حفاظاً على كرامة وسلامة المستفيدين.
                </p>
              </div>

              <div id="intellectual-property" data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">4. حقوق الملكية الفكرية وسلوك الاستخدام</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  جميع محتويات منصة أثر من تصميمات، شعارات، برمجيات، ونصوص هي ملكية حصرية للمنصة. يُحظر استخدام المنصة لأي غايات تجارية أو غير قانونية، وتلتزم الأطراف كافة بحسن النية وسلوك الاحترام المتبادل داخل مجتمع المنصة.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact CTA Section */}
      <section className="py-16 mb-8 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div data-aos="zoom-in" className="bg-emerald-600 rounded-[3rem] p-10 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-right flex-1">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-3">هل لديك استفسار حول سياساتنا؟</h3>
                <p className="text-emerald-100 font-medium">
                  فريقنا القانوني وفريق الدعم الفني متواجدان دائماً للرد على أي أسئلة تتعلق بخصوصيتك.
                </p>
              </div>
              <Link 
                href="/contact"
                className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-3 whitespace-nowrap shadow-lg shrink-0"
              >
                <Mail size={20} />
                تواصل مع الإدارة
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}