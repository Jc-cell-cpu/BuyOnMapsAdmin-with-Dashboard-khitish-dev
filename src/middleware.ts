// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Rate limiting map
// const rateLimit = new Map();

// // IP block list (you might want to move this to a database or env variable)
// const BLOCKED_IPS = new Set(["0.0.0.0"]); // Add IPs to block

// // Allowed HTTP methods for different paths
// const ALLOWED_METHODS: Record<string, string[]> = {
//   "/api": ["GET", "POST", "DELETE"],
//   "/auth": ["GET", "POST"],
//   "/dashboard": ["GET"],
// };

// // Function to check rate limit
// function checkRateLimit(ip: string): boolean {
//   const now = Date.now();
//   const windowSize = 60 * 1000; // 1 minute
//   const maxRequests = 100; // max requests per minute

//   if (!rateLimit.has(ip)) {
//     rateLimit.set(ip, [now]);
//     return true;
//   }

//   const requests = rateLimit.get(ip);
//   const windowStart = now - windowSize;

//   // Filter out old requests
//   const recentRequests = requests.filter((time: number) => time > windowStart);
//   recentRequests.push(now);
//   rateLimit.set(ip, recentRequests);

//   return recentRequests.length <= maxRequests;
// }

// export function middleware(request: NextRequest) {
//   // Get IP address
//   const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";

//   // Get the pathname
//   const path = request.nextUrl.pathname;
//   const method = request.method;

//   // Get user agent
//   const userAgent = request.headers.get("user-agent") || "";

//   // Basic security checks
//   if (BLOCKED_IPS.has(ip)) {
//     return new NextResponse("Access Denied", { status: 403 });
//   }

//   // Block potential malicious user agents
//   if (
//     userAgent.toLowerCase().includes("sqlmap") ||
//     userAgent.toLowerCase().includes("nikto") ||
//     userAgent.toLowerCase().includes("nmap")
//   ) {
//     return new NextResponse("Access Denied", { status: 403 });
//   }

//   // Rate limiting for auth routes
//   if (path.startsWith("/auth") || path.startsWith("/api")) {
//     if (!checkRateLimit(ip)) {
//       return new NextResponse("Too Many Requests", { status: 429 });
//     }
//   }

//   // Method restrictions
//   for (const [pathPrefix, methods] of Object.entries(ALLOWED_METHODS)) {
//     if (path.startsWith(pathPrefix) && !methods.includes(method)) {
//       return new NextResponse("Method Not Allowed", { status: 405 });
//     }
//   }

//   // Get the token from cookies
//   const token = request.cookies.get("authToken")?.value;

//   // Define protected paths
//   const protectedPaths = ["/dashboard", "/api/protected", "/settings"];

//   // Define authentication paths
//   const authPaths = ["/auth/signin", "/auth/signup", "/auth/reset-password"];

//   // Define public paths that should never require auth
//   const publicPaths = ["/", "/about", "/contact", "/privacy-policy"];

//   // Check if the path is protected
//   const isProtectedPath = protectedPaths.some((pp) => path.startsWith(pp));

//   // Check if the path is an auth path
//   const isAuthPath = authPaths.some((ap) => path.startsWith(ap));

//   // If the path is protected and there's no token,
//   // redirect to the login page
//   if (isProtectedPath && !token) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }

//   // If the user is authenticated and tries to access auth paths,
//   // redirect to dashboard
//   if (isAuthPath && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Create the response
//   const response = NextResponse.next();

//   // Add security headers
//   const securityHeaders = {
//     "X-DNS-Prefetch-Control": "off",
//     "X-Frame-Options": "SAMEORIGIN",
//     "X-Content-Type-Options": "nosniff",
//     "Referrer-Policy": "strict-origin-when-cross-origin",
//     "Permissions-Policy":
//       "camera=(), microphone=(), geolocation=(), interest-cohort=()",
//     "X-XSS-Protection": "1; mode=block",
//     "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
//     "Content-Security-Policy": [
//       "default-src 'self'",
//       "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//       "style-src 'self' 'unsafe-inline'",
//       "img-src 'self' data: https:",
//       "font-src 'self'",
//       "connect-src 'self' https://buyonmaps-api.onrender.com",
//     ].join("; "),
//   };

//   // Apply security headers
//   Object.entries(securityHeaders).forEach(([key, value]) => {
//     response.headers.set(key, value);
//   });

//   // Add CORS headers for API routes
//   if (path.startsWith("/api")) {
//     response.headers.set(
//       "Access-Control-Allow-Origin",
//       process.env.NEXT_PUBLIC_APP_URL || "*",
//     );
//     response.headers.set(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, OPTIONS",
//     );
//     response.headers.set(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization",
//     );
//     response.headers.set("Access-Control-Max-Age", "86400");
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      *
//      * Note: We're including api routes in the matcher now since we want to
//      * apply security headers and rate limiting to them
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("authToken")?.value;

  // Define protected paths
  const protectedPaths = ["/dashboard", "/api/protected", "/settings"];

  // Define authentication paths
  const authPaths = ["/auth/signin", "/auth/signup", "/auth/reset-password"];

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((pp) =>
    request.nextUrl.pathname.startsWith(pp),
  );

  // Check if the path is an auth path
  const isAuthPath = authPaths.some((ap) =>
    request.nextUrl.pathname.startsWith(ap),
  );

  // If the path is protected and there's no token, redirect to the login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If the user is authenticated and tries to access auth paths, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
