"use server";

import prisma from "@/app/lib/prisma";

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

export async function getArticleList(userID) {

  if (!userID) {
    return;
  }

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
