'use client';

import { useState } from 'react';
import { Camera, Sparkles, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { VisionAnalysisResult } from '@/lib/vision';

export default function AnalyseChariowPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VisionAnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) {
      setError('Veuillez uploader une capture d\'écran de votre page Chariow ou Maketou.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const base64Data = preview.split(',')[1];
      const res = await fetch('/api/analyse-chariow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'analyse par Vision IA.');
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'analyse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 pb-20 md:pb-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Camera className="w-4 h-4 text-[#F2A93B]" /> Vision IA • Analyse Chariow par Capture d&apos;Écran
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Laisse l&apos;IA auditer la page de ton livre
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Prends une capture d&apos;écran de ta boutique ou page produit Chariow/Maketou. Notre modèle de vision analyse la couverture, la visibilité du titre et la lisibilité mobile.
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleAnalyze} className="bg-white border border-[#12122B]/15 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-[#E85C4A]/15 border border-[#E85C4A] text-[#E85C4A] rounded-xl text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#12122B]">
              Upload la capture d&apos;écran de ta page Chariow / Maketou
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-gray-50 border border-[#12122B]/20 rounded-xl text-sm focus:outline-none"
            />
          </div>

          {preview && (
            <div className="p-4 bg-[#FAF3E7] border border-[#12122B]/10 rounded-2xl text-center">
              <p className="text-xs font-bold text-[#12122B] mb-2">Aperçu de la capture d&apos;écran :</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Aperçu capture Chariow" className="max-h-64 mx-auto rounded-xl shadow-md border" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-4 rounded-xl shadow-lg hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-[#12122B]" />
                Analyse Visuelle IA en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#12122B]" />
                Auditer ma Capture d&apos;Écran
              </>
            )}
          </button>
        </form>
      ) : (
        /* Result View */
        <div className="bg-[#FAF3E7] border-2 border-[#12122B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#12122B]/10 pb-4">
            <h2 className="font-title text-2xl font-bold text-[#12122B]">Résultat de l&apos;Analyse Vision IA</h2>
            <button
              onClick={() => setResult(null)}
              className="px-4 py-2 bg-[#12122B] text-[#FAF3E7] text-xs font-bold rounded-xl hover:bg-[#12122B]/90 transition-colors min-h-[44px]"
            >
              Nouvelle capture
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border text-center space-y-1">
              <span className="text-xs font-bold text-[#12122B]/60 uppercase">Impact Couverture</span>
              <p className="font-title text-2xl font-bold text-[#12122B]">{result.coverScore}/100</p>
            </div>
            <div className="bg-white p-4 rounded-xl border text-center space-y-1">
              <span className="text-xs font-bold text-[#12122B]/60 uppercase">Clarté Titre</span>
              <p className="font-title text-2xl font-bold text-[#2F9E68]">{result.titleScore}/100</p>
            </div>
            <div className="bg-white p-4 rounded-xl border text-center space-y-1">
              <span className="text-xs font-bold text-[#12122B]/60 uppercase">Lisibilité Texte</span>
              <p className="font-title text-2xl font-bold text-[#F2A93B]">{result.descriptionScore}/100</p>
            </div>
          </div>

          <div className="bg-white border p-5 rounded-2xl space-y-2">
            <p className="font-title text-base font-bold text-[#12122B]">Diagnostic de l&apos;IA :</p>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed font-medium">{result.summary}</p>
          </div>

          <div className="bg-[#12122B] text-[#FAF3E7] p-5 rounded-2xl space-y-3">
            <p className="font-title text-base font-bold text-[#F2A93B]">Recommandations Visuelles :</p>
            <ul className="space-y-2 text-xs">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2F9E68] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
