import { ShieldAlert, Lock, UserCheck, FileText } from "lucide-react";

export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          السياسات والأمان
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
          سياسة الخصوصية وشروط الاستخدام
        </h1>
        <p className="text-slate-500 text-sm">تاريخ النفاذ والآخر تحديث: أغسطس 2026</p>
      </div>

      {/* Policy Content Blocks */}
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lock className="text-emerald-600" size={22} /> 1. جمع البيانات وحمايتها
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            نحن نلتزم بحماية خصوصية جميع المستخدمين. لا يتم جمع سوى البيانات الضرورية لتقديم الخدمات (مثل الاسم، البريد الإلكتروني، ومعلومات التواصل اللوجستية). يتم تشفير كافة بيانات الحسابات وتخزينها بأمان تام وفق أحدث المعايير التقنية المعمول بها.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <UserCheck className="text-emerald-600" size={22} /> 2. شروط اعتماد المستفيدين والمنظمات
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            تخضع جميع طلبات تسجيل المستفيدين والحسابات الخاصة بهم لتدقيق ومراجعة دقيقة ومباشرة من قبل فريق إدارة المنصة. لا يُسمح بتقديم طلبات أو تخصيص موارد إلا بعد اعتماد الحساب رسمياً لضمان توجيه الدعم لمستحقيه الفعليين.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldAlert className="text-emerald-600" size={22} /> 3. معايير سلامة وصلاحية المواد المتبرع بها
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            يشترط في كافة العناصر والأدوات والملابس المعروضة للتبرع عبر المنصة أن تكون بحالة جيدة، نظيفة، صالحة للاستخدام الآمن، وخالية من أي عيوب تهدد سلامة المستفيد النهائي. يحق لإدارة المنصة حجب أو رفض أي عنصر لا يتوافق مع معايير الجودة والسلامة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="text-emerald-600" size={22} /> 4. حقوق الملكية الفكرية وسلوك الاستخدام
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            جميع محتويات منصة أثر من تصميمات، شعارات، برمجيات، ونصوص هي ملكية حصرية للمنصة. يُحظر استخدام المنصة لأي غايات تجارية أو غير قانونية، وتلتزم الأطراف كافة بحسن النية وسلوك الاحترام المتبادل.
          </p>
        </div>
      </div>
    </div>
  );
}