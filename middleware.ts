import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { privateRoutes, publicRoutes } from "./constants/constants";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const data = await checkServerSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };
            if (parsed.accessToken)
              cookieStore.set("accessToken", parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set("refreshToken", parsed.refreshToken, options);
          }

          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }

          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      }
      // Якщо refreshToken або сесії немає:
      // публічний маршрут — дозволяємо доступ
      if (isPublicRoute) {
        return NextResponse.next();
      }

      // приватний маршрут — редірект на сторінку входу
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // немає жодного токена — редірект на сторінку входу
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // Якщо accessToken існує:
    // публічний маршрут — виконуємо редірект на головну
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // приватний маршрут — дозволяємо доступ
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/notes/filter/:path*",
    "/notes/action/create",
    "/sign-in",
    "/sign-up",
    "/register",
    "/login",
  ],
};
