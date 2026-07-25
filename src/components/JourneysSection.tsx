import React, { useState } from 'react';
import { DRIVER_INFO, ROUTE_HIGHLIGHTS } from '../data/mockData';
import { Award, ShieldCheck, MapPin, Clock, Users, ArrowRight, HeartHandshake, CheckCircle2, FileCheck, X, Eye } from 'lucide-react';

interface JourneysSectionProps {
  onSelectRoute: (fromTo: string, price: string) => void;
}

export const JourneysSection: React.FC<JourneysSectionProps> = ({ onSelectRoute }) => {
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);

  return (
    <section id="journeys" className="py-16 md:py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wider uppercase inline-block mb-3">
            Hành Trình Bình An
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            KINH NGHIỆM & CÁC TUYẾN ĐƯỜNG PHỔ BIẾN
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Hơn 10 năm gắn bó với vô vàn cung đường, Đinh Văn Hiến tự hào mang đến sự tin tưởng tuyệt đối cho hàng ngàn hành khách.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center group hover:border-amber-500 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">10+ Năm</div>
            <div className="text-xs text-slate-600 font-bold mt-1">Kinh nghiệm lái xe an toàn</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center group hover:border-amber-500 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">500.000+</div>
            <div className="text-xs text-slate-600 font-bold mt-1">Km dặm đường bình an</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center group hover:border-amber-500 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">15.000+</div>
            <div className="text-xs text-slate-600 font-bold mt-1">Chuyến xe hoàn thành</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center group hover:border-amber-500 transition-all shadow-sm hover:shadow-md">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-3 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">99.8%</div>
            <div className="text-xs text-slate-600 font-bold mt-1">Khách hài lòng & gọi lại</div>
          </div>
        </div>

        {/* Driver Bio Highlight Card */}
        <div id="about" className="bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-slate-100 border-2 border-amber-300 rounded-3xl p-6 sm:p-10 mb-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={DRIVER_INFO.avatarImage}
                  alt={DRIVER_INFO.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-amber-500 shadow-xl"
                />
                <span className="absolute bottom-2 right-2 p-2 rounded-full bg-amber-500 text-slate-950 shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mt-4">{DRIVER_INFO.name}</h3>
              <p className="text-xs text-amber-800 font-bold">{DRIVER_INFO.title}</p>

              {/* Interactive License Verification Trigger */}
              <button
                onClick={() => setShowLicenseModal(true)}
                className="mt-3 px-3.5 py-1.5 rounded-full bg-white text-slate-800 hover:text-amber-700 border border-slate-300 text-xs font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer hover:bg-slate-50"
              >
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Xem Hồ Sơ Bằng Lái Xe</span>
              </button>
            </div>

            <div className="md:col-span-8 space-y-4">
              <h3 className="text-2xl font-black text-slate-900">
                "Tôi Lái Xe Bằng Sự Thận Trọng Như Chở Chính Người Thân Của Mình"
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {DRIVER_INFO.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-800 font-bold">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Không hút thuốc, không rượu bia khi lên ca</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Thuộc đường xá Hà Nội & các tỉnh phía Bắc</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hỗ trợ mang vác hành lý cẩn thận</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Xe luôn dọn dẹp thơm tho, sạch sẽ</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Popular Routes List */}
        <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Các Tuyến Đường Khách Hàng Đặt Nhiều Nhất</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROUTE_HIGHLIGHTS.map((route) => (
            <div
              key={route.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-amber-500 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                    {route.vehicleType}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    {route.popularCount}+ lượt đặt
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  {route.fromTo}
                </h4>

                <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium mb-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Thời gian di chuyển: {route.estimatedTime}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {route.highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 rounded-md text-[11px] text-slate-700 border border-slate-200 font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Cước trọn gói từ</span>
                  <span className="text-lg font-black text-amber-600 font-mono">{route.priceFrom}</span>
                </div>

                <button
                  onClick={() => onSelectRoute(route.fromTo, route.priceFrom)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center space-x-1 shadow-md shadow-amber-500/20 active:scale-95"
                >
                  <span>Chọn Tuyến Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* License Modal Lightbox */}
      {showLicenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
            
            <button
              onClick={() => setShowLicenseModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">Xác Minh Bằng Lái & Hồ Sơ Tài Xế</h3>
            <p className="text-xs text-slate-500 mb-4">Hồ sơ pháp lý đầy đủ & minh bạch</p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2.5 font-medium text-slate-800 mb-6">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Họ và Tên:</span>
                <span className="font-bold text-slate-900">{DRIVER_INFO.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Hạng Bằng Lái:</span>
                <span className="font-bold text-amber-700">Hạng B2 (Ô tô 4-9 chỗ) & Hạng A2</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Thâm Niên Lái Xe:</span>
                <span className="font-bold text-slate-900">10+ Năm (Từ 2015)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tình Trạng Lý Lịch:</span>
                <span className="font-bold text-emerald-600">Trong sạch, 0 tiền án tiền sự</span>
              </div>
            </div>

            <button
              onClick={() => setShowLicenseModal(false)}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Đóng Cửa Sổ
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
