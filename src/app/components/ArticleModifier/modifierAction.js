"use server";

import prisma from "@/app/lib/prisma";

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
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
