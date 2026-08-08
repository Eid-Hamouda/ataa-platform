export interface UserProfile {
  id: string;
  full_name: string;
  role: string;
  is_approved: boolean;
  email?: string;
}

export interface DonationItem {
  id: string;
  title: string;
  category: string;
  sub_category?: string;
  condition?: string;
  description?: string;
  location: string;
  image_url?: string;
  donor_id?: string;
  volunteer_id?: string;
  status: string;
  target_need_id?: string | null;
}

export interface NeedRequest {
  id: string;
  title: string;
  category: string;
  sub_category?: string;
  urgency: string;
  description?: string;
  beneficiary_id?: string;
  status: string;
  quantity?: number;
  delivery_address: string;
  delivery_location: string;
  contact_phone: string;
}