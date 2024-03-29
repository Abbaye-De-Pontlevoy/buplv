"use server";

import prisma from "@/app/lib/prisma";

export default async function removeArticleAction({ id }) {
  await prisma.article.delete({
    where: {
      id: id,
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
    },
  });

  return articles;
}
