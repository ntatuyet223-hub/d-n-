import { ServiceItem, ReviewItem, RouteHighlight } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'lai_xe_ho',
    title: 'Lái Xe Hộ Người Say & Mệt Mỏi',
    tagline: 'Lái chính chiếc xe của bạn về nhà an toàn tuyệt đối',
    description: 'Dịch vụ dành cho quý khách có dùng rượu bia, tiệc tùng hoặc mệt mỏi không đủ sức điều khiển phương tiện. Anh Hiến trực tiếp có mặt nhanh chóng, điều khiển chính chiếc xe của bạn về tận cổng nhà.',
    badge: 'Được Khách Hàng Chọn Nhiều Nhất',
    basePriceText: 'Từ 150.000đ / chuyến',
    features: [
      'Có mặt nhanh chóng trong 15 - 20 phút',
      'Bảo vệ an toàn cho bạn & tài sản, xe hơi của bạn',
      'Tài xế Đinh Văn Hiến trực tiếp cầm lái hoặc đội ngũ tay lái vững vàng',
      'Phục vụ 24/7 kể cả đêm muộn & lễ tết',
      'Chỉn chu, lịch sự, bảo mật tuyệt đối thông tin khách'
    ],
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dua_don_san_bay',
    title: 'Đưa Đón Sân Bay Trọn Gói',
    tagline: 'Chuẩn giờ 100%, đúng sảnh, hỗ trợ bê vác hành lý tận nơi',
    description: 'Dịch vụ đưa đón sân bay Nội Bài, Tân Sơn Nhất, Cát Bi chuyên nghiệp. Theo dõi lịch trình chuyến bay của quý khách để đón đúng giờ kể cả khi chuyến bay bị delay.',
    badge: 'Giá Rẻ Hơn Taxi Truyền Thống 20-30%',
    basePriceText: 'Từ 230.000đ / lượt',
    features: [
      'Giám sát giờ bay real-time, đón đúng sảnh không lo delay',
      'Miễn phí thời gian chờ tại sân bay đến 60 phút',
      'Miễn phí nước uống, khăn lạnh trên xe',
      'Hỗ trợ mang vác hành lý cẩn thận',
      'Xuất hóa đơn GTGT nếu khách hàng doanh nghiệp cần'
    ],
    iconName: 'Plane',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'thue_xe_4cho',
    title: 'Thuê Xe 4 Chỗ Có Tài Xế',
    tagline: 'Dòng xe Sedan đời mới, sạch sẽ, không mùi, chạy êm ái',
    description: 'Phù hợp đi công tác, gặp đối tác, đi chơi cá nhân hoặc gia đình nhỏ (Vios, City, Accent, Mazda 3). Xe luôn được vệ sinh khử khuẩn trước mỗi chuyến đi.',
    badge: 'Đời Mới 2022 - 2025',
    basePriceText: 'Từ 800.000đ / ngày',
    features: [
      'Xe gia đình giữ gìn sạch sẽ, thơm tho, tuyệt đối không mùi hôi',
      'Đầy đủ sạc điện thoại, wifi tốc độ cao',
      'Tài xế lái xe điềm đạm, không giật cục, không phóng nhanh vượt ẩu',
      'Chủ động tư vấn tuyến đường ngắn & tối ưu chi phí'
    ],
    iconName: 'Car',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'thue_xe_7cho',
    title: 'Thuê Xe 7 Chỗ Rộng Rãi',
    tagline: 'Không gian khoang hành khách rộng rãi cho cả gia đình',
    description: 'Các dòng xe 7 chỗ cao cấp: Mitsubishi Xpander, Toyota Innova/Fortuner, Kia Carnival. Phù hợp cho đoàn đi du lịch, về quê, cưới hỏi hay đại gia đình.',
    badge: 'Rộng Rãi & Tiện Nghi',
    basePriceText: 'Từ 1.000.000đ / ngày',
    features: [
      'Khoang hành lý siêu rộng chứa thoải mái 4-6 vali lớn',
      'Điều hòa 2 dàn lạnh sâu, mang lại sự dễ chịu cho người dễ say xe',
      'Ghế bọc da êm ái, bệ tỳ tay thoải mái',
      'Tài xế nhiệt tình, hỗ trợ chụp ảnh & tư vấn ăn uống địa phương'
    ],
    iconName: 'Users',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'xe_di_tinh',
    title: 'Xe Đi Tỉnh & Du Lịch Đường Dài',
    tagline: 'Chuyến đi an toàn, thoải mái như xe nhà',
    description: 'Chuyên nhận chạy đường dài Hà Nội đi các tỉnh Miền Bắc (Quảng Ninh, Hải Phòng, Ninh Bình, Thanh Hóa, Lào Cai, Nam Định, Thái Bình...) và ngược lại.',
    badge: 'Giảm 50% Lượt Về Trong Ngày',
    basePriceText: 'Từ 9.000đ / km',
    features: [
      'Tài xế Đinh Văn Hiến thuộc vanh vách đường xá và trạm dừng nghỉ',
      'Báo giá trọn gói không phát sinh phụ phí ẩn',
      'Hỗ trợ đón trả tận nhà tại các đầu tỉnh',
      'Nghỉ ngơi linh hoạt theo yêu cầu của đoàn'
    ],
    iconName: 'MapPin',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lai_xe_hop_dong',
    title: 'Lái Xe Hợp Đồng Theo Yêu Cầu',
    tagline: 'Tài xế riêng uy tín cho sếp, đối tác & gia đình',
    description: 'Nhận lái xe hợp đồng theo tuần, tháng hoặc sự kiện đặc biệt (Đám cưới, đưa đón VIP, hội nghị sang trọng) với tác phong lịch sự, lịch thiệp.',
    badge: 'Tác Phong VIP & Bảo Mật',
    basePriceText: 'Thỏa thuận linh hoạt',
    features: [
      'Trang phục chỉnh tề, tác phong chuẩn mực',
      'Thạo giao tiếp, bảo mật lịch trình làm việc của sếp/đối tác',
      'Giữ gìn bảo dưỡng xe cẩn thận như xe của chính mình',
      'Linh hoạt điều chỉnh giờ giấc theo nhu cầu thực tế'
    ],
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Anh Trần Minh Tuấn',
    customerRole: 'Doanh nhân tại Cầu Giấy',
    serviceUsed: 'Lái Xe Hộ Người Say',
    rating: 5,
    comment: 'Tôi tiếp khách xong có chút men trong người nên gọi ngay anh Hiến đến lái xe hộ. Anh Hiến có mặt rất nhanh trong 15 phút, lái xe cẩn thận nhẹ nhàng đưa tôi và chiếc xe Mercedes về tận hầm chung cư an toàn. Rất lịch sự và đáng tin cậy!',
    date: '2026-07-20',
    verified: true,
    routeText: 'Quận Cầu Giấy ➔ Quận Hoàng Mai'
  },
  {
    id: 'rev-2',
    customerName: 'Chị Nguyễn Phương Thảo',
    customerRole: 'Trưởng phòng Nhân sự',
    serviceUsed: 'Đưa Đón Sân Bay Nội Bài',
    rating: 5,
    comment: 'Cả gia đình tôi có chuyến bay lúc 5h sáng, anh Hiến đúng 3h45 đã có mặt dưới sảnh chờ sẵn, hỗ trợ bê 4 vali nặng lên xe. Xe 7 chỗ mới đét, không một chút mùi, các bé nhà mình không bị say xe chút nào.',
    date: '2026-07-18',
    verified: true,
    routeText: 'Thanh Xuân ➔ Sân Bay Nội Bài'
  },
  {
    id: 'rev-3',
    customerName: 'Anh Phạm Quốc Huy',
    customerRole: 'Kỹ sư công nghệ',
    serviceUsed: 'Xe Đi Tỉnh Quảng Ninh',
    rating: 5,
    comment: 'Gia đình đặt anh Hiến chuyến đi Hạ Long 2 ngày 1 đêm. Anh Hiến lái xe cực kỳ lành nghề, không phóng nhanh vượt ẩu. Giá cước rất thỏa đáng, trọn gói không bị phát sinh thêm phí gì.',
    date: '2026-07-12',
    verified: true,
    routeText: 'Hà Nội ➔ Hạ Long (Khứ hồi)'
  },
  {
    id: 'rev-4',
    customerName: 'Bác Lê Văn Dũng',
    customerRole: 'Cán bộ hưu trí',
    serviceUsed: 'Thuê Xe 4 Chỗ Đi Khám Bệnh',
    rating: 5,
    comment: 'Tôi nhờ anh Hiến đưa hai vợ chồng già đi khám bệnh ở Bệnh viện Bạch Mai. Anh rất kiên nhẫn, dìu tôi lên xe và đứng chờ suốt buổi sáng để đưa về. Thái độ như con cháu trong nhà!',
    date: '2026-07-05',
    verified: true,
    routeText: 'Đông Anh ➔ Bệnh Viện Bạch Mai'
  }
];

export const ROUTE_HIGHLIGHTS: RouteHighlight[] = [
  {
    id: 'rt-1',
    fromTo: 'Hà Nội ⇆ Sân Bay Nội Bài',
    estimatedTime: '35 - 45 Phút',
    priceFrom: '230.000đ',
    vehicleType: 'Xe 4 chỗ / 7 chỗ đời mới',
    highlights: ['Bao phí cầu đường', 'Miễn phí chờ 60 phút', 'Đón tận sảnh terminal'],
    popularCount: 1420
  },
  {
    id: 'rt-2',
    fromTo: 'Hà Nội ⇆ Hạ Long / Mụn Cảng Quảng Ninh',
    estimatedTime: '2 giờ 15 phút',
    priceFrom: '1.200.000đ',
    vehicleType: 'Sedan 4 chỗ & SUV 7 chỗ',
    highlights: ['Đi cao tốc 5B', 'Giảm 50% lượt về', 'Dừng nghỉ thoải mái'],
    popularCount: 890
  },
  {
    id: 'rt-3',
    fromTo: 'Hà Nội ⇆ Hải Phòng / Cát Bà',
    estimatedTime: '1 giờ 45 phút',
    priceFrom: '1.000.000đ',
    vehicleType: 'Xe riêng sạch đẹp',
    highlights: ['Lái êm ái', 'Đón tận nhà', 'Tùy chọn ghép hoặc bao xe'],
    popularCount: 750
  },
  {
    id: 'rt-4',
    fromTo: 'Hà Nội ⇆ Ninh Bình / Tràng An',
    estimatedTime: '1 giờ 30 phút',
    priceFrom: '900.000đ',
    vehicleType: 'Xe du lịch 4-7 chỗ',
    highlights: ['Tài xế am hiểu du lịch', 'Hỗ trợ đặt ăn uống', 'Chờ đón trọn ngày'],
    popularCount: 620
  }
];

export const DRIVER_INFO = {
  name: 'Đinh Văn Hiến',
  title: 'Chủ Xe & Tài Xế Lái Xe Chuyên Nghiệp',
  phone: '0988.123.456',
  formattedPhone: '0988 123 456',
  zaloLink: 'https://zalo.me/0988123456',
  address: 'Trụ sở chính: Hà Nội & Các khu vực lân cận (Phục vụ 24/7 toàn quốc)',
  experienceYears: 10,
  totalKm: '500.000+',
  totalRides: '15.000+',
  satisfactionRate: '99.8%',
  bio: 'Chào mừng quý khách! Tôi là Đinh Văn Hiến - tài xế cá nhân uy tín với hơn 10 năm kinh nghiệm lái xe chuyên nghiệp. Tôi tâm niệm sự an toàn, thoải mái và niềm tin của quý khách là ưu tiên hàng đầu trong mỗi chuyến đi. Rất hân hạnh được đồng hành cùng bạn và gia đình trên mọi nẻo đường!',
  avatarImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
};

export const MOCK_CHAT_FAQS = [
  '🍺 Giá lái xe hộ đêm nay bao nhiêu?',
  '✈️ Giá xe đưa đón sân bay Nội Bài?',
  '🚘 Thuê xe 7 chỗ đi Ninh Bình?',
  '📞 Cho tôi xin số điện thoại Zalo tài xế!'
];
