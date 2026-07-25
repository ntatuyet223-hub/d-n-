import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product, ProductSize, ColorOption } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: ProductSize, color: ColorOption) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToast, setIsAddedToast] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize, selectedColor);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#221C18] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              Mới Về
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-800 text-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#9E3B4D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-[#9E3B4D] text-white'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#9E3B4D]'
          }`}
          title={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Size Overlay on Hover */}
        <div className="absolute inset-x-2 bottom-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-stone-500 mb-1 text-center">
              Chọn Size & Thêm Giỏ Hàng
            </div>
            <div className="flex items-center justify-center gap-1 mb-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border transition-colors ${
                    selectedSize === s
                      ? 'bg-[#221C18] text-white border-[#221C18]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAddToCart}
              className="w-full py-1.5 bg-[#9E3B4D] hover:bg-[#832e3e] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAddedToast ? 'Đã thêm giỏ hàng ✓' : 'Thêm Nhanh Vào Giỏ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span>{product.categoryName}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 group-hover:text-[#9E3B4D] transition-colors">
            {product.name}
          </h3>

          <div className="text-[11px] text-stone-500 italic mt-0.5 truncate">
            {product.material}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c);
              }}
              className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                selectedColor.name === c.name ? 'ring-2 ring-amber-700 scale-110' : 'border-stone-300'
              }`}
              style={{ backgroundColor: c.code }}
              title={c.name}
            />
          ))}
          <span className="text-[10px] text-stone-400 ml-1 truncate">{selectedColor.name}</span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline justify-between pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-extrabold text-[#9E3B4D]">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-sm">
            Smart Cart Deal
          </span>
        </div>
      </div>
    </div>
  );
};
