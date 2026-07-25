import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/mockData';
import { ReviewItem } from '../types';
import { Star, MessageSquare, CheckCircle2, User, Plus, X, ThumbsUp } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({});

  // New review form state
  const [customerName, setCustomerName] = useState('');
  const [serviceUsed, setServiceUsed] = useState('Lái Xe Hộ Người Say');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [routeText, setRouteText] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      customerName,
      customerRole: 'Khách hàng vừa đánh giá',
      serviceUsed,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      routeText: routeText || 'Hành trình an toàn',
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);

    // Reset
    setCustomerName('');
    setComment('');
    setRouteText('');
  };

  const handleToggleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredReviews = starFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === starFilter);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wider uppercase inline-block mb-3">
              Cảm Nhận Thực Tế
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              FEEDBACK & ĐÁNH GIÁ TỪ KHÁCH HÀNG
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl font-medium">
              Hành khách chia sẻ cảm nhận sau những chuyến đi an toàn cùng tài xế Đinh Văn Hiến.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 flex items-center space-x-2 transition-all cursor-pointer self-start md:self-auto active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Viết Đánh Giá Của Bạn</span>
          </button>
        </div>

        {/* Interactive Rating Filter Chips */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setStarFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              starFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            Tất Cả ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setStarFilter(star)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                starFilter === star
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>{star} Sao</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 p-6 rounded-3xl relative flex flex-col justify-between hover:border-amber-500 transition-all shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-extrabold text-base">
                      {rev.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                        {rev.customerName}
                        {rev.verified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">{rev.customerRole || 'Hành khách'}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-50 rounded-lg text-xs text-slate-800 font-bold mb-3 border border-slate-200">
                  <span>Dịch vụ: <strong>{rev.serviceUsed}</strong></span>
                  {rev.routeText && <span className="text-slate-500">• {rev.routeText}</span>}
                </div>

                {/* Comment Text */}
                <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Ngày đi: {rev.date}</span>

                <button
                  onClick={() => handleToggleHelpful(rev.id)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hữu ích ({12 + (helpfulCounts[rev.id] || 0)})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl border border-amber-300">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Gửi Đánh Giá Của Bạn</h3>
                <p className="text-xs text-slate-500">Chia sẻ trải nghiệm chuyến đi cùng anh Đinh Văn Hiến</p>
              </div>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Anh Hoàng / Chị Mai..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Loại dịch vụ đã sử dụng
                </label>
                <select
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  <option value="Lái Xe Hộ Người Say">🍺 Lái Xe Hộ Người Say</option>
                  <option value="Đưa Đón Sân Bay Nội Bài">✈️ Đưa Đón Sân Bay</option>
                  <option value="Thuê Xe 4 Chỗ">🚗 Thuê Xe 4 Chỗ</option>
                  <option value="Thuê Xe 7 Chỗ">🚘 Thuê Xe 7 Chỗ</option>
                  <option value="Xe Đi Tỉnh Đường Dài">🛣️ Xe Đi Tỉnh Đường Dài</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Tuyến đường (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="VD: Cầu Giấy ➔ Nội Bài..."
                  value={routeText}
                  onChange={(e) => setRouteText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Mức độ hài lòng (Số sao)
                </label>
                <div className="flex items-center space-x-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-amber-700 font-bold ml-2">{rating}/5 Sao</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nội dung nhận xét *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cảm nhận về độ cẩn thận, thái độ phục vụ, tính đúng giờ của tài xế..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-md shadow-amber-500/20 text-sm cursor-pointer mt-2"
              >
                Gửi Đánh Giá Ngay
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
