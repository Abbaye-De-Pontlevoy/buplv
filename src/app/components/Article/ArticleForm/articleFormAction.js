"use server";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import prisma from "@/app/lib/prisma";

/**
 * Adds an article to the database.
 * 
 * @param {Object} e - The event object containing the article details.
 * @param {string} e.brand - The brand of the article.
 * @param {string} e.name - The name of the article.
 * @param {string} e.size - The size of the article.
 * @param {number} e.quantity - The quantity of the article.
 * @param {number} e.price - The price of the article.
 * @returns {Promise<boolean>} - A promise that resolves to true if the article is added successfully, false otherwise.
 */
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
