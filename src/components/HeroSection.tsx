import React, { useState } from 'react';
import { Phone, ShieldCheck, Car, Clock, Star, MapPin, Calendar, CheckCircle2, ArrowRight, Zap, Sparkles, Navigation } from 'lucide-react';
import { DRIVER_INFO, SERVICES_DATA } from '../data/mockData';

interface HeroSectionProps {
  onOpenBooking: (serviceType?: string, prefilledData?: { pickupLocation?: string; dropoffLocation?: string }) => void;
  onOpenFareCalc: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenFareCalc,
}) => {
  const [quickService, setQuickService] = useState('lai_xe_ho');
  const [quickPickup, setQuickPickup] = useState('');
  const [quickDropoff, setQuickDropoff] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(quickService, {
      pickupLocation: quickPickup,
      dropoffLocation: quickDropoff,
    });
  };

  const handleQuickPreset = (presetPickup: string, presetDropoff: string, presetService: string) => {
    setQuickPickup(presetPickup);
    setQuickDropoff(presetDropoff);
    setQuickService(presetService);
  };

  return (
    <div className="relative bg-gradient-to-b from-amber-500/10 via-amber-50/50 to-slate-100/90 text-slate-900 overflow-hidden pt-8 pb-16 md:py-20 border-b border-slate-200">
      {/* Soft Decorative Ambient Background Light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Phục Vụ Tận Tâm • Có Mặt Trong 15-20 Phút Đêm / Ngày</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
              LÁI XE TẬN TÂM <br />
              <span className="text-amber-600 underline decoration-amber-400/50 decoration-wavy decoration-2">
                AN TOÀN MỌI NẺO ĐƯỜNG
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
              Dịch vụ lái xe cá nhân & thuê xe chuyên nghiệp của <strong className="text-slate-900 font-extrabold">{DRIVER_INFO.name}</strong>.
              Chuyên lái xe hộ người say/mệt mỏi, đưa đón sân bay Nội Bài, xe đi tỉnh khứ hồi và cho thuê xe 4 - 7 chỗ cao cấp.
            </p>

            {/* Key Value Props Bullet Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% An Toàn & Bảo Mật</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-colors">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Chuẩn Giờ 100%</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-colors col-span-2 sm:col-span-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />
                <span>99.8% Đánh Giá 5 Sao</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a
                href={`tel:${DRIVER_INFO.phone}`}
                className="px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center space-x-3 transition-all cursor-pointer transform hover:-translate-y-1 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-slate-950" />
                <span>GỌI HOTLINE: {DRIVER_INFO.formattedPhone}</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base border border-slate-800 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>ĐẶT LỊCH CHUYẾN XE</span>
              </button>
            </div>

            {/* Driver Profile Bar */}
            <div className="flex items-center space-x-3 pt-2 text-xs text-slate-600 bg-white/70 p-2.5 rounded-2xl border border-slate-200/80 max-w-lg">
              <img
                src={DRIVER_INFO.avatarImage}
                alt={DRIVER_INFO.name}
                className="w-9 h-9 rounded-full border-2 border-amber-500 object-cover shadow-sm"
              />
              <div>
                <span className="block font-bold text-slate-900">Tài xế {DRIVER_INFO.name} – Bằng B2/A2</span>
                <span className="text-slate-600">Luôn tư vấn báo giá trực tiếp, thân thiện và nhiệt tình!</span>
              </div>
            </div>

          </div>

          {/* Right Hero Quick Ride Booking Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-amber-400/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-amber-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Car className="w-5 h-5 text-amber-600" />
                    Đặt Chuyến Nhanh
                  </h3>
                  <p className="text-xs text-slate-500">Báo giá tức thì • Không phát sinh chi phí</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold">
                  ● Đang Sẵn Sàng
                </span>
              </div>

              {/* Quick Route Presets (Nhấn vô tác vụ nhanh) */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Tuyến phổ biến (Bấm để điền nhanh):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickPreset('Nội Thành Hà Nội', 'Sân Bay Nội Bài', 'dua_don_san_bay')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    ✈️ Cầu Giấy ➔ Nội Bài
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPreset('Quận Hoàn Kiếm', 'Quán Nhậu / Nhà Hàng', 'lai_xe_ho')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    🍺 Lái Xe Hộ Say
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPreset('Hà Nội', 'Ninh Bình / Hải Phòng', 'xe_di_tinh')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    🛣️ Xe Đi Tỉnh
                  </button>
                </div>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                {/* Select Service Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loại Dịch Vụ Cần Đặt
                  </label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  >
                    <option value="lai_xe_ho">🍺 Lái Xe Hộ Người Say / Mệt Mỏi</option>
                    <option value="dua_don_san_bay">✈️ Đưa Đón Sân Bay Nội Bài</option>
                    <option value="thue_xe_4cho">🚗 Xe 4 Chỗ Đời Mới Có Tài Xế</option>
                    <option value="thue_xe_7cho">🚘 Xe 7 Chỗ Rộng Rãi Có Tài Xế</option>
                    <option value="xe_di_tinh">🛣️ Xe Đi Tỉnh Đường Dài</option>
                    <option value="lai_xe_hop_dong">💼 Lái Xe Hợp Đồng VIP</option>
                  </select>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Điểm Đón Của Bạn *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="VD: 123 Cầu Giấy, Hà Nội..."
                      value={quickPickup}
                      onChange={(e) => setQuickPickup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Điểm Đến Dự Kiến
                  </label>
                  <div className="relative">
                    <Navigation className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="VD: Sân Bày Nội Bài / Hải Phòng..."
                      value={quickDropoff}
                      onChange={(e) => setQuickDropoff(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Action Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-md shadow-amber-500/20 text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2 uppercase tracking-wider"
                >
                  <span>TIẾP TỤC ĐẶT XE & XÁC NHẬN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={onOpenFareCalc}
                    className="text-xs text-amber-700 hover:text-amber-800 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bấm vào đây để tính cước chi tiết theo Km & Đêm muộn</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
