"use server";

import { cookies } from "next/headers";

// Function to remove the cookie
/**
 * Removes the "buConnectedToken" cookie from the provided request object.
 * @param {Object} request - The request object.
 * @returns {Promise<void>} - A promise that resolves when the cookie is successfully removed.
 */
export default async function removeCookie(request){
  cookies(request).delete("buConnectedToken");
}
