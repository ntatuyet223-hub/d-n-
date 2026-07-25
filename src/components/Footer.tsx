import React from 'react';
import { DRIVER_INFO } from '../data/mockData';
import { Phone, Car, MapPin, Clock, ShieldCheck, Heart, MessageSquare, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-amber-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                ĐINH VĂN HIẾN
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-md">
              Dịch vụ lái xe cá nhân chuyên nghiệp, uy tín 100%. Đưa đón sân bay Nội Bài, lái xe hộ người say/mệt mỏi, xe 4-7 chỗ đi tỉnh đường dài. Luôn chu đáo, an toàn và đúng giờ!
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-bold text-amber-400">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
                10+ Năm Kinh Nghiệm
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
                Lái Xe An Toàn 24/7
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Danh Mục Tác Vụ
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  • Dịch Vụ Lái Xe Hộ & Thuê Xe
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('fare-calculator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  • Bảng Giá & Ước Tính Cước
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('journeys')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  • Kinh Nghiệm & Tuyến Đường Phổ Biến
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reviews')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  • Đánh Giá Từ Khách Hàng Real
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-amber-400 transition-colors cursor-pointer text-amber-400">
                  • Đặt Lịch Chuyến Xe
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Thông Tin Liên Hệ Direct
            </h4>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Phone className="w-4 h-4" />
                <span>Hotline/Zalo: {DRIVER_INFO.formattedPhone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Cơ sở chính: Cầu Giấy, Hà Nội (Phục vụ toàn quốc)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Thời gian: Hoạt động liên tục 24/7 (Đêm & Ngày)</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs text-center shadow cursor-pointer"
              >
                ĐẶT CHUYẾN NGAY
              </button>
              <button
                onClick={onOpenChat}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center cursor-pointer border border-slate-700"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} Dịch Vụ Lái Xe Đinh Văn Hiến. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
