import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/compte/admin', '/api/private/'],
    },
    sitemap: 'https://ebook-check.com/sitemap.xml',
  };
}
