import Link from "next/link";
import { UploadCloud, Search, Truck, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          آلية العمل
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
          كيف تحول منصة عطاء تبرعاتك إلى أثر حقيقي؟
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          دورة عمل ذكية، مدروسة ومبسطة تضمن سهولة الإجراءات وسرعة الاستجابة لجميع أطراف المنظومة.
        </p>
      </div>

      {/* Steps Flow */}
      <div className="space-y-6 mb-16">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-2xl shadow-lg shadow-emerald-600/20">
            01
          </div>
          <div className="flex-1 text-right">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <UploadCloud className="text-emerald-600" /> التصنيف الذكي ورفع التبرع
            </h3>
            <p className="text-slate-600 leading-relaxed">
              يقوم المتبرع أو المنظمة برفع صورة العنصر الفائض (ملابس، أثاث، أدوات، كتب). تتولى خوارزميات الرؤية الحاسوبية تحليل الصورة وتصنيفها تلقائياً لتوفير الوقت وتسهيل عملية البحث.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-2xl shadow-lg shadow-emerald-600/20">
            02
          </div>
          <div className="flex-1 text-right">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Search className="text-emerald-600" /> طلبات الاحتياج والمطابقة
            </h3>
            <p className="text-slate-600 leading-relaxed">
              يستعرض المستفيدون المعتمدون (بعد مراجعة الإدارة) والجهات الخيرية المعروضات المتاحة أو يقدمون طلبات احتياج محددة لتتم مطابقتها فورياً وفق معايير الأولوية والإلحاح.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-2xl shadow-lg shadow-emerald-600/20">
            03
          </div>
          <div className="flex-1 text-right">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Truck className="text-emerald-600" /> النقل والتوصيل الميداني
            </h3>
            <p className="text-slate-600 leading-relaxed">
              يستلم فريق المتطوعين مهام نقل التبرعات المخصصة من مواقع المتبرعين أو المستودعات إلى عناوين المستفيدين النهائية بكل احترافية وسرية.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-2xl shadow-lg shadow-emerald-600/20">
            04
          </div>
          <div className="flex-1 text-right">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-600" /> التأكد والإشعارات التلقائية
            </h3>
            <p className="text-slate-600 leading-relaxed">
              بمجرد تأكيد المتطوع إتمام عملية التسليم، يُرسل النظام إشعيداً فورياً وتلقائياً للمتبرع يشكره على إسهامه ويوثق اكتمال دورة التبرع بنجاح تام.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">هل أنت مستعد لبدء إحداث الفارق؟</h3>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">انضم الآن إلى شبكتنا وساهم في تدوير الموارد بكفاءة عالية.</p>
        <Link 
          href="/donate"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20"
        >
          ابدأ التبرع الآن <ArrowRight size={18} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
}