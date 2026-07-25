import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Building2, 
  QrCode, 
  ShoppingBag, 
  Copy, 
  Printer, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CartItem, ShippingAddress, Order, Voucher } from '../types';
import { formatVND, calculateCartSubtotal } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedVoucher: Voucher | null;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedVoucher,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Nguyễn Phương Thảo',
    phone: '0908123456',
    email: 'phuongthao.fashion@gmail.com',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    detailAddress: '128 Đồng Khởi, Phường Bến Nghé',
    note: 'Giao trong giờ hành chính, gọi trước 15 phút',
  });

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'cod' | 'bank_transfer'>('momo');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const subtotal = calculateCartSubtotal(cartItems);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = (subtotal * appliedVoucher.discountValue) / 100;
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const shippingFee = subtotal >= 500000 || appliedVoucher?.code === 'FREESHIP' ? 0 : 35000;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const provinces = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Phòng',
    'Bình Dương',
    'Đồng Nai',
    'Bà Rịa - Vũng Tàu',
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    const newOrder: Order = {
      orderId: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cartItems],
      shippingAddress: address,
      paymentMethod,
      shippingFee,
      subtotal,
      discountAmount,
      voucherCode: appliedVoucher?.code,
      totalAmount,
      status: 'processing',
      estimatedDelivery: 'Dự kiến 1 - 2 ngày làm việc',
    };

    setCreatedOrder(newOrder);
    setStep(3);
    onClearCart();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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

        {/* Header Steps Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between max-w-xs mx-auto mb-2">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                step >= 1 ? 'bg-[#221C18] text-white' : 'bg-stone-100 text-stone-400'
              }`}
            >
              1. Địa chỉ
            </span>
            <span className="h-0.5 w-8 bg-stone-200" />
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                step >= 2 ? 'bg-[#221C18] text-white' : 'bg-stone-100 text-stone-400'
              }`}
            >
              2. Thanh toán
            </span>
            <span className="h-0.5 w-8 bg-stone-200" />
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                step === 3 ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-400'
              }`}
            >
              3. Hoàn tất
            </span>
          </div>
        </div>

        {/* STEP 1: Address Info */}
        {step === 1 && (
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-200 pb-2">
              Thông Tin Giao Hàng
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Họ & Tên Người Nhận *</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Số Điện Thoại Nhận Hàng *</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Email Thông Báo Đơn *</label>
              <input
                type="email"
                required
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Tỉnh / Thành Phố *</label>
                <select
                  value={address.province}
                  onChange={(e) => setAddress({ ...address, province: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Quận / Huyện *</label>
                <input
                  type="text"
                  required
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Phường / Xã *</label>
                <input
                  type="text"
                  required
                  value={address.ward}
                  onChange={(e) => setAddress({ ...address, ward: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Địa Chỉ Chi Tiết (Tòa nhà, Số nhà) *</label>
              <input
                type="text"
                required
                value={address.detailAddress}
                onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Ghi Chú Cho Cửa Hàng / Shipper</label>
              <input
                type="text"
                value={address.note || ''}
                onChange={(e) => setAddress({ ...address, note: e.target.value })}
                placeholder="VD: Giao giờ hành chính, bọc quà tặng giúp mình..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiếp Tục Chọn Phương Thức Thanh Toán</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-200 pb-2">
              Chọn Phương Thức Thanh Toán
            </h3>

            <div className="space-y-2.5">
              {/* MOMO QR */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'momo'
                    ? 'border-[#9E3B4D] bg-rose-50/50 ring-1 ring-[#9E3B4D]'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="accent-[#9E3B4D]"
                  />
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center shrink-0">
                    MoMo
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-800">Ví MoMo / Quét Mã QR Tuần Hoàn</div>
                    <div className="text-[11px] text-stone-500">Xác nhận tự động trong 5 giây</div>
                  </div>
                </div>
              </label>

              {/* Bank VietQR */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#9E3B4D] bg-rose-50/50 ring-1 ring-[#9E3B4D]'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-[#9E3B4D]"
                  />
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                    VietQR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-800">Chuyển Khoản Ngân Hàng (VietQR Auto-Check)</div>
                    <div className="text-[11px] text-stone-500">
                      Ngân hàng Techcombank / Vietcombank chính chủ AURA
                    </div>
                  </div>
                </div>
              </label>

              {/* VNPay */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'vnpay'
                    ? 'border-[#9E3B4D] bg-rose-50/50 ring-1 ring-[#9E3B4D]'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                    className="accent-[#9E3B4D]"
                  />
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0">
                    VNPay
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-800">Cổng Thanh Toán VNPay / Thẻ ATM Nội Địa</div>
                    <div className="text-[11px] text-stone-500">Giảm thêm 20k khi chọn thanh toán qua VNPay</div>
                  </div>
                </div>
              </label>

              {/* COD */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#9E3B4D] bg-rose-50/50 ring-1 ring-[#9E3B4D]'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#9E3B4D]"
                  />
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                    COD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-800">Thanh Toán Khi Nhận Hàng (COD)</div>
                    <div className="text-[11px] text-stone-500">Được đồng kiểm & thử đồ cùng Shipper trước khi nhận</div>
                  </div>
                </div>
              </label>
            </div>

            {/* Total Breakdown */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tổng tiền hàng ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} món):</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-700">
                  <span>Mã giảm giá ({appliedVoucher?.code}):</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#221C18] pt-2 border-t border-stone-200">
                <span>Thành tiền cần thanh toán:</span>
                <span className="text-[#9E3B4D] text-base">{formatVND(totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
              >
                Quay Lại
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#9E3B4D] hover:bg-[#832e3e] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xác Nhận Đặt Hàng Ngay</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Receipt & Confirmation */}
        {step === 3 && createdOrder && (
          <div className="space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-extrabold text-2xl text-stone-900">Đặt Hàng Thành Công!</h3>
              <p className="text-xs text-stone-500">
                Cảm ơn quý khách <strong>{createdOrder.shippingAddress.fullName}</strong> đã lựa chọn thời trang AURA.
              </p>
            </div>

            {/* QR Payment visual if Bank/MoMo */}
            {(paymentMethod === 'momo' || paymentMethod === 'bank_transfer') && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-center space-y-3">
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Mã QR Thanh Toán Tự Động VietQR / MoMo
                </div>

                <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-md mx-auto border border-amber-200 flex flex-col items-center justify-center">
                  <QrCode className="w-28 h-28 text-[#221C18]" />
                  <span className="text-[10px] font-extrabold text-[#9E3B4D] mt-1">Quét bằng app ngân hàng</span>
                </div>

                <div className="text-xs space-y-1 text-stone-800">
                  <div>
                    Số tài khoản: <strong>9900 8822 6886</strong> (Techcombank)
                  </div>
                  <div>
                    Chủ tài khoản: <strong>AURA WOMEN FASHION CO. LTD</strong>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-rose-800 font-bold">
                    <span>Nội dung chuyển khoản: {createdOrder.orderId}</span>
                    <button
                      onClick={() => handleCopy(createdOrder.orderId)}
                      className="p-1 hover:bg-amber-200 rounded cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedCode && <span className="text-[10px] text-emerald-700">Đã chép mã!</span>}
                </div>
              </div>
            )}

            {/* Receipt Summary Card */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Mã đơn hàng:</span>
                <span className="font-bold text-[#221C18]">{createdOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Thời gian tạo:</span>
                <span>{createdOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Địa chỉ giao:</span>
                <span className="text-right font-medium">{createdOrder.shippingAddress.detailAddress}, {createdOrder.shippingAddress.district}, {createdOrder.shippingAddress.province}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Hình thức thanh toán:</span>
                <span className="font-bold uppercase text-stone-800">{createdOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#221C18] pt-2 border-t border-stone-200">
                <span>Tổng giá trị đơn:</span>
                <span className="text-[#9E3B4D]">{formatVND(createdOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Hóa Đơn</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 bg-[#221C18] hover:bg-[#9E3B4D] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-colors cursor-pointer"
              >
                Hoàn Tất & Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
