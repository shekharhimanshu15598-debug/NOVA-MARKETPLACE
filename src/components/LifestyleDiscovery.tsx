import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { LIFESTYLE_STORIES } from '../data/mockData';

interface LifestyleDiscoveryProps {
  onSelectStoryCategory: (category: string) => void;
}

export const LifestyleDiscovery: React.FC<LifestyleDiscoveryProps> = ({ onSelectStoryCategory }) => {
  return (
    <section id="lifestyle-stories-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Compass className="w-3 h-3 text-emerald-700" />
          Editorial Stories
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-manrope">
          Curated Lifestyle Guides
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base mt-2 font-dmsans">
          Inspiration for your workspace, outdoor expeditions, automotive adventures, and home sanctuaries.
        </p>
      </div>

      {/* Grid of 4 Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LIFESTYLE_STORIES.map((story) => (
          <div
            key={story.id}
            id={`story-card-${story.id}`}
            onClick={() => onSelectStoryCategory(story.targetCategory)}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-ambient hover:shadow-hover border border-zinc-200/80 transition-all duration-300 cursor-pointer flex flex-col justify-end p-6 sm:p-8"
          >
            {/* Background Image */}
            <img
              src={story.image}
              alt={story.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity group-hover:opacity-95" />

            {/* Card Text Content */}
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1.5">
                {story.category}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal leading-snug">
                {story.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-dmsans mt-2 line-clamp-2 max-w-lg">
                {story.description}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                <span>{story.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
