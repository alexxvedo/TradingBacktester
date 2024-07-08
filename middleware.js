import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPublicRoute =
    nextUrl.pathname === "/auth/login" ||
    nextUrl.pathname === "/auth/signup" ||
    nextUrl.pathname === "/";

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute =
    nextUrl.pathname === "/auth/login" || nextUrl.pathname === "/auth/signup";

  const isProtectedRoute = nextUrl.pathname.startsWith("/sesiones");

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(
          "/sesiones",
          `${req.nextUrl.origin}${req.nextUrl.pathname}`
        ).toString(),
        302
      );
    }
    return null;
  }

  if (isProtectedRoute && isLoggedIn) {
    const expiresTimestamp = new Date(req.auth.expires).getTime() / 1000;
    const currentTimestamp = Date.now() / 1000;

    if (expiresTimestamp && currentTimestamp > expiresTimestamp) {
      return Response.redirect(
        new URL(
          "/auth/login",
          `${req.nextUrl.origin}${req.nextUrl.pathname}`
        ).toString(),
        302
      );
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(
        "/auth/login",
        `${req.nextUrl.origin}${req.nextUrl.pathname}`
      ).toString(),
      302
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
