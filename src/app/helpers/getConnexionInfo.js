"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

export async function getConnexionInfo(request) {
  const cookie = cookies(request).get("buConnectedToken");

  if (!cookie) {
    return false;
  }

  // Validate it
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    const { id, admin } = payload.sub;

    const result = {
      connected: true,
      admin: admin,
      id: id,
    };

    return result;
  } catch (err) {
    return {
      connected: false,
      admin: false,
      id: null,
    };
  }
}
