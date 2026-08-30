import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { Category } from '../types';

interface CategoryExplorerProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectCategory }) => {
  return (
    <section id="category-explorer-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E9E0] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-2 border border-gray-300">
            <Sparkles className="w-3 h-3 text-[#BF5B30]" />
            Curated Collections
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-tight">
            Explore by Category
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">
            Browse verified listings across automobiles, tech gadgets, designer furniture, and professional gear.
          </p>
        </div>

        <button
          id="category-view-all-btn"
          onClick={() => onSelectCategory('all')}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#BF5B30] transition-colors cursor-pointer group self-start md:self-auto"
        >
          <span>View All 12 Categories</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Grid of 12 Bento Visual Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat: Category) => (
          <button
            key={cat.id}
            id={`category-card-${cat.slug}`}
            onClick={() => onSelectCategory(cat.slug)}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden text-left p-4 flex flex-col justify-between border border-gray-300 bg-[#1A1A1A] transition-all duration-300 shadow-bento hover:shadow-bento-hover hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
          >
            {/* Background Image with Zoom on Hover */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:via-black/30 transition-all" />
            </div>

            {/* Top Badge: Item Count */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                {cat.count}+ items
              </span>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom: Name & Subcategories Hint */}
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5 font-sans">
                {cat.subcategories.slice(0, 2).join(', ')}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
