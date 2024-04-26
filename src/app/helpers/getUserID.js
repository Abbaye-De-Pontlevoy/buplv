"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

export async function getUserID(request) {
  const cookie = cookies(request).get("buConnectedToken");

  if (!cookie) return null;

  // Validate it
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    return payload.sub;
  } catch (err) {
    return null;
  }
}
