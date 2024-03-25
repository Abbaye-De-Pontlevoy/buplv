"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import prisma from "@/app/lib/prisma";

export default async function loginAction(currentState, formData) {
  // Get the data off the form
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate data
  if (!validateEmail(email) || !validatePassword(password))
    return "Invalid email or password";

  // Lookup the seller
  const seller = await prisma.seller.findFirst({
    where: {
      email,
    },
  });

  if (!seller) return "Invalid email or password";

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, seller.password);
  //const isCorrectPassword = password === seller.password;

  if (!isCorrectPassword) return "Invalid email or password";

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
    return "Invalid email or password";
  }

  redirect("/dashboard");
}
