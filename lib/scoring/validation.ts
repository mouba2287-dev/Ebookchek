export interface ValidationInput {
  subject: string;
  targetAudience: string;
  intendedPriceFcfa: number;
}

export interface ValidationResult {
  id: string;
  createdAt: string;
  subject: string;
  targetAudience: string;
  intendedPriceFcfa: number;
  viabilityScore: number; // 0-100
  marketSaturation: 'Faible' | 'Modérée' | 'Élevée';
  demandLevel: 'Très forte' | 'Modérée' | 'Niche spécifique';
  recommendedPriceRange: {
    min: number;
    max: number;
    optimal: number;
    explanation: string;
  };
  suggestedTitles: string[];
  keyAdvice: string[];
}

export function calculateValidation(input: ValidationInput): ValidationResult {
  const subject = input.subject.trim();
  const audience = input.targetAudience.trim();
  const price = input.intendedPriceFcfa;

  let viabilityScore = 60;
  const lowerSubject = subject.toLowerCase();
  const lowerAudience = audience.toLowerCase();

  // High demand niches in West Africa digital market
  const highDemandKeywords = [
    'argent', 'business', 'e-commerce', 'whatsapp', 'canva', 'fiverr',
    'tiktok', 'importation', 'chine', 'poulet', 'élevage', 'agriculture',
    'immo', 'immobilier', 'santé', 'perte de poids', 'relation', 'séduction',
    'mariage', 'études', 'bourse', 'canada', 'visa', 'cryptomonnaie', 'trading'
  ];

  const matchedKeywords = highDemandKeywords.filter(kw => lowerSubject.includes(kw) || lowerAudience.includes(kw));

  if (matchedKeywords.length > 0) {
    viabilityScore += 20;
  }

  if (audience.length > 10) {
    viabilityScore += 10;
  } else {
    viabilityScore -= 10;
  }

  // Price appropriateness check
  let priceExplanation = '';
  let minPrice = 2000;
  let maxPrice = 5000;
  let optimalPrice = 3000;

  if (lowerSubject.includes('business') || lowerSubject.includes('argent') || lowerSubject.includes('importation') || lowerSubject.includes('chine')) {
    minPrice = 3000;
    maxPrice = 10000;
    optimalPrice = 5000;
    priceExplanation = "Les sujets orientés 'Gain d'argent / Business' supportent des prix plus élevés (3 000 - 10 000 FCFA) car l'acheteur voit un retour sur investissement immédiat.";
  } else if (lowerSubject.includes('études') || lowerSubject.includes('étudiant') || lowerSubject.includes('bourse')) {
    minPrice = 1500;
    maxPrice = 3500;
    optimalPrice = 2000;
    priceExplanation = "Le public étudiant est très sensible au prix. Un tarif d'impulsion entre 1 500 et 3 000 FCFA garantit un volume élevé de ventes.";
  } else {
    priceExplanation = "Pour ce type de sujet grand public, le tarif idéal sur Mobile Money se situe entre 2 000 et 5 000 FCFA.";
  }

  if (price >= minPrice && price <= maxPrice) {
    viabilityScore += 10;
  } else if (price > maxPrice) {
    viabilityScore -= 5;
  }

  viabilityScore = Math.min(100, Math.max(20, viabilityScore));

  let marketSaturation: 'Faible' | 'Modérée' | 'Élevée' = 'Modérée';
  if (matchedKeywords.includes('canva') || matchedKeywords.includes('argent') || matchedKeywords.includes('whatsapp')) {
    marketSaturation = 'Élevée';
  } else if (matchedKeywords.includes('élevage') || matchedKeywords.includes('immo') || matchedKeywords.includes('bourse')) {
    marketSaturation = 'Faible';
  }

  let demandLevel: 'Très forte' | 'Modérée' | 'Niche spécifique' = 'Modérée';
  if (matchedKeywords.length >= 2) {
    demandLevel = 'Très forte';
  } else if (matchedKeywords.length === 0) {
    demandLevel = 'Niche spécifique';
  }

  // Generate 4 high-converting titles based on subject
  const cleanSubject = subject.length > 30 ? subject.substring(0, 30) : subject;
  const suggestedTitles = [
    `La Méthode Accélérée : ${cleanSubject} (Guide Pratique)`,
    `Comment maîtriser le/la ${cleanSubject} en 30 Jours sans expérience`,
    `Le Plan d'Action Pass-à-l'Acte : ${cleanSubject} pour ${audience || 'Débutants'}`,
    `Les 7 Secrets de ${cleanSubject} que personne ne te dit en Afrique`,
  ];

  const keyAdvice = [
    `Identifie 3 groupes WhatsApp ou communautés TikTok où se trouvent vos cibles (${audience || 'votre public'}).`,
    `Crée un extrait gratuit de 3 pages (Sommaire + Chapitre 1) à distribuer contre un numéro WhatsApp.`,
    `Propose un paiement direct par MTN, Moov, Orange ou Wave via une page Chariow/Maketou pour automatiser la livraison.`,
  ];

  return {
    id: `val_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    subject,
    targetAudience: audience,
    intendedPriceFcfa: price,
    viabilityScore,
    marketSaturation,
    demandLevel,
    recommendedPriceRange: {
      min: minPrice,
      max: maxPrice,
      optimal: optimalPrice,
      explanation: priceExplanation,
    },
    suggestedTitles,
    keyAdvice,
  };
}
