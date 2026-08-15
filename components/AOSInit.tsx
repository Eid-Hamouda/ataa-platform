"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // استيراد ملفات الستايل الخاصة بالحركات

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800, // مدة الحركة بالميللي ثانية
      once: true, // تشغيل الحركة مرة واحدة فقط عند النزول
      easing: 'ease-out-cubic', // نوع انسيابية الحركة
      offset: 50, // المسافة قبل بدء الحركة
    });
  }, []);

  return null; // هذا المكون لن يعرض شيئاً على الشاشة، وظيفته برمجية فقط
}