import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile"];
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const pathname = request.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        // тут будемо пізніше додавати silent authentication При завершенні дії accessToken виконуєтьсяза допомогою refreshToken
      }

      // немає жодного токена — редірект на сторінку входу
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // публічний маршрут або accessToken є — дозволяємо доступ
  return NextResponse.next();
}
export const config = {};
