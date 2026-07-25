import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare } from 'lucide-react';
import { MOCK_REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [likesCount, setLikesCount] = useState<Record<string, number>>(
    MOCK_REVIEWS.reduce((acc, r) => ({ ...acc, [r.id]: r.likes }), {})
  );

  const filteredReviews = filterRating === 'all'
    ? MOCK_REVIEWS
    : MOCK_REVIEWS.filter((r) => r.rating === filterRating);

  const handleLike = (id: string) => {
    setLikesCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <div className="bg-white py-12 sm:py-16 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E3B4D]">
              Đánh Giá Thực Tế Từ Khách Hàng
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#221C18] mt-1">
              Phản Hồi & Trải Nghiệm Mua Sắm AURA
            </h2>
          </div>

          {/* Rating Rating Summary */}
          <div className="flex items-center gap-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-stone-900">4.9 / 5.0</div>
              <div className="flex items-center text-amber-500 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-amber-200" />
            <div className="text-xs text-stone-600">
              <strong>99.2%</strong> khách hàng hài lòng <br />
              với chất vải & tính năng thử size AI
            </div>
          </div>
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-[#221C18] text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tất Cả Đánh Giá
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                filterRating === star
                  ? 'bg-[#9E3B4D] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>{star} Sao</span>
              <Star className="w-3 h-3 fill-current text-amber-400" />
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#221C18] text-amber-200 font-bold text-xs flex items-center justify-center">
                      {rev.customerName[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">{rev.customerName}</div>
                      <div className="text-[10px] text-stone-400">{rev.date}</div>
                    </div>
                  </div>

                  {rev.verifiedPurchase && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Đã mua hàng</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">"{rev.comment}"</p>
              </div>

              <div className="pt-3 border-t border-stone-200/80 text-[11px] text-stone-500 space-y-1">
                <div>
                  Sản phẩm: <strong className="text-stone-800">{rev.productName}</strong>
                </div>
                <div>
                  Màu: {rev.purchasedColor} • Size: {rev.purchasedSize} • ({rev.userHeightWeight})
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 text-stone-500 hover:text-[#9E3B4D] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Hữu ích ({likesCount[rev.id]})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
