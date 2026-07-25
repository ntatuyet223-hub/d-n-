export type CategoryId = 'all' | 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'loungewear' | 'accessories';

export interface ColorOption {
  name: string;
  code: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Freesize';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number; // In VND (e.g., 650000)
  originalPrice?: number; // In VND (e.g., 850000)
  category: CategoryId;
  categoryName: string;
  description: string;
  material: string; // E.g., Lụa Satin Cao Cấp, Linen Pháp, Tweed Dạ
  images: string[];
  colors: ColorOption[];
  sizes: ProductSize[];
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number; // 4.8
  reviewCount: number; // 42
  tags: string[]; // e.g. ["Công Sở", "Dự Tiệc", "Tôn Dáng"]
  matchingProductIds?: string[]; // Recommended cross-sell items for smart cart
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedColor: ColorOption;
  selectedSize: ProductSize;
  quantity: number;
  addedAt: number;
}

export interface Voucher {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 100000 for 100k
  minOrderValue: number;
  description: string;
  expiryDate: string;
}

export interface BodyMetrics {
  height: number; // cm
  weight: number; // kg
  bust?: number; // cm
  waist?: number; // cm
  hip?: number; // cm
  fitPreference: 'Ôm body' | 'Vừa vặn' | 'Rộng thoải mái';
}

export interface SizeAdvisorResult {
  recommendedSize: ProductSize;
  confidenceScore: string;
  fitNotes: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  note?: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'momo' | 'vnpay' | 'cod' | 'bank_transfer';
  shippingFee: number;
  subtotal: number;
  discountAmount: number;
  voucherCode?: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipping' | 'delivered';
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
  purchasedSize: ProductSize;
  purchasedColor: string;
  userHeightWeight?: string;
  likes: number;
}
