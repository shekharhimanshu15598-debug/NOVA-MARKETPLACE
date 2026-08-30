import React from 'react';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const CommunityReviews: React.FC = () => {
  return (
    <section id="community-reviews-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Verified Experiences
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-manrope">
          Loved by Thousands of Buyers, Sellers & Renters
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base mt-2 font-dmsans">
          Read real stories from our verified community across India.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            id={`review-card-${rev.id}`}
            className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-ambient flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-zinc-700 text-xs sm:text-sm font-dmsans italic leading-relaxed">
                "{rev.text}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-3">
                <img
                  src={rev.authorAvatar}
                  alt={rev.authorName}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">{rev.authorName}</h4>
                    {rev.verifiedPurchase && (
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" title="Verified Transaction" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">
                    {rev.authorLocation} • {rev.date}
                  </p>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-zinc-400 font-medium truncate">
                Item: <span className="text-zinc-600 font-semibold">{rev.listingTitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
