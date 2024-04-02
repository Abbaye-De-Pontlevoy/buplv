import { NextResponse } from 'next/server'
import { isUserConnected } from "./app/helpers/isUserConnected";
 
export async function middleware( request ) {

  const isConnected = await isUserConnected(request);

  if(isConnected) {
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      console.log((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://buplv.vercel.app/" : "http://localhost:3000/") + '/dashboard');
      return NextResponse.redirect((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://buplv.vercel.app/" : "http://localhost:3000/") + '/dashboard');
    }
  }else{
    const restrictedPaths = ['/dashboard', '/profil'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      console.log((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://buplv.vercel.app/" : "http://localhost:3000/") + '/login');
      return Response.redirect((process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://buplv.vercel.app/" : "http://localhost:3000/") + '/login');
    }
  }
  
 
  return NextResponse.next();
}