import React, { useState } from 'react';
import { Calculator, MapPin, Navigation, Clock, ShieldAlert, Sparkles, Check, ArrowRight, Phone, RefreshCw } from 'lucide-react';
import { ServiceType } from '../types';
import { DRIVER_INFO } from '../data/mockData';

interface FareCalculatorProps {
  onBookWithFare: (fareData: any) => void;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({ onBookWithFare }) => {
  const [serviceType, setServiceType] = useState<ServiceType>('lai_xe_ho');
  const [pickup, setPickup] = useState('Nội thành Hà Nội');
  const [dropoff, setDropoff] = useState('Sân Bay Nội Bài');
  const [distanceKm, setDistanceKm] = useState<number>(30);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [isNightTime, setIsNightTime] = useState<boolean>(false);

  // Fare Logic
  const getRatePerKm = () => {
    switch (serviceType) {
      case 'lai_xe_ho':
        return 12000;
      case 'dua_don_san_bay':
        return 8000;
      case 'thue_xe_4cho':
        return 9500;
      case 'thue_xe_7cho':
        return 11500;
      case 'xe_di_tinh':
        return 9000;
      case 'lai_xe_hop_dong':
        return 10000;
      default:
        return 10000;
    }
  };

  const getBaseMinFare = () => {
    switch (serviceType) {
      case 'lai_xe_ho':
        return 150000;
      case 'dua_don_san_bay':
        return 230000;
      case 'thue_xe_4cho':
        return 200000;
      case 'thue_xe_7cho':
        return 280000;
      case 'xe_di_tinh':
        return 300000;
      default:
        return 200000;
    }
  };

  const ratePerKm = getRatePerKm();
  const minFare = getBaseMinFare();
  const rawDistFare = Math.round(distanceKm * ratePerKm);
  let basePrice = Math.max(minFare, rawDistFare);

  let nightSurcharge = 0;
  if (isNightTime) {
    nightSurcharge = 30000;
  }

  const finalEstimatedPrice = Math.ceil((basePrice + (isRoundTrip ? basePrice * 0.6 : 0) + nightSurcharge) / 10000) * 10000;

  const handleApplyPresetRoute = (from: string, to: string, dist: number, srv: ServiceType) => {
    setPickup(from);
    setDropoff(to);
    setDistanceKm(dist);
    setServiceType(srv);
  };

  const handleProceedBooking = () => {
    onBookWithFare({
      serviceType,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      estimatedDistanceKm: distanceKm,
      isRoundTrip,
      isNightTime,
      estimatedPrice: finalEstimatedPrice,
    });
  };

  return (
    <section id="fare-calculator" className="py-16 md:py-24 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wider uppercase inline-block mb-3">
            Bảng Giá Cước Rõ Ràng & Trọn Gói
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CÔNG CỤ ƯỚC TÍNH GIÁ CƯỚC CHUYẾN ĐI
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Kéo chọn khoảng cách và loại dịch vụ để tính giá cước thực tế. Cam kết minh bạch, không chặt chém!
          </p>
        </div>

        {/* Quick Presets Buttons Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2 text-center">
            ⚡ CHỌN NHANH CHẶNG ĐƯỜNG PHỔ BIẾN
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleApplyPresetRoute('Cầu Giấy, Hà Nội', 'Sân Bày Nội Bài', 30, 'dua_don_san_bay')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              ✈️ Sân Bay Nội Bài (30km)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetRoute('Quán Nhậu Nội Thành', 'Về Nhà', 12, 'lai_xe_ho')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              🍺 Lái Xe Hộ Say Đêm (12km)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetRoute('Hà Nội', 'TP. Hải Phòng', 105, 'xe_di_tinh')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              🛣️ Hà Nội ➔ Hải Phòng (105km)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetRoute('Hà Nội', 'TP. Ninh Bình', 95, 'thue_xe_7cho')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              🚘 Hà Nội ➔ Ninh Bình (95km)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Inputs Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-md">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300">
                <Calculator className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Bảng Tính Cước Nhanh</h3>
                <p className="text-xs text-slate-500">Áp dụng cho toàn bộ khu vực Hà Nội & Đi Tỉnh</p>
              </div>
            </div>

            {/* Select Service */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                1. Chọn Loại Dịch Vụ
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'lai_xe_ho', name: '🍺 Lái xe hộ người say' },
                  { id: 'dua_don_san_bay', name: '✈️ Đưa đón sân bay' },
                  { id: 'thue_xe_4cho', name: '🚗 Xe 4 chỗ riêng' },
                  { id: 'thue_xe_7cho', name: '🚘 Xe 7 chỗ riêng' },
                  { id: 'xe_di_tinh', name: '🛣️ Xe đi tỉnh' },
                  { id: 'lai_xe_hop_dong', name: '💼 Xe hợp đồng VIP' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceType(s.id as ServiceType)}
                    className={`p-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                      serviceType === s.id
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup & Dropoff Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  2. Điểm Đón Của Bạn
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-sm text-slate-900 font-medium focus:border-amber-500 focus:bg-white focus:outline-none"
                    placeholder="VD: Quận Cầu Giấy..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  3. Điểm Đến
                </label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-sm text-slate-900 font-medium focus:border-amber-500 focus:bg-white focus:outline-none"
                    placeholder="VD: Sân Bày Nội Bài..."
                  />
                </div>
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                <span>4. Khoảng Cách Dự Kiến</span>
                <span className="text-amber-700 font-mono text-base bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
                  {distanceKm} KM
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={300}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-amber-500 h-2.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1.5">
                <span>Nội thành (2-15km)</span>
                <span>Sân bay (25-35km)</span>
                <span>Đi tỉnh (50-300km)</span>
              </div>
            </div>

            {/* Interactive Checkbox Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={isRoundTrip}
                  onChange={(e) => setIsRoundTrip(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Đi Khứ Hồi (2 Chiều)</span>
                  <span className="text-emerald-600 font-extrabold">Giảm 40% chiều về</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={isNightTime}
                  onChange={(e) => setIsNightTime(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Khung Giờ Đêm (22h - 05h)</span>
                  <span className="text-slate-500">Phụ phí tài xế +30.000đ</span>
                </div>
              </label>
            </div>

          </div>

          {/* Right Price Breakdown Card */}
          <div className="lg:col-span-5 bg-white border-2 border-amber-400 p-6 sm:p-8 rounded-3xl shadow-xl relative">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              Ước Tính Chính Xác
            </div>

            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest block mb-1">
              TỔNG CƯỚC DỰ KIẾN
            </span>

            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono my-2 text-amber-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalEstimatedPrice)}
            </div>

            <p className="text-xs text-slate-500 mb-6 border-b border-slate-200 pb-4">
              * Giá cước trọn gói dự kiến, không thu phụ phí ẩn hay tự ý tăng giá.
            </p>

            {/* Fare Items Breakdown */}
            <div className="space-y-3 text-xs text-slate-700 mb-8 font-medium">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Dịch vụ đã chọn:</span>
                <span className="font-bold text-slate-900">
                  {serviceType === 'lai_xe_ho' && 'Lái xe hộ người say'}
                  {serviceType === 'dua_don_san_bay' && 'Đưa đón sân bay'}
                  {serviceType === 'thue_xe_4cho' && 'Xe 4 chỗ riêng'}
                  {serviceType === 'thue_xe_7cho' && 'Xe 7 chỗ riêng'}
                  {serviceType === 'xe_di_tinh' && 'Xe đi tỉnh đường dài'}
                  {serviceType === 'lai_xe_hop_dong' && 'Lái xe hợp đồng'}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Khoảng cách tính cước:</span>
                <span className="font-mono font-bold text-slate-900">{distanceKm} Km (~ {ratePerKm.toLocaleString('vi-VN')}đ/km)</span>
              </div>

              {isRoundTrip && (
                <div className="flex justify-between py-1.5 border-b border-slate-100 text-emerald-700 font-bold">
                  <span>Ưu đãi khứ hồi (2 chiều):</span>
                  <span>- Giảm 40%</span>
                </div>
              )}

              {isNightTime && (
                <div className="flex justify-between py-1.5 border-b border-slate-100 text-amber-800 font-bold">
                  <span>Phụ phí ca đêm (22h-05h):</span>
                  <span>+30.000đ</span>
                </div>
              )}

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Nước uống & Khăn lạnh:</span>
                <span className="text-emerald-600 font-bold">Miễn phí</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleProceedBooking}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>ĐẶT XE THEO MỨC GIÁ NÀY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${DRIVER_INFO.phone}`}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Hoặc gọi trực tiếp: {DRIVER_INFO.formattedPhone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
