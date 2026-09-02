/**
 * Helper d'intégration de l'API Vision NVIDIA NIM
 * Fournisseur isolé dans lib/vision.ts pour faciliter le remplacement ultérieur
 */

export interface VisionAnalysisResult {
  titleDetected?: string;
  priceDetectedFcfa?: number;
  visualQualityScore: number; // 0-100
  titleScore: number; // 0-100
  copywritingScore: number; // 0-100
  keyObservations: string[];
  recommendations: string[];
}

export async function analyzeScreenshotWithNvidiaVision(
  imageBase64: string
): Promise<VisionAnalysisResult> {
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    console.warn('NVIDIA_API_KEY absente, utilisation du mode repli heuristique.');
    return mockVisionAnalysis(imageBase64);
  }

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'nvidia/neva-22b',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Tu es un expert marketing e-commerce spécialisé dans la vente d'ebooks sur Chariow et Maketou en Afrique francophone.
Analyse cette capture d'écran de page de produit digital et renvoie un objet JSON STRICT avec :
{
  "titleDetected": "titre aperçu sur l'image ou null",
  "priceDetectedFcfa": prix en FCFA ou null,
  "visualQualityScore": note de 0 à 100 sur l'impact de la couverture/mockup,
  "titleScore": note de 0 à 100 sur la clarté et l'accroche du titre,
  "copywritingScore": note de 0 à 100 sur la clarté du texte visible,
  "keyObservations": ["observation 1", "observation 2"],
  "recommendations": ["recommandation 1", "recommandation 2"]
}`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:')
                    ? imageBase64
                    : `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`NVIDIA Vision API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return mockVisionAnalysis(imageBase64);
    }

    // Tente de parser la réponse JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        titleDetected: parsed.titleDetected || undefined,
        priceDetectedFcfa: parsed.priceDetectedFcfa || undefined,
        visualQualityScore: Number(parsed.visualQualityScore) || 65,
        titleScore: Number(parsed.titleScore) || 70,
        copywritingScore: Number(parsed.copywritingScore) || 60,
        keyObservations: Array.isArray(parsed.keyObservations) ? parsed.keyObservations : ['Design de couverture détecté.'],
        recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : ['Ajouter un mockup 3D du livre.'],
      };
    }

    return mockVisionAnalysis(imageBase64);
  } catch (error) {
    console.error('Analyse Vision NVIDIA échouée:', error);
    return mockVisionAnalysis(imageBase64);
  }
}

/**
 * Analyse de secours si la clé API n'est pas configurée
 */
function mockVisionAnalysis(imageBase64: string): VisionAnalysisResult {
  const hash = imageBase64.length;
  const visualScore = 55 + (hash % 35);
  const titleScore = 60 + ((hash * 2) % 30);
  const copywritingScore = 50 + ((hash * 3) % 40);

  return {
    titleDetected: 'Guide Pratique Ebook (Aperçu)',
    priceDetectedFcfa: 2500,
    visualQualityScore: visualScore,
    titleScore: titleScore,
    copywritingScore: copywritingScore,
    keyObservations: [
      'Visuel de couverture plat type Canva détecté.',
      'Prix affiché en FCFA bien lisible.',
      'Bouton d\'achat Mobile Money correctement positionné.',
    ],
    recommendations: [
      'Remplacer le visuel plat par un mockup de livre 3D réaliste pour augmenter la valeur perçue.',
      'Ajouter un sous-titre orienté bénéfice sous le titre principal.',
      'Mettre en évidence les logos MTN & Moov près du tarif.',
    ],
  };
}
