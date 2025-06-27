import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next/") || // arquivos estáticos do Next.js
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static/") ||
    pathname.match(/\.(css|js|png|jpg|svg|ico)$/) // qualquer arquivo estático
  ) {
    return NextResponse.next();
  }

  
  if (pathname.startsWith("/login") || pathname.startsWith("/cadastro")) {
    if (token) {
      return NextResponse.redirect(
        new URL("/area-da-empresa", request.nextUrl.origin)
      );
    }
  }
  if (pathname.startsWith("/area-da-empresa/") || pathname.startsWith("/area-da-empresa")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }


  return NextResponse.next();
}
