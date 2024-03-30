import { NextResponse } from 'next/server'
import { isUserConnected } from "./app/helpers/isUserConnected";
 
export async function middleware( request ) {

  const isConnected = await isUserConnected(request);

  if(isConnected) {
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect("https://" + process.env.NEXT_PUBLIC_VERCEL_URL + '/dashboard');
    }
  }else{
    const restrictedPaths = ['/dashboard', '/profil'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return Response.redirect("https://" + process.env.NEXT_PUBLIC_VERCEL_URL + '/login');
    }
  }
  
 
  return NextResponse.next();
}