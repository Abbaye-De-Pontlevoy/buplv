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

  // Validate data
  if (!validateEmail(email))
    return "Email ou mot de passe invalide.";

  // Lookup the seller
  const seller = await prisma.seller.findFirst({
    where: {
      email,
    },
  });

  if (!seller) return "Email ou mot de passe invalide.";

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, seller.password);
  //const isCorrectPassword = password === seller.password;

  if (!isCorrectPassword) return "Email ou mot de passe invalide.";

  try {
    // Create jwt token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(seller.id)
      .sign(secret);

    cookies().set("buConnectedToken", jwt, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: "/",
      sameSite: "strict",
    });
  } catch (e) {
    return "Email ou mot de passe invalide.";
  }

  redirect("/dashboard");
}
