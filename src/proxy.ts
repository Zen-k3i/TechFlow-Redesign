import { NextResponse, type NextRequest } from "next/server";
import { englishAliases } from "./i18n/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const [, , first, ...rest] = pathname.split("/");
    const folder = first && englishAliases[first];
    if (!folder) return;
    url.pathname = ["", "en", folder, ...rest].join("/");
    return NextResponse.rewrite(url);
  }

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
