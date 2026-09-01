'use client';

import { useState, useEffect } from 'react';
import { Cookie, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ebookcheck_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ebookcheck_cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('ebookcheck_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-[#12122B] text-[#FAF3E7] p-5 rounded-2xl shadow-2xl border border-[#F2A93B]/30 z-50 transition-all animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#F2A93B]/20 rounded-xl text-[#F2A93B] shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 text-xs leading-relaxed">
          <p className="font-semibold text-sm text-[#F2A93B]">Respect de votre vie privée</p>
          <p className="text-[#FAF3E7]/80">
            Nous utilisons des cookies strictement nécessaires et des mesures d&apos;audience anonymes (Google Analytics 4) pour améliorer le diagnostic de vos ebooks.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={accept}
              className="bg-[#F2A93B] text-[#12122B] font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#F2A93B]/90 min-h-[44px] flex items-center gap-1"
            >
              <Check className="w-4 h-4" /> Accepter
            </button>
            <button
              onClick={decline}
              className="bg-white/10 text-[#FAF3E7] font-medium px-4 py-2 rounded-xl text-xs hover:bg-white/20 min-h-[44px] flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
