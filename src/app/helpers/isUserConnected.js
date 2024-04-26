"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

export async function isUserConnected(request) {
  // Get the cookie
  const cookie = cookies(request).get("buConnectedToken");

  if (!cookie) return false;

  // Validate it
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
  } catch (err) {
    return false;
  }

  return true;
}
