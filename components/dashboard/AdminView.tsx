import { useState } from "react";
import { UserPlus, Users, PlusCircle, Package, ListFilter, Trash2, Search, Truck, X, MapPin as MapPinIcon, Sparkles, PhoneCall, MessageCircle, Map as MapIcon, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { UserProfile, DonationItem, NeedRequest } from "@/types";
import MapPicker from "@/components/MapPicker";
import { analyzeItemAction } from "@/app/actions/aiActions";
import toast from "react-hot-toast";

const COLORS = ["#059669", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

interface AdminViewProps {
  activeTab: string;
  allUsers: UserProfile[]; 
  donations: any[]; // Using any to safely access new dynamic fields like contact_phone
  needs: NeedRequest[]; 
  pendingBeneficiaries: UserProfile[];
  newUser: any; 
  setNewUser: (user: any) => void;
  newItem: any; 
  setNewItem: (item: any) => void; 
  setItemFile: (file: File | null) => void;
  handleAdminCreateUser: (e: React.FormEvent) => void; 
  handleAdminCreateItem: (e: React.FormEvent) => void;
  handleUpdateRole: (id: string, role: string) => void; 
  handleApproveUser: (id: string) => void;
  handleDeleteUser: (id: string) => void; 
  handleDeleteItem: (id: string) => void; 
  handleDeleteNeed: (id: string) => void;
  handleAssignVolunteer: (donationId: string, volunteerId: string) => void;
  isAddUserModalOpen: boolean; 
  setIsAddUserModalOpen: (v: boolean) => void;
  isAddItemModalOpen: boolean; 
  setIsAddItemModalOpen: (v: boolean) => void;
  isSubmitting: boolean;
}

export default function AdminView(props: AdminViewProps) {
  const {
    activeTab, allUsers, donations, needs, pendingBeneficiaries, newUser, setNewUser, newItem, setNewItem, setItemFile,
    handleAdminCreateUser, handleAdminCreateItem, handleUpdateRole, handleApproveUser, handleDeleteUser, handleDeleteItem, handleDeleteNeed, handleAssignVolunteer,
    isAddUserModalOpen, setIsAddUserModalOpen, isAddItemModalOpen, setIsAddItemModalOpen, isSubmitting
  } = props;

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredUsers = allUsers.filter((u) => u.full_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.role.toLowerCase().includes(userSearchTerm.toLowerCase()));
  const volunteers = allUsers.filter((u) => u.role === "volunteer");

  // Dynamic AI Vision Logic for Admins
  const handleImageChange = async (file: File | null) => {
    if (!file) return;
    setItemFile(file);
    setIsAnalyzing(true);
    const toastId = toast.loading("🤖 الذكاء الاصطناعي يحلل الصورة ويصنفها ديناميكياً...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const analysis = await analyzeItemAction(formData);
      setIsAnalyzing(false);

      if (analysis) {
        setNewItem({
          ...newItem,
          title: analysis.suggested_title || newItem.title,
          category: analysis.category || newItem.category,
          sub_category: analysis.sub_category || newItem.sub_category,
          condition: analysis.condition || newItem.condition,
        });
        toast.success(`✨ تم التصنيف بنجاح: ${analysis.category} - ${analysis.sub_category}`, { id: toastId });
      } else {
        throw new Error();
      }
    } catch {
      setIsAnalyzing(false);
      toast.error("تعذر تصنيف الصورة تلقائياً، يرجى تعبئة الحقول يدويياً.", { id: toastId });
    }
  };

  // Helper function to format Syrian numbers for WhatsApp API
  const formatWhatsAppNumber = (phone: string) => {
    if (!phone) return "";
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    if (!cleaned.startsWith("963")) cleaned = "963" + cleaned;
    return `https://wa.me/${cleaned}`;
  };

  const usersByRoleData = [
    { name: "متبرع", value: allUsers.filter((u) => u.role === "donor").length },
    { name: "مستفيد", value: allUsers.filter((u) => u.role === "beneficiary").length },
    { name: "منظمة", value: allUsers.filter((u) => u.role === "organization").length },
    { name: "متطوع", value: allUsers.filter((u) => u.role === "volunteer").length },
    { name: "مسؤول", value: allUsers.filter((u) => u.role === "admin").length }
  ];

  const donationsByCategoryData = [
    { name: "ملابس", العدد: donations.filter((d) => d.category === "ملابس").length },
    { name: "كتب", العدد: donations.filter((d) => d.category === "كتب").length },
    { name: "أثاث", العدد: donations.filter((d) => d.category === "أثاث").length },
    { name: "أجهزة", العدد: donations.filter((d) => d.category === "أجهزة").length },
    { name: "أخرى", العدد: donations.filter((d) => d.category === "أخرى").length }
  ];

  if (activeTab === "overview") {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><h3 className="text-sm text-slate-500 mb-1">المستخدمين</h3><p className="text-3xl font-extrabold text-slate-900">{allUsers.length}</p></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><h3 className="text-sm text-slate-500 mb-1">التبرعات</h3><p className="text-3xl font-extrabold text-slate-900">{donations.length}</p></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><h3 className="text-sm text-slate-500 mb-1">الاحتياجات</h3><p className="text-3xl font-extrabold text-slate-900">{needs.length}</p></div>
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 shadow-sm"><h3 className="text-sm text-amber-700 mb-1">بانتظار الاعتماد</h3><p className="text-3xl font-extrabold text-amber-600">{pendingBeneficiaries.length}</p></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-80 flex flex-col"><h3 className="text-lg font-bold text-slate-800 mb-4 text-center">توزيع المستخدمين</h3><div dir="ltr" className="w-full h-full"><ResponsiveContainer width="100%" height="100%"><PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}><Pie data={usersByRoleData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">{usersByRoleData.map((e, i) => (<Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />))}</Pie><RechartsTooltip /><Legend verticalAlign="bottom" height={36} iconType="circle" /></PieChart></ResponsiveContainer></div></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-80 flex flex-col"><h3 className="text-lg font-bold text-slate-800 mb-4 text-center">التبرعات حسب الفئة</h3><div dir="ltr" className="w-full h-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={donationsByCategoryData} margin={{ top: 20, right: 10, bottom: 20, left: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="name" reversed={true} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} width={40} /><RechartsTooltip cursor={{ fill: "#f1f5f9" }} /><Legend verticalAlign="bottom" height={36} iconType="circle" /><Bar dataKey="العدد" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} /></BarChart></ResponsiveContainer></div></div>
        </div>
      </div>
    );
  }
    const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">مكتمل</span>;
      case 'pending_delivery':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-blue-50 text-blue-700 border-blue-200">بانتظار التوصيل</span>;
      case 'pending':
        return <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-amber-50 text-amber-700 border-amber-200">بانتظار التبرع</span>;
      default:
        return <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-slate-50 text-slate-700 border-slate-200">{status}</span>;
    }
  };
  return (
    <>
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><UserPlus className="text-emerald-600" /> إضافة مستخدم جديد</h2>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdminCreateUser} className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="الاسم الكامل" required value={newUser.fullName} onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} className="px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="email" placeholder="البريد الإلكتروني" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="password" placeholder="كلمة المرور" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="admin">مسؤول</option><option value="volunteer">متطوع</option><option value="organization">منظمة</option><option value="beneficiary">مستفيد</option><option value="donor">متبرع</option>
              </select>
              <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50">إنشاء وحفظ الحساب</button>
            </form>
          </div>
        </div>
      )}

      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-emerald-600" /> إضافة عنصر للكاتالوج 
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-normal"><Sparkles size={12}/> مدعوم بالذكاء الاصطناعي</span>
              </h2>
              <button onClick={() => setIsAddItemModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdminCreateItem} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">صورة العنصر (ارفعها أولاً للتحليل التلقائي)</label>
                <input type="file" accept="image/*" required onChange={(e) => handleImageChange(e.target.files?.[0] || null)} className="w-full text-sm file:py-2 file:px-4 file:rounded-xl file:bg-emerald-50 file:text-emerald-700 border border-slate-200 rounded-xl p-2 bg-slate-50" />
                {isAnalyzing && <p className="text-xs text-emerald-600 font-bold mt-2 animate-pulse">✨ جارٍ تحليل الصورة بواسطة الذكاء الاصطناعي...</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">عنوان العنصر</label>
                <input type="text" placeholder="مثال: معطف شتوي بحالة ممتازة" required value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">الفئة الرئيسية</label>
                  <input type="text" placeholder="مثال: ملابس، كتب..." required value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">التصنيف الفرعي</label>
                  <input type="text" placeholder="مثال: شتوي، مدرسي..." required value={newItem.sub_category} onChange={(e) => setNewItem({ ...newItem, sub_category: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">حالة العنصر</label>
                <select value={newItem.condition || "ممتازة"} onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white outline-none">
                  <option value="ممتازة">ممتازة</option>
                  <option value="جيدة جداً">جيدة جداً</option>
                  <option value="مقبولة">مقبولة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">الوصف والتفاصيل</label>
                <textarea rows={3} placeholder="اكتب وصفاً تفصيلياً للعنصر..." required value={newItem.description || ""} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><MapPinIcon size={16} className="text-emerald-600" /> الموقع الجغرافي للمتبرع</label>
                <MapPicker onLocationSelect={(lat, lng) => setNewItem({ ...newItem, location: `إحداثيات: ${lat.toFixed(4)}, ${lng.toFixed(4)}` })} />
                <input type="text" placeholder="أو اكتب الموقع نصياً" required value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })} className="w-full mt-3 px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-slate-50 outline-none" />
              </div>

              <button type="submit" disabled={isSubmitting || isAnalyzing} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50">نشر وحفظ في الكاتالوج</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "manage-users" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm overflow-x-auto animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Users className="text-emerald-600" /> إدارة المستخدمين</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="ابحث بالاسم أو الدور..." value={userSearchTerm} onChange={(e) => setUserSearchTerm(e.target.value)} className="pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 outline-none w-full" />
              </div>
              <button onClick={() => setIsAddUserModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 shrink-0">
                <UserPlus size={18} /> <span className="hidden sm:inline">مستخدم جديد</span>
              </button>
            </div>
          </div>
          <div className="space-y-4 min-w-[600px]">
            {filteredUsers.map((u) => (
              <div key={u.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80 hover:bg-slate-100/50">
                <div>
                  <p className="font-bold text-slate-900">{u.full_name}</p>
                  <p className="text-xs text-slate-500 mt-1">الدور: <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{u.role}</span> | الحالة: {u.is_approved ? "معتمد" : <span className="text-amber-600 font-bold">معلق</span>}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <select value={u.role} onChange={(e) => handleUpdateRole(u.id, e.target.value)} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none">
                    <option value="admin">مسؤول</option><option value="volunteer">متطوع</option><option value="organization">منظمة</option><option value="beneficiary">مستفيد</option><option value="donor">متبرع</option>
                  </select>
                  {!u.is_approved && <button onClick={() => handleApproveUser(u.id)} className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium">اعتماد</button>}
                  <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "manage-items" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Package className="text-emerald-600" /> إدارة العناصر والتبرعات</h2>
            <button onClick={() => setIsAddItemModalOpen(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700">
              <PlusCircle size={18} /> إضافة عنصر للكاتالوج
            </button>
          </div>
          <div className="space-y-4">
            {donations.map((item) => {
              const isRequested = item.status === "reserved" || item.status === "completed";
              const cleanDeliveryLocation = item.delivery_location ? item.delivery_location.replace("إحداثيات الخريطة:", "").replace("إحداثيات:", "").trim() : "";
              
              return (
                <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-5 bg-slate-50 rounded-2xl border border-slate-200/80 gap-4 hover:bg-white transition-colors shadow-sm">
                  <div className="flex items-start gap-4 w-full">
                    <img src={item.image_url || "/hero.png"} alt="" className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-bold text-slate-900 text-lg">{item.title}</p>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${item.status === "completed" ? "bg-emerald-100 text-emerald-700" : item.status === "reserved" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{item.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">الفئة: {item.category} - {item.sub_category} | الحالة: {item.condition} | المصدر: {item.location}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                      
                      {/* Delivery and Assignment Details */}
                      {isRequested ? (
                        <div className="mt-4 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm space-y-4">
                          {/* Contact and Delivery Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-bold text-slate-700 mb-1">تفاصيل التوصيل للمستفيد:</p>
                              <p className="text-sm text-slate-600 line-clamp-2">{item.delivery_address || "لم يتم تحديد عنوان التوصيل"}</p>
                              {cleanDeliveryLocation && (
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanDeliveryLocation)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-200 transition-colors">
                                  <MapIcon size={14} className="text-emerald-600" /> عرض على الخريطة
                                </a>
                              )}
                            </div>
                            
                            {item.contact_phone && (
                              <div>
                                <p className="text-xs font-bold text-slate-700 mb-1.5">رقم التواصل:</p>
                                <div className="flex flex-wrap gap-2">
                                  <a href={`tel:${item.contact_phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                    <PhoneCall size={14} /> اتصال
                                  </a>
                                  <a href={formatWhatsAppNumber(item.contact_phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#128C7E] transition-colors">
                                    <MessageCircle size={14} /> واتساب
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Assignment Dropdown */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 w-fit">
                            <Truck size={14} className="text-emerald-600" />
                            <label className="text-xs font-bold text-slate-700">تعيين المندوب:</label>
                            <select value={item.volunteer_id || ""} onChange={(e) => handleAssignVolunteer(item.id, e.target.value)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white outline-none focus:ring-2 focus:ring-emerald-500 min-w-[150px]">
                              <option value="">-- بانتظار التعيين --</option>
                              {volunteers.map((v) => <option key={v.id} value={v.id}>{v.full_name}</option>)}
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 p-2.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl border border-amber-200 flex items-center gap-2 w-fit">
                          التبرع متاح في الكاتالوج. سيتاح تعيين المتطوع بعد طلبه من المستفيد.
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteItem(item.id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors shrink-0"><Trash2 size={18} /></button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "manage-needs" && (
  <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
      <ListFilter className="text-emerald-600" /> طلبات الاحتياج المسجلة
    </h2>
    <div className="space-y-4">
      {needs.map((n) => (
        <div key={n.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <p className="font-bold text-slate-900">{n.title}</p>
              {/* هنا يتم عرض شارة الحالة الجديدة */}
              {getStatusBadge(n.status)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              الفئة: {n.category} | الأولوية: <span className="text-amber-600 font-bold">{n.urgency}</span> | الكمية: {n.quantity || 0}
            </p>
          </div>
          <button onClick={() => handleDeleteNeed(n.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
)}
    </>
  );
}