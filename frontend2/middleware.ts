import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest,
) {
  // If the request is to the /api/auth endpoint, we don't need to add the Authorization header
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  // If the request is to the /dashboard endpoint, we don't need to add the Authorization header
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  const user = await getSession(req, response);
  const token = user?.accessToken;
  response.headers.set("Authorization", `Bearer ${token}`);
  return response;
});

export const config = {
  matcher: ["/dashboard", "/api/private/:path*"],
};
