"use server";

import prisma from "@/app/lib/prisma";

export const setArticleAsInventoried = async (articleID) => {
  // get the article from the database
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(articleID),
    },
  });

	// if it state is 0 (not inventoried) set it to 1 (inventoried)
	if (article.state === 0) {
		await prisma.article.update({
			where: {
				id: parseInt(articleID),
			},
			data: {
				state: 1,
			},
		});
	}
};
