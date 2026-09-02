'use client';

import { useState } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AnalyseChariowPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userPlan, setUserPlan] = useState<'gratuit' | 'createur' | 'pro'>('createur');
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const maxAllowed = userPlan === 'pro' ? 10 : userPlan === 'createur' ? 3 : 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (filesArray.length > maxAllowed) {
      setError(`Votre formule (${userPlan.toUpperCase()}) autorise au maximum ${maxAllowed} image(s). Seules les ${maxAllowed} premières ont été retenues.`);
    } else {
      setError(null);
    }

    const limitedFiles = filesArray.slice(0, maxAllowed);
    setSelectedFiles(limitedFiles);

    // Convert files to Base64 previews
    const base64Promises = limitedFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64Promises)
      .then((results) => setPreviews(results))
      .catch((err) => console.error('Error reading files:', err));
  };

  const handleRunAnalysis = async () => {
    if (previews.length === 0) {
      setError('Veuillez sélectionner au moins une capture d\'écran de votre page Chariow ou Maketou.');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(20);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 15 : prev));
      }, 400);

      const res = await fetch('/api/analyse-chariow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: previews,
          userPlan,
        }),
      });

      clearInterval(interval);
      setProgress(100);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'analyse des captures d\'écran.');
      }

      setAnalysisResult(data);

      // Save to local user history
      try {
        const history = JSON.parse(localStorage.getItem('ebookcheck_reports') || '[]');
        history.unshift({
          id: data.report?.id || Date.now().toString(),
          title: data.detectedTitle,
          overallScore: data.report?.overallScore || 70,
          createdAt: new Date().toISOString(),
          type: 'chariow_vision',
        });
        localStorage.setItem('ebookcheck_reports', JSON.stringify(history.slice(0, 20)));
      } catch (e) {
        console.error('History save error:', e);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue pendant le traitement de l\'image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Camera className="w-4 h-4 text-[#F2A93B]" /> Vision IA NVIDIA NIM
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
          Analyse Chariow par Captures d&apos;Écran
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-2xl mx-auto leading-relaxed">
          Dépose les captures d&apos;écran de ta page produit ou de ta couverture. Notre modèle de vision IA lit et évalue instantanément ton visuel, ton prix et tes arguments de vente.
        </p>
      </div>

      {/* Plan Selector Badge Bar */}
      <div className="flex items-center justify-center gap-3 bg-white dark:bg-[#1C1C36] p-3 rounded-2xl border border-[#12122B]/10 max-w-md mx-auto text-xs font-semibold">
        <span className="text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">Niveau sélectionné :</span>
        <button
          onClick={() => setUserPlan('gratuit')}
          className={`px-3 py-1.5 rounded-xl transition-all ${userPlan === 'gratuit' ? 'bg-[#12122B] text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}
        >
          Gratuit (1 max)
        </button>
        <button
          onClick={() => setUserPlan('createur')}
          className={`px-3 py-1.5 rounded-xl transition-all ${userPlan === 'createur' ? 'bg-[#F2A93B] text-[#12122B] font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}
        >
          Créateur (3 max)
        </button>
        <button
          onClick={() => setUserPlan('pro')}
          className={`px-3 py-1.5 rounded-xl transition-all ${userPlan === 'pro' ? 'bg-[#2F9E68] text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}
        >
          Pro (10 max)
        </button>
      </div>

      {!analysisResult ? (
        /* Form upload section */
        <div className="bg-[#FAF8F3] dark:bg-[#1C1C36] border-2 border-dashed border-[#12122B]/20 dark:border-white/20 p-6 sm:p-10 rounded-3xl shadow-lg text-center space-y-6">
          {error && (
            <div className="p-4 bg-[#E85C4A]/15 border border-[#E85C4A] text-[#E85C4A] rounded-xl text-xs text-left flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="w-16 h-16 rounded-2xl bg-[#F2A93B]/20 text-[#12122B] dark:text-[#F2A93B] flex items-center justify-center mx-auto shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#F5F5F3]">
              Sélectionne tes captures d&apos;écran
            </h3>
            <p className="text-xs text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 max-w-md mx-auto">
              Glisse-dépose ou clique ci-dessous pour choisir des images (page Chariow, visuel 3D, description...).
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md hover:bg-[#12122B]/90 dark:hover:bg-[#F2A93B]/90 transition-all cursor-pointer min-h-[48px]"
          >
            <Camera className="w-4 h-4" /> Parcourir mes fichiers ({previews.length}/{maxAllowed})
          </label>

          {/* Previews Thumbnails Grid */}
          {previews.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#12122B]/10 dark:border-white/10">
              <p className="text-xs font-bold text-[#1B1B2F] dark:text-[#F5F5F3]">
                Captures prêtes à être analysées :
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#F2A93B] shadow-sm">
                    <img src={src} alt={`Capture ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {loading && (
            <div className="space-y-3 max-w-md mx-auto pt-4">
              <div className="flex justify-between text-xs font-bold text-[#12122B] dark:text-[#FAF8F3]">
                <span>Analyse Vision NVIDIA NIM en cours...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-white/10 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#F2A93B] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={loading || previews.length === 0}
            className="w-full max-w-md bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-4 rounded-xl shadow-xl hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px] disabled:opacity-50 mx-auto"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Traitement par Vision IA...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Lancer l&apos;Analyse Vision Multi-Images
              </>
            )}
          </button>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#12122B] text-white p-4 rounded-2xl">
            <div>
              <p className="text-xs text-[#F2A93B] font-bold">Rapport d&apos;Analyse Vision IA</p>
              <h2 className="font-title text-lg font-bold">{analysisResult.detectedTitle}</h2>
            </div>
            <button
              onClick={() => {
                setAnalysisResult(null);
                setPreviews([]);
                setSelectedFiles([]);
              }}
              className="px-4 py-2 bg-white/10 text-xs font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Nouvelle capture
            </button>
          </div>

          {/* Scores grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1C1C36] p-5 rounded-2xl border border-[#12122B]/10 shadow-sm text-center">
              <p className="text-xs text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 font-semibold">Impact Visuel / Couverture</p>
              <p className="font-title text-3xl font-extrabold text-[#F2A93B] mt-1">
                {analysisResult.aggregateScores.visualScore}/100
              </p>
            </div>
            <div className="bg-white dark:bg-[#1C1C36] p-5 rounded-2xl border border-[#12122B]/10 shadow-sm text-center">
              <p className="text-xs text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 font-semibold">Accroche & Titre</p>
              <p className="font-title text-3xl font-extrabold text-[#2F9E68] mt-1">
                {analysisResult.aggregateScores.titleScore}/100
              </p>
            </div>
            <div className="bg-white dark:bg-[#1C1C36] p-5 rounded-2xl border border-[#12122B]/10 shadow-sm text-center">
              <p className="text-xs text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 font-semibold">Copywriting Page de Vente</p>
              <p className="font-title text-3xl font-extrabold text-[#E85C4A] mt-1">
                {analysisResult.aggregateScores.copywritingScore}/100
              </p>
            </div>
          </div>

          {/* Key Observations & AI Recommendations */}
          <div className="bg-[#FAF8F3] dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-title text-lg font-bold text-[#12122B] dark:text-[#F5F5F3] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2F9E68]" />
                Observations clés de l&apos;IA
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#F5F5F3]">
                {analysisResult.observations.map((obs: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F2A93B] font-bold">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#12122B]/10 dark:border-white/10">
              <h3 className="font-title text-lg font-bold text-[#12122B] dark:text-[#F5F5F3] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F2A93B]" />
                Recommandations d&apos;Optimisation
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#F5F5F3]">
                {analysisResult.aiRecommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#2F9E68] shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] font-bold px-6 py-3.5 rounded-xl text-sm hover:opacity-90 transition-all"
            >
              Voir le rapport complet 5 axes sur cette base <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
