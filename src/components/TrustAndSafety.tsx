import React from 'react';
import { ShieldCheck, Lock, RefreshCw, Award, UserCheck, Headset } from 'lucide-react';

export const TrustAndSafety: React.FC = () => {
  const TRUST_ITEMS = [
    {
      icon: ShieldCheck,
      title: 'Verified Member Network',
      description: 'Government ID verification, phone check, and historical seller review ratings on every profile.',
    },
    {
      icon: Lock,
      title: 'Protected Escrow Payments',
      description: 'Funds are securely held in escrow until both buyer and seller verify item condition and handover.',
    },
    {
      icon: RefreshCw,
      title: 'Instant Deposit Refunds',
      description: 'Rental security deposits are automatically released back to your original payment method within 60 minutes.',
    },
    {
      icon: Award,
      title: 'NOVA Quality Assurance',
      description: 'Every high-value automobile and tech gadget undergoes mandatory condition documentation before handover.',
    },
    {
      icon: UserCheck,
      title: 'Direct Private Messaging',
      description: 'End-to-end encrypted chat with in-app counter offers, inspection scheduling, and location sharing.',
    },
    {
      icon: Headset,
      title: '24/7 Concierge Support',
      description: 'Dedicated marketplace dispute resolution team and live chat support for seamless transactions.',
    },
  ];

  return (
    <section id="trust-and-safety-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-bento">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E9E0] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-2 border border-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BF5B30]" />
            Trust & Security First
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-tight">
            Buy, Sell, and Rent with Complete Peace of Mind
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Built from the ground up to eliminate scams, ghost sellers, and payment disputes.
          </p>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-[#F5F5F0] hover:bg-[#E9E9E0] border border-gray-200 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 text-[#BF5B30]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
