"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validateEmail from "@/app/helpers/validateEmail";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import prisma from "@/app/lib/prisma";

export default async function loginAction(formData) {
  // Get the data off the form
  const email = formData.email;
  const password = formData.password;

  // Validate email format
  if (!validateEmail(email))
    return "Email ou mot de passe invalide."; // Return error message if email is invalid

  // Lookup the seller in the database
  const seller = await prisma.seller.findFirst({
    where: {
      email,
    },
  });

  // Check if seller exists
  if (!seller) return "Email ou mot de passe invalide."; // Return error message if seller not found

  // Compare password with hashed password
  const isCorrectPassword = bcrypt.compareSync(password, seller.password);
  //const isCorrectPassword = password === seller.password; // Alternative comparison (not recommended)

  // If password is incorrect, return error message
  if (!isCorrectPassword) return "Email ou mot de passe invalide.";

  try {
    // Create JWT token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(seller.id)
      .sign(secret);

    // Set JWT token as a cookie
    cookies().set("buConnectedToken", jwt, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3, // Expiry time set to 72 hours
      path: "/", // Cookie path
      sameSite: "strict", // SameSite attribute set to strict
    });
  } catch (e) {
    return "Email ou mot de passe invalide."; // Return error message if JWT token creation fails
  }

  // Redirect user to dashboard after successful login
  redirect("/dashboard");
}