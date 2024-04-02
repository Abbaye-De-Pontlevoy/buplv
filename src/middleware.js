import { NextResponse } from 'next/server'
import { isUserConnected } from "./app/helpers/isUserConnected";
 
export async function middleware( request ) {

  const isConnected = await isUserConnected(request);

  if(isConnected) {
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      console.log((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://" : "") + process.env.NEXT_PUBLIC_VERCEL_URL + '/dashboard');
      console.log("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
      console.log("process.env.NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
      return NextResponse.redirect((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://" : "") + process.env.NEXT_PUBLIC_VERCEL_URL + '/dashboard');
    }
  }else{
    const restrictedPaths = ['/dashboard', '/profil'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      console.log((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://" : "") + process.env.NEXT_PUBLIC_VERCEL_URL + '/login');
      console.log("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
      console.log("process.env.NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
      return Response.redirect((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://" : "") +  process.env.NEXT_PUBLIC_VERCEL_URL + '/login');
    }
  }
  
 
  return NextResponse.next();
}