export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EBOOKCHECK';

export function pageview(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
}

export function trackEvent({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  console.error('[EbookCheck Error Captured]:', error, context);
  // Sentry fallback logger
}
