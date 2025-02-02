import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value; // Ensure value is extracted
    const isAdmin = request.cookies.get('isAdmin')?.value; // Ensure value is extracted

    const { pathname } = request.nextUrl;

    console.log('Middleware Debug:', { token, isAdmin, pathname });

    // Redirect to sign-in if token is missing
    if (!token) {
        return NextResponse.redirect(new URL('/signIn', request.url));
    }

    // Restrict /admin paths to admins only
    if (pathname.startsWith('/admin') && isAdmin !== 'true') {
        return NextResponse.redirect(new URL('/signIn', request.url));
    }

    // Redirect admin users from root to /admin
    if (pathname === '/' && isAdmin === 'true') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/admin', '/'], // Add '/' for root matching
};
    