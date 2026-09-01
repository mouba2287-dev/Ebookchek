import { NextResponse } from 'next/server';
import { analyzeScreenshotWithVision } from '@/lib/vision';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { error: 'Veuillez fournir une capture d\'écran valide au format image.' },
        { status: 400 }
      );
    }

    // Server-side call to Vision AI (NVIDIA NIM / OpenAI / Claude compatible)
    const result = await analyzeScreenshotWithVision(imageBase64);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in Chariow Vision API route:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'analyse de la capture d\'écran.' },
      { status: 500 }
    );
  }
}
