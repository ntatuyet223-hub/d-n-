export type ServiceType = 
  | 'lai_xe_ho'      // Lái xe hộ người say / mệt mỏi
  | 'dua_don_san_bay' // Đưa đón sân bay Nội Bài / TSN / Cát Bi
  | 'thue_xe_4cho'   // Xe 4 chỗ đời mới
  | 'thue_xe_7cho'   // Xe 7 chỗ sang trọng
  | 'xe_di_tinh'     // Xe đi tỉnh theo chuyến / đường dài
  | 'lai_xe_hop_dong';// Lái xe hợp đồng ngày / tháng

export interface ServiceItem {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  basePriceText: string;
  features: string[];
  iconName: string;
  image: string;
}

export interface FareCalculation {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  distanceKm: number;
  isRoundTrip: boolean;
  isNightTime: boolean; // 22:00 - 05:00
  estimatedPrice: number;
  discountAmount: number;
  finalPrice: number;
  detailsText: string;
}

export interface BookingData {
  id?: string;
  fullName: string;
  phone: string;
  serviceType: ServiceType;
  vehiclePreference?: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  estimatedDistanceKm?: number;
  note?: string;
  status?: 'pending' | 'confirmed' | 'completed';
  createdAt?: string;
  estimatedPrice?: number;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  customerRole?: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  verified: boolean;
  routeText?: string;
}

export interface RouteHighlight {
  id: string;
  fromTo: string;
  estimatedTime: string;
  priceFrom: string;
  vehicleType: string;
  highlights: string[];
  popularCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver' | 'system';
  text: string;
  timestamp: string;
  quickActions?: { label: string; actionText: string }[];
}
