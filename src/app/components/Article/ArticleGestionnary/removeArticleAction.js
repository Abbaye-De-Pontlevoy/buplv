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

  return articles;
}
