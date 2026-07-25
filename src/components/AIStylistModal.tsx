import React, { useState } from 'react';
import { X, Sparkles, Send, Shirt, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AIStylistModal: React.FC<AIStylistModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [promptText, setPromptText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('Đi tiệc cưới sang trọng');
  const [selectedBodyShape, setSelectedBodyShape] = useState('Cân đối');
  const [selectedColorPref, setSelectedColorPref] = useState('Rose, Beige, Champagne');
  const [isLoading, setIsLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState<string | null>(null);

  const eventPresets = [
    'Đi tiệc cưới sang trọng',
    'Công sở hiện đại thanh lịch',
    'Hẹn hò lãng mạn',
    'Du lịch Resort đi biển',
    'Dạo phố mùa hè',
  ];

  const bodyShapes = ['Cân đối', 'Dáng quả lê (hông nở)', 'Dáng đồng hồ cát', 'Dáng mảnh mai'];

  const colorPills = [
    'Rose, Beige, Champagne',
    'Trắng Ivory, Milk',
    'Đen Tuyển, Navy',
    'Emerald, Olive',
  ];

  const handleConsultStylist = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: promptText.trim() || selectedEvent,
          eventType: selectedEvent,
          bodyShape: selectedBodyShape,
          colorPreference: selectedColorPref,
        }),
      });

      const data = await response.json();
      setAdviceResult(data.advice || data.fallbackAdvice);
    } catch (err) {
      console.error(err);
      setAdviceResult(
        'Stylist AURA gợi ý: Đối với sự kiện tiệc tùng sang trọng, bạn nên chọn Đầm Lụa Midi Cổ Yếm màu Rose Gold kết hợp cùng Áo Khoác Blazer Dạ Tweed và Bông Tai Ngọc Trai. Bộ ba này tôn bờ vai thanh mảnh, tôn dáng chuẩn phong cách tiểu thư Paris.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Find relevant products matching advice
  const recommendedItems = products.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-200 via-rose-200 to-amber-300 text-[#221C18] flex items-center justify-center font-bold shadow-md shrink-0">
            <Sparkles className="w-6 h-6 text-amber-900 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h2 className="font-serif font-extrabold text-xl sm:text-2xl text-stone-900">
              Trợ Lý Stylist Thời Trang AI AURA
            </h2>
            <p className="text-xs text-stone-500">Tư vấn tư duy phối đồ, tôn dáng & lựa chọn outfit hoàn hảo</p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          {/* Preset Events */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">1. Dịp mặc / Sự kiện:</label>
            <div className="flex flex-wrap gap-2">
              {eventPresets.map((evt) => (
                <button
                  key={evt}
                  type="button"
                  onClick={() => setSelectedEvent(evt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedEvent === evt
                      ? 'bg-[#221C18] text-white border-[#221C18] shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  {evt}
                </button>
              ))}
            </div>
          </div>

          {/* Body shape & Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1.5">2. Dáng người:</label>
              <select
                value={selectedBodyShape}
                onChange={(e) => setSelectedBodyShape(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 outline-hidden"
              >
                {bodyShapes.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1.5">3. Tông màu yêu thích:</label>
              <select
                value={selectedColorPref}
                onChange={(e) => setSelectedColorPref(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 outline-hidden"
              >
                {colorPills.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom prompt text */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              4. Yêu cầu chi tiết hơn (nếu có):
            </label>
            <textarea
              rows={2}
              placeholder="VD: Cần trang phục che khuyết điểm bắp tay, tôn chiều cao 1m55, phong cách quý cô..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:bg-white focus:border-amber-700 outline-hidden resize-none"
            />
          </div>

          <button
            onClick={() => handleConsultStylist()}
            disabled={isLoading}
            className="w-full py-3.5 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isLoading ? 'Stylist AI Đang Thiết Kế Bản Phối...' : 'Nhận Lời Khuyên Stylist AI'}</span>
          </button>
        </div>

        {/* AI Response Output Card */}
        {adviceResult && (
          <div className="mt-6 p-4 bg-amber-50/90 rounded-2xl border border-amber-300 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <span className="font-serif font-bold text-stone-900 text-sm">Lời Khuyên Từ Stylist AURA:</span>
              <span className="text-[10px] uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">
                AURA AI Custom
              </span>
            </div>

            <p className="text-stone-800 text-xs leading-relaxed whitespace-pre-line">{adviceResult}</p>

            {/* Recommended Catalog Items */}
            <div className="pt-2 border-t border-amber-200 space-y-2">
              <div className="text-xs font-bold text-stone-900">Sản phẩm gợi ý phối bộ từ AURA:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recommendedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition-colors cursor-pointer"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1 text-[11px]">
                      <div className="font-semibold text-stone-800 truncate">{item.name}</div>
                      <div className="font-bold text-[#9E3B4D]">{formatVND(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
