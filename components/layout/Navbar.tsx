"use client";

import Link from "next/link";
import { Heart, LogOut, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth"); // Redirects to login page upon sign out
    router.refresh();
  };

  // Completely hide the Navbar on any dashboard route
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="شعار أثر" className="w-50 h-50 object-contain" />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">الرئيسية</Link>
          <Link href="/about" className="hover:text-emerald-600 transition-colors">من نحن</Link>
          <Link href="/how-it-works" className="hover:text-emerald-600 transition-colors">كيف تعمل المنصة</Link>
          <Link href="/policy" className="hover:text-emerald-600 transition-colors">السياسة</Link>
          {session && (
            <Link href="/dashboard" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <LayoutDashboard size={16} /> لوحة التحكم
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 rounded-xl bg-red-50 transition-colors"
            >
              <LogOut size={16} /> تسجيل الخروج
            </button>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="text-sm font-medium text-slate-700 hover:text-emerald-600 px-3 py-2"
              >
                تسجيل الدخول
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                تبرع الآن
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}