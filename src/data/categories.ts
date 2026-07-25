import { CategoryId, Voucher } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    name: 'Tất Cả Sản Phẩm',
    description: 'Bản phối thời trang nữ tinh tế & hiện đại',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'dresses',
    name: 'Váy Đầm Thiết Kế',
    description: 'Đầm lụa, đầm tơ, đầm xòe dự tiệc & dạo phố',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'tops',
    name: 'Áo Kiểu & Áo Lụa',
    description: 'Áo sơ mi tơ, áo peplum, áo dệt kim cao cấp',
    iconName: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'outerwear',
    name: 'Blazer & Áo Khoác Dạ',
    description: 'Blazer công sở, áo khoác dạ tweed phong cách Pháp',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'bottoms',
    name: 'Quần & Chân Váy',
    description: 'Chân váy dập ly, chân váy bút chì, quần tây lưng cao',
    iconName: 'Scissors',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'loungewear',
    name: 'Đồ Mặc Nhà & Slip Dress',
    description: 'Pijama lụa gấm, đầm mặc nhà mỏng nhẹ quyến rũ',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'accessories',
    name: 'Phụ Kiện & Túi Xách',
    description: 'Khăn lụa tơ tằm, bông tai ngọc trai, túi da cao cấp',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
  },
];

export const VOUCHERS: Voucher[] = [
  {
    code: 'AURA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 300000,
    description: 'Giảm 10% cho đơn hàng từ 300.000đ',
    expiryDate: '31/12/2026',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 35000,
    minOrderValue: 500000,
    description: 'Miễn phí vận chuyển toàn quốc cho đơn từ 500.000đ',
    expiryDate: '31/12/2026',
  },
  {
    code: 'AURALUXE15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1000000,
    description: 'Giảm 15% VIP cho đơn hàng từ 1.000.000đ',
    expiryDate: '31/12/2026',
  },
  {
    code: 'STYLISTGIFT',
    discountType: 'fixed',
    discountValue: 100000,
    minOrderValue: 800000,
    description: 'Tặng 100.000đ khi đặt set combo phối đồ Stylist AI',
    expiryDate: '31/12/2026',
  },
];
