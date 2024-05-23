"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Updates the seller's profile information.
 * @param {Object} options - The options for updating the profile.
 * @param {string} options.password - The password for verification.
 * @param {Object} options.data - The updated profile data.
 * @param {string} options.data.firstname - The updated first name.
 * @param {string} options.data.name - The updated last name.
 * @param {string} options.data.email - The updated email.
 * @param {string} options.data.phone - The updated phone number.
 * @param {string} options.data.address - The updated address.
 * @param {string} options.data.iban - The updated IBAN.
 * @param {string} options.data.bic - The updated BIC.
 * @returns {boolean|string} - Returns true if the update is successful, or an error message if there's an error.
 */
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
