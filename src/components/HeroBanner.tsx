import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Ruler, Zap } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import heroBannerImg from '../assets/images/fashion_hero_banner_1784964182913.jpg';

interface HeroBannerProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenAIStylist: () => void;
  onOpenSizeAdvisor: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenAIStylist,
  onOpenSizeAdvisor,
}) => {
  return (
    <div className="relative bg-[#FAF8F5] overflow-hidden border-b border-amber-900/10">
      {/* Editorial Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-[#221C18] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span>Resort & Office Capsule Collection 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#221C18] leading-tight tracking-tight">
              Tôn Vinh Nét Đẹp <br />
              <span className="italic font-serif font-normal text-[#9E3B4D]">Kiêu Kỳ & Thanh Lịch</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Khám phá các thiết kế đầm lụa satin Pháp, blazer dạ Tweed thượng lưu và áo kiểu tơ organza. Tích hợp{' '}
              <strong className="text-[#9E3B4D] font-semibold">Giỏ hàng thông minh</strong> gợi ý phối đồ cá nhân hóa cùng{' '}
              <strong className="text-stone-900 font-semibold">Tư vấn size AI</strong> chuẩn xác.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectCategory('dresses')}
                className="px-6 py-3 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>Xem BST Váy Đầm</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAIStylist}
                className="px-5 py-3 bg-white hover:bg-amber-50 text-[#221C18] border border-amber-300 text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Gợi Ý Phối Đồ AI</span>
              </button>

              <button
                onClick={onOpenSizeAdvisor}
                className="px-4 py-3 text-stone-700 hover:text-[#9E3B4D] text-xs font-medium flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Thử Size AI</span>
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Chất Lụa & Tweed Chuẩn</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Đổi Trả 30 Ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Khớp Size AI 98%</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Hỏa Tốc 2H</span>
              </div>
            </div>
          </div>

          {/* Right Campaign Image Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={heroBannerImg}
                alt="AURA Women Fashion Campaign 2026"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                  Lookbook SS 2026
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold">Lụa Satin & Trench Coat Parisian</div>
                <div className="text-xs text-stone-200 mt-1">Sự hòa quyện giữa nét hiện đại & cổ điển tinh tế</div>
              </div>
            </div>

            {/* Floating Smart Cart Badge */}
            <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-amber-200 max-w-xs animate-in zoom-in-90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold text-xs">
                  AI
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-800">Giỏ Hàng Smart Auto-Suggest</div>
                  <div className="text-[11px] text-stone-500">
                    Tự động đề xuất phụ kiện & mã voucher giảm 15% khi thêm đầm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="mt-12 pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Danh Mục Sản Phẩm Nổi Bật
            </h2>
            <span className="text-xs text-amber-900 font-medium">Bộ sưu tập mới về 2026</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#221C18] text-white shadow-md'
                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200/80 hover:border-amber-300'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
