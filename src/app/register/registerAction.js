"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function registerAction(formData) {
  // Get the data off the form
  let {
    firstname,
    name,
    email,
    phone,
    address,
    password,
    iban,
    bic,
    return_articles
  } = formData;
  
  try {
    // Prepare Datas
    // Format Name and Firstname
    name = name.trim().toUpperCase();
    firstname = firstname.trim().charAt(0).toUpperCase() + firstname.trim().slice(1);

    // Format Email
    email = email.trim().toLowerCase();

    // Remove spaces from the iban
    iban = iban.replace(/ /g, "");
    // Add spaces every 4 characters
    iban = iban.match(/.{1,4}/g).join(" ");

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
        bic: bic,
        return_articles: return_articles
      },
    });
  } catch (e) {
    console.error(e);
    return "Email déjà associé à un compte. Veuillez utiliser un autre email ou vous connecter.";
  }

  redirect("/login");
}
