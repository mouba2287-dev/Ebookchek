export interface ScrapedProduct {
  title?: string;
  priceFcfa?: number;
  description?: string;
  hasCoverImage?: boolean;
  coverStyle?: 'canva_template' | 'custom_pro' | 'text_only' | 'no_cover';
  platform?: 'Chariow' | 'Maketou' | 'Selar' | 'Gumroad' | 'Autre';
}

export function parseProductUrl(urlStr: string): ScrapedProduct | null {
  if (!urlStr || !urlStr.startsWith('http')) {
    return null;
  }

  let platform: 'Chariow' | 'Maketou' | 'Selar' | 'Gumroad' | 'Autre' = 'Autre';
  const lowerUrl = urlStr.toLowerCase();

  if (lowerUrl.includes('chariow.com')) {
    platform = 'Chariow';
  } else if (lowerUrl.includes('maketou.com')) {
    platform = 'Maketou';
  } else if (lowerUrl.includes('selar.co')) {
    platform = 'Selar';
  } else if (lowerUrl.includes('gumroad.com')) {
    platform = 'Gumroad';
  }

  // Extract dummy title from URL pathname if possible
  try {
    const urlObj = new URL(urlStr);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || '';
    const slugTitle = lastPart
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    return {
      title: slugTitle.length > 3 ? slugTitle : undefined,
      platform,
      hasCoverImage: true,
      coverStyle: 'canva_template',
      priceFcfa: 2500,
    };
  } catch (e) {
    return {
      platform,
      hasCoverImage: true,
      coverStyle: 'canva_template',
    };
  }
}
