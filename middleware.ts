import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root path
    "/",
    // Match locale-prefixed paths
    "/(en|id)/:path*",
    // Match all paths except Next.js internals and files
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
