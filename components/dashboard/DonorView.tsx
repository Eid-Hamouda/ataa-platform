import { useState } from "react";
import { Package, CheckCircle2, Circle, PlusCircle, X, Heart, Upload, MapPin, Sparkles, HeartHandshake, Target, AlertCircle } from "lucide-react";
import { UserProfile, DonationItem, NeedRequest } from "@/types";
import MapPicker from "@/components/MapPicker";
import { analyzeItemAction } from "@/app/actions/aiActions";
import toast from "react-hot-toast";

interface DonorViewProps {
  activeTab: string; 
  donations: DonationItem[]; 
  needs: NeedRequest[]; 
  profile: UserProfile | null;
  isAddDonationModalOpen: boolean; 
  setIsAddDonationModalOpen: (v: boolean) => void;
  donorFormData: any; 
  setDonorFormData: (data: any) => void;
  donorFile: File | null; 
  setDonorFile: (file: File | null) => void;
  handleDonorCreateItem: (e: React.FormEvent) => void; 
  isSubmitting: boolean;
}

export default function DonorView(props: DonorViewProps) {
  const {
    activeTab, donations, needs, profile,
    isAddDonationModalOpen, setIsAddDonationModalOpen, donorFormData, setDonorFormData,
    donorFile, setDonorFile, handleDonorCreateItem, isSubmitting
  } = props;

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // دالة الذكاء الاصطناعي المحدثة (لا تغير الفئة إذا كان التبرع لطلب محدد)
  const handleImageChange = async (file: File | null) => {
    if (!file) return;
    setDonorFile(file);
    setIsAnalyzing(true);
    const toastId = toast.loading("🤖 الذكاء الاصطناعي يحلل الصورة...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const analysis = await analyzeItemAction(formData);
      setIsAnalyzing(false);

      if (analysis) {
        setDonorFormData((prev: any) => ({
          ...prev,
          // إذا كان التبرع لطلب، نحتفظ بالعنوان والفئة الأساسية للطلب
          title: prev.target_need_id ? prev.title : (analysis.suggested_title || prev.title),
          category: prev.target_need_id ? prev.category : (analysis.category || prev.category),
          sub_category: prev.target_need_id ? prev.sub_category : (analysis.sub_category || prev.sub_category),
          condition: analysis.condition || prev.condition,
        }));
        toast.success(donorFormData.target_need_id ? `✨ تم فحص الصورة وتحديد حالة العنصر بنجاح` : `✨ تم التصنيف بنجاح: ${analysis.category}`, { id: toastId });
      } else {
        throw new Error();
      }
    } catch {
      setIsAnalyzing(false);
      toast.error("تعذر التحليل تلقائياً، يرجى تعبئة الحقول يدوياً.", { id: toastId });
    }
  };

  const handleDonateToNeed = (need: NeedRequest) => {
    setDonorFormData({
      title: `تلبية طلب: ${need.title}`,
      category: need.category,
      sub_category: need.sub_category,
      condition: "ممتازة",
      description: "",
      location: "",
      target_need_id: need.id
    });
    setIsAddDonationModalOpen(true);
  };

  const getStepStatus = (currentStatus: string, stepId: string) => {
    const statuses = ["available", "reserved", "completed"];
    const currentIndex = statuses.indexOf(currentStatus);
    const stepIndex = statuses.indexOf(stepId);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  // العثور على معلومات الطلب المستهدف (إن وُجد) لعرضها في النافذة المخصصة
  const targetNeedDetails = donorFormData.target_need_id ? needs.find(n => n.id === donorFormData.target_need_id) : null;

  return (
    <>
      {/* =========================================================================
          النافذة 1: نافذة التبرع لتلبية طلب احتياج محدد (Targeted Donation Modal)
          ========================================================================= */}
      {isAddDonationModalOpen && donorFormData.target_need_id && targetNeedDetails && (
        <div className="fixed inset-0 bg-slate-900/70 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-emerald-500">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Target size={24} /></div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">تلبية نداء إنساني</h2>
                  <p className="text-xs text-slate-500 mt-1">جزاك الله خيراً على استجابتك السريعة لهذا الطلب</p>
                </div>
              </div>
              <button onClick={() => { setIsAddDonationModalOpen(false); setDonorFormData({ ...donorFormData, target_need_id: null }); }} className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* بطاقة معلومات الطلب المستهدف */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5"><HeartHandshake size={14} className="text-emerald-600"/> أنت تتبرع لتغطية:</p>
                <p className="text-base font-extrabold text-slate-900">{targetNeedDetails.title}</p>
                <p className="text-xs text-slate-600 mt-1">{targetNeedDetails.category} - {targetNeedDetails.sub_category}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1">
                  الكمية المطلوبة: <span className="text-emerald-700">{targetNeedDetails.quantity}</span>
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border ${targetNeedDetails.urgency === 'حرج طارئ' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  <AlertCircle size={14} /> {targetNeedDetails.urgency}
                </span>
              </div>
            </div>

            <form onSubmit={handleDonorCreateItem} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">صورة العنصر (مطلوبة للتحقق الذكي من الحالة)</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-6 text-center bg-emerald-50/30 hover:bg-emerald-50 transition-colors cursor-pointer relative">
                  <input type="file" accept="image/*" required onChange={(e) => handleImageChange(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Upload className="mx-auto text-emerald-600 mb-2" size={28} />
                  <p className="text-sm font-bold text-slate-700">{donorFile ? donorFile.name : "اضغط لرفع صورة التبرع"}</p>
                  {isAnalyzing && <p className="text-xs text-emerald-600 font-bold mt-2 animate-pulse">✨ جارٍ تحليل حالة الصورة...</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الفئة (تلقائي)</label>
                  <input type="text" disabled value={donorFormData.category} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-100 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">التصنيف الفرعي (تلقائي)</label>
                  <input type="text" disabled value={donorFormData.sub_category} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-100 cursor-not-allowed" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">حالة العنصر الفعنية</label>
                <select value={donorFormData.condition} onChange={(e) => setDonorFormData({ ...donorFormData, condition: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm">
                  <option value="ممتازة">ممتازة</option>
                  <option value="جيدة جداً">جيدة جداً</option>
                  <option value="مقبولة">مقبولة (تؤدي الغرض)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><MapPin size={18} className="text-emerald-600" /> حدد موقعك لاستلام العنصر منك</label>
                <MapPicker onLocationSelect={(lat, lng) => setDonorFormData({ ...donorFormData, location: `إحداثيات الخريطة: ${lat.toFixed(4)}, ${lng.toFixed(4)}` })} />
                <input type="text" required placeholder="أو اكتب الموقع نصياً (المدينة، الحي...)" value={donorFormData.location} onChange={(e) => setDonorFormData({ ...donorFormData, location: e.target.value })} className="w-full mt-3 px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white outline-none" />
              </div>

              <button type="submit" disabled={isSubmitting || isAnalyzing} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-extrabold hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-50">
                {isSubmitting ? "جاري الاعتماد..." : "تأكيد التبرع وإرسال العنصر"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          النافذة 2: نافذة التبرع العام للكاتالوج (General Donation Modal)
          ========================================================================= */}
      {isAddDonationModalOpen && !donorFormData.target_need_id && (
        <div className="fixed inset-0 bg-slate-900/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Heart size={20} /></div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    إضافة تبرع للكاتالوج
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-normal"><Sparkles size={12}/> مدعوم بالذكاء الاصطناعي</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">ارفع الصورة وسيقوم الذكاء الاصطناعي باقتراح التصنيف تلقائياً</p>
                </div>
              </div>
              <button onClick={() => setIsAddDonationModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={handleDonorCreateItem} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">صورة العنصر (ارفعها أولاً)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer relative">
                  <input type="file" accept="image/*" required onChange={(e) => handleImageChange(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Upload className="mx-auto text-emerald-600 mb-2" size={32} />
                  <p className="text-sm font-bold text-slate-700">{donorFile ? donorFile.name : "اضغط هنا لرفع الصورة"}</p>
                  {isAnalyzing && <p className="text-xs text-emerald-600 font-bold mt-2 animate-pulse">✨ جارٍ تحليل ووصف الصورة ديناميكياً...</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">عنوان العنصر المتبرع به</label>
                <input type="text" required placeholder="مثال: حقيبة مدرسية جديدة" value={donorFormData.title} onChange={(e) => setDonorFormData({ ...donorFormData, title: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الفئة الرئيسية</label>
                  <input type="text" required placeholder="مثال: ملابس، إلكترونيات..." value={donorFormData.category} onChange={(e) => setDonorFormData({ ...donorFormData, category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف الفرعي</label>
                  <input type="text" required placeholder="مثال: معاطف شتوية..." value={donorFormData.sub_category} onChange={(e) => setDonorFormData({ ...donorFormData, sub_category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">حالة العنصر</label>
                <select value={donorFormData.condition} onChange={(e) => setDonorFormData({ ...donorFormData, condition: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="ممتازة">ممتازة</option><option value="جيدة جداً">جيدة جداً</option><option value="مقبولة">مقبولة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><MapPin size={18} className="text-emerald-600" /> حدد موقع الاستلام</label>
                <MapPicker onLocationSelect={(lat, lng) => setDonorFormData({ ...donorFormData, location: `إحداثيات الخريطة: ${lat.toFixed(4)}, ${lng.toFixed(4)}` })} />
                <input type="text" required placeholder="الموقع نصياً..." value={donorFormData.location} onChange={(e) => setDonorFormData({ ...donorFormData, location: e.target.value })} className="w-full mt-3 px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-slate-50 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الوصف</label>
                <textarea rows={3} required value={donorFormData.description} onChange={(e) => setDonorFormData({ ...donorFormData, description: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <button type="submit" disabled={isSubmitting || isAnalyzing} className="w-full bg-slate-900 text-white py-4 rounded-xl font-extrabold hover:bg-emerald-600 transition-all disabled:opacity-50">
                {isSubmitting ? "جاري النشر..." : "إضافة للكاتالوج"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          تبويب سجل التبرعات
          ========================================================================= */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Package className="text-emerald-600" /> تبرعاتي السابقة والنشطة
            </h2>
            <button onClick={() => setIsAddDonationModalOpen(true)} className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-colors">
              <PlusCircle size={18} /> تبرع جديد
            </button>
          </div>
          
          {donations.filter((item) => item.donor_id === profile?.id).length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">لم تقم بإضافة أي تبرعات بعد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donations.filter((item) => item.donor_id === profile?.id).map((item) => (
                <div key={item.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-5 items-start mb-6 w-full">
                    <img src={item.image_url || "/hero.png"} alt="" className="w-20 h-20 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-lg truncate" title={item.title}>{item.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <p className="text-xs text-slate-600 bg-slate-100 w-fit px-2 py-0.5 rounded-md">
                          {item.category} - {item.sub_category}
                        </p>
                        <p className="text-xs text-amber-700 bg-amber-50 w-fit px-2 py-0.5 rounded-md">
                          الحالة: {item.condition}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-1" title={item.description}>
                        {item.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-between pt-2">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
                    {[
                      { id: "available", label: "متاح بالمنصة" },
                      { id: "reserved", label: "قيد التوصيل" },
                      { id: "completed", label: "تم التسليم" }
                    ].map((step) => {
                      const status = getStepStatus(item.status, step.id);
                      return (
                        <div key={step.id} className="flex flex-col items-center bg-white px-2">
                          {status === "completed" || status === "current" ? (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${status === "completed" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600 border-2 border-emerald-500"}`}>
                              {status === "completed" ? <CheckCircle2 size={14} /> : <Circle size={10} className="fill-current" />}
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center"></div>
                          )}
                          <span className={`text-[10px] font-bold mt-2 ${status === "upcoming" ? "text-slate-400" : "text-slate-700"}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          تبويب طلبات الاحتياج المفتوحة
          ========================================================================= */}
      {activeTab === "open-needs" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="text-emerald-600" /> طلبات الاحتياج التي يمكنك تغطيتها
            </h2>
          </div>
          
          {needs.filter(n => n.status === "pending" && (n.quantity || 1) > 0).length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">لا توجد طلبات احتياج مفتوحة في الوقت الحالي.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {needs.filter(n => n.status === "pending" && (n.quantity || 1) > 0).map(need => (
                <div key={need.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-extrabold text-slate-900 text-lg line-clamp-1" title={need.title}>{need.title}</h3>
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border shrink-0 ${need.urgency === 'حرج طارئ' ? 'bg-red-50 text-red-700 border-red-200' : need.urgency === 'عاجل' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        {need.urgency}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {need.category} - {need.sub_category}
                      </span>
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md font-bold border border-emerald-100">
                        الكمية المطلوبة: {need.quantity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-6 line-clamp-2" title={need.description}>
                      {need.description}
                    </p>
                  </div>
                  
                  <button onClick={() => handleDonateToNeed(need)} className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-sm">
                    تبرع لتغطية هذا الطلب
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}