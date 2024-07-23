"use server";

import prisma from "@/app/lib/prisma";

// Function to remove an article from the database
export default async function removeArticleAction({ id }) {
  await prisma.article.update({
    where: {
      id: id,
    },
    data: {
      state: 0,
    },
  });
}

// Function to get the list of articles for a given user
/**
 * Retrieves a list of articles for a given user ID.
 * @param {string} userID - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of articles.
 */
export async function getArticleList(userID) {
  if (!userID) return [];

  const articles = await prisma.article.findMany({
    where: {
      seller_id: userID,
      state: {
        not: 0,
      },
    },
  });

  // sort articles by id
  articles.sort((a, b) => a.id - b.id);

  return articles;
}
