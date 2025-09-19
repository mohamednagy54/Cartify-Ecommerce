import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (token) {
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (
      pathname.startsWith("/cart") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/allorders") ||
      pathname.startsWith("/wishlist")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/cart",
    "/profile",
    "/checkout",
    "/allorders",
    "/wishlist",
    "/login",
    "/register",
  ],
};
