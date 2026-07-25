import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Sparkles, 
  Heart,
  Send
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 3000);
  };

  return (
    <footer className="bg-[#1A1613] text-stone-300 pt-12 pb-8 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/40 text-amber-200 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Giao Hàng Hỏa Tốc 2H</div>
              <div className="text-stone-400">Freeship toàn quốc đơn từ 500k</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/40 text-amber-200 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Đổi Trả 30 Ngày</div>
              <div className="text-stone-400">Đổi size & đổi mẫu tận nhà miễn phí</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/40 text-amber-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Chất Lượng Lụa & Tweed Thật</div>
              <div className="text-stone-400">Cam kết 100% đúng mô tả chất liệu</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/40 text-amber-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Trợ Lý Stylist AI 24/7</div>
              <div className="text-stone-400">Tư vấn phối đồ cá nhân hóa tự động</div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-serif text-3xl font-extrabold tracking-widest text-white">
              AURA
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Thương hiệu thời trang nữ cao cấp mang phong cách Parisian Chic hiện đại. Tích hợp trải nghiệm mua sắm trực tuyến thông minh, giỏ hàng tự động gợi ý phối đồ và tư vấn size AI.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Showroom Flagship: 128 Đồng Khởi, Q.1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline tư vấn & hỗ trợ: 1900 6886 (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>cskh@aurafashion.vn</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Danh Mục</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-amber-200 transition-colors">Váy Đầm Thiết Kế</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Áo Kiểu & Áo Lụa</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Blazer & Áo Khoác Dạ</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Chân Váy & Quần Tây</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Đồ Mặc Nhà Pijama</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Túi Xách & Trang Sức</a></li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Chính Sách</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-amber-200 transition-colors">Hướng dẫn chọn size AI</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Chính sách đổi trả 30 ngày</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Bảo hành vải & nút đính</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Phương thức thanh toán</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Tra cứu vận chuyển hỏa tốc</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Đăng Ký Nhận Mã Ưu Đãi VIP
            </h4>
            <p className="text-stone-400 text-xs">
              Nhận ngay voucher giảm 100k cho đơn hàng đầu tiên và cập nhật Lookbook mùa mới nhất.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-800 text-stone-100 rounded-xl border border-stone-700 text-xs focus:border-amber-400 outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-200 hover:bg-amber-100 text-[#221C18] font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi</span>
                </button>
              </div>

              {subscribed && (
                <p className="text-emerald-400 text-[11px]">
                  ✓ Cảm ơn bạn! Mã ưu đãi AURA10 đã được kích hoạt cho tài khoản của bạn.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div>© 2026 AURA Women Fashion. Bản quyền thuộc về AURA Elegance.</div>
          <div className="flex items-center gap-1">
            <span>Thiết kế tinh tế với</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            <span>& Giỏ hàng thông minh AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
