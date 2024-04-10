import { NextResponse } from 'next/server'
import { getConnexionInfo } from './app/helpers/getConnexionInfo';
 
export async function middleware( request ) {

  const { connected, admin } = await getConnexionInfo(request);

  const URL = (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "https://buplv.vercel.app" : "http://localhost:3000");

  if(connected) {
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect( URL + '/dashboard');
    }
    if(request.nextUrl.pathname === '/sales-panel' && !admin)
      return NextResponse
  }else{
    const restrictedPaths = ['/dashboard', '/profil', '/sales-panel'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return Response.redirect(URL + '/login');
    }
  }
  
 
  return NextResponse.next();
}