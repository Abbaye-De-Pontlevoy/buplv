"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState,
  formData
){
  // Get the data off the form
  const email = formData.get("email");
  const password = formData.get("password");

  //  Send to our api route
  const apiUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user/login`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      email: email,
      password: password }),
  });


  const json = await res.json();

  cookies().set("buConnectedToken", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    path: "/",
    sameSite: "strict",
  });

  // Redirect to login if success
  if (res.ok) {
    redirect("/dashboard");
  } else {
    return json.error;
  }
}
