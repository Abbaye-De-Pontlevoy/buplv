"use server";

import { redirect } from "next/navigation";
import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function registerAction(currentState, formData) {
  // Get the data off the form
  const student_name = formData.get("student_name");
  const grade = formData.get("grade");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const password = formData.get("password");
  const iban = formData.get("iban");
  const bic = formData.get("bic");
  const country_code = formData.get("country_code");

  // Validate data
  if (!validateEmail(email) || !validatePassword(password))
    return "Invalid email or password";

  // Hash the password
  const hash = bcrypt.hashSync(password, 8);

  // Create a user in db
  await prisma.seller.create({
    data: {
      student_name: student_name,
      grade: grade,
      email: email,
      phone: phone,
      address: address,
      password: hash,
      iban: iban,
      bic: bic,
      country_code: country_code,
    },
  });

  redirect("/login");
}
