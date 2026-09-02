import { NextRequest, NextResponse } from 'next/server';
import { analyzeScreenshotWithNvidiaVision, VisionAnalysisResult } from '@/lib/vision';
import { calculateDiagnostic, DiagnosticInput } from '@/lib/scoring';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { images, userPlan = 'gratuit' } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'Aucune image de capture d\'écran fournie.' },
        { status: 400 }
      );
    }

    // Vérification des quotas d'images selon le palier
    const maxAllowed = userPlan === 'pro' ? 10 : userPlan === 'createur' ? 3 : 1;
    if (images.length > maxAllowed) {
      return NextResponse.json(
        {
          error: `Votre forfait (${userPlan.toUpperCase()}) est limité à ${maxAllowed} image(s) par analyse. Passez au plan supérieur pour analyser plus de captures.`,
        },
        { status: 403 }
      );
    }

    // Analyse en parallèle de toutes les images soumises
    const visionResults: VisionAnalysisResult[] = await Promise.all(
      images.map((imgBase64: string) => analyzeScreenshotWithNvidiaVision(imgBase64))
    );

    // Agrégation des scores issus de la Vision IA
    const avgVisualScore = Math.round(
      visionResults.reduce((acc, r) => acc + r.visualQualityScore, 0) / visionResults.length
    );
    const avgTitleScore = Math.round(
      visionResults.reduce((acc, r) => acc + r.titleScore, 0) / visionResults.length
    );
    const avgCopywritingScore = Math.round(
      visionResults.reduce((acc, r) => acc + r.copywritingScore, 0) / visionResults.length
    );

    const detectedTitle = visionResults.find((r) => r.titleDetected)?.titleDetected || 'Mon Ebook Chariow';
    const detectedPrice = visionResults.find((r) => r.priceDetectedFcfa)?.priceDetectedFcfa || 3000;

    // Agglomération des recommandations de l'IA
    const allObservations = Array.from(
      new Set(visionResults.flatMap((r) => r.keyObservations))
    );
    const allRecommendations = Array.from(
      new Set(visionResults.flatMap((r) => r.recommendations))
    );

    // Entrée pour le scoring
    const diagnosticInput: DiagnosticInput = {
      title: detectedTitle,
      priceFcfa: detectedPrice,
      description: allObservations.join(' '),
      hasCoverImage: true,
      coverStyle: avgVisualScore > 75 ? 'custom_pro' : 'canva_template',
      promotionChannel: 'whatsapp',
      timeOnlineDays: 14,
      salesCount: 0,
    };

    const finalReport = calculateDiagnostic(diagnosticInput);

    return NextResponse.json({
      success: true,
      imagesAnalyzed: visionResults.length,
      aggregateScores: {
        visualScore: avgVisualScore,
        titleScore: avgTitleScore,
        copywritingScore: avgCopywritingScore,
      },
      detectedTitle,
      detectedPrice,
      observations: allObservations,
      aiRecommendations: allRecommendations,
      report: finalReport,
    });
  } catch (error: any) {
    console.error('Erreur API /api/analyse-chariow:', error);
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue lors de l\'analyse des captures d\'écran.' },
      { status: 500 }
    );
  }
}
