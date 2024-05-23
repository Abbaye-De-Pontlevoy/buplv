"use server";

import prisma from "@/app/lib/prisma";

// Function to cancel the sale of an article
/**
 * Cancels the sale of an article and performs a refund transaction.
 * 
 * @param {number} articleID - The ID of the article to cancel the sale for.
 * @param {number} price - The price of the article.
 * @returns {Promise<{ success: boolean, msg: string }>} - A promise that resolves to an object indicating the success status and a message.
 */
export const cancelArticleSell = async (articleID, price) => {
  try {
    // Create a transaction representing the refund
    await prisma.transaction.create({
      data: {
        payment_method: "remboursement",
        payment_amount: -1 * parseInt(price),
      },
    });

    // Update the article state to inventoried
    await prisma.article.update({
      where: {
        id: parseInt(articleID),
      },
      data: {
        state: 2,
      },
    });
  } catch (e) {
    return {
      success: false,
      msg: e,
    };
  }

  return { success: true, msg: "Article remboursé." };
};

// Function to update an article field
export const updateArticleField = async (articleID, field, value) => {
  try {
    await prisma.article.update({
      where: {
        id: parseInt(articleID),
      },
      data: {
        [field]: value,
      },
    });
  } catch (e) {
    return {
      success: false,
      msg: e,
    };
  }

  return { success: true, msg: "Article mis à jour." };
};

// Function to get the state of an article
export const getArticleState = async (articleID) => {
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(articleID),
    },
  });

  if (!article) return null;

  return article.state;
};
