"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function updateAction(formData) {
  // Get the data off the form
  const { firstname, name, email, phone, address, password, iban, bic } =
    formData;

  try {
    if (!password || password === "") {
      await prisma.seller.update({
        where: { email: email },
        data: {
          firstname: firstname,
          name: name,
          phone: phone,
          address: address,
          iban: iban,
          bic: bic,
        },
      });
      return true;
    }

    // Hash the password
    const hash = bcrypt.hashSync(password, 8);

    // Create a user in db
    await prisma.seller.update({
      where: { email: email },
      data: {
        firstname: firstname,
        name: name,
        phone: phone,
        address: address,
        password: hash,
        iban: iban,
        bic: bic,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return "Erreur lors de la mise à jour de vos données.";
  }
}
