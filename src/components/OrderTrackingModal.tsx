import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { formatVND } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('AUR-2026-9812');
  const [trackedOrder, setTrackedOrder] = useState<{
    orderId: string;
    customerName: string;
    phone: string;
    date: string;
    status: 'pending' | 'packing' | 'shipping' | 'delivered';
    address: string;
    itemsCount: number;
    totalAmount: number;
  } | null>({
    orderId: 'AUR-2026-9812',
    customerName: 'Nguyễn Phương Thảo',
    phone: '0908123456',
    date: '24/07/2026 14:30',
    status: 'shipping',
    address: '128 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    itemsCount: 2,
    totalAmount: 1410000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setTrackedOrder({
      orderId: searchQuery.toUpperCase().startsWith('AUR') ? searchQuery.toUpperCase() : `AUR-${searchQuery}`,
      customerName: 'Nguyễn Phương Thảo',
      phone: '0908***456',
      date: new Date().toLocaleDateString('vi-VN') + ' 10:15',
      status: 'shipping',
      address: 'TP. Hồ Chí Minh',
      itemsCount: 2,
      totalAmount: 1250000,
    });
  };

  const steps = [
    { key: 'pending', label: 'Chờ Xác Nhận', desc: 'Đã nhận đơn hàng', time: '14:30 24/07' },
    { key: 'packing', label: 'Đang Đóng Gói', desc: 'Đóng bọc hộp lụa AURA', time: '16:00 24/07' },
    { key: 'shipping', label: 'Đang Vận Chuyển', desc: 'Shipper hỏa tốc đang giao', time: '08:30 Hôm nay' },
    { key: 'delivered', label: 'Đã Giao Thành Công', desc: 'Đồng kiểm & nghiệm thu', time: 'Dự kiến 11:30' },
  ];

  const getCurrentStepIndex = () => {
    if (!trackedOrder) return 0;
    switch (trackedOrder.status) {
      case 'pending':
        return 0;
      case 'packing':
        return 1;
      case 'shipping':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 2;
    }
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Tra Cứu Đơn Hàng AURA</h3>
            <p className="text-xs text-stone-500">Nhập mã đơn hàng hoặc số điện thoại để theo dõi lộ trình</p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="VD: AUR-2026-9812 hoặc 0908123456"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:bg-white outline-hidden uppercase"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#221C18] hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Tra Cứu
          </button>
        </form>

        {trackedOrder && (
          <div className="space-y-5 animate-in fade-in">
            {/* Order info summary */}
            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs space-y-1">
              <div className="flex justify-between items-center font-bold text-stone-900">
                <span>Mã đơn: {trackedOrder.orderId}</span>
                <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                  Đang giao hàng
                </span>
              </div>
              <div className="text-stone-600">Khách hàng: {trackedOrder.customerName} ({trackedOrder.phone})</div>
              <div className="text-stone-600">Địa chỉ: {trackedOrder.address}</div>
              <div className="text-stone-600 font-semibold pt-1 border-t border-amber-200/60 flex justify-between">
                <span>Tổng tiền: {formatVND(trackedOrder.totalAmount)}</span>
                <span>{trackedOrder.itemsCount} sản phẩm</span>
              </div>
            </div>

            {/* Live Progress Timeline */}
            <div className="space-y-4 relative pl-4 border-l-2 border-stone-200">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="relative pl-4 space-y-0.5">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                        isPassed
                          ? 'bg-[#9E3B4D] border-[#9E3B4D]'
                          : 'bg-white border-stone-300'
                      } ${isCurrent ? 'ring-4 ring-rose-100 animate-pulse' : ''}`}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-bold ${
                          isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">{step.time}</span>
                    </div>

                    <p className="text-[11px] text-stone-500">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
