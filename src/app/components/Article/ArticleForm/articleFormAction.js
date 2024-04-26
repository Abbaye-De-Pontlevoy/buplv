"use server";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import prisma from "@/app/lib/prisma";

export const addArticle = async (e) => {
  // Extract data from the event
  const brand = e.brand;
  const name = e.name;
  const size = e.size;
  const quantity = e.quantity;
  const price = e.price;

  // Get the user ID and verify that it exists/is correct
  const { id } = await getConnexionInfo();

  // Return false if the user ID is not found
  if (!id) return false;

  // Create an array to store promises
  const createPromises = [];

  // Create promises for each product sale creation
  for (let i = 0; i < quantity; i++) {
    createPromises.push(
      prisma.article.create({
        data: {
          seller_id: id,
          name: name,
          brand: brand,
          size: size,
          price: price,
          state: 1,
        },
      })
    );
  }

  // Execute all promises in parallel
  await Promise.all(createPromises);

  return true;
};
