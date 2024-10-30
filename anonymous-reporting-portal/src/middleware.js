import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If the user is authenticated and tries to access sign-in or sign-up, redirect to home or dashboard
  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not authenticated and is trying to access protected routes, redirect to sign-in
  if (!token && !['/sign-in', '/sign-up'].includes(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Restrict access to admin-only pages based on user role
  const adminPaths = ['/manage-reports','/communicateWith-user']; // Add other admin-only pages here
  if (adminPaths.includes(pathname) && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Redirect unauthorized users
  }

  // Allow the request to continue if the conditions above are not met
  return NextResponse.next();
}

// Configure the paths where the middleware should apply
export const config = {
  matcher: [
    '/',
    '/communicate-admin',
    '/report-success',
    '/submit-report',
    '/track-report',
    '/communicateWith-user',
    '/sign-in',
    '/sign-up',
    '/manage-reports',    // Ensure admin paths are included in matcher
  ],
};
