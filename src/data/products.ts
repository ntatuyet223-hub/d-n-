import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aura-001',
    name: 'Đầm Lụa Midi Cổ Yếm Sắc Rose Gold',
    sku: 'AUR-DRS-001',
    price: 890000,
    originalPrice: 1150000,
    category: 'dresses',
    categoryName: 'Váy Đầm Thiết Kế',
    description: 'Đầm midi được chế tác từ chất liệu lụa Satin cao cấp bề mặt bóng nhẹ, thiết kế cổ yếm duyên dáng khoe trọn bờ vai thon. Dáng xòe A rủ mềm mại giúp tôn chiều cao và tạo bước đi uyển chuyển.',
    material: '100% Lụa Satin Pháp bóng mờ cao cấp, lót lụa habutai',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Rose Gold', code: '#E8D5C8' },
      { name: 'Kem Ivory', code: '#FFFDF9' },
      { name: 'Đen Huyền Bí', code: '#1A1A1A' }
    ],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 128,
    tags: ['Dự Tiệc', 'Tôn Dáng', 'Lụa Cao Cấp', 'Thanh Lịch'],
    matchingProductIds: ['aura-004', 'aura-007'] // Tweed Blazer & Pearl Earrings
  },
  {
    id: 'aura-002',
    name: 'Áo Sơ Mi Tơ Organza Tay Phồng Cổ Nơ',
    sku: 'AUR-TOP-002',
    price: 520000,
    originalPrice: 680000,
    category: 'tops',
    categoryName: 'Áo Kiểu & Áo Lụa',
    description: 'Áo sơ mi tơ organza mỏng nhẹ với chi tiết cổ phối nơ mềm mại. Phần tay phồng nhẹ che khuyết điểm bắp tay, mang đến vẻ đẹp tiểu thư chuẩn phong cách Pháp.',
    material: 'Tơ Organza thượng hạng dệt ánh kim nhè nhẹ, kèm áo 2 dây lót trong',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Kem Trắng', code: '#F5F5EC' },
      { name: 'Hồng Nude', code: '#F2D7D9' },
      { name: 'Xanh Mint Mild', code: '#E2EFE0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 84,
    tags: ['Công Sở', 'Nữ Tính', 'Mỏng Nhẹ', 'Mùa Hè'],
    matchingProductIds: ['aura-005', 'aura-008'] // Pleated Skirt & Leather Bag
  },
  {
    id: 'aura-003',
    name: 'Áo Khoác Blazer Dạ Tweed Cúc Ngọc Trai Parisian',
    sku: 'AUR-OUT-003',
    price: 1250000,
    originalPrice: 1550000,
    category: 'outerwear',
    categoryName: 'Blazer & Áo Khoác',
    description: 'Áo blazer dạ Tweed phong cách thượng lưu Pháp. Phom cropped tôn dáng kết hợp hàng cúc ngọc trai đính thủ công sang trọng, dễ kết hợp với đầm dài hoặc quần cạp cao.',
    material: 'Dạ Tweed dệt kim tuyến cao cấp, lót lụa chống nhăn',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Xanh Navy Dạ', code: '#1B263B' },
      { name: 'Trắng Sữa Paris', code: '#F8F6F0' },
      { name: 'Hồng Đào Tweed', code: '#E0B1CB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 210,
    tags: ['Thượng Lưu', 'Sang Trọng', 'Thu Đông', 'Công Sở'],
    matchingProductIds: ['aura-005', 'aura-001'] // Pleated skirt or Rose Gold Dress
  },
  {
    id: 'aura-004',
    name: 'Chân Váy Dập Ly Lụa Bạc Xòe Tự Do',
    sku: 'AUR-BOT-004',
    price: 620000,
    originalPrice: 790000,
    category: 'bottoms',
    categoryName: 'Quần & Chân Váy',
    description: 'Chân váy dập ly dáng xòe A chuẩn phong cách vintage hiện đại. Kỹ thuật xếp ly công nghệ nhiệt giúp nếp gấp chuẩn phom không bị mất sau khi giặt.',
    material: 'Lụa dệt gân cao cấp độ rủ hoàn hảo, đai lưng co giãn giấu khéo',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Bạc Ánh Kim', code: '#C0C0C0' },
      { name: 'Champagne Gold', code: '#F5E6CC' },
      { name: 'Đen Mờ', code: '#2B2B2B' }
    ],
    sizes: ['S', 'M', 'L', 'Freesize'],
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 62,
    tags: ['Xếp Ly', 'Bay Bổng', 'Thanh Lịch', 'Dạo Phố'],
    matchingProductIds: ['aura-002', 'aura-003']
  },
  {
    id: 'aura-005',
    name: 'Quần Tây Ống Suông 2 Ly Lưng Cao Tôn Dáng',
    sku: 'AUR-BOT-005',
    price: 680000,
    originalPrice: 850000,
    category: 'bottoms',
    categoryName: 'Quần & Chân Váy',
    description: 'Mẫu quần tây quốc dân cho nàng công sở hiện đại. Cạp cao 2 ly giấu mỡ bụng tối đa, ống rộng suông đứng tạo cảm giác đôi chân dài miên man.',
    material: 'Tuyết mưa Nhật Bản đứng phom, co giãn nhẹ 4 chiều, không xù lông',
    images: [
      'https://images.unsplash.com/photo-1506629082925-23912a2a6c03?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nâu Latte', code: '#7F5539' },
      { name: 'Đen Đứng Phom', code: '#181818' },
      { name: 'Trắng Kem Classic', code: '#FAF6F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 175,
    tags: ['Hack Dáng', 'Công Sở', 'Quần Tây', 'Cạp Cao'],
    matchingProductIds: ['aura-002', 'aura-003']
  },
  {
    id: 'aura-006',
    name: 'Bộ Pijama Lụa Gấm Cổ Ve Thêu Hoa Thủ Công',
    sku: 'AUR-LNG-006',
    price: 750000,
    originalPrice: 950000,
    category: 'loungewear',
    categoryName: 'Đồ Mặc Nhà & Slip Dress',
    description: 'Bộ đồ mặc nhà lụa gấm dệt hoạ tiết chìm tinh xảo, cổ ve viền lé sang trọng. Chất lụa mát rượi làn da mang lại giấc ngủ trọn vẹn và sự tự tin ngay tại nhà.',
    material: 'Lụa Gấm Tơ Tằm mềm mịn, độ thoáng khí tuyệt vời',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Xanh Emerald', code: '#0F5257' },
      { name: 'Hồng Thạch Anh', code: '#E4A0B7' },
      { name: 'Vàng Mật Ôm', code: '#D4A373' }
    ],
    sizes: ['S', 'M', 'L', 'Freesize'],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 49,
    tags: ['Lụa Mịn', 'Mặc Nhà', 'Sang Trọng', 'Thư Giãn'],
    matchingProductIds: ['aura-007']
  },
  {
    id: 'aura-007',
    name: 'Bông Tai Ngọc Trai Nước Ngọt Mạ Vàng 18K AURA',
    sku: 'AUR-ACC-007',
    price: 380000,
    originalPrice: 480000,
    category: 'accessories',
    categoryName: 'Phụ Kiện & Túi Xách',
    description: 'Bông tai dáng đính ngọc trai nước ngọt tự nhiên kết hợp phần chốt mạ vàng 18K tinh xảo. Điểm nhấn hoàn hảo cho nét thanh lịch trang nhã quý phái.',
    material: 'Ngọc trai nước ngọt tự nhiên chọn lọc, chuôi bạc S925 mạ vàng 18K',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Vàng Ngọc Trai', code: '#E0C9A6' }
    ],
    sizes: ['Freesize'],
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Ngọc Trai', 'Phụ Kiện', 'Trang Sức', 'Quà Tặng'],
    matchingProductIds: ['aura-001', 'aura-003']
  },
  {
    id: 'aura-008',
    name: 'Túi Xách Da Bò Thật Dáng Hộp Mạ Khóa Vàng AURA Minimalist',
    sku: 'AUR-ACC-008',
    price: 1450000,
    originalPrice: 1850000,
    category: 'accessories',
    categoryName: 'Phụ Kiện & Túi Xách',
    description: 'Túi xách da bò thật 100% xử lý chống xước phom dáng cấu trúc hộp hiện đại. Phụ kiện khóa xoay mạ vàng chống gỉ, khoang chứa rộng rãi đựng trọn trang điểm & điện thoại.',
    material: 'Da Bò thật nguyên tấm đập vân Microfiber, lót nhung mịn',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nâu Caramel', code: '#9C6644' },
      { name: 'Đen Tuyển', code: '#111111' },
      { name: 'Kem Nude Paris', code: '#E6D7C3' }
    ],
    sizes: ['Freesize'],
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 96,
    tags: ['Túi Da Thật', 'Đẳng Cấp', 'Phụ Kiện', 'Công Sở'],
    matchingProductIds: ['aura-003', 'aura-005']
  },
  {
    id: 'aura-009',
    name: 'Đầm Maxi Linen Pháp Thêu Hoa Cổ V Mùa Hè',
    sku: 'AUR-DRS-009',
    price: 920000,
    originalPrice: 1190000,
    category: 'dresses',
    categoryName: 'Váy Đầm Thiết Kế',
    description: 'Đầm maxi dáng xòe bay bổng chất liệu Linen Pháp tự nhiên 100%. Thiết kế cổ V quyến rũ kết hợp chi tiết thêu hoa bohemia thủ công ở lai váy, lý tưởng cho những chuyến du lịch Resort.',
    material: '100% Linen Pháp cao cấp dệt tự nhiên, mỏng mát nhưng đứng phom',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Trắng Tinh Khôi', code: '#FFFFFF' },
      { name: 'Vàng Nắng Olive', code: '#C5A059' },
      { name: 'Xanh Biển Calm', code: '#A2C4C9' }
    ],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 42,
    tags: ['Du Lịch', 'Maxi', 'Linen Pháp', 'Bay Bổng'],
    matchingProductIds: ['aura-007']
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-01',
    customerName: 'Nguyễn Thị Phương Thảo',
    rating: 5,
    date: '18/07/2026',
    comment: 'Đầm lụa lên phom cực kỳ chuẩn! Chất lụa bóng mượt mịn mát thích lắm. Mình cao 1m62 nặng 51kg mặc size S vừa như in, còn được AI gợi ý size cực chuẩn. Giỏ hàng có tính năng gợi ý túi đi kèm rất tiện.',
    verifiedPurchase: true,
    productName: 'Đầm Lụa Midi Cổ Yếm Sắc Rose Gold',
    purchasedSize: 'S' as const,
    purchasedColor: 'Rose Gold',
    userHeightWeight: '1m62 - 51kg',
    likes: 24,
  },
  {
    id: 'rev-02',
    customerName: 'Trần Vũ Hoài An',
    rating: 5,
    date: '14/07/2026',
    comment: 'Chiếc blazer Tweed này xịn xịn xịn! Cúc ngọc trai đính tỉ mỉ, khoác lên thần thái sang như tiểu thư Paris luôn. Đóng gói hộp rất đẹp, giao hỏa tốc chưa đầy 2h ở HCM.',
    verifiedPurchase: true,
    productName: 'Áo Khoác Blazer Dạ Tweed Cúc Ngọc Trai Parisian',
    purchasedSize: 'M' as const,
    purchasedColor: 'Xanh Navy Dạ',
    userHeightWeight: '1m58 - 53kg',
    likes: 19,
  },
  {
    id: 'rev-03',
    customerName: 'Lê Hoàng Khánh Linh',
    rating: 5,
    date: '02/07/2026',
    comment: 'Tính năng Giỏ hàng thông minh siêu thích luôn mọi người ơi! Lúc mình cho sơ mi tơ vào giỏ, hệ thống tự gợi ý mua thêm chân váy xếp ly được giảm 15% trọn combo. Nhận hàng phối lên siêu mê!',
    verifiedPurchase: true,
    productName: 'Áo Sơ Mi Tơ Organza Tay Phồng Cổ Nơ',
    purchasedSize: 'S' as const,
    purchasedColor: 'Kem Trắng',
    userHeightWeight: '1m60 - 48kg',
    likes: 31,
  },
];
