import { NextResponse } from 'next/server'
import { isUserConnected } from "@/lib";
 
export function middleware( request ) {

  if(!isUserConnected()) {
    const restrictedPaths = ['/dashboard'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(process.env.BU_URL + '/login');
    }
  }else{
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(process.env.BU_URL + '/dashboard');
    }
  }
  
 
  return NextResponse.next();
}