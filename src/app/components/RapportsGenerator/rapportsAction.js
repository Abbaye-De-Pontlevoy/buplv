"use server";

import prisma from "@/app/lib/prisma";

export async function getRapportTreso() {
  const nbSeller = await prisma.seller.count();
  const nbArticle = await prisma.article.count();
  const transactions = await prisma.transaction.findMany();

  const gains = {};

  transactions.forEach((transaction) => {
    if(!gains[transaction.payment_method]) {
      gains[transaction.payment_method] = {
        nbTransaction: 0,
        amount: 0,
      };
    }
    gains[transaction.payment_method].nbTransaction += 1;
    gains[transaction.payment_method].amount += transaction.payment_amount;
  });

  return {
    nbSeller,
    nbArticle,
    gains
  };
}

export async function getRapportsIBAN() {
  const data = await prisma.seller.findMany();
  const rapportData = data.map((seller) => {
    return {
      Nom: seller.name,
      Prénom: seller.firstname,
      IBAN: seller.iban,
      BIC: seller.bic,
    };
  });

  return rapportData;
}

export async function getUnsoldArticlesToReturn() {
  const queryResult =
    await prisma.$queryRaw`SELECT public.get_unsold_to_return() as unsold_articles`;
  return queryResult[0].unsold_articles;
}
