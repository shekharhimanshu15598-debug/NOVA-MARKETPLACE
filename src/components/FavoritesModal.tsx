import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Listing } from '../types';
import { ProductCard } from './ProductCard';

interface FavoritesModalProps {
  onClose: () => void;
  favorites: string[];
  allListings: Listing[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onBrowseAll: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  onClose,
  favorites,
  allListings,
  onToggleFavorite,
  onSelectListing,
  onBrowseAll,
}) => {
  const favoriteItems = allListings.filter((l) => favorites.includes(l.id));

  return (
    <div
      id="favorites-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-manrope">
                Saved Items ({favoriteItems.length})
              </h2>
              <p className="text-[11px] text-zinc-500">
                Track price drops and availability for items on your wishlist
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {favoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favoriteItems.map((listing) => (
                <ProductCard
                  key={listing.id}
                  listing={listing}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onSelectListing={(item) => {
                    onClose();
                    onSelectListing(item);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 font-manrope">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-zinc-500 mt-1 mb-6 font-dmsans">
                Tap the heart icon on any supercar, drone, camera or furniture piece to save it for later.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseAll();
                }}
                className="px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
