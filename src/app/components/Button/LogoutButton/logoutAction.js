"use server";

import { cookies } from "next/headers";

export default async function removeCookie(request){
  cookies(request).delete("buConnectedToken");
}
