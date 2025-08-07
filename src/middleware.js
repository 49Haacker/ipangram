import { NextResponse } from "next/server";

// matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
export const config = {
  matcher: ["/", "/signin", "/signup", "/forgot-password", "/verify-email"],
};

export const middleware = (request) => {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/signin",
    "/signup",
    "/logout",
    "/forgot-password",
    "/verify-email",
  ];

  const isPublicPath = publicPaths.includes(path);
  const token = request.cookies.get("accessToken")?.value || "";

  // console.log("isPublicPath, isAuth", isPublicPath, isAuth);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
};
