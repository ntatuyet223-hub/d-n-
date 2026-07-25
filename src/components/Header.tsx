import React, { useState, useEffect } from 'react';
import { Phone, Car, Calendar, ShieldCheck, MessageSquare, Menu, X, Play, Clock, ChevronRight, Sparkles, Award } from 'lucide-react';
import { DRIVER_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenBooking: (serviceType?: string) => void;
  onOpenChat: () => void;
  onReplayIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenChat,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Bar - High Contrast Status & Quick Speed Dial */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-amber-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Sẵn Sàng Phục Vụ 24/7 • Có Mặt Sau 15-20 Phút</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-200">
              Lái chính: <strong className="text-amber-400 font-bold">{DRIVER_INFO.name}</strong> (10+ Năm Kinh Nghiệm)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onReplayIntro}
              className="hidden lg:flex items-center space-x-1 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-xs font-medium"
              title="Xem lại hiệu ứng mở màn chiếc xe"
            >
              <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Xem intro xe chạy</span>
            </button>

            <a
              href={`tel:${DRIVER_INFO.phone}`}
              className="flex items-center space-x-1.5 font-bold text-amber-300 hover:text-amber-200 transition-colors bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Hotline/Zalo: {DRIVER_INFO.formattedPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bright Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md py-3'
            : 'bg-white border-b border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Car className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                ĐINH VĂN HIẾN
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Lái xe 24/7
                </span>
              </span>
              <span className="text-[11px] text-amber-700 font-bold tracking-wide">
                AN TOÀN • ĐÚNG GIỜ • TẬN TÂM
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-bold text-slate-700">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-amber-600 transition-colors cursor-pointer py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-500"
            >
              Dịch Vụ
            </button>
            <button
              onClick={() => scrollToSection('fare-calculator')}
              className="hover:text-amber-600 transition-colors cursor-pointer py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-500"
            >
              Bảng Giá & Tính Cước
            </button>
            <button
              onClick={() => scrollToSection('journeys')}
              className="hover:text-amber-600 transition-colors cursor-pointer py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-500"
            >
              Tuyến Đường & Stats
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-amber-600 transition-colors cursor-pointer py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-500"
            >
              Đánh Giá Khách Hàng
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-amber-600 transition-colors cursor-pointer py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-500"
            >
              Giới Thiệu
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenChat}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>Tư Vấn AI 24/7</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center space-x-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>ĐẶT XE NGAY</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đặt xe</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-bold text-slate-800">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-700 flex items-center justify-between border border-transparent hover:border-amber-200"
            >
              <span>Dịch vụ lái xe</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('fare-calculator')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-700 flex items-center justify-between border border-transparent hover:border-amber-200"
            >
              <span>Ước tính giá cước</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('journeys')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-700 flex items-center justify-between border border-transparent hover:border-amber-200"
            >
              <span>Tuyến đường & Kinh nghiệm</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-700 flex items-center justify-between border border-transparent hover:border-amber-200"
            >
              <span>Đánh giá thực tế</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-amber-700 flex items-center justify-between border border-transparent hover:border-amber-200"
            >
              <span>Giới thiệu tài xế</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-3 bg-slate-900 text-amber-400 font-bold rounded-xl text-center flex items-center justify-center space-x-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Hỏi đáp AI CSKH 24/7</span>
            </button>
            <button
              onClick={onReplayIntro}
              className="w-full py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-1 border border-slate-300"
            >
              <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span>Xem lại hiệu ứng chiếc xe chạy mở màn</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
