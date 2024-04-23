"use server";

import { cookies } from "next/headers";
import validateEmail from "@/app/helpers/validateEmail";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import prisma from "@/app/lib/prisma";
import { getSettings } from "../config/settings";

export const removeCookie = () => {
  cookies().delete("buConnectedToken");
}

export default async function loginAction(formData) {
  cookies().delete("buConnectedToken");

  const connexionError = {
    access: false,
    msg: "Nom d'utilisateur ou mot de passe incorrect.",
  };

  // Get the data off the form
  const email = formData.email;
  const password = formData.password;

  // Validate email format
  if (!validateEmail(email)) return connexionError;

  // Lookup the seller in the database
  const seller = await prisma.seller.findFirst({
    where: {
      email,
    },
  });

  // Check if seller exists
  if (!seller) return connexionError;

  // Compare password with hashed password
  const isCorrectPassword = bcrypt.compareSync(password, seller.password);

  // If password is incorrect, return error message
  if (!isCorrectPassword) return connexionError;

  try {
    // Create JWT token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = "HS256";

    const jwtData = {
      id: seller.id,
      admin: seller.admin,
      benevole: seller.benevole,
    };

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(jwtData)
      .sign(secret);

    const siteSettings = await getSettings();
    if (!seller.admin && !siteSettings.publicAccess) {
      return {
        access: false,
        msg: "Accès refusé. Site en maintenance.",
      };
    }

    // Set JWT token as a cookie
    cookies().set("buConnectedToken", jwt, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3, // Expiry time set to 72 hours
      path: "/", // Cookie path
      sameSite: "strict", // SameSite attribute set to strict
    });
  } catch (e) {
    return connexionError;
  }

  // Redirect user to dashboard after successful login

  return {
    access: true,
    id: seller.id,
    admin: seller.admin,
    benevole: seller.benevole,
    msg: "Authentification réussie. Redirection en cours...",
  };
}
