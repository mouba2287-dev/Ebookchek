import { NextRequest, NextResponse } from 'next/server';

export interface MarketIdea {
  id: string;
  niche: string;
  title: string;
  targetAudience: string;
  demandScore: number; // 0-100
  competitionScore: number; // 0-100
  recommendedPriceFcfa: number;
  specificAngle: string;
  justification: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sector = 'business', userPlan = 'gratuit' } = body;

    // Base ideas pool according to sector and market data in Francophone Africa
    const ideasDatabase: Record<string, MarketIdea[]> = {
      business: [
        {
          id: 'idea_1',
          niche: 'Importation Chine - Afrique',
          title: 'Importation Chine-Bénin : Le Guide Anti-Arnaque 2025',
          targetAudience: 'Étudiants et jeunes commerçants sur WhatsApp',
          demandScore: 92,
          competitionScore: 65,
          recommendedPriceFcfa: 3500,
          specificAngle: 'Focus sur les fournisseurs 1688 vérifiés et le dédouanement portuaire à Cotonou.',
          justification: 'Très forte recherche mensuelle sur TikTok & WhatsApp. Forte disposition à payer car ROI direct.',
        },
        {
          id: 'idea_2',
          niche: 'Agro-business & Élevage',
          title: 'Guide Pratique de la Liculture (Élevage de Lapins) Rentable',
          targetAudience: 'Jeunes actifs cherchant un complément de revenu',
          demandScore: 88,
          competitionScore: 40,
          recommendedPriceFcfa: 2500,
          specificAngle: 'Démarrer avec moins de 50 000 FCFA dans sa cour ou sur un balcon.',
          justification: 'Niche peu saturée sur Chariow avec une forte demande en zones périurbaines.',
        },
        {
          id: 'idea_3',
          niche: 'E-commerce & WhatsApp Marketing',
          title: '30 Jours pour Vendre 100 Produits sur Statut WhatsApp',
          targetAudience: 'Vendeuses de vêtements, cosmétiques et e-commerçants',
          demandScore: 95,
          competitionScore: 70,
          recommendedPriceFcfa: 3000,
          specificAngle: 'Scripts exacts de relance de clients inactifs et copywriting en nouchi / français populaire.',
          justification: 'Problème numéro 1 des petits vendeurs en Afrique de l\'Ouest : la relance client.',
        },
        {
          id: 'idea_4',
          niche: 'Freelancing & IA',
          title: 'Monétiser ChatGPT & Canva : 5 Services à Vendre aux PME Locales',
          targetAudience: 'Étudiants et diplômés sans emploi',
          demandScore: 85,
          competitionScore: 50,
          recommendedPriceFcfa: 2500,
          specificAngle: 'Création de visuels et rédaction de posts pour commerces physiques (boutiques, restaurants).',
          justification: 'Tendances de recherche élevées liées à l\'IA et au travail à domicile.',
        },
        {
          id: 'idea_5',
          niche: 'Canva & Design Social Media',
          title: 'Kit de 50 Templates Canva Prêts à Vendre pour Community Managers',
          targetAudience: 'Créateurs de contenu & petites agences web',
          demandScore: 82,
          competitionScore: 55,
          recommendedPriceFcfa: 4000,
          specificAngle: 'Inclus des visuels adaptés aux fêtes locales et événements d\'Afrique de l\'Ouest.',
          justification: 'Format numérique à forte marge et réutilisable immédiatement.',
        },
      ],
      sante_bienetre: [
        {
          id: 'idea_6',
          niche: 'Nutrition & Perte de poids locale',
          title: 'Perdre du Ventre avec nos Plats Locaux (Atassi, Alloko, Sauce Gombo)',
          targetAudience: 'Femmes actives de 25 à 45 ans',
          demandScore: 90,
          competitionScore: 45,
          recommendedPriceFcfa: 3000,
          specificAngle: 'Aucun ingrédient occidental cher : uniquement des produits du marché local.',
          justification: 'La majorité des régimes en ligne échouent car inadaptés au pouvoir d\'achat local.',
        },
        {
          id: 'idea_7',
          niche: 'Soins capillaires nappy',
          title: 'Pousse des Cheveux Crépus : Recettes Naturelles à Moins de 2 000 FCFA',
          targetAudience: 'Jeunes femmes nappy',
          demandScore: 86,
          competitionScore: 60,
          recommendedPriceFcfa: 2000,
          specificAngle: 'Huiles locales (beurre de karité, huile de palmiste) préparées à la maison.',
          justification: 'Sujet très populaire sur TikTok et Instagram en Afrique francophone.',
        },
      ],
    };

    const selectedCategoryIdeas = ideasDatabase[sector] || ideasDatabase.business;

    // Filter or adjust ideas count based on user plan
    const resultIdeas = userPlan === 'pro' ? selectedCategoryIdeas : selectedCategoryIdeas.slice(0, 3);

    return NextResponse.json({
      success: true,
      sector,
      userPlan,
      totalGenerated: resultIdeas.length,
      ideas: resultIdeas,
    });
  } catch (error: any) {
    console.error('Erreur API /api/etude-de-marche:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la génération de l\'étude de marché.' },
      { status: 500 }
    );
  }
}
