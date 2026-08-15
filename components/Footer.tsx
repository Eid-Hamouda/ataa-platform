import Link from "next/link";
// إبقاء الأيقونات العادية من lucide
import { Mail, Phone, MapPin, Heart } from "lucide-react";
// استيراد أيقونات التواصل الاجتماعي من react-icons
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. About Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="شعار أثر" className="w-10 h-10 object-contain brightness-0 invert opacity-90" />
              <span className="text-2xl font-extrabold text-white">أثر</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              منصة خيرية ذكية تهدف إلى تسهيل التبرعات العينية وتدوير الموارد الزائدة لخدمة المجتمع، باستخدام تقنيات الذكاء الاصطناعي لضمان وصول التبرع لمستحقيه.
            </p>
            <div className="flex gap-4">
              {/* تحديث أسماء الأيقونات هنا */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><FiFacebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><FiTwitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><FiInstagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><FiLinkedin size={18} /></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors font-medium">الرئيسية</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors font-medium">من نحن</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors font-medium">كيف تعمل المنصة</Link></li>
              <li><Link href="/catalog" className="hover:text-emerald-400 transition-colors font-medium">الاحتياجات الحالية</Link></li>
            </ul>
          </div>

          {/* 3. Support & Policies */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">الدعم والسياسات</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors font-medium">الأسئلة الشائعة</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors font-medium">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors font-medium">شروط الاستخدام</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors font-medium">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">معلومات التواصل</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-emerald-500 mt-1" />
                <span className="font-medium text-slate-400">دمشق، سوريا</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-emerald-500" />
                <span className="font-medium text-slate-400" dir="ltr">+963 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-emerald-500" />
                <span className="font-medium text-slate-400">support@athar-platform.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 font-medium">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة أثر الخيرية.
          </p>
        </div>
      </div>
    </footer>
  );
}