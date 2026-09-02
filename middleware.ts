import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route Cookie fallback check for client local authentication state
  const hasLocalSessionCookie = request.cookies.get('ebookcheck_auth')?.value === 'true';

  const isAuthenticated = !!user || hasLocalSessionCookie;

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

  // Allow static files, api routes, and public pages
  const isPublic =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.');

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
