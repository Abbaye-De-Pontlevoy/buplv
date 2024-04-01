"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function registerAction(formData) {
  // Get the data off the form
  const {
    firstname,
    name,
    email,
    phone,
    address,
    password,
    iban,
    bic,
  } = formData;

  console.log(formData);

  try {
    // Hash the password
    const hash = bcrypt.hashSync(password, 8);

    // Create a user in db
    await prisma.seller.create({
      data: {
        firstname: firstname,
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: hash,
        iban: iban,
        bic: bic
      },
    });
  } catch (e) {
    console.log(e);
    return "Email déjà associé à un compte. Veuillez utiliser un autre email ou vous connecter.";
  }

  redirect("/login");
}
