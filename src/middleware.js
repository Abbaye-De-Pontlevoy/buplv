import { NextResponse } from "next/server";
import { getConnexionInfo } from "./app/helpers/getConnexionInfo";

/**
 * Middleware function to handle authentication and redirection logic.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse|Response} - The response object or the next middleware function.
 */
export async function middleware(request) {
  const { connected, admin, benevole } = await getConnexionInfo(request);

  const URL =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://buplv.vercel.app"
      : "http://localhost:3000";

  if (connected) {
    const restrictedPaths = ["/login", "/register"];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(URL + "/dashboard");
    }
    if (request.nextUrl.pathname === "/dashboard" && !admin && benevole)
      return NextResponse.redirect(URL + "/sales-panel");
  } else {
    const restrictedPaths = ["/dashboard", "/profil", "/sales-panel", "/admin-panel"];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return Response.redirect(URL + "/login");
    }
  }

  return NextResponse.next();
}
