"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, UserPlus, ArrowRight, User, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "donor",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("جاري إنشاء الحساب...");

    try {
      // 1. تسجيل المستخدم في نظام المصادقة
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. إنشاء الملف الشخصي في جدول profiles
      if (authData.user) {
        // المستفيد والمنظمة يحتاجون لموافقة الإدارة، بينما البقية يتم اعتمادهم تلقائياً
        const needsApproval = formData.role === "beneficiary" || formData.role === "organization";
        
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            full_name: formData.fullName,
            role: formData.role,
            is_approved: !needsApproval,
          },
        ]);

        if (profileError) throw profileError;
      }

      toast.success("تم إنشاء الحساب بنجاح!", { id: toastId });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إنشاء الحساب", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 py-10" dir="rtl">
      <Toaster />
      
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-2xl mb-4 shadow-sm">
            <img src="/logo.png" alt="شعار أثر" className="w-40 h-40 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">إنشاء حساب جديد</h1>
          <p className="text-sm text-slate-500 mt-2">انضم إلى منصة أثر وكن جزءاً من التغيير</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleRegister} className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="name@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">نوع الحساب (الدور)</label>
              <div className="relative">
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white appearance-none"
                >
                  <option value="donor">متبرع (أفراد)</option>
                  <option value="beneficiary">مستفيد (محتاج)</option>
                  <option value="volunteer">متطوع (مندوب توصيل)</option>
                  <option value="organization">جهة خيرية / منظمة</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 disabled:opacity-50 mt-4"
            >
              <UserPlus size={18} />
              {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              لديك حساب بالفعل؟{" "}
              <Link href="/auth/login" className="text-emerald-600 font-bold hover:text-emerald-700 inline-flex items-center gap-1 transition-colors">
                تسجيل الدخول <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}