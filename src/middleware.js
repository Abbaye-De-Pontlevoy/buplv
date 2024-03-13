import { NextResponse } from "next/server";
import { updateSession } from "./lib";

export async function middleware(request) {
  //await updateSession(request);
  return NextResponse.next();
}
