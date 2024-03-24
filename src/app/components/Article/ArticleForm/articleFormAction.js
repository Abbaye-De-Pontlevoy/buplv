"use server";

import { getUserID } from "@/app/helpers/getUserID";
import prisma from "@/app/lib/prisma";

export const getBrandList = async () => {
  const brands = await prisma.article.findMany({
    distinct: ["brand"],
    select: { brand: true },
  });
  return brands.map((article) => article.brand);
};

export const getNameList = async () => {
  const names = await prisma.article.findMany({
    distinct: ["name"],
    select: { name: true },
  });
  return names.map((article) => article.name);
};

export const addArticle = async (e) => {
  const brand = e.get("brand");
  const name = e.get("name");
  const quantity = e.get("quantity");

  const userID = await getUserID();

  if (!userID) return false;

  const article = await prisma.article.findFirst({
    where: {
      brand: brand,
      name: name,
    },
  });

  // Créer un tableau pour stocker les promesses
  const createPromises = [];

  // Créer les promesses pour chaque création de vente de produit
  for (let i = 0; i < quantity; i++) {
    createPromises.push(
      prisma.article.create({
        data: {
          seller_id: userID,
          article_id: article.id,
          quantity: 1,
          price: article.price,
        },
      })
    );
  }

  // Exécuter toutes les promesses en parallèle
  await Promise.all(createPromises);

  return true;
};
