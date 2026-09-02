import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;

  // List of public routes accessible without auth
  const publicRoutes = [
    '/',
    '/tarifs',
    '/faq',
    '/mentions-legales',
    '/politique-confidentialite',
    '/conditions-generales',
    '/compte',
  ];

  // Fast path for public routes, static assets, and api endpoints
  const isPublic =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.');

  // Check client local session cookie
  const hasLocalSessionCookie = request.cookies.get('ebookcheck_auth')?.value === 'true';

  let user = null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Only invoke Supabase if valid credentials are provided in environment
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      });

      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch (err) {
      console.warn('Supabase auth verification skipped in middleware:', err);
    }
  }

  const isAuthenticated = !!user || hasLocalSessionCookie;

  if (!isAuthenticated && !isPublic) {
    const redirectUrl = new URL('/compte', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    redirectUrl.searchParams.set('msg', 'auth_required');
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
