import React from 'react';
import { Sparkles, ShoppingBag, Eye } from 'lucide-react';
import resortImg from '../assets/images/lookbook_resort_collection_1784964197600.jpg';
import tweedImg from '../assets/images/office_tweed_collection_1784964211698.jpg';
import { Product } from '../types';

interface LookbookSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenAIStylist: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  onSelectProduct,
  onOpenAIStylist,
}) => {
  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-16 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Lookbook Editorial 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#221C18]">
            Bộ Sưu Tập Cảm Cụm Phong Cách
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Sự phối hợp hoàn hảo giữa chất liệu lụa cao cấp, dạ Tweed thượng lưu và phụ kiện ngọc trai cho nàng thơ hiện đại.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Resort Silk Collection */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 group">
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={resortImg}
                alt="French Riviera Resort Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  Capsule 01 • Resort & Riviera
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1">Đầm Lụa Satin Rose Gold & Nơ Tơ</h3>
                <p className="text-xs text-stone-200 mt-1 max-w-md">
                  Bay bổng nhẹ nhàng cho những buổi tiệc ngoài trời, tiệc hoàng hôn biển lãng mạn.
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between bg-white border-t border-stone-100">
              <div className="text-xs">
                <span className="font-bold text-stone-900">3 sản phẩm trong bộ phối này</span>
                <div className="text-stone-500">Đầm lụa midi + Bông tai ngọc trai + Khăn lụa</div>
              </div>

              <button
                onClick={() => onSelectProduct(products[0])}
                className="px-4 py-2 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Xem Outfit Này</span>
              </button>
            </div>
          </div>

          {/* Card 2: Office Tweed Collection */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 group">
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={tweedImg}
                alt="Parisian Office Tweed Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  Capsule 02 • High Fashion Office
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1">Blazer Dạ Tweed Parisian & Túi Da Bò</h3>
                <p className="text-xs text-stone-200 mt-1 max-w-md">
                  Tuyên ngôn thời trang sắc sảo cho quý cô công sở hiện đại và thanh lịch.
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between bg-white border-t border-stone-100">
              <div className="text-xs">
                <span className="font-bold text-stone-900">3 sản phẩm trong bộ phối này</span>
                <div className="text-stone-500">Blazer Tweed + Quần tây lưng cao + Túi da bò</div>
              </div>

              <button
                onClick={() => onSelectProduct(products[2])}
                className="px-4 py-2 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Xem Outfit Này</span>
              </button>
            </div>
          </div>
        </div>

        {/* Call to AI consultation banner */}
        <div className="p-8 rounded-3xl bg-linear-to-r from-[#221C18] via-stone-900 to-[#3D221A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-amber-900/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Chưa biết chọn phong cách nào?</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Để Stylist AI AURA Thiết Kế Bản Phối Cho Riêng Bạn</h3>
            <p className="text-xs text-stone-300 max-w-xl">
              Nhập chiều cao, cân nặng và sự kiện sắp tham dự. Hệ thống AI sẽ tự động phân tích và đưa ra gợi ý phối đồ chuẩn xác.
            </p>
          </div>

          <button
            onClick={onOpenAIStylist}
            className="px-6 py-3.5 bg-amber-200 hover:bg-amber-100 text-[#221C18] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shrink-0 cursor-pointer"
          >
            Tư Vấn Outfit Với AI
          </button>
        </div>
      </div>
    </div>
  );
};
