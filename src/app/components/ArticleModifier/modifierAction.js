"use server";

import prisma from "@/app/lib/prisma";

// Function to update an article in the database
/**
 * Updates an article in the database.
 * @param {Object} data - The data object containing the article information.
 * @param {number} data.id - The ID of the article to be updated.
 * @param {string} data.brand - The brand of the article.
 * @param {string} data.name - The name of the article.
 * @param {string} data.size - The size of the article.
 * @param {number} data.state - The state of the article.
 * @returns {Promise<boolean>} - A promise that resolves to true if the article is updated successfully, or false if an error occurs.
 */
export const updateArticle = async (data) => {
  try {
    const article = await prisma.article.update({
      where: {
        id: data.id,
      },
      data: {
        brand: data.brand,
        name: data.name,
        size: data.size,
        state: parseInt(data.state),
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
