"use server";

import { cookies } from "next/headers";

// Function to remove the cookie
export default async function removeCookie(request){
  cookies(request).delete("buConnectedToken");
}
