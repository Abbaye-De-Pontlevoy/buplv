"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function updateAction({ password, data }) {
  // Get the data off the form
  const { firstname, name, email, phone, address, iban, bic } = data;

  try {
    // Hash the password
    const hash = bcrypt.hashSync(password, 8);

    // verify it password is correct
    const seller = await prisma.seller.findFirst({
      where: {
        email: email,
      },
    });
    if (!seller || !bcrypt.compareSync(password, seller.password)) {
      return "Mot de passe incorrect.";
    }

    // Update the seller
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
  } catch (e) {
    console.error(e);
    return "Erreur lors de la mise à jour de vos données.";
  }
}
