import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname.startsWith("/en/projets/")) {
    url.pathname = pathname.slice(3);
    return NextResponse.redirect(url);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|.*\\..*).*)"],
};
