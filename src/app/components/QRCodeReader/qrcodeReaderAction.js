"use server";

import prisma from "../../lib/prisma";

export const getArticleState = async (articleID) => {
  // get the article from the database
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(articleID),
    },
  });

  return article.state;
};

export const updateArticleField = async (articleID, field, value) => {
  // update the article in the database
  await prisma.article.update({
    where: {
      id: parseInt(articleID),
    },
    data: {
      [field]: value,
    },
  });
};
