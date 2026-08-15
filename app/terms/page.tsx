"use client";

import Link from "next/link";
import { 
  FileSignature, 
  Scale, 
  UserCheck, 
  AlertTriangle, 
  Gavel, 
  RefreshCw,
  Mail,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-slate-900 text-white">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-bold mb-6">
            <Scale size={16} />
            <span>الالتزام والمسؤولية</span>
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            شروط وأحكام الاستخدام
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto mb-8">
            تنظم هذه الشروط والأحكام استخدامك لمنصة "أثر". باستخدامك للمنصة، فإنك توافق على الالتزام بكافة البنود الموضحة أدناه لضمان بيئة عطاء آمنة وموثوقة.
          </p>

          <div data-aos="zoom-in" data-aos-delay="300" className="inline-block text-slate-400 text-sm font-medium bg-slate-800/50 px-6 py-3 rounded-xl border border-slate-700/50">
            تاريخ النفاذ وآخر تحديث: أغسطس 2026
          </div>
        </div>
      </section>

      {/* 2. Terms Content Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            
            {/* Block 1: Acceptance */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FileSignature size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">1. الموافقة على الشروط</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    وصولك إلى منصة "أثر" واستخدامك لخدماتها يعني موافقتك الكاملة غير المشروطة على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى التوقف عن استخدام المنصة فوراً.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 2: Account Responsibilities */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCheck size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">2. التسجيل ومسؤولية الحساب</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    للاستفادة من خدمات المنصة، قد يُطلب منك إنشاء حساب. أنت مسؤول عن:
                  </p>
                  <ul className="space-y-3 text-slate-600 text-sm font-medium mt-4">
                    <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> تقديم معلومات دقيقة، حديثة، وكاملة أثناء عملية التسجيل.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> الحفاظ على سرية كلمة المرور الخاصة بك وأمان حسابك.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> تحمل المسؤولية الكاملة عن كافة الأنشطة التي تحدث تحت حسابك.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Block 3: Donors & Beneficiaries Rules */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">3. التزامات المتبرعين والمستفيدين</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">بالنسبة للمتبرعين:</h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        يلتزم المتبرع بأن تكون المواد والأشياء المعروضة للتبرع مملوكة له قانوناً، وأن تكون صالحة للاستخدام، نظيفة، ولا تشكل أي خطر صحي أو أمني على المستفيد. لا يُسمح بعرض مواد تالفة أو منتهية الصلاحية.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">بالنسبة للمستفيدين:</h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        يلتزم المستفيد بطلب التبرعات التي تلبي احتياجه الفعلي فقط، ويُمنع منعاً باتاً استلام التبرعات لغرض إعادة بيعها أو المتاجرة بها. تحتفظ المنصة بحق حظر أي حساب يثبت قيامه بذلك.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 4: Prohibited Activities */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">4. الاستخدامات المحظورة</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    يُمنع استخدام منصة أثر لأي من الأغراض التالية:
                  </p>
                  <ul className="space-y-2 text-slate-600 text-sm font-medium list-disc list-inside marker:text-red-400">
                    <li>انتهاك أي قوانين محلية أو دولية سارية.</li>
                    <li>تقديم معلومات مضللة، كاذبة، أو انتحال شخصية جهة خيرية أو فرد آخر.</li>
                    <li>نشر أو رفع أي محتوى يحتوي على فيروسات برمجية أو أكواد ضارة.</li>
                    <li>استخدام بيانات المستخدمين الآخرين لغايات التسويق أو الإزعاج.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Block 5: Disclaimer */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Gavel size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">5. إخلاء المسؤولية</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    تعمل منصة "أثر" كوسيط تقني يربط بين المتبرع والمستفيد. نحن نبذل قصارى جهدنا لضمان جودة وأمان العمليات، ولكننا لا نتحمل المسؤولية القانونية المباشرة عن جودة أو سلامة العناصر المُتبرع بها، أو عن أي نزاع قد ينشأ بين الأطراف بعد إتمام عملية التسليم.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 6: Modifications */}
            <div data-aos="fade-up" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <RefreshCw size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">6. تعديل الشروط</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    تحتفظ منصة "أثر" بالحق في تعديل أو تغيير هذه الشروط والأحكام في أي وقت. سيتم نشر أي تعديلات على هذه الصفحة وتحديث "تاريخ النفاذ". استمرارك في استخدام المنصة بعد أي تغييرات يُعد موافقة ضمنية منك على الشروط المُعدلة.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Contact CTA Section */}
      <section className="py-16 mb-8 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div data-aos="zoom-in" className="bg-gradient-to-r from-slate-100 to-white border border-slate-200 rounded-[3rem] p-10 md:p-12 text-center shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">هل يوجد بند غير واضح؟</h3>
              <p className="text-slate-600 font-medium max-w-xl mx-auto mb-8">
                نحن نحرص على الشفافية التامة. إذا كانت لديك أي استفسارات تخص شروط الاستخدام أو التزاماتك القانونية، يسعدنا تواصلك معنا.
              </p>
              <Link 
                href="/contact"
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2"
              >
                <Mail size={20} />
                التواصل مع الدعم القانوني
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}