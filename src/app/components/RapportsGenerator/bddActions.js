"use server";

import prisma from "@/app/lib/prisma";

// Function to export the list of sellers
/**
 * Export sellers with desired fields.
 * @returns {Array} Array of sellers with formatted data.
 */
export async function exportSellers() {
  // get the list of sellers with disired fields
  const result = await prisma.seller.findMany({
    select: {
      id: true,
      name: true,
      firstname: true,
      email: true,
      phone: true,
      address: true,
      iban: true,
      bic: true,
      return_articles: true,
      articles: {
        select: {
          id: true,
        },
      },
    },
  });

  // rename the fields and format the data
  const sellers = result.map((seller) => {
    return {
      "ID Vendeur": seller.id,
      Nom: seller.name + " " + seller.firstname,
      Email: seller.email,
      "N° de téléphone": seller.phone,
      Adresse: seller.address,
      IBAN: seller.iban,
      BIC: seller.bic,
      "Don des invendus": seller.return_articles ? "Non" : "Oui",
      "ID des articles": seller.articles.map((article) => article.id),
    };
  });

  return sellers;
}

// Function to export the list of articles
export async function exportArticles() {
  // get the list of articles with disired fields
  const result = await prisma.article.findMany({
    select: {
      id: true,
      name: true,
      brand: true,
      price: true,
      state: true,
      seller: {
        select: {
          id: true,
        },
      },
    },
  });

  // rename the fields and format the data
  const articles = result.map((article) => {
    return {
      "ID Article": article.id,
      Article: article.name,
      Marque: article.brand,
      Prix: article.price + " €",
      Status:
        article.state === -1
          ? "Invendable"
          : article.state === 0
          ? "Supprimé"
          : article.state === 1
          ? "Enregistré"
          : article.state === 2
          ? "Inventorié"
          : "Vendu",
      "ID Vendeur": article.seller.id,
    };
  });

  return articles;
}
