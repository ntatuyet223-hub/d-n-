import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SmartCartDrawer } from './components/SmartCartDrawer';
import { SmartSizeAdvisorModal } from './components/SmartSizeAdvisorModal';
import { AIStylistModal } from './components/AIStylistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LookbookSection } from './components/LookbookSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

import { Product, ProductSize, ColorOption, CartItem, CategoryId, Voucher } from './types';
import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { Heart, X, ShoppingBag, Sparkles } from 'lucide-react';
import { formatVND } from './utils/formatters';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeView, setActiveView] = useState<'shop' | 'lookbook' | 'reviews'>('shop');

  // LocalStorage Persisted State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist_v1');
      return saved ? JSON.parse(saved) : ['aura-001'];
    } catch {
      return ['aura-001'];
    }
  });

  // Modal Open Controls
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart_v1', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist_v1', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    size: ProductSize,
    color: ColorOption,
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: `${product.id}-${color.name}-${size}-${Date.now()}`,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          addedAt: Date.now(),
        };
        return [newItem, ...prev];
      }
    });

    showToast(`Đã thêm "${product.name}" vào Giỏ Hàng Smart!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleUpdateItemOptions = (
    cartItemId: string,
    newSize: ProductSize,
    newColor: ColorOption
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, selectedSize: newSize, selectedColor: newColor }
          : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích ♥');
        return [...prev, productId];
      }
    });
  };

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans flex flex-col antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#221C18] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-amber-300/40 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('shop');
        }}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        products={PRODUCTS}
        onSelectProduct={(product) => setSelectedProductModal(product)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        {activeView === 'shop' && (
          <>
            {/* Hero Banner */}
            <HeroBanner
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenAIStylist={() => setIsAIStylistOpen(true)}
              onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
            />

            {/* Product Catalog Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#221C18]">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Bộ Sưu Tập Thời Trang'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Hiển thị {filteredProducts.length} sản phẩm thiết kế cao cấp
                  </p>
                </div>

                {/* Filter tags summary */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs text-stone-400 font-medium">Phong cách:</span>
                  <span className="text-xs bg-white text-stone-700 px-3 py-1 rounded-full border border-stone-200">
                    Satin & Tweed Paris
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-3 py-1 rounded-full">
                    Gợi ý Smart Cart AI
                  </span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickAdd={(p, size, color) => handleAddToCart(p, size, color, 1)}
                    onSelectProduct={(p) => setSelectedProductModal(p)}
                  />
                ))}
              </div>
            </section>

            {/* Lookbook Preview */}
            <LookbookSection
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProductModal(p)}
              onOpenAIStylist={() => setIsAIStylistOpen(true)}
            />

            {/* Customer Reviews */}
            <ReviewsSection />
          </>
        )}

        {activeView === 'lookbook' && (
          <LookbookSection
            products={PRODUCTS}
            onSelectProduct={(p) => setSelectedProductModal(p)}
            onOpenAIStylist={() => setIsAIStylistOpen(true)}
          />
        )}

        {activeView === 'reviews' && <ReviewsSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductModal}
        allProducts={PRODUCTS}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        isWishlisted={selectedProductModal ? wishlistIds.includes(selectedProductModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
        onSelectProduct={(p) => setSelectedProductModal(p)}
      />

      {/* Smart Shopping Cart Drawer */}
      <SmartCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        allProducts={PRODUCTS}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateItemOptions={handleUpdateItemOptions}
        onRemoveItem={handleRemoveCartItem}
        onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        onProceedToCheckout={(voucher) => {
          setAppliedVoucher(voucher);
          setIsCartOpen(false);
          setIsCheckoutModalOpen(true);
        }}
      />

      {/* Smart Size Advisor Modal */}
      <SmartSizeAdvisorModal
        isOpen={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
        productName={selectedProductModal?.name || 'Sản phẩm AURA'}
        onSelectSize={(size) => {
          showToast(`Đã chọn Size ${size} theo tư vấn AI!`);
        }}
      />

      {/* AI Stylist Modal */}
      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProductModal(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        appliedVoucher={appliedVoucher}
        onClearCart={() => setCartItems([])}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
      />

      {/* Wishlist Modal Drawer */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#9E3B4D] fill-current" />
                <span>Danh Sách Yêu Thích ({wishlistedProducts.length})</span>
              </h3>
              <button
                onClick={() => setIsWishlistModalOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-full text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  Chưa có sản phẩm nào trong danh sách yêu thích.
                </div>
              ) : (
                wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProductModal(p);
                      setIsWishlistModalOpen(false);
                    }}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-16 object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900 line-clamp-1">{p.name}</div>
                        <div className="text-xs font-bold text-[#9E3B4D]">{formatVND(p.price)}</div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p, p.sizes[0], p.colors[0], 1);
                      }}
                      className="px-3 py-1.5 bg-[#221C18] text-white text-xs font-bold rounded-xl hover:bg-[#9E3B4D] transition-colors"
                    >
                      Thêm Giỏ
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
