import { MapPin, Tag } from "lucide-react";
import { Button } from "./Button";

export interface ItemCardProps {
  title: string;
  category: string;
  condition: string;
  location: string;
  imageUrl?: string;
  type: "donation" | "need";
}

export function ItemCard({ title, category, condition, location, imageUrl, type }: ItemCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <span className="text-sm">لا توجد صورة</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {type === "donation" ? (
            <span className="text-emerald-600">متاح للتبرع</span>
          ) : (
            <span className="text-amber-600">مطلوب عاجلاً</span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
        
        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center text-sm text-slate-600">
            <Tag size={16} className="ml-2 text-slate-400 shrink-0" />
            <span>{category} &bull; {condition}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin size={16} className="ml-2 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button variant={type === "donation" ? "primary" : "outline"} className="w-full mt-auto">
          {type === "donation" ? "طلب العنصر" : "تلبية الاحتياج"}
        </Button>
      </div>
    </div>
  );
}