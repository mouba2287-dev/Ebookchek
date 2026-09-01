export interface AxisScore {
  key: 'title' | 'visual' | 'price' | 'description' | 'channel';
  label: string;
  score: number; // 0 to 100
  status: 'critical' | 'warning' | 'excellent';
  statusLabel: string;
  feedback: string;
  recommendations: string[];
}

export interface DiagnosticInput {
  title: string;
  productUrl?: string;
  priceFcfa: number;
  description: string;
  hasCoverImage: boolean;
  coverStyle?: 'canva_template' | 'custom_pro' | 'text_only' | 'no_cover';
  promotionChannel: 'whatsapp' | 'tiktok' | 'facebook' | 'instagram' | 'email' | 'other';
  timeOnlineDays: number;
  salesCount?: number;
}

export interface DiagnosticResult {
  id: string;
  createdAt: string;
  productUrl?: string;
  title: string;
  overallScore: number;
  overallStatus: 'critical' | 'warning' | 'excellent';
  overallSummary: string;
  axes: Record<'title' | 'visual' | 'price' | 'description' | 'channel', AxisScore>;
  topActions: string[];
}

export function calculateDiagnostic(input: DiagnosticInput): DiagnosticResult {
  // 1. Title evaluation
  const title = input.title.trim();
  let titleScore = 50;
  const titleRecs: string[] = [];
  let titleFeedback = '';

  const titleWords = title.split(/\s+/).length;
  if (titleWords < 3) {
    titleScore -= 20;
    titleRecs.push("Rallonge le titre pour inclure le bénéfice principal (ex: 'Comment [Résultat] sans [Inconvénient]').");
  } else if (titleWords >= 4 && titleWords <= 12) {
    titleScore += 25;
  } else {
    titleRecs.push("Rends le titre plus percutant : réduis à 6-10 mots orientés résultats.");
  }

  const triggerWords = ['comment', 'guide', 'méthode', 'secret', 'gagner', 'argent', 'business', 'whatsapp', 'rapide', 'facile', 'zeró', 'passif', '2024', '2025', 'clé', 'plan'];
  const lowerTitle = title.toLowerCase();
  const hasTriggerWord = triggerWords.some(word => lowerTitle.includes(word));
  if (hasTriggerWord) {
    titleScore += 20;
  } else {
    titleRecs.push("Ajoute un mot d'action ou un déclencheur émotionnel dans le titre ('Guide pratique', 'Méthode accélérée', 'En 30 jours').");
  }

  if (title.includes('?') || title.includes('!')) {
    titleScore += 5;
  }

  titleScore = Math.min(100, Math.max(10, titleScore));

  if (titleScore >= 75) {
    titleFeedback = "Titre clair et orienté résultat. Il capte rapidement l'attention.";
  } else if (titleScore >= 50) {
    titleFeedback = "Titre compréhensible mais manque de promesse forte ou de clarté pour l'acheteur mobile.";
  } else {
    titleFeedback = "Titre trop vague ou trop court. Un acheteur sur WhatsApp doit comprendre le bénéfice en 2 secondes.";
  }

  // 2. Visual / Cover evaluation
  let visualScore = 40;
  const visualRecs: string[] = [];
  let visualFeedback = '';

  if (!input.hasCoverImage || input.coverStyle === 'no_cover') {
    visualScore = 15;
    visualRecs.push("Ajoute impérativement une mock-up 3D de livre ou une couverture visuelle pro (utilise Canva avec un mockup de livre 3D).");
    visualRecs.push("Assure-toi que la typographie sur la couverture soit lisible en miniature sur écran de téléphone.");
  } else if (input.coverStyle === 'text_only') {
    visualScore = 45;
    visualRecs.push("Transforme la couverture textuelle en visuel 3D interactif (livre ouvert ou tablette) pour augmenter la valeur perçue.");
  } else if (input.coverStyle === 'canva_template') {
    visualScore = 70;
    visualRecs.push("La couverture est correcte mais ressemble à d'autres templates gratuits. Personnalise avec des couleurs contrastées et une accroche géante.");
  } else if (input.coverStyle === 'custom_pro') {
    visualScore = 90;
  }

  if (input.productUrl) {
    visualScore += 5;
  }

  visualScore = Math.min(100, Math.max(10, visualScore));

  if (visualScore >= 75) {
    visualFeedback = "Visuel attrayant et valorisant sur écran mobile.";
  } else if (visualScore >= 50) {
    visualFeedback = "Couverture correcte mais standard. Un visuel 3D donnerait une impression de produit haut de gamme.";
  } else {
    visualFeedback = "Absence de couverture attrayante. En Afrique francophone, le visuel fait 60% de la décision d'achat rapide.";
  }

  // 3. Price evaluation (FCFA)
  let priceScore = 50;
  const priceRecs: string[] = [];
  let priceFeedback = '';

  const price = input.priceFcfa;
  if (price <= 0) {
    priceScore = 30;
    priceRecs.push("Mets un prix minimum (ex: 1 500 FCFA ou 2 000 FCFA). Le 'gratuit' sans capture d'email ne crée pas de valeur.");
  } else if (price >= 1000 && price <= 3500) {
    priceScore = 90; // Optimal impulse buy range for West Africa mobile money
  } else if (price > 3500 && price <= 6500) {
    priceScore = 75; // Mid tier
  } else if (price > 6500 && price <= 15000) {
    priceScore = 55;
    priceRecs.push("Pour un ebook à plus de 5 000 FCFA, ajoute des bonus (ex: modèle Excel, liste de contacts, checklist PDF) pour justifier le tarif.");
  } else if (price > 15000) {
    priceScore = 35;
    priceRecs.push("Un ebook seul à plus de 15 000 FCFA bloque la décision par Mobile Money impulsif. Positionne-le en offre groupée ou revois le prix à 5 000 FCFA.");
  } else {
    priceScore = 40;
    priceRecs.push("Un prix sous 1 000 FCFA dévalorise ton expertise. Passe à 2 000 FCFA avec une promesse bien définie.");
  }

  if (price % 1000 === 0 || price % 500 === 0) {
    priceScore += 5;
  }

  priceScore = Math.min(100, Math.max(10, priceScore));

  if (priceScore >= 75) {
    priceFeedback = `Prix de ${price.toLocaleString('fr-FR')} FCFA très bien adapté à l'achat d'impulsion par Mobile Money.`;
  } else if (priceScore >= 50) {
    priceFeedback = `Prix de ${price.toLocaleString('fr-FR')} FCFA acceptable, mais nécessite de renforcer la valeur perçue avec des bonus.`;
  } else {
    priceFeedback = `Prix de ${price.toLocaleString('fr-FR')} FCFA mal positionné pour une conversion fluide par Mobile Money.`;
  }

  // 4. Description evaluation
  let descScore = 40;
  const descRecs: string[] = [];
  let descFeedback = '';

  const desc = input.description.trim();
  const descLength = desc.length;

  if (descLength < 50) {
    descScore = 20;
    descRecs.push("Ta description est trop courte. Décris précisément à qui s'adresse l'ebook et les 3 problèmes majeurs qu'il résout.");
  } else if (descLength >= 150 && descLength <= 800) {
    descScore += 35;
  } else if (descLength > 800) {
    descScore += 20;
    descRecs.push("Description très longue : structure avec des puces emoji (✅) pour faciliter la lecture sur smartphone.");
  }

  if (desc.includes('✅') || desc.includes('•') || desc.includes('-') || desc.includes('🔥') || desc.includes('🎯')) {
    descScore += 15;
  } else {
    descRecs.push("Organise la description avec des puces claires (ex: ✅ Ce que tu vas apprendre) pour les lecteurs pressés.");
  }

  if (desc.toLowerCase().includes('garantie') || desc.toLowerCase().includes('rembourse') || desc.toLowerCase().includes('satisfait')) {
    descScore += 10;
  } else {
    descRecs.push("Ajoute une mention de rassurance (ex: 'Accès immédiat après paiement Mobile Money', 'Téléchargement PDF rapide').");
  }

  descScore = Math.min(100, Math.max(10, descScore));

  if (descScore >= 75) {
    descFeedback = "Description structurée et convaincante, adaptée à la lecture mobile.";
  } else if (descScore >= 50) {
    descFeedback = "La description explique le produit mais ne pousse pas suffisamment à l'action immédiate.";
  } else {
    descFeedback = "Description trop pauvre pour rassurer un acheteur qui ne te connaît pas encore.";
  }

  // 5. Promotion channel evaluation
  let channelScore = 50;
  const channelRecs: string[] = [];
  let channelFeedback = '';

  switch (input.promotionChannel) {
    case 'whatsapp':
      channelScore = 80;
      channelRecs.push("Sur WhatsApp, publie des captures de témoignages ou des extraits PDF en Statut au moins 3 fois par semaine.");
      channelRecs.push("N'envoie pas le lien brut : partage une histoire courte ('Storytelling') puis le lien de la page Chariow/Maketou.");
      break;
    case 'tiktok':
      channelScore = 75;
      channelRecs.push("Sur TikTok, crée des vidéos courtes (15-30 sec) qui montrent la résolution d'un problème concret avant de renvoyer vers le lien en bio.");
      channelRecs.push("Affiche le prix FCFA directement dans la vidéo pour filtrer les curieux non payants.");
      break;
    case 'facebook':
      channelScore = 65;
      channelRecs.push("Si tu fais des publications Facebook, redirige d'abord vers une discussion WhatsApp Business pour convertir de vive voix.");
      break;
    case 'instagram':
      channelScore = 60;
      channelRecs.push("Sur Instagram, utilise les stories à la une pour présenter le sommaire et les preuves sociales.");
      break;
    default:
      channelScore = 45;
      channelRecs.push("Définis un canal principal clair (WhatsApp ou TikTok recommandé pour l'Afrique francophone).");
  }

  if (input.timeOnlineDays > 30 && (input.salesCount || 0) === 0) {
    channelScore -= 15;
    channelRecs.push("Produit en ligne depuis plus d'un mois sans vente : relance avec un événement en direct (Live TikTok/WhatsApp) ou une offre limitée 48h.");
  }

  channelScore = Math.min(100, Math.max(10, channelScore));

  if (channelScore >= 75) {
    channelFeedback = "Canal de vente très pertinent avec le comportement d'achat ouest-africain.";
  } else if (channelScore >= 50) {
    channelFeedback = "Canal adapté mais la stratégie de diffusion manque de régularité ou d'angles captivants.";
  } else {
    channelFeedback = "Canal mal exploité. La majorité des ventes d'ebooks en Afrique francophone se concluent sur WhatsApp.";
  }

  // Overall calculations
  const overallScore = Math.round(
    (titleScore * 0.25) +
    (visualScore * 0.25) +
    (priceScore * 0.2) +
    (descScore * 0.15) +
    (channelScore * 0.15)
  );

  const getStatus = (score: number): 'critical' | 'warning' | 'excellent' => {
    if (score < 50) return 'critical';
    if (score < 75) return 'warning';
    return 'excellent';
  };

  const getStatusLabel = (status: 'critical' | 'warning' | 'excellent'): string => {
    switch (status) {
      case 'critical': return 'Critique';
      case 'warning': return 'À améliorer';
      case 'excellent': return 'Excellent';
    }
  };

  const overallStatus = getStatus(overallScore);

  let overallSummary = '';
  if (overallScore >= 75) {
    overallSummary = "Ton offre est solide ! Quelques ajustements légers sur la conversion WhatsApp te permettront d'accélérer les ventes.";
  } else if (overallScore >= 50) {
    overallSummary = "Ton produit a du potentiel, mais le visuel ou la présentation du prix freinent les acheteurs au moment de sortir leur Mobile Money.";
  } else {
    overallSummary = "Ton ebook stagne car la promesse globale et le visuel manquent de clarté pour l'acheteur ouest-africain.";
  }

  const allRecommendations = [
    ...titleRecs,
    ...visualRecs,
    ...priceRecs,
    ...descRecs,
    ...channelRecs,
  ];

  const topActions = allRecommendations.slice(0, 4);

  return {
    id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    productUrl: input.productUrl,
    title,
    overallScore,
    overallStatus,
    overallSummary,
    axes: {
      title: {
        key: 'title',
        label: 'Titre & Promesse',
        score: titleScore,
        status: getStatus(titleScore),
        statusLabel: getStatusLabel(getStatus(titleScore)),
        feedback: titleFeedback,
        recommendations: titleRecs,
      },
      visual: {
        key: 'visual',
        label: 'Visuel / Couverture 3D',
        score: visualScore,
        status: getStatus(visualScore),
        statusLabel: getStatusLabel(getStatus(visualScore)),
        feedback: visualFeedback,
        recommendations: visualRecs,
      },
      price: {
        key: 'price',
        label: 'Prix & Positionnement FCFA',
        score: priceScore,
        status: getStatus(priceScore),
        statusLabel: getStatusLabel(getStatus(priceScore)),
        feedback: priceFeedback,
        recommendations: priceRecs,
      },
      description: {
        key: 'description',
        label: 'Description & Rassurance',
        score: descScore,
        status: getStatus(descScore),
        statusLabel: getStatusLabel(getStatus(descScore)),
        feedback: descFeedback,
        recommendations: descRecs,
      },
      channel: {
        key: 'channel',
        label: 'Canal de Diffusion',
        score: channelScore,
        status: getStatus(channelScore),
        statusLabel: getStatusLabel(getStatus(channelScore)),
        feedback: channelFeedback,
        recommendations: channelRecs,
      },
    },
    topActions,
  };
}
