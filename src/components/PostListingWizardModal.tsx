import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Trash2, 
  Repeat, 
  ShoppingBag,
  Image as ImageIcon
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { ItemCondition, Listing, ListingType, RentPeriod } from '../types';
import { formatINR } from '../utils/formatters';

interface PostListingWizardModalProps {
  onClose: () => void;
  onAddListing: (listing: Listing) => void;
  onShowToast: (msg: string) => void;
  userLocation: string;
}

const SAMPLE_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
];

export const PostListingWizardModal: React.FC<PostListingWizardModalProps> = ({
  onClose,
  onAddListing,
  onShowToast,
  userLocation,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [listingType, setListingType] = useState<ListingType>('both');
  const [category, setCategory] = useState('cars');
  const [subcategory, setSubcategory] = useState('Luxury Sedans');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState<string>('2500000');
  const [rentPrice, setRentPrice] = useState<string>('5000');
  const [rentPeriod, setRentPeriod] = useState<RentPeriod>('day');
  const [deposit, setDeposit] = useState<string>('25000');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [city, setCity] = useState(userLocation.split(',')[0] || 'Patna');
  const [area, setArea] = useState('Central District');

  const selectedCatObj = CATEGORIES.find((c) => c.slug === category);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!title.trim()) {
      onShowToast('Please provide a descriptive listing title');
      return;
    }

    const newListing: Listing = {
      id: `listing-${Date.now()}`,
      title: title.trim(),
      category,
      subcategory: subcategory || 'General',
      type: listingType,
      condition,
      buyPrice: Number(buyPrice) || 50000,
      rentPrice: listingType !== 'buy' ? Number(rentPrice) || 1000 : undefined,
      rentPeriod: listingType !== 'buy' ? rentPeriod : undefined,
      securityDeposit: listingType !== 'buy' ? Number(deposit) || 5000 : undefined,
      images: images.length > 0 ? images : [SAMPLE_PRESET_IMAGES[0]],
      description: description || 'Verified item in excellent working condition. Direct seller handover with clean documentation.',
      brand: brand || 'Premium Brand',
      model: model || 'Standard Model',
      year,
      specs: {
        'Condition': condition,
        'Brand': brand || 'Verified OEM',
        'Model / Edition': model || 'Standard Spec',
        'Year of Mfg': String(year),
      },
      features: [
        'Inspected and Verified by Owner',
        'Direct Doorstep Handover or Pickup',
        'Original Accessories & Packaging Included',
      ],
      location: {
        city: city || 'Patna',
        state: 'India',
        area: area || 'Downtown',
        distanceMiles: 1.5,
      },
      seller: {
        id: 'seller-user-me',
        name: 'You (Verified Seller)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 5.0,
        reviewsCount: 1,
        isVerified: true,
        responseTime: '< 5 mins',
        responseRate: '100%',
        memberSince: 'August 2026',
        bio: 'Private collector and verified marketplace member.',
      },
      isFeatured: true,
      isAvailable: true,
      views: 1,
      favoritesCount: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddListing(newListing);
    onShowToast(`🎉 "${title}" published successfully to NOVA Marketplace!`);
    onClose();
  };

  return (
    <div
      id="post-listing-wizard-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Step {step} of 5
            </span>
            <h2 className="text-lg font-bold text-zinc-950 font-manrope">
              {step === 1 && 'What are you listing?'}
              {step === 2 && 'Upload Item Photos'}
              {step === 3 && 'Item Specifications'}
              {step === 4 && 'Set Pricing & Rates'}
              {step === 5 && 'Location & Review'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="h-1 bg-zinc-100 w-full">
          <div
            className="h-full bg-zinc-950 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Intent & Category */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  1. How would you like to list this item?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setListingType('both')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      listingType === 'both'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-bold shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium'
                    }`}
                  >
                    <Repeat className="w-5 h-5 mx-auto mb-1 opacity-80" />
                    <span className="text-xs block">Buy & Rent</span>
                    <span className="text-[10px] opacity-75">Max earnings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setListingType('buy')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      listingType === 'buy'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-bold shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 mx-auto mb-1 opacity-80" />
                    <span className="text-xs block">Sell Only</span>
                    <span className="text-[10px] opacity-75">Outright sale</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setListingType('rent')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      listingType === 'rent'
                        ? 'border-zinc-950 bg-zinc-950 text-white font-bold shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium'
                    }`}
                  >
                    <Repeat className="w-5 h-5 mx-auto mb-1 opacity-80" />
                    <span className="text-xs block">Rent Only</span>
                    <span className="text-[10px] opacity-75">Daily/Monthly</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  2. Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.slug);
                        setSubcategory(cat.subcategories[0] || 'General');
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        category === cat.slug
                          ? 'border-zinc-950 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {category === cat.slug && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCatObj && selectedCatObj.subcategories.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                    3. Subcategory
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-zinc-950"
                  >
                    {selectedCatObj.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Photos */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-500 font-dmsans">
                High resolution photos increase buyer and renter trust by 84%. Add at least 1 photo.
              </p>

              {/* Upload Input Bar */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste Image URL (Unsplash or direct image link)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  Add Photo
                </button>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 group">
                    <img src={img} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Preset Sample Gallery Options */}
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Or pick a sample photo:
                </span>
                <div className="flex gap-2">
                  {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImages([...images, preset])}
                      className="w-14 h-14 rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-950 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    >
                      <img src={preset} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details & Specs */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024 BMW 330Li M Sport Gran Limousine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-zinc-950"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Brand / Make
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BMW, Apple, Sony"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Model / Trim
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 330Li M Sport"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    Year of Mfg
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                  Item Condition
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Brand New', 'Like New', 'Excellent', 'Good'] as ItemCondition[]).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        condition === cond
                          ? 'border-zinc-950 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe vehicle condition, service history, included accessories, warranty, or rental terms..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs focus:outline-none focus:border-zinc-950"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Pricing */}
          {step === 4 && (
            <div className="space-y-4">
              
              {/* Sale Price */}
              {(listingType === 'buy' || listingType === 'both') && (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                    Selling Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-bold text-zinc-950 focus:outline-none"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                    Preview: {formatINR(Number(buyPrice))}
                  </p>
                </div>
              )}

              {/* Rental Rate */}
              {(listingType === 'rent' || listingType === 'both') && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Rental Rate (₹)
                      </label>
                      <input
                        type="number"
                        value={rentPrice}
                        onChange={(e) => setRentPrice(e.target.value)}
                        className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-sm font-bold text-emerald-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Per Duration
                      </label>
                      <select
                        value={rentPeriod}
                        onChange={(e) => setRentPeriod(e.target.value as RentPeriod)}
                        className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-950 focus:outline-none"
                      >
                        <option value="day">Per Day</option>
                        <option value="week">Per Week</option>
                        <option value="month">Per Month</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                      Refundable Security Deposit (₹)
                    </label>
                    <input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-950 focus:outline-none"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 5: Location & Review */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                    Area / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Preview Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Live Preview Summary
                </span>
                <div className="flex gap-3">
                  <img
                    src={images[0]}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{category}</span>
                    <h4 className="text-xs font-bold text-zinc-950 truncate">{title || 'Untitled Item'}</h4>
                    <p className="text-[11px] text-zinc-500">{area}, {city}</p>
                    <div className="flex justify-between items-baseline mt-2">
                      <span className="text-sm font-extrabold text-zinc-950">{formatINR(Number(buyPrice))}</span>
                      {listingType !== 'buy' && (
                        <span className="text-xs font-bold text-emerald-800">{formatINR(Number(rentPrice))}/{rentPeriod}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-medium border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Your listing is backed by NOVA Escrow Protection and Seller Guarantee.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              id="publish-listing-btn"
              onClick={handlePublish}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Publish Listing Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
