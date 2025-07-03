import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") || 
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static/") ||
    pathname.match(/\.(css|js|png|jpg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/cadastro")) {
    if (token) {
      return NextResponse.redirect(new URL("/area-da-empresa", request.nextUrl.origin));
    }
  }

  if (
    pathname.startsWith("/area-da-empresa/") || 
    pathname.startsWith("/area-da-empresa")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
    // Opcional: Verifica se o token pertence a um admin
    // Você pode usar JWT para isso, por exemplo
  }

  return NextResponse.next();
}

// Matcher atualizado
export const config = {
  matcher: [
    '/login',
    '/cadastro',
    '/area-da-empresa/:path*',
    '/admin/:path*',
  ],
};
