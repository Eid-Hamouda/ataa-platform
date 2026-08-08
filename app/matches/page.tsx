"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Sparkles, MapPin, CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SmartMatchingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeNeed, setActiveNeed] = useState<any | null>(null);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // 1. Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("يرجى تسجيل الدخول لعرض المطابقات الذكية.");

        // 2. Fetch the user's most recent active need
        const { data: needsData, error: needsError } = await supabase
          .from("needs")
          .select("*")
          .eq("beneficiary_id", user.id)
          .eq("status", "available")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        // If they have no active needs, stop here
        if (needsError && needsError.code !== "PGRST116") {
          throw needsError; 
        }
        
        if (!needsData) {
          setLoading(false);
          return;
        }

        setActiveNeed(needsData);

        // 3. Fetch available donations that match the exact category of the need
        const { data: donationsData, error: donationsError } = await supabase
          .from("donations")
          .select("*")
          .eq("status", "available")
          .eq("category", needsData.category);

        if (donationsError) throw donationsError;

        // 4. Run a basic matching algorithm to score the results
        const scoredMatches = (donationsData || []).map(donation => {
          let score = 70; // Base score for matching the category
          let reasons = ["تطابق الفئة"];

          // Boost score based on condition
          if (donation.condition === "جديدة") {
            score += 25;
            reasons.push("حالة ممتازة (جديدة)");
          } else if (donation.condition === "حالة جيدة") {
            score += 15;
            reasons.push("حالة مناسبة للاستخدام");
          }

          // In a real app, you would calculate geolocation distance here
          if (donation.location) {
            reasons.push(`الموقع: ${donation.location}`);
          }

          return { ...donation, matchScore: score, matchReasons: reasons };
        });

        // Sort by highest score first
        setMatches(scoredMatches.sort((a, b) => b.matchScore - a.matchScore));

      } catch (err: any) {
        setError(err.message || "حدث خطأ أثناء جلب البيانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-emerald-600 gap-4">
        <Loader2 size={40} className="animate-spin" />
        <p className="font-medium">جاري تحليل البيانات والبحث عن أفضل المطابقات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl flex items-start gap-3">
          <AlertCircle size={24} className="shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!activeNeed) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm">
          <Sparkles size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">لا توجد طلبات نشطة</h2>
          <p className="text-slate-600 mb-8">قم بإضافة احتياجاتك وسيقوم الذكاء الاصطناعي بالبحث عن أفضل التبرعات المطابقة لها.</p>
          <Button variant="primary">أضف احتياجاً جديداً</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      
      {/* Header with Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowRight size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">المطابقة الذكية</h1>
          <p className="text-slate-600">اقتراحات مخصصة بناءً على طلباتك النشطة.</p>
        </div>
      </div>

      {/* Active Need Context Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">الطلب النشط الحالي</p>
          <h2 className="text-xl font-bold text-slate-900">{activeNeed.title}</h2>
          <div className="flex gap-3 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              {activeNeed.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
              {activeNeed.urgency}
            </span>
          </div>
        </div>
        
        {matches.length > 0 && (
          <div className="bg-purple-50 text-purple-700 px-4 py-3 rounded-xl flex items-center gap-3 border border-purple-100">
            <Sparkles size={20} className="text-purple-500" />
            <span className="font-medium text-sm">وجدنا {matches.length} عناصر قد تناسب طلبك</span>
          </div>
        )}
      </div>

      {/* Recommendations Grid or Empty State */}
      {matches.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
          <p className="text-slate-500 font-medium text-lg">لم نعثر على تطابقات دقيقة حتى الآن.</p>
          <p className="text-slate-400 text-sm mt-1">سنقوم بإشعارك فور توفر عنصر يطابق طلبك.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col relative overflow-hidden">
              
              {/* AI Match Score Badge */}
              <div className={`absolute top-0 left-0 w-full h-1 ${item.matchScore >= 90 ? 'bg-emerald-500' : item.matchScore >= 75 ? 'bg-amber-400' : 'bg-slate-300'}`} />
              
              <div className="flex justify-between items-start mb-4 pt-2">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  <Sparkles size={14} className={item.matchScore >= 90 ? 'text-emerald-600' : 'text-amber-600'} />
                  <span className="text-xs font-bold text-slate-700">{item.matchScore}% تطابق</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              
              <div className="space-y-2 mb-5">
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle2 size={16} className="ml-2 text-slate-400" />
                  <span>الحالة: {item.condition}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin size={16} className="ml-2 text-slate-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* AI Reasoning Tags */}
              <div className="mb-6 flex-grow">
                <p className="text-xs font-medium text-slate-500 mb-2">لماذا نقترح هذا؟</p>
                <div className="flex flex-wrap gap-2">
                  {item.matchReasons.map((reason: string, idx: number) => (
                    <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="primary" className="w-full">
                تأكيد طلب العنصر
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}