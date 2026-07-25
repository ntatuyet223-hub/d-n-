import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Truck, 
  PhoneCall, 
  X,
  Menu,
  ChevronRight,
  Package
} from 'lucide-react';
import { CategoryId, Product, CartItem } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatVND, calculateCartSubtotal } from '../utils/formatters';

interface HeaderProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIStylist: () => void;
  onOpenOrderTracking: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  activeView: 'shop' | 'lookbook' | 'reviews';
  setActiveView: (view: 'shop' | 'lookbook' | 'reviews') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  cartItems,
  wishlistIds,
  onOpenCart,
  onOpenWishlist,
  onOpenAIStylist,
  onOpenOrderTracking,
  products,
  onSelectProduct,
  activeView,
  setActiveView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = calculateCartSubtotal(cartItems);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top Ticker Bar */}
      <div className="bg-[#221C18] text-[#F3E8DF] py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-amber-200/90 font-medium">
            <span className="bg-amber-800/60 text-amber-100 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Ưu đãi đặc biệt
            </span>
            <span className="animate-pulse">✨ Nhập MÃ <strong>AURA10</strong> giảm 10% | Freeship toàn quốc đơn từ 500k</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>Giao hỏa tốc 2H tại TP.HCM & Hà Nội</span>
            </div>
            <button
              onClick={onOpenOrderTracking}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Tra cứu đơn hàng</span>
            </button>
            <div className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>Hotline: 1900 6886</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('shop');
              onSelectCategory('all');
            }}
            className="group flex flex-col items-start"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-widest text-[#221C18] group-hover:text-[#9E3B4D] transition-colors">
              AURA
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-amber-800/80 -mt-1">
              PARISIAN ELEGANCE
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => {
              setActiveView('shop');
              onSelectCategory('all');
            }}
            className={`transition-colors py-1 relative ${
              activeView === 'shop' && selectedCategory === 'all'
                ? 'text-[#9E3B4D] font-semibold'
                : 'hover:text-[#9E3B4D]'
            }`}
          >
            Trang Chủ
            {activeView === 'shop' && selectedCategory === 'all' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9E3B4D] rounded-full" />
            )}
          </button>

          <div className="relative group py-1">
            <button className="hover:text-[#9E3B4D] transition-colors flex items-center gap-1 cursor-pointer">
              Danh Mục Thời Trang
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white shadow-xl rounded-xl border border-stone-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveView('shop');
                    onSelectCategory(cat.id);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between hover:bg-amber-50 hover:text-[#9E3B4D] transition-colors ${
                    selectedCategory === cat.id ? 'bg-amber-50 text-[#9E3B4D] font-semibold' : 'text-stone-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('lookbook')}
            className={`transition-colors py-1 relative ${
              activeView === 'lookbook' ? 'text-[#9E3B4D] font-semibold' : 'hover:text-[#9E3B4D]'
            }`}
          >
            Lookbook 2026
            {activeView === 'lookbook' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9E3B4D] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveView('reviews')}
            className={`transition-colors py-1 relative ${
              activeView === 'reviews' ? 'text-[#9E3B4D] font-semibold' : 'hover:text-[#9E3B4D]'
            }`}
          >
            Đánh Giá Khách Hàng
            {activeView === 'reviews' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9E3B4D] rounded-full" />
            )}
          </button>

          {/* AI Stylist Highlight Button */}
          <button
            onClick={onOpenAIStylist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-100 via-rose-100 to-amber-200 text-[#221C18] border border-amber-300/60 hover:shadow-md hover:scale-105 transition-all text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Trợ Lý Stylist AI</span>
          </button>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Live Search Input */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm váy đầm, blazer, lụa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-9 pr-8 py-1.5 bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs text-stone-800 rounded-full border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-top-1">
                <div className="text-[10px] uppercase font-bold text-stone-400 px-3 py-1">
                  Gợi ý tìm kiếm ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-amber-50/80 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-stone-800 truncate">{product.name}</div>
                      <div className="text-[11px] text-[#9E3B4D] font-semibold">{formatVND(product.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-stone-700 hover:text-[#9E3B4D] relative transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            title="Sản phẩm yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#9E3B4D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Smart Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#221C18] hover:bg-[#9E3B4D] text-white px-3.5 py-2 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-amber-200 group-hover:text-white transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9E3B4D] group-hover:bg-amber-400 group-hover:text-[#221C18] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-stone-300 leading-tight">Giỏ hàng Smart</span>
              <span className="text-xs font-bold text-amber-200 group-hover:text-white transition-colors">
                {cartSubtotal > 0 ? formatVND(cartSubtotal) : '0đ'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 text-xs rounded-full border border-stone-200"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={() => {
              setActiveView('shop');
              onSelectCategory('all');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-medium text-stone-800 hover:text-[#9E3B4D]"
          >
            Trang Chủ
          </button>

          <div className="space-y-1 pl-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Danh mục</div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveView('shop');
                  onSelectCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-1.5 text-xs rounded-lg px-2 ${
                  selectedCategory === cat.id ? 'bg-amber-50 text-[#9E3B4D] font-bold' : 'text-stone-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveView('lookbook');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 text-stone-800 text-xs font-medium"
            >
              Lookbook 2026
            </button>
            <button
              onClick={() => {
                onOpenAIStylist();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-100 text-[#221C18] font-bold text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Tư Vấn Stylist AI</span>
            </button>
            <button
              onClick={() => {
                onOpenOrderTracking();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-stone-600 text-xs hover:text-stone-900"
            >
              Tra Cứu Đơn Hàng
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
