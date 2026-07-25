import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Sparkles, 
  Truck, 
  Gift, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { CartItem, Product, ProductSize, ColorOption, Voucher } from '../types';
import { VOUCHERS } from '../data/categories';
import { formatVND, calculateCartSubtotal } from '../utils/formatters';

interface SmartCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  allProducts: Product[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onUpdateItemOptions: (cartItemId: string, newSize: ProductSize, newColor: ColorOption) => void;
  onRemoveItem: (cartItemId: string) => void;
  onAddToCart: (product: Product, size: ProductSize, color: ColorOption, quantity: number) => void;
  onProceedToCheckout: (appliedVoucher: Voucher | null) => void;
}

export const SmartCartDrawer: React.FC<SmartCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  allProducts,
  onUpdateQuantity,
  onUpdateItemOptions,
  onRemoveItem,
  onAddToCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [inputVoucher, setInputVoucher] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // AI Smart Cart Analysis State
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    cartAnalysis?: string;
    styleTheme?: string;
    stylistTip?: string;
  } | null>(null);

  const subtotal = calculateCartSubtotal(cartItems);

  // Free shipping threshold = 500,000 VND
  const FREESHIP_THRESHOLD = 500000;
  const freeShipProgress = Math.min(100, (subtotal / FREESHIP_THRESHOLD) * 100);
  const remainingForFreeship = Math.max(0, FREESHIP_THRESHOLD - subtotal);

  // Calculate Voucher Discount
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = (subtotal * appliedVoucher.discountValue) / 100;
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const isFreeShipEligible = subtotal >= FREESHIP_THRESHOLD || appliedVoucher?.code === 'FREESHIP';
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipEligible ? 0 : 35000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Handle Apply Voucher
  const handleApplyVoucher = (v: Voucher) => {
    if (subtotal < v.minOrderValue) {
      setVoucherError(`Mã ${v.code} áp dụng cho đơn từ ${formatVND(v.minOrderValue)}`);
      return;
    }
    setAppliedVoucher(v);
    setVoucherError('');
  };

  const handleCustomVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = VOUCHERS.find((v) => v.code.toUpperCase() === inputVoucher.trim().toUpperCase());
    if (found) {
      handleApplyVoucher(found);
      setInputVoucher('');
    } else {
      setVoucherError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  // Smart Cross-sell Recommendations: find products not currently in cart
  const cartProductIds = new Set(cartItems.map((i) => i.product.id));
  const suggestedProducts = allProducts
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 3);

  // Trigger Gemini AI Cart Analysis
  const handleAnalyzeCartAI = async () => {
    if (cartItems.length === 0) return;
    setIsAnalyzingAI(true);
    try {
      const response = await fetch('/api/gemini/smart-cart-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            name: item.product.name,
            category: item.product.categoryName,
            selectedColor: item.selectedColor.name,
            selectedSize: item.selectedSize,
          })),
        }),
      });

      const data = await response.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error(err);
      setAiAnalysis({
        cartAnalysis: 'Phối đồ hài hòa giữa nét nữ tính và thanh lịch.',
        styleTheme: 'Modern Luxury',
        stylistTip: 'Nên mang thêm phụ kiện hoa tai ngọc trai để nổi bật hơn.',
      });
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md sm:max-w-lg h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#221C18] text-amber-200 flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
                <span>Giỏ Hàng Thông Minh</span>
                <span className="text-xs font-sans font-normal text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  AURA AI
                </span>
              </h2>
              <p className="text-[11px] text-stone-500">
                {cartItems.length} sản phẩm ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} món)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-200 rounded-full text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping & Gift Progress Meter */}
        <div className="bg-amber-50/80 p-3.5 border-b border-amber-200/80 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-stone-800">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-800" />
              <span>Freeship Toàn Quốc & Tặng Khăn Lụa</span>
            </div>
            <span className="font-bold text-[#9E3B4D]">
              {subtotal >= FREESHIP_THRESHOLD ? 'Đạt Điều Kiện ✓' : `Thiếu ${formatVND(remainingForFreeship)}`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden mb-1">
            <div
              className="bg-linear-to-r from-amber-600 via-rose-500 to-[#9E3B4D] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShipProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-600">
            {subtotal >= FREESHIP_THRESHOLD ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Chúc mừng! Bạn được miễn phí vận chuyển & nhận 1 Khăn Lụa Tơ Tằm cao cấp!
              </span>
            ) : (
              <span>Thêm sản phẩm để được miễn phí vận chuyển hỏa tốc & quà tặng lụa độc quyền.</span>
            )}
          </p>
        </div>

        {/* Cart Main Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-stone-100">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-stone-800">Giỏ hàng đang trống</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Hãy khám phá bộ sưu tập đầm lụa & blazer cao cấp để bắt đầu mua sắm!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#221C18] text-white text-xs font-bold rounded-full hover:bg-[#9E3B4D] transition-colors cursor-pointer"
              >
                Khám Phá Sản Phẩm
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3 pt-2">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 p-3 bg-stone-50/80 hover:bg-stone-50 rounded-2xl border border-stone-200/60 transition-colors relative"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-18 h-24 object-cover rounded-xl border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-stone-900 line-clamp-1">{item.product.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer shrink-0"
                            title="Xóa món này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Inline Option Switches */}
                        <div className="flex items-center gap-2 mt-1">
                          {/* Color Switcher */}
                          <select
                            value={item.selectedColor.name}
                            onChange={(e) => {
                              const newC = item.product.colors.find((c) => c.name === e.target.value);
                              if (newC) onUpdateItemOptions(item.cartItemId, item.selectedSize, newC);
                            }}
                            className="text-[11px] bg-white border border-stone-200 rounded-md px-1.5 py-0.5 text-stone-700 outline-hidden"
                          >
                            {item.product.colors.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>

                          {/* Size Switcher */}
                          <select
                            value={item.selectedSize}
                            onChange={(e) => {
                              onUpdateItemOptions(
                                item.cartItemId,
                                e.target.value as ProductSize,
                                item.selectedColor
                              );
                            }}
                            className="text-[11px] bg-white border border-stone-200 rounded-md px-1.5 py-0.5 font-bold text-stone-800 outline-hidden"
                          >
                            {item.product.sizes.map((s) => (
                              <option key={s} value={s}>
                                Size {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-stone-800 text-[11px]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-[#9E3B4D] text-xs">
                            {formatVND(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Cart Stylist Assistant Trigger Section */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={handleAnalyzeCartAI}
                  disabled={isAnalyzingAI}
                  className="w-full py-2.5 px-3 rounded-xl bg-linear-to-r from-amber-100 via-rose-100 to-amber-200 border border-amber-300 text-[#221C18] font-bold text-xs flex items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-700 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{isAnalyzingAI ? 'AI Đang Phân Tích Phối Đồ...' : 'Phân Tích Phối Đồ AI Giỏ Hàng'}</span>
                </button>

                {aiAnalysis && (
                  <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-300 text-xs text-stone-800 space-y-1.5 animate-in fade-in">
                    <div className="flex items-center justify-between font-bold text-amber-950">
                      <span>Stylist AI Nhận Xét:</span>
                      <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
                        {aiAnalysis.styleTheme || 'Elegance Look'}
                      </span>
                    </div>
                    <p className="text-stone-700 text-[11px] leading-relaxed">{aiAnalysis.cartAnalysis}</p>
                    {aiAnalysis.stylistTip && (
                      <div className="text-[11px] text-[#9E3B4D] font-semibold pt-1 border-t border-amber-200/80">
                        💡 Mẹo Stylist: {aiAnalysis.stylistTip}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Smart Mix & Match Cross-sell Items */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Gợi Ý Mua Kèm Hoàn Hảo (-15%)</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-stone-200"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-xs">
                          <div className="font-medium text-stone-800 line-clamp-1">{p.name}</div>
                          <div className="font-bold text-[#9E3B4D] text-[11px]">{formatVND(p.price)}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(p, p.sizes[0], p.colors[0], 1)}
                        className="px-2.5 py-1 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        + Thêm Kèm
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vouchers & Discount Input */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mã Giảm Giá / Voucher</span>
                  </span>
                  {appliedVoucher && (
                    <button
                      onClick={() => setAppliedVoucher(null)}
                      className="text-rose-600 text-[11px] hover:underline"
                    >
                      Bỏ áp dụng
                    </button>
                  )}
                </div>

                {/* Quick Voucher Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {VOUCHERS.map((v) => {
                    const isSelected = appliedVoucher?.code === v.code;
                    return (
                      <button
                        key={v.code}
                        onClick={() => handleApplyVoucher(v)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#9E3B4D] text-white border-[#9E3B4D]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
                        }`}
                      >
                        {v.code}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Code Form */}
                <form onSubmit={handleCustomVoucherSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã voucher (VD: AURA10)"
                    value={inputVoucher}
                    onChange={(e) => setInputVoucher(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-stone-100 text-xs rounded-xl border border-stone-200 focus:border-amber-700 outline-hidden uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#221C18] hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Áp Dụng
                  </button>
                </form>

                {voucherError && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{voucherError}</span>
                  </p>
                )}

                {appliedVoucher && (
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                    <span>Đã áp dụng mã <strong>{appliedVoucher.code}</strong></span>
                    <span className="font-bold">-{formatVND(discountAmount)}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tạm tính hàng:</span>
                <span className="font-semibold text-stone-900">{formatVND(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-700 font-medium">
                  <span>Giảm giá voucher:</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">Miễn phí</span> : formatVND(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#221C18] pt-2 border-t border-stone-200">
                <span>Tổng Thanh Toán:</span>
                <span className="text-[#9E3B4D]">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(appliedVoucher)}
              className="w-full py-3.5 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiến Hành Thanh Toán ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} sản phẩm)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
