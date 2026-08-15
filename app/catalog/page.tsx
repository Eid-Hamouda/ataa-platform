"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Package, 
  HandHeart, 
  Loader2,
  Tag,
  Sparkles
} from "lucide-react";

type ItemType = 'donation' | 'request';

interface CatalogUIItem {
  id: string;
  title: string;
  type: ItemType;
  category: string;
  location: string;
  badgeText: string;
  imageUrl?: string;
  description: string;
}

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogUIItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ItemType>('donation');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // جلب البيانات من Supabase
  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      try {
        // 1. جلب التبرعات من جدول donations
        const { data: donationsData, error: donationsError } = await supabase
          .from('donations')
          .select('*');

        if (donationsError) {
          console.error("Error fetching donations:", donationsError.message || donationsError);
        }

        // 2. جلب الطلبات من جدول needs
        const { data: requestsData, error: requestsError } = await supabase
          .from('needs')
          .select('*');

        if (requestsError) {
          console.error("Error fetching requests:", requestsError.message || requestsError);
        }

        // توحيد شكل بيانات التبرعات
        const normalizedDonations: CatalogUIItem[] = (donationsData || []).map(d => ({
          id: d.id,
          title: d.title,
          type: 'donation',
          category: d.category,
          location: d.location || 'غير محدد',
          badgeText: d.condition || 'متاح',
          imageUrl: d.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
          description: d.description || 'لا يوجد وصف متاح لهذا التبرع.',
        }));

        // توحيد شكل بيانات الطلبات (بدون صورة)
        const normalizedRequests: CatalogUIItem[] = (requestsData || []).map(r => ({
          id: r.id,
          title: r.title,
          type: 'request',
          category: r.category,
          location: r.delivery_location || 'غير محدد',
          badgeText: r.urgency === 'high' ? 'عاجل جداً' : 'طلب احتياج',
          description: r.description || 'لا يوجد وصف متاح لهذا الطلب.',
        }));

        setItems([...normalizedDonations, ...normalizedRequests]);
      } catch (error) {
        console.error("حدث خطأ غير متوقع أثناء جلب البيانات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesTab = item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory;
    
    return matchesTab && matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200" dir="rtl">
      
      {/* 1. Page Header */}
      <section className="pt-32 pb-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold mb-4 backdrop-blur-md">
            <Sparkles size={16} />
            <span>مجتمع أثر للتكافل</span>
          </div>
          <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-extrabold mb-4">
            معرض التبرعات والاحتياجات
          </h1>
          <p data-aos="fade-up" data-aos-delay="100" className="text-slate-300 text-lg max-w-2xl mx-auto">
            تصفح أحدث المواد المعروضة للتبرع، أو ابحث في الطلبات لتقديم المساعدة المباشرة للمحتاجين.
          </p>
        </div>
      </section>

      {/* 2. Controls Section (Tabs & Filters) */}
      <section className="py-8 sticky top-0 z-40 bg-slate-50/90 backdrop-blur-xl border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Tabs */}
            <div data-aos="fade-left" className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('donation')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'donation' 
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Package size={18} />
                المعروضات
              </button>
              <button 
                onClick={() => setActiveTab('request')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'request' 
                    ? 'bg-teal-100 text-teal-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <HandHeart size={18} />
                الطلبات
              </button>
            </div>

            {/* Search & Filter */}
            <div data-aos="fade-right" className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث عن شيء محدد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
              <div className="relative">
                <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 pl-4 pr-12 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="الكل">جميع التصنيفات</option>
                  <option value="أثاث">أثاث منزلي</option>
                  <option value="ملابس">ملابس</option>
                  <option value="أجهزة كهربائية">أجهزة كهربائية</option>
                  <option value="أجهزة طبية">أجهزة طبية</option>
                  <option value="كتب">كتب ومناهج</option>
                  <option value="متنوعة">متنوعة</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Catalog Grid */}
      <section className="py-12 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-emerald-600">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-lg font-bold">جاري جلب البيانات من الخوادم...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-100/60 transition-all duration-300 overflow-hidden group flex flex-col"
                >
                  {/* عرض الصورة فقط إذا كان العنصر "تبرع" */}
                  {item.type === 'donation' && item.imageUrl && (
                    <div className="relative h-56 overflow-hidden bg-slate-100 shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm text-sm font-bold text-slate-700">
                        <Tag size={14} className="text-emerald-500" />
                        {item.category}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* عرض شارة التصنيف داخل المحتوى للطلبات (لعدم وجود صورة) */}
                    {item.type === 'request' && (
                      <div className="mb-4 inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl text-sm font-bold w-fit border border-teal-100">
                        <Tag size={14} />
                        {item.category}
                      </div>
                    )}

                    <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <MapPin size={16} className="text-slate-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <Clock size={16} className={item.badgeText === 'عاجل جداً' ? 'text-red-400 shrink-0' : 'text-slate-400 shrink-0'} />
                        <span className={item.badgeText === 'عاجل جداً' ? 'text-red-500 font-bold' : ''}>{item.badgeText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm" data-aos="zoom-in">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">لا توجد نتائج مطابقة</h3>
              <p className="text-slate-500 font-medium">
                لم نتمكن من العثور على ما تبحث عنه. جرب تصنيفاً آخر أو قم بإضافة أول {activeTab === 'donation' ? 'تبرع' : 'طلب'}!
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}