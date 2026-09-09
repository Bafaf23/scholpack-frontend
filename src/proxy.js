import { NextRequest, NextResponse } from "next/server";

export async function proxy(req) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  if (
    !subdomain ||
    subdomain.includes("localhost") ||
    subdomain.includes("127.0.0.1") ||
    subdomain === "sigace" ||
    subdomain === "www"
  )
    return NextResponse.next();

  try {
    const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/schools/check/${subdomain}`;
    const response = await fetch(urlApi, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    const data = await response.json();

    if (!data || data.success === false) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-school-subdomain", subdomain);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (e) {
    console.error("Error al verificar subdominio en middleware:", e);
    return NextResponse.rewrite(new URL("/404", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas excepto:
     * - api routes
     * - _next/static (archivos CSS, JS)
     * - _next/image (optimización de imágenes)
     * - favicon.ico y archivos estáticos (png, jpg, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
