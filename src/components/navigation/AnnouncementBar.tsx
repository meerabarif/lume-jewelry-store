import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#2C221E] text-[#FAF9F6] text-xs font-sans tracking-wider py-2 px-4 border-b border-[#D4AF37]/30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
          <Sparkles className="w-3 h-3" />
          <span>Atelier Joaillerie Fine</span>
        </div>

        <div className="flex-1 text-center font-normal text-[11px] sm:text-xs">
          <span className="font-medium text-[#FAF5EB]">Free Express Shipping on Orders Over $150</span>
          <span className="mx-2 text-[#D4AF37]/60">|</span>
          <span className="text-[#D8CEBE]">Handcrafted with Love in Limited Batches</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-[11px] text-[#D8CEBE] font-mono tabular-nums">
            USD ($)
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-[#D8CEBE] hover:text-[#FAF9F6] p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
