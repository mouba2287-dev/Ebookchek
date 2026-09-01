import { NextResponse } from 'next/server';
import { calculateValidation, ValidationInput } from '@/lib/scoring';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, targetAudience, intendedPriceFcfa } = body;

    // Server-side input validation
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { error: 'Veuillez renseigner le sujet ou le thème de votre ebook.' },
        { status: 400 }
      );
    }

    if (!targetAudience || typeof targetAudience !== 'string' || targetAudience.trim().length === 0) {
      return NextResponse.json(
        { error: 'Veuillez préciser à quel public s\'adresse cet ebook.' },
        { status: 400 }
      );
    }

    const price = Number(intendedPriceFcfa);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Veuillez saisir un prix valide en FCFA.' },
        { status: 400 }
      );
    }

    const input: ValidationInput = {
      subject: subject.trim(),
      targetAudience: targetAudience.trim(),
      intendedPriceFcfa: price,
    };

    const result = calculateValidation(input);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error executing validation API:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la validation de votre idée.' },
      { status: 500 }
    );
  }
}
