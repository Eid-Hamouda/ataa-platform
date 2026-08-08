"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import AdminView from "@/components/dashboard/AdminView";
import BeneficiaryView from "@/components/dashboard/BeneficiaryView";
import VolunteerView from "@/components/dashboard/VolunteerView";
import DonorView from "@/components/dashboard/DonorView";
import { UserProfile, DonationItem, NeedRequest } from "@/types";
import { 
  Menu, X, LogOut, LayoutDashboard, Users, 
  Package, ListFilter, PlusCircle, Store, 
  HeartHandshake, Truck 
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal States
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isAddNeedModalOpen, setIsAddNeedModalOpen] = useState(false);
  const [isAddDonationModalOpen, setIsAddDonationModalOpen] = useState(false);

  // Global Data States
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [needs, setNeeds] = useState<NeedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Beneficiary States
  const [cart, setCart] = useState<DonationItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [newNeed, setNewNeed] = useState({
    title: "", category: "", sub_category: "", urgency: "عادي", description: "", quantity: 1,
    delivery_address: "", delivery_location: "", contact_phone: ""
  });

  // Admin States
  const [newUser, setNewUser] = useState({ fullName: "", email: "", password: "", role: "beneficiary" });
  const [newItem, setNewItem] = useState({ 
    title: "", category: "", sub_category: "", location: "", condition: "ممتازة", description: "", volunteer_id: "" 
  });
  const [itemFile, setItemFile] = useState<File | null>(null);

  // Donor States
  const [donorFormData, setDonorFormData] = useState({
    title: "", category: "", sub_category: "", condition: "ممتازة", description: "", location: "", target_need_id: null as string | null
  });
  const [donorFile, setDonorFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push("/auth/login");

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      setProfile(profileData);

      if (profileData?.role === "volunteer") setActiveTab("volunteer-tasks");
      if (profileData?.role === "beneficiary" || profileData?.role === "organization") setActiveTab("catalog");

      if (profileData?.role === "admin") {
        const { data: usersData } = await supabase.from("profiles").select("*");
        setAllUsers(usersData || []);
      }

      const { data: donationsData } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
      setDonations(donationsData || []);

      const { data: needsData } = await supabase.from("needs").select("*").order("created_at", { ascending: false });
      setNeeds(needsData || []);

      setLoading(false);
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // --- Admin Functions ---
  const handleAssignVolunteer = async (donationId: string, volunteerId: string) => {
    const toastId = toast.loading("جاري تعيين المتطوع...");
    try {
      const updateData = volunteerId ? { volunteer_id: volunteerId } : { volunteer_id: null };
      const { error } = await supabase.from("donations").update(updateData).eq("id", donationId);
      if (error) throw error;
      setDonations(donations.map((d) => (d.id === donationId ? { ...d, volunteer_id: volunteerId || undefined } : d)));
      toast.success("تم تحديث التعيين بنجاح", { id: toastId });
    } catch (error: any) { 
      toast.error("خطأ: " + error.message, { id: toastId }); 
    }
  };

  const handleAdminCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم محاكاة إنشاء المستخدم بنجاح");
    setIsAddUserModalOpen(false);
  };

  const handleUpdateRole = async (id: string, role: string) => {
    await supabase.from("profiles").update({ role }).eq("id", id);
    setAllUsers(allUsers.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success("تم تحديث الدور");
  };

  const handleApproveUser = async (id: string) => {
    await supabase.from("profiles").update({ is_approved: true }).eq("id", id);
    setAllUsers(allUsers.map((u) => (u.id === id ? { ...u, is_approved: true } : u)));
    toast.success("تم اعتماد الحساب");
  };

  const handleDeleteUser = async (id: string) => {
    await supabase.from("profiles").delete().eq("id", id);
    setAllUsers(allUsers.filter((u) => u.id !== id));
    toast.success("تم حذف المستخدم");
  };

  const handleDeleteItem = async (id: string) => {
    await supabase.from("donations").delete().eq("id", id);
    setDonations(donations.filter((d) => d.id !== id));
    toast.success("تم حذف العنصر");
  };

  const handleDeleteNeed = async (id: string) => {
    await supabase.from("needs").delete().eq("id", id);
    setNeeds(needs.filter((n) => n.id !== id));
    toast.success("تم حذف الطلب");
  };

  const handleAdminCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemFile) return toast.error("أرفق صورة للعنصر");
    setIsSubmitting(true);
    const toastId = toast.loading("جاري الرفع...");
    try {
      const fileExt = itemFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      await supabase.storage.from("donations-images").upload(fileName, itemFile);
      const { data } = supabase.storage.from("donations-images").getPublicUrl(fileName);

      const payload = {
        title: newItem.title, category: newItem.category, sub_category: newItem.sub_category, location: newItem.location, condition: newItem.condition, description: newItem.description,
        image_url: data.publicUrl, donor_id: profile?.id, status: "available", volunteer_id: newItem.volunteer_id ? newItem.volunteer_id : null
      };

      const { data: insertedData, error } = await supabase.from("donations").insert(payload).select().single();
      if (error) throw error;
      
      setDonations([insertedData, ...donations]);
      setNewItem({ title: "", category: "", sub_category: "", location: "", condition: "ممتازة", description: "", volunteer_id: "" });
      setItemFile(null);
      setIsAddItemModalOpen(false);
      toast.success("تمت الإضافة بنجاح", { id: toastId });
    } catch (error: any) { 
      toast.error(error.message, { id: toastId }); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // --- Beneficiary Functions ---
  const handleCreateNeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNeed.delivery_location) return toast.error("يرجى تحديد موقع التوصيل على الخريطة");
    if (!newNeed.contact_phone) return toast.error("يرجى إدخال رقم التواصل الخاص بك");

    setIsSubmitting(true);
    const { data: insertedData, error } = await supabase.from("needs").insert({ ...newNeed, beneficiary_id: profile?.id, status: "pending" }).select().single();
    
    setIsSubmitting(false);
    if (error) return toast.error(error.message);
    
    setNeeds([insertedData, ...needs]);
    setNewNeed({ title: "", category: "", sub_category: "", urgency: "عادي", description: "", quantity: 1, delivery_address: "", delivery_location: "", contact_phone: "" });
    toast.success("تم رفع طلبك بنجاح");
    setIsAddNeedModalOpen(false);
    setActiveTab("my-needs");
  };

  const handleAddToCart = (item: DonationItem) => {
    if (cart.find((c) => c.id === item.id)) return toast.error("العنصر موجود بالفعل في السلة");
    setCart([...cart, item]);
    toast.success("تمت الإضافة للسلة");
  };

  const handleRemoveFromCart = (id: string) => setCart(cart.filter((c) => c.id !== id));

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!deliveryLocation) return toast.error("يرجى تحديد موقع التوصيل على الخريطة");
    if (!contactPhone) return toast.error("يرجى إدخال رقم التواصل");
    
    setIsSubmitting(true);
    const toastId = toast.loading("جاري تأكيد الحجز...");
    try {
      const payload = { 
        status: "reserved", delivery_address: deliveryAddress, delivery_location: deliveryLocation, contact_phone: contactPhone, beneficiary_id: profile?.id
      };
      const updates = cart.map((item) => supabase.from("donations").update(payload).eq("id", item.id));
      await Promise.all(updates);

      setDonations(donations.map((d) => (cart.find((c) => c.id === d.id) ? { ...d, ...payload } : d)));
      setCart([]); setDeliveryAddress(""); setDeliveryLocation(""); setContactPhone("");
      toast.success("تم حجز العناصر بنجاح بانتظار تعيين المندوب", { id: toastId });
      setActiveTab("catalog");
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تأكيد الحجز", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Donor Functions ---
  const handleDonorCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorFile) return toast.error("الرجاء إرفاق صورة للعنصر المتبرع به");
    setIsSubmitting(true);
    const toastId = toast.loading("جاري رفع التبرع...");
    
    try {
      const fileExt = donorFile.name.split(".").pop();
      const fileName = `donation_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      await supabase.storage.from("donations-images").upload(fileName, donorFile);
      const { data: publicURLData } = supabase.storage.from("donations-images").getPublicUrl(fileName);

      const targetNeed = donorFormData.target_need_id ? needs.find(n => n.id === donorFormData.target_need_id) : null;

      const payload = {
        title: donorFormData.title, 
        category: donorFormData.category, 
        sub_category: donorFormData.sub_category,
        condition: donorFormData.condition, 
        description: donorFormData.description, 
        location: donorFormData.location,
        image_url: publicURLData.publicUrl, 
        donor_id: profile?.id, 
        target_need_id: donorFormData.target_need_id,
        status: targetNeed ? "reserved" : "available", 
        beneficiary_id: targetNeed ? targetNeed.beneficiary_id : null,
        delivery_address: targetNeed ? targetNeed.delivery_address : null,
        delivery_location: targetNeed ? targetNeed.delivery_location : null,
        contact_phone: targetNeed ? targetNeed.contact_phone : null,
      };

      const { data: insertedData, error: insertError } = await supabase.from("donations").insert(payload).select().single();
      if (insertError) throw insertError;
      
      setDonations([insertedData, ...donations]);

      if (targetNeed) {
        const newQuantity = Math.max(0, (targetNeed.quantity || 1) - 1);
        // التغيير هنا: نغير الحالة إلى pending_delivery بدلاً من completed
        const newStatus = newQuantity === 0 ? "pending_delivery" : targetNeed.status;
        
        const { error: updateError } = await supabase.from("needs").update({ quantity: newQuantity, status: newStatus }).eq("id", targetNeed.id);
        if (updateError) console.error("خطأ في تحديث الكمية:", updateError);
        
        setNeeds(needs.map(n => n.id === targetNeed.id ? { ...n, quantity: newQuantity, status: newStatus } : n));
      }

      setIsAddDonationModalOpen(false);
      setDonorFormData({ title: "", category: "", sub_category: "", condition: "ممتازة", description: "", location: "", target_need_id: null });
      setDonorFile(null);
      
      toast.success(targetNeed ? "تم التبرع! جاري ترتيب التوصيل." : "تم نشر تبرعك في الكاتالوج بنجاح!", { id: toastId });
    } catch (err: any) { 
      toast.error("حدث خطأ أثناء رفع التبرع: " + err.message, { id: toastId }); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // --- Volunteer Functions ---
  const handleCompleteDelivery = async (donationId: string) => {
    const toastId = toast.loading("جاري تأكيد التسليم...");
    try {
      const donation = donations.find((d) => d.id === donationId);
      
      // 1. تحديث حالة التبرع إلى تم التسليم
      await supabase.from("donations").update({ status: "completed" }).eq("id", donationId);
      
      let updatedNeeds = [...needs];
      let requestCompleted = false;

      // 2. التحقق مما إذا كان هذا التبرع يغطي طلب احتياج
      if (donation?.target_need_id) {
        const relatedNeed = needs.find((n) => n.id === donation.target_need_id);
        
        // إذا كان الطلب بانتظار التوصيل والكمية صفر، يتم تحويله لمكتمل عند التوصيل الفعلي
        if (relatedNeed && relatedNeed.quantity === 0) {
          await supabase.from("needs").update({ status: "completed" }).eq("id", relatedNeed.id);
          updatedNeeds = updatedNeeds.map((n) => (n.id === relatedNeed.id ? { ...n, status: "completed" } : n));
          requestCompleted = true;
        }
      }

      setDonations(donations.map((d) => (d.id === donationId ? { ...d, status: "completed" } : d)));
      setNeeds(updatedNeeds);
      
      if (requestCompleted) {
        toast.success("تم تأكيد التسليم وإغلاق طلب الاحتياج بنجاح!", { id: toastId });
      } else {
        toast.success("تم تأكيد التسليم بنجاح!", { id: toastId });
      }
      
    } catch (error: any) {
      toast.error("حدث خطأ أثناء التسليم.", { id: toastId });
    }
  };

  // --- Navigation Configuration ---
  const getNavItems = () => {
    if (profile?.role === "admin") {
      return [
        { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
        { id: "manage-users", label: "المستخدمين", icon: Users },
        { id: "manage-items", label: "العناصر والتبرعات", icon: Package },
        { id: "manage-needs", label: "طلبات الاحتياج", icon: ListFilter }
      ];
    }
    if (profile?.role === "beneficiary" || profile?.role === "organization") {
      return [
        { id: "catalog", label: "الكاتالوج المتاح", icon: Store },
        { id: "my-needs", label: "طلباتي السابقة", icon: HeartHandshake },
        { id: "add-need", label: "تقديم طلب احتياج", icon: PlusCircle, isModal: true }
      ];
    }
    if (profile?.role === "volunteer") {
      return [{ id: "volunteer-tasks", label: "المهام الميدانية", icon: Truck }];
    }
    if (profile?.role === "donor") {
      return [
        { id: "overview", label: "سجل التبرعات", icon: Package },
        { id: "open-needs", label: "طلبات الاحتياج", icon: HeartHandshake },
        { id: "add-donation", label: "إضافة تبرع جديد", icon: PlusCircle, isModal: true }
      ];
    }
    return [];
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">جاري تحميل البيانات...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <Toaster />
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 bottom-0 right-0 z-50 w-64 bg-white border-l border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <img src="/logo.png" alt="شعار أثر" className="w-60 h-20 object-contain" />
          <button className="lg:hidden text-slate-500" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
        </div>
        <div className="p-6 pb-2">
          <p className="text-sm font-bold text-slate-900">مرحباً، {profile?.full_name}</p>
          <p className="text-xs text-slate-500 mt-1 uppercase">{profile?.role}</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {getNavItems().map((item) => (
            <button key={item.id} onClick={() => {
                if (item.isModal) {
                  if (item.id === "add-need") setIsAddNeedModalOpen(true);
                  if (item.id === "add-donation") setIsAddDonationModalOpen(true);
                  setIsSidebarOpen(false);
                } else { setActiveTab(item.id); setIsSidebarOpen(false); }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === item.id || (activeTab === "cart" && item.id === "catalog") ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <item.icon size={20} className={activeTab === item.id || (activeTab === "cart" && item.id === "catalog") ? "text-emerald-600" : "text-slate-400"} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-colors"><LogOut size={20} /> تسجيل الخروج</button>
        </div>
      </aside>

      <main className="flex-1 lg:mr-64 flex flex-col min-h-screen transition-all relative">
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"><Menu size={24} /></button>
          <h1 className="text-lg font-bold text-slate-900">لوحة التحكم</h1>
        </header>

        <div className="p-4 md:p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            {profile?.role === "admin" && (
              <AdminView
                activeTab={activeTab} allUsers={allUsers} donations={donations} needs={needs} pendingBeneficiaries={allUsers.filter((u) => !u.is_approved && (u.role === "beneficiary" || u.role === "organization"))}
                newUser={newUser} setNewUser={setNewUser} newItem={newItem} setNewItem={setNewItem} setItemFile={setItemFile}
                handleAdminCreateUser={handleAdminCreateUser} handleAdminCreateItem={handleAdminCreateItem} handleUpdateRole={handleUpdateRole} handleApproveUser={handleApproveUser} handleDeleteUser={handleDeleteUser} handleDeleteItem={handleDeleteItem} handleDeleteNeed={handleDeleteNeed} handleAssignVolunteer={handleAssignVolunteer} 
                isAddUserModalOpen={isAddUserModalOpen} setIsAddUserModalOpen={setIsAddUserModalOpen} isAddItemModalOpen={isAddItemModalOpen} setIsAddItemModalOpen={setIsAddItemModalOpen} isSubmitting={isSubmitting}
              />
            )}

            {(profile?.role === "beneficiary" || profile?.role === "organization") && (
              <>
                <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {["catalog", "my-needs"].map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? "bg-emerald-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}>
                        {tab === "catalog" ? "الكاتالوج المتاح" : "طلباتي السابقة"}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsAddNeedModalOpen(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 shadow-sm">
                    <PlusCircle size={18} /> تقديم طلب احتياج
                  </button>
                </div>
                <BeneficiaryView
                  activeTab={activeTab} setActiveTab={setActiveTab} profile={profile} donations={donations} needs={needs} cart={cart}
                  newNeed={newNeed} setNewNeed={setNewNeed} deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} deliveryLocation={deliveryLocation} setDeliveryLocation={setDeliveryLocation} contactPhone={contactPhone} setContactPhone={setContactPhone}
                  handleCreateNeed={handleCreateNeed} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} handleBulkSubmit={handleBulkSubmit}
                  isAddNeedModalOpen={isAddNeedModalOpen} setIsAddNeedModalOpen={setIsAddNeedModalOpen} isSubmitting={isSubmitting}
                />
              </>
            )}

            {profile?.role === "volunteer" && <VolunteerView activeTab={activeTab} donations={donations.filter((d) => d.volunteer_id === profile.id)} handleCompleteDelivery={handleCompleteDelivery} />}

            {profile?.role === "donor" && (
              <DonorView
                activeTab={activeTab} donations={donations} profile={profile} needs={needs}
                isAddDonationModalOpen={isAddDonationModalOpen} setIsAddDonationModalOpen={setIsAddDonationModalOpen} donorFormData={donorFormData} setDonorFormData={setDonorFormData} donorFile={donorFile} setDonorFile={setDonorFile}
                handleDonorCreateItem={handleDonorCreateItem} isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}