import {
  PlusCircle, Store, ShoppingCart, MapPin, Trash2, Package, HeartHandshake, ExternalLink, X, Phone, CheckCircle2
} from "lucide-react";
import { UserProfile, DonationItem, NeedRequest } from "@/types";
import MapPicker from "@/components/MapPicker";

interface BeneficiaryViewProps {
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  profile: UserProfile | null; 
  donations: DonationItem[]; 
  needs: NeedRequest[]; 
  cart: DonationItem[];
  newNeed: any; 
  setNewNeed: (need: any) => void;
  
  // Delivery Checkout Props (for Cart)
  deliveryAddress: string; 
  setDeliveryAddress: (address: string) => void;
  deliveryLocation: string; 
  setDeliveryLocation: (loc: string) => void;
  contactPhone: string; 
  setContactPhone: (phone: string) => void;

  handleCreateNeed: (e: React.FormEvent) => void;
  handleAddToCart: (item: DonationItem) => void;
  handleRemoveFromCart: (id: string) => void;
  handleBulkSubmit: (e: React.FormEvent) => void;
  isAddNeedModalOpen: boolean; 
  setIsAddNeedModalOpen: (v: boolean) => void;
  isSubmitting: boolean;
}

export default function BeneficiaryView(props: BeneficiaryViewProps) {
  const {
    activeTab, setActiveTab, profile, donations, needs, cart,
    newNeed, setNewNeed, deliveryAddress, setDeliveryAddress,
    deliveryLocation, setDeliveryLocation, contactPhone, setContactPhone,
    handleCreateNeed, handleAddToCart, handleRemoveFromCart, handleBulkSubmit,
    isAddNeedModalOpen, setIsAddNeedModalOpen, isSubmitting
  } = props;

  // جلب الاقتراحات من الكاتالوج عند كتابة المستفيد في النموذج
  const suggestions = donations.filter(d => 
    d.status === "available" && 
    newNeed.category && 
    newNeed.category.length >= 2 &&
    ((d.category || "").includes(newNeed.category) || (d.sub_category || "").includes(newNeed.category) || newNeed.category.includes(d.category || ""))
  ).slice(0, 3);

  return (
    <>
      {/* نافذة تقديم طلب احتياج جديد */}
      {isAddNeedModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-emerald-600" /> تقديم طلب احتياج جديد
              </h2>
              <button onClick={() => setIsAddNeedModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateNeed} className="space-y-6">
              
              {/* القسم الأول: تفاصيل الاحتياج الأساسية */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">عنوان الاحتياج</label>
                  <input type="text" placeholder="مثال: أثاث مدرسي أو ملابس أطفال" required value={newNeed.title} onChange={(e) => setNewNeed({ ...newNeed, title: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">الفئة الرئيسية</label>
                    <input type="text" required placeholder="مثال: ملابس، إلكترونيات..." value={newNeed.category} onChange={(e) => setNewNeed({ ...newNeed, category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">التصنيف الفرعي</label>
                    <input type="text" required placeholder="مثال: طاولات..." value={newNeed.sub_category} onChange={(e) => setNewNeed({ ...newNeed, sub_category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                {/* قسم الاقتراحات الذكية */}
                {suggestions.length > 0 && (
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 animate-in fade-in">
                    <p className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-1.5"><CheckCircle2 size={16}/> وجدنا عناصر متاحة في المنصة قد تناسب طلبك:</p>
                    <div className="space-y-3">
                      {suggestions.map(s => (
                        <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-lg border border-emerald-100 shadow-sm gap-3">
                          <div className="flex items-center gap-3">
                            <img src={s.image_url || "/hero.png"} alt="" className="w-12 h-12 rounded-md object-cover border border-slate-100" />
                            <div>
                              <p className="text-sm font-bold text-slate-900 line-clamp-1">{s.title}</p>
                              <p className="text-xs text-slate-500 mt-1">{s.category} | الحالة: {s.condition}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => { handleAddToCart(s); setIsAddNeedModalOpen(false); setActiveTab("cart"); }} className="text-xs bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 whitespace-nowrap">
                            احجز هذا العنصر الآن
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">الكمية المطلوبة</label>
                    <input type="number" min="1" required value={newNeed.quantity || 1} onChange={(e) => setNewNeed({ ...newNeed, quantity: parseInt(e.target.value) || 1 })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">درجة الأولوية</label>
                    <select value={newNeed.urgency} onChange={(e) => setNewNeed({ ...newNeed, urgency: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                      <option value="عادي">عادي</option>
                      <option value="عاجل">عاجل</option>
                      <option value="حرج طارئ">حرج طارئ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">تفاصيل إضافية ومبررات الطلب</label>
                  <textarea rows={2} required placeholder="اكتب تفاصيل الاحتياج ومبرراته..." value={newNeed.description} onChange={(e) => setNewNeed({ ...newNeed, description: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              {/* القسم الثاني: معلومات التوصيل والاستلام */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">معلومات التواصل والتوصيل</h3>
                
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-emerald-600" /> رقم التواصل (سوريا)
                  </label>
                  <input type="tel" required placeholder="مثال: 0933123456" value={newNeed.contact_phone || ""} onChange={(e) => setNewNeed({ ...newNeed, contact_phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white" dir="ltr" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-600" /> موقع التوصيل على الخريطة
                  </label>
                  <MapPicker onLocationSelect={(lat, lng) => setNewNeed({ ...newNeed, delivery_location: `إحداثيات: ${lat.toFixed(4)}, ${lng.toFixed(4)}` })} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">العنوان بالتفصيل</label>
                  <textarea rows={2} required placeholder="المدينة، الحي، الشارع، بناء رقم..." value={newNeed.delivery_address || ""} onChange={(e) => setNewNeed({ ...newNeed, delivery_address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-lg">
                إرسال الطلب للمنصة
              </button>
            </form>
          </div>
        </div>
      )}

      {/* تبويب الكاتالوج */}
      {activeTab === "catalog" && (
        <div className="animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Store className="text-emerald-600" /> الكاتالوج المتاح
            </h2>
            <button onClick={() => setActiveTab("cart")} className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-200 transition-colors">
              <ShoppingCart size={18} /> سلة الحجز ({cart.length})
            </button>
          </div>
          {donations.filter((d) => d.status === "available").length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <Package size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">لا توجد عناصر متاحة للحجز في الوقت الحالي.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.filter((d) => d.status === "available").map((item) => {
                const cleanLocation = item.location ? item.location.replace("إحداثيات الخريطة:", "").replace("إحداثيات:", "").trim() : "";
                return (
                  <div key={item.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="relative overflow-hidden h-48">
                        <img src={item.image_url || "/hero.png"} alt="" className="w-full h-full object-cover border-b group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 right-3 text-xs px-3 py-1 bg-white/90 text-emerald-800 rounded-full font-bold shadow-sm">{item.category}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-extrabold text-slate-900 text-lg">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                           <p className="text-xs text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-md">{item.sub_category}</p>
                           <p className="text-xs text-amber-700 bg-amber-50 w-fit px-2 py-0.5 rounded-md">الحالة: {item.condition}</p>
                        </div>
                        <p className="text-sm text-slate-500 mt-3 line-clamp-2" title={item.description}>{item.description}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 mt-4 flex justify-between items-center">
                      <div className="flex items-center bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-200 max-w-[50%]">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        <span className="text-xs text-slate-600 font-medium mx-1.5 truncate" title={item.location}>{item.location}</span>
                        {cleanLocation && (
                           <a
                             href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanLocation)}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 p-1 rounded-md shrink-0"
                           >
                             <ExternalLink size={12} />
                           </a>
                        )}
                      </div>
                      <button onClick={() => handleAddToCart(item)} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors">إضافة للسلة</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* تبويب السلة (إتمام الطلب) */}
      {activeTab === "cart" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm max-w-2xl mx-auto animate-in fade-in">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShoppingCart className="text-emerald-600" /> إتمام الطلب الجماعي
          </h2>
          {cart.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-sm font-medium">سلتك فارغة حالياً.</p>
              <button onClick={() => setActiveTab("catalog")} className="mt-4 px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold hover:bg-emerald-200 transition-colors">تصفح الكاتالوج</button>
            </div>
          ) : (
            <form onSubmit={handleBulkSubmit} className="space-y-6">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img src={item.image_url || "/hero.png"} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</p>
                        <div className="flex gap-2">
                           <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">{item.category}</p>
                           <p className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-1">{item.condition}</p>
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleRemoveFromCart(item.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* تفاصيل التوصيل */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-emerald-600" /> رقم التواصل (سوريا)
                  </label>
                  <input type="tel" required placeholder="مثال: 0933123456" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white" dir="ltr" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-600" /> موقع التوصيل على الخريطة
                  </label>
                  <MapPicker onLocationSelect={(lat, lng) => setDeliveryLocation(`إحداثيات: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">العنوان بالتفصيل</label>
                  <textarea rows={2} required placeholder="المدينة، الحي، الشارع، بناء رقم..." value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                تأكيد حجز ({cart.length}) عناصر
              </button>
            </form>
          )}
        </div>
      )}

      {/* تبويب طلباتي السابقة */}
      {activeTab === "my-needs" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HeartHandshake className="text-emerald-600" /> سجل طلباتي المرفوعة
          </h2>
          <div className="space-y-4">
            {needs.filter((n) => n.beneficiary_id === profile?.id).length === 0 ? (
               <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-sm font-medium">
                 لم تقم برفع أي طلبات احتياج بعد.
               </div>
            ) : (
              needs.filter((n) => n.beneficiary_id === profile?.id).map((n) => (
                <div key={n.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white transition-colors shadow-sm">
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{n.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        الفئة: {n.category} ({n.sub_category})
                      </span>
                      <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                        أولوية: {n.urgency}
                      </span>
                      <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                        الكمية المطلوبة: {n.quantity || 1}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 line-clamp-2" title={n.description}>{n.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${n.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
                      حالة الطلب: {n.status === 'completed' ? 'مكتمل/مُلبى' : n.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}