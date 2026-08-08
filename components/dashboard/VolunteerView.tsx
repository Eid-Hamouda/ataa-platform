import { Truck, MapPin, Map as MapIcon, CheckCircle2, PhoneCall, MessageCircle } from "lucide-react";
import { DonationItem } from "@/types";

interface VolunteerViewProps {
  activeTab: string;
  donations: any[]; // Using any to safely access new dynamic fields like contact_phone
  handleCompleteDelivery: (donationId: string) => void;
}

export default function VolunteerView({
  activeTab,
  donations,
  handleCompleteDelivery
}: VolunteerViewProps) {
  // Helper function to format Syrian numbers for WhatsApp API
  const formatWhatsAppNumber = (phone: string) => {
    if (!phone) return "";
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    if (!cleaned.startsWith("963")) cleaned = "963" + cleaned;
    return `https://wa.me/${cleaned}`;
  };

  if (activeTab === "volunteer-tasks") {
    // Only show tasks that are actively reserved and assigned for delivery
    const activeTasks = donations.filter(
      (d) => d.status === "reserved"
    );

    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Truck className="text-emerald-600" /> المهام الميدانية للتوصيل
        </h2>

        {activeTasks.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <CheckCircle2 size={48} className="mx-auto text-emerald-200 mb-4" />
            <p className="text-slate-500 font-medium">
              أنجزت عملاً رائعاً! لا توجد مهام توصيل مسندة إليك حالياً.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.map((d) => {
              const cleanSourceLocation = d.location ? d.location.replace("إحداثيات الخريطة:", "").replace("إحداثيات:", "").trim() : "";
              const cleanDeliveryLocation = d.delivery_location ? d.delivery_location.replace("إحداثيات الخريطة:", "").replace("إحداثيات:", "").trim() : "";

              return (
                <div
                  key={d.id}
                  className="flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-200/80 gap-5 hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-start gap-4 w-full border-b border-slate-200 pb-4">
                    <img
                      src={d.image_url || "/hero.png"}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-lg">{d.title}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {d.category} - {d.sub_category}
                        </span>
                        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          حالة العنصر: {d.condition}
                        </span>
                      </div>
                      {d.description && (
                        <p className="text-sm text-slate-600 mt-2 line-clamp-1">
                          {d.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Logistics and Delivery Details Section */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex-1 space-y-4 w-full">
                      
                      {/* Source Location (Donor) */}
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1">استلام من المصدر:</p>
                        <div className="flex items-center flex-wrap gap-2">
                          <p className="text-xs text-slate-700 flex items-center gap-1 bg-slate-200/50 px-2.5 py-1 rounded-lg">
                            <MapPin size={14} className="text-emerald-600" />
                            <span className="font-medium">{d.location}</span>
                          </p>
                          {cleanSourceLocation && (
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanSourceLocation)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg hover:bg-slate-300 transition-colors">
                              <MapIcon size={12} /> خرائط جوجل
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Delivery Location (Beneficiary) */}
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-800 mb-1">تسليم للمستفيد:</p>
                        <p className="text-sm text-slate-700 font-medium line-clamp-2 mb-2">{d.delivery_address}</p>
                        <div className="flex items-center flex-wrap gap-2">
                          {cleanDeliveryLocation && (
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanDeliveryLocation)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">
                              <MapIcon size={12} /> خرائط جوجل للموقع
                            </a>
                          )}
                          {d.contact_phone && (
                            <>
                              <a href={`tel:${d.contact_phone}`} className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                <PhoneCall size={12} /> اتصال
                              </a>
                              <a href={formatWhatsAppNumber(d.contact_phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-[#25D366] text-white text-[11px] font-bold rounded-lg hover:bg-[#128C7E] transition-colors">
                                <MessageCircle size={12} /> واتساب
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCompleteDelivery(d.id)}
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 shrink-0 transition-all"
                    >
                      إتمام التسليم
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return null;
}