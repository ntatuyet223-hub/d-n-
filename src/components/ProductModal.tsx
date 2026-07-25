import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { Product, ProductSize, ColorOption, CartItem } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, color: ColorOption, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenSizeAdvisor: (productName: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeAdvisor,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Cross-sell items
  const matchingProducts = (product.matchingProductIds || [])
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === img ? 'border-[#9E3B4D] ring-2 ring-[#9E3B4D]/20 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Order Controls */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>SKU: {product.sku}</span>
                <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {product.categoryName}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-stone-800 ml-1">{product.rating}</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500">{product.reviewCount} đánh giá từ người mua</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-extrabold text-[#9E3B4D]">{formatVND(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">{formatVND(product.originalPrice)}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-rose-100 text-[#9E3B4D] text-xs font-bold px-2 py-0.5 rounded-md">
                    Tiết kiệm {formatVND(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Material */}
              <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-stone-700 space-y-1">
                <div className="font-bold text-amber-950">Chất liệu & Phom dáng:</div>
                <p>{product.material}</p>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-xs leading-relaxed mt-3">{product.description}</p>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                <span>Màu Sắc:</span>
                <span className="text-[#9E3B4D]">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-[#221C18] bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                      style={{ backgroundColor: color.code }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with AI Advisor Link */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">Kích Thước (Size):</span>
                <button
                  onClick={() => onOpenSizeAdvisor(product.name)}
                  className="text-[#9E3B4D] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tư vấn Size AI theo số đo</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#221C18] text-white border-[#221C18] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-stone-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-[#9E3B4D] hover:bg-[#832e3e] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAddedToast ? 'Đã Thêm Vào Giỏ ✓' : 'Thêm Vào Giỏ Hàng'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-[#9E3B4D] text-[#9E3B4D]'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Complete the look Bundle Cross-Sell */}
            {matchingProducts.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#221C18] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Gợi Ý Mua Kèm Set Phối (Deal Giảm 15%)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {matchingProducts.map((matchItem) => (
                    <div
                      key={matchItem.id}
                      onClick={() => onSelectProduct(matchItem)}
                      className="flex items-center justify-between p-2 bg-amber-50/50 hover:bg-amber-100/60 rounded-2xl border border-amber-200/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={matchItem.images[0]}
                          alt={matchItem.name}
                          className="w-10 h-10 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-semibold text-stone-800 line-clamp-1">
                            {matchItem.name}
                          </div>
                          <div className="text-[11px] font-bold text-[#9E3B4D]">
                            {formatVND(matchItem.price)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(matchItem, matchItem.sizes[0], matchItem.colors[0], 1);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-[#221C18] hover:text-white border border-amber-300 text-[11px] font-bold text-amber-900 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm Kèm</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
