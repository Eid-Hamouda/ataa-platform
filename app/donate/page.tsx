"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Heart, Upload, MapPin, ArrowRight } from "lucide-react";
import MapPicker from "@/components/MapPicker";

const subCategoriesMap: Record<string, string[]> = {
  ملابس: ["ملابس شتوية", "ملابس صيفية", "أحذية", "ملابس أطفال"],
  كتب: ["كتب مدرسية", "كتب روايات ومعرفة", "أدوات مكتبية وقرطاسية"],
  أثاث: ["أثاث غرف نوم", "مجالس وأريكة", "طاولات ومكاتب"],
  أجهزة: ["أجهزة منزلية كبرى", "أجهزة إلكترونية صغيرة", "هواتف وحواسيب"],
  أخرى: ["متنوعة عامة", "مستلزمات طوارئ"]
};

export default function DonatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "ملابس",
    sub_category: "ملابس شتوية",
    condition: "ممتازة",
    description: "",
    location: "الرياض"
  });

  const handleCategoryChange = (newCategory: string) => {
    setFormData({
      ...formData,
      category: newCategory,
      sub_category: subCategoriesMap[newCategory]?.[0] || "عام"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("الرجاء إرفاق صورة للعنصر المتبرع به");

    const toastId = toast.loading("جاري رفع التبرع ومعالجة البيانات...");
    setLoading(true);

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!session) {
        toast.error("الرجاء تسجيل الدخول أولاً لتسجيل التبرع", {
          id: toastId
        });
        return router.push("/auth");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `donation_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("donations-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicURLData } = supabase.storage
        .from("donations-images")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("donations").insert({
        ...formData,
        image_url: publicURLData.publicUrl,
        donor_id: session.user.id,
        status: "available"
      });

      if (insertError) throw insertError;

      toast.success("تم نشر تبرعك بنجاح في المنصة! شكراً لعطائك.", {
        id: toastId
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("حدث خطأ أثناء رفع التبرع: " + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4" dir="rtl">
      <Toaster position="bottom-right" />
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                تبرع بعنصر عيني الآن
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                أضف تفاصيل العنصر وموقعه ليتم عرضه للمستفيدين والمحتاجين
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            لوحة التحكم <ArrowRight size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              عنوان العنصر المتبرع به
            </label>
            <input
              type="text"
              required
              placeholder="مثال: معطف شتوي بحالة ممتازة / طاولات دراسية"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                الفئة الرئيسية
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none"
              >
                <option value="ملابس">ملابس</option>
                <option value="كتب">كتب</option>
                <option value="أثاث">أثاث</option>
                <option value="أجهزة">أجهزة</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                التصنيف الفرعي
              </label>
              <select
                value={formData.sub_category}
                onChange={(e) =>
                  setFormData({ ...formData, sub_category: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none"
              >
                {subCategoriesMap[formData.category]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              حالة العنصر
            </label>
            <select
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none"
            >
              <option value="ممتازة">ممتازة (شبه جديد)</option>
              <option value="جيدة جداً">
                جيدة جداً (نظيف وقابل للاستخدام الفوري)
              </option>
              <option value="مقبولة">مقبولة (يحتاج لصيانة بسيطة)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              صورة العنصر (إجبارية)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload
                className="mx-auto text-emerald-600 mb-2"
                size={32}
              />
              <p className="text-sm font-bold text-slate-700">
                {file
                  ? file.name
                  : "اضغط هنا لرفع الصورة أو اسحبها وأفلتها هنا"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WEBP بحد أقصى 5MB
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <MapPin size={18} className="text-emerald-600" /> حدد موقع
              التبرع بدقة على الخريطة
            </label>
            <p className="text-xs text-slate-500 mb-3">
              ابحث عن مدينتك أو انقر مباشرة على الخريطة لتثبيت الموقع:
            </p>
            <MapPicker
              onLocationSelect={(lat, lng) =>
                setFormData({
                  ...formData,
                  location: `إحداثيات الخريطة: ${lat.toFixed(
                    4
                  )}, ${lng.toFixed(4)}`
                })
              }
            />
            <input
              type="text"
              required
              placeholder="أو اكتب الموقع نصياً (مثال: الرياض، حي النخيل)"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full mt-3 px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              تفاصيل إضافية
            </label>
            <textarea
              rows={3}
              placeholder="اكتب تفاصيل إضافية تساعد المتطوع أو المستفيد..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-extrabold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            {loading ? "جاري النشر..." : "تأكيد ونشر التبرع في المنصة"}
          </button>
        </form>
      </div>
    </div>
  );
}