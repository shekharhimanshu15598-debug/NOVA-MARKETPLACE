import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface AnnouncementBarProps {
  onLearnMore?: () => void;
  onPostListing?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onLearnMore, onPostListing }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div id="announcement-bar" className="bg-[#141414] text-zinc-200 text-xs sm:text-sm py-2.5 px-4 transition-all duration-300 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[11px] border border-emerald-500/20">
            <Sparkles className="w-3 h-3 mr-1" /> New on NOVA
          </span>
          <span className="font-medium text-zinc-300">
            Sell unused items, or rent what you need with verified escrow protection.
          </span>
          <button
            id="announcement-learn-more-btn"
            onClick={onLearnMore}
            className="inline-flex items-center text-white hover:text-emerald-400 font-semibold underline underline-offset-4 ml-1 transition-colors group cursor-pointer"
          >
            How it works
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <button
          id="announcement-dismiss-btn"
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
