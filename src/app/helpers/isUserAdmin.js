"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import prisma from "../lib/prisma";

/**
 * Checks if the user is an admin.
 * @param {Object} request - The request object.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user is an admin.
 */
export async function isUserAdmin(request) {
  // Get the cookie
  const cookie = cookies(request).get("buConnectedToken");

  if (!cookie) return false;

  // Validate it
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});

    // get the user role from prisma
    const user = await prisma.seller.findUnique({
      where: {
        id: payload.sub,
      },
    });

    return user.admin;
  } catch (err) {
    return false;
  }
}
