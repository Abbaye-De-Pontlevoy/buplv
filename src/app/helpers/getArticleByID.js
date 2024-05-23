"use server";

import prisma from "@/app/lib/prisma";

/**
 * Retrieves an article by its ID from the database.
 * @param {number} ID - The ID of the article to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved article object.
 */
export const getArticleByID = async (ID) => {
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(ID),
    },
    select: {
      id: true,
      brand: true,
      name: true,
      size: true,
      price: true,
      state: true
    },
  });

  return article;
};
