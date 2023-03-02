import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * 
 * @returns {NextResponse}
 * 
 */

export async function middleware(request) {
  const jwt = request.cookies.get("Mytoken");

  // If no token, redirect to login page
  if (!jwt) {return NextResponse.redirect(new URL("/login", request.url));}

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("secret")
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Paths to be protected
export const config = {
  matcher: ["/profile/:path*", "/clientes/:path*", "/pedidos/:path*", "/",],
};