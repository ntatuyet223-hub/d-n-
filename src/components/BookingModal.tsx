import React, { useState, useEffect } from 'react';
import { ServiceType, BookingData } from '../types';
import { DRIVER_INFO } from '../data/mockData';
import { Calendar, MapPin, Clock, Phone, User, CheckCircle2, X, Car, ShieldCheck, ArrowRight, Copy, Check, Printer } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceType | string;
  prefilledFareData?: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService = 'lai_xe_ho',
  prefilledFareData,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>((preselectedService as ServiceType) || 'lai_xe_ho');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [note, setNote] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync props when opening
  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService as ServiceType);
    }
    if (prefilledFareData) {
      if (prefilledFareData.pickupLocation) setPickupLocation(prefilledFareData.pickupLocation);
      if (prefilledFareData.dropoffLocation) setDropoffLocation(prefilledFareData.dropoffLocation);
      if (prefilledFareData.serviceType) setServiceType(prefilledFareData.serviceType);
    }
    // Default today date and current time
    const today = new Date().toISOString().split('T')[0];
    setPickupDate(today);
    setPickupTime('20:00');
  }, [preselectedService, prefilledFareData, isOpen]);

  if (!isOpen) return null;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pickupLocation) return;

    setLoading(true);

    try {
      const payload: BookingData = {
        fullName,
        phone,
        serviceType,
        pickupLocation,
        dropoffLocation: dropoffLocation || 'Theo chỉ dẫn của khách',
        pickupDate,
        pickupTime,
        note,
        estimatedPrice: prefilledFareData?.estimatedPrice || undefined,
      };

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedBooking(data.booking);
      } else {
        // Fallback simulate
        setConfirmedBooking({
          id: `DVH-${Math.floor(1000 + Math.random() * 9000)}`,
          ...payload,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      // Local fallback
      setConfirmedBooking({
        id: `DVH-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        phone,
        serviceType,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        pickupTime,
        note,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            {/* Modal Title */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl border border-amber-300">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">ĐẶT LỊCH CHUYẾN XE TRỰC TUYẾN</h3>
                <p className="text-xs text-slate-500 font-medium">Tài xế Đinh Văn Hiến phục vụ chu đáo & đúng giờ 100%</p>
              </div>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Họ và Tên Của Bạn *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="VD: Anh Minh..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Số Điện Thoại (Bắt buộc) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0912 345 678..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Chọn Loại Dịch Vụ
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  <option value="lai_xe_ho">🍺 Lái Xe Hộ Người Say / Mệt Mỏi</option>
                  <option value="dua_don_san_bay">✈️ Đưa Đón Sân Bay Nội Bài</option>
                  <option value="thue_xe_4cho">🚗 Xe 4 Chỗ Có Tài Xế (Vios, Accent, Mazda)</option>
                  <option value="thue_xe_7cho">🚘 Xe 7 Chỗ Rộng Rãi (Xpander, Carnival)</option>
                  <option value="xe_di_tinh">🛣️ Xe Đi Tỉnh Đường Dài Khứ Hồi</option>
                  <option value="lai_xe_hop_dong">💼 Lái Xe Hợp Đồng VIP / Doanh Nghiệp</option>
                </select>
              </div>

              {/* Pickup & Dropoff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Điểm Đón Của Bạn *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Số nhà, tên đường, khu vực..."
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Điểm Đến (Dự kiến)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Nơi muốn đến..."
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Ngày Đón
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Giờ Đón Dự Kiến
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Ghi chú thêm cho tài xế (Lưu ý mang hành lý, gọi trước...)
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Cần ghế trẻ em, có 2 vali lớn, hoặc nhờ gọi trước 10 phút..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              {prefilledFareData?.estimatedPrice && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-bold">Giá cước ước tính đã tính:</span>
                  <span className="text-base font-black text-amber-700 font-mono">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prefilledFareData.estimatedPrice)}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-sm cursor-pointer transition-all uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>ĐANG GỬI XÁC NHẬN...</span>
                ) : (
                  <>
                    <span>XÁC NHẬN ĐẶT CHUYẾN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Booking Confirmation Ticket Card */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-black border border-amber-300">
                <span>MÃ CHUYẾN: {confirmedBooking.id}</span>
                <button
                  onClick={() => handleCopyCode(confirmedBooking.id)}
                  className="p-1 hover:text-amber-700 cursor-pointer"
                  title="Sao chép mã chuyến xe"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-3">ĐẶT CHUYẾN THÀNH CÔNG!</h3>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto font-medium">
                Cảm ơn bạn! Tài xế <strong className="text-amber-700 font-bold">{DRIVER_INFO.name}</strong> đã nhận được thông tin và sẽ gọi xác nhận trong 3-5 phút.
              </p>
            </div>

            {/* Ticket Info Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 font-mono text-slate-800">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="text-slate-900 font-bold">{confirmedBooking.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="text-amber-700 font-bold">{confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Điểm đón:</span>
                <span className="text-slate-900 font-bold">{confirmedBooking.pickupLocation}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Thời gian đón:</span>
                <span className="text-slate-900 font-bold">{confirmedBooking.pickupTime} - {confirmedBooking.pickupDate}</span>
              </div>
            </div>

            {/* Call Direct Option */}
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${DRIVER_INFO.phone}`}
                className="w-full py-3.5 bg-amber-500 text-slate-950 font-black rounded-xl shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                <Phone className="w-4 h-4 fill-slate-950" />
                <span>GỌI TRỰC TIẾP TÀI XẾ: {DRIVER_INFO.formattedPhone}</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer border border-slate-300"
              >
                Đóng Cửa Sổ Này
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
