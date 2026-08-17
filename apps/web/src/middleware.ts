import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mock auth check
  // In a real app, verify JWT or check session cookie
  const hasToken = request.cookies.has('token') || true; // Set to true for demo purposes

  if (request.nextUrl.pathname.startsWith('/dashboard') && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && hasToken) {
    // Optionally redirect logged in users away from auth pages
    // return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
