import { NextResponse } from 'next/server'
import { isUserConnected } from "./app/helpers/isUserConnected";
 
export async function middleware( request ) {

  const isConnected = await isUserConnected(request);

  if(isConnected) {
    const restrictedPaths = ['/login', '/register'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(process.env.ROOT_URL + '/dashboard');
    }
  }else{
    const restrictedPaths = ['/dashboard'];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return Response.redirect(process.env.ROOT_URL + '/login');
    }
  }
  
 
  return NextResponse.next();
}