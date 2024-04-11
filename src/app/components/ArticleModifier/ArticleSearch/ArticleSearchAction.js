"use server";

import prisma from "@/app/lib/prisma";

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
      state: true
    },
  });

  return article;
};
