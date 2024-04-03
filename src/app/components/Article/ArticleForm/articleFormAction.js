"use server";

import { getUserID } from "@/app/helpers/getUserID";
import prisma from "@/app/lib/prisma";

export const addArticle = async (e) => {
  const brand = e.brand;
  const name = e.name;
  const size = e.size;
  const quantity = e.quantity;
  const price = e.price;

  const userID = await getUserID();

  if (!userID) return false;

  // Créer un tableau pour stocker les promesses
  const createPromises = [];

  // Créer les promesses pour chaque création de vente de produit
  for (let i = 0; i < quantity; i++) {
    createPromises.push(
      prisma.article.create({
        data: {
          seller_id: userID,
          name: name,
          brand: brand,
          size: size,
          price: price,
          state: 0,
        },
      })
    );
  }

  // Exécuter toutes les promesses en parallèle
  await Promise.all(createPromises);

  return true;
};
