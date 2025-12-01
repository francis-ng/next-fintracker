import { auth } from '@/auth';
import { headers } from 'next/headers';
import { privateRoutes,
         authRoutes,
         DEFAULT_REDIRECT_HOME_URL,
         DEFAULT_REDIRECT_LOGIN_URL } from "./routes";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware (req: NextRequest) {
  const url = req.nextUrl;
  const route = req.nextUrl.pathname;

  const isLoggedIn = await auth.api.getSession({ headers: await headers() });

  function checkAuthRoute(authRoute) {
    if(route.startsWith(authRoute)) {
      return true;
    }
    return null;
  }

  if (!!authRoutes.filter(checkAuthRoute).length) {
    if(isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
    }
  }

  else if (route.startsWith(...authRoutes as [search: string])) {
    if(isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
    }
  }

  else if (route.startsWith(...privateRoutes as [search: string])) {
    if(!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}