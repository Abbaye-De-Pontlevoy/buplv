"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Resets the database.
 * @param {string} id - The user ID.
 * @param {string} password - The user password.
 * @returns {Promise<{ success: boolean, msg: string }>} - The result of the database reset operation.
 */
export async function resetBDD(id, password) {
  // Verify user id and password
  try {
    const seller = await prisma.seller.findFirst({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    });

    // Compare password with hashed password
    const isCorrectPassword = bcrypt.compareSync(password, seller.password);

    // If password is incorrect, return error message
    if (!isCorrectPassword) throw new Error("Mot de passe incorrect.");

    // Reset the database
    await prisma.$executeRaw`SELECT public.reset_database()`;
    
    console.log("La base de données a été réinitialisée");

    return {
      success: true,
      msg: "La base de données a été réinitialisée.",
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      msg: e.message,
    };
  }
}
