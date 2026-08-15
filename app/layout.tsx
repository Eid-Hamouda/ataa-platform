import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import 'leaflet/dist/leaflet.css';

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "منصة عطاء - العمل الخيري وتدوير الموارد",
  description: "منصة موثوقة تربط المعروضات الخيرية بالطلبات الحقيقية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans bg-slate-50 min-h-screen text-slate-900`}>
        <AOSInit />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
      
    </html>
  );
}