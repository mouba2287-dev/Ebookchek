import { NextResponse } from 'next/server';
import { calculateDiagnostic, checkRateLimit, DiagnosticInput } from '@/lib/scoring';
import { parseProductUrl } from '@/lib/scraper';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Check rate limit (max 5 diagnostics per hour per IP)
    const rateCheck = checkRateLimit(ip, 5, 60 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: `Limite de diagnostics gratuits atteinte. Reviens dans ${Math.ceil(rateCheck.resetInSeconds / 60)} minutes ou passe au Pass Illimité.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      title,
      productUrl,
      priceFcfa,
      description,
      hasCoverImage,
      coverStyle,
      promotionChannel,
      timeOnlineDays,
      salesCount,
    } = body;

    // Server-side validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le titre du produit est obligatoire.' },
        { status: 400 }
      );
    }

    const parsedPrice = Number(priceFcfa);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: 'Veuillez saisir un prix valide en FCFA.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'La description du produit est obligatoire.' },
        { status: 400 }
      );
    }

    const validChannels = ['whatsapp', 'tiktok', 'facebook', 'instagram', 'email', 'other'];
    if (!promotionChannel || !validChannels.includes(promotionChannel)) {
      return NextResponse.json(
        { error: 'Veuillez sélectionner un canal de promotion valide.' },
        { status: 400 }
      );
    }

    const diagnosticInput: DiagnosticInput = {
      title: title.trim(),
      productUrl: productUrl ? String(productUrl).trim() : undefined,
      priceFcfa: parsedPrice,
      description: description.trim(),
      hasCoverImage: Boolean(hasCoverImage),
      coverStyle: coverStyle || 'canva_template',
      promotionChannel: promotionChannel as DiagnosticInput['promotionChannel'],
      timeOnlineDays: Number(timeOnlineDays) || 0,
      salesCount: Number(salesCount) || 0,
    };

    const result = calculateDiagnostic(diagnosticInput);

    return NextResponse.json({
      success: true,
      data: result,
      rateLimitRemaining: rateCheck.remaining,
    });
  } catch (error) {
    console.error('Error executing diagnostic API:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'analyse de votre ebook.' },
      { status: 500 }
    );
  }
}
