import { Target, Eye, HeartHandshake, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          من نحن
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
          نبني مجتمعاً متكافلاً عبر تدوير الموارد الذكية
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          منصة "أثر" هي مبادرة تقنية رائدة تهدف إلى سد الفجوة بين فائض الموارد لدى الأفراد والجهات، واحتياجات الأسر والأفراد المتعففة، محققةً أعلى معايير الشفافية والأثر المستدام.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <Eye size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">رؤيتنا</h3>
          <p className="text-slate-600 leading-relaxed">
            الريادة الإقليمية في تمكين العمل الخيري المستدام، والاعتماد على الابتكار التكنولوجي وخوارزميات الذكاء الاصطناعي لإعادة تدوير السلع بكفاءة مطلقة تخدم المجتمع والبيئة معاً.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <Target size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">رسالتنا</h3>
          <p className="text-slate-600 leading-relaxed">
            خلق شبكة أمان مجتمعي شفافة وموثوقة، تسهل على المتبرعين تقديم دعمهم، وتضمن وصول المساعدات العينية لمستحقيها عبر مسارات لوجستية مدروسة ومنظومة تطوعية فعالة.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm">
        قيمنا الجوهرية
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> الشفافية المطلقة
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              نؤمن بحق المجتمع في تتبع مسار التبرعات والتأكد من وصولها للمستفيدين بوضوح تام دون إشكاليات.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> الكفاءة والاستدامة
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              نعمل على تقليل الهدر من خلال إعادة تدوير المواد الصالحة للاستخدام وإطالة دورة حياتها لصالح المجتمع.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> الأمان والخصوصية
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              نحمي بيانات جميع الأطراف (متبرعين، مستفيدين، متطوعين) وفق أعلى معايير أمن المعلومات وحفظ الكرامة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}