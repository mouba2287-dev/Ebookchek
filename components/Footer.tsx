import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#12122B] text-[#FAF3E7] pt-12 pb-8 mt-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <span className="font-title text-2xl font-bold text-[#F2A93B]">
              Ebook Check
            </span>
            <p className="text-xs text-[#FAF3E7]/70 leading-relaxed">
              L&apos;outil d&apos;analyse & de validation d&apos;ebooks pour les créateurs d&apos;Afrique francophone. Compatible Chariow, Maketou & vente directe.
            </p>
          </div>

          <div>
            <h4 className="font-title text-[#F2A93B] text-sm font-semibold mb-3">Produit</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/diagnostic" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Diagnostic 0 Vente
                </Link>
              </li>
              <li>
                <Link href="/valider" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Valider une Idée
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Tarifs & Mobile Money
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-title text-[#F2A93B] text-sm font-semibold mb-3">Support & FAQ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Foire Aux Questions
                </Link>
              </li>
              <li>
                <Link href="/faq#calcul-score" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Calcul du score
                </Link>
              </li>
              <li>
                <Link href="/compte" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Espace Membre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-title text-[#F2A93B] text-sm font-semibold mb-3">Informations Légales</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/mentions-legales" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="hover:text-[#F2A93B] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  Conditions Générales de Vente
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FAF3E7]/60 gap-4">
          <p>© {new Date().getFullYear()} Ebook Check. Tous droits réservés. Développé pour les entrepreneurs digitaux en Afrique de l&apos;Ouest.</p>
          <p className="text-right">Paiements sécurisés via MTN Mobile Money, Moov, Orange Money & Wave.</p>
        </div>
      </div>
    </footer>
  );
}
