import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const authenticated = !!token;

    const { pathname } = request.nextUrl;

    const publicRoutes = ["/login", "/acesso-negado", "/usuarios/create"];

    const isPublic = publicRoutes.some(route => pathname.startsWith(route));

    if (isPublic) {
        return NextResponse.next();
    }

    if (pathname === "/" && !authenticated) {
        return NextResponse.redirect(new URL("/acesso-negado", request.url));
    }

    if ((pathname.startsWith("/blog") || pathname === "/usuarios/") && !authenticated ) {
        return NextResponse.redirect(new URL("/acesso-negado", request.url));
    }

    return NextResponse.next();
}
