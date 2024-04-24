"use server";

import prisma from "@/app/lib/prisma";
import { getSettings } from "@/app/config/settings";

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

  gains["Total"] = {
    nbTransaction: transactions.length,
    amount: transactions.reduce((acc, transaction) => acc + transaction.payment_amount, 0),
  };

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
      "Code Pays": seller.iban.substring(0, 2),
      IBAN: seller.iban,
      BIC: seller.bic,
      "Nom Liste": seller.name + " " + seller.firstname,
    };
  });

  return rapportData;
}

export async function getUnsoldArticlesToReturn() {
  const queryResult =
    await prisma.$queryRaw`SELECT public.get_unsold_to_return() as unsold_articles`;
  return queryResult[0].unsold_articles;
}

export async function getRapportSeller() {
  const settings = await getSettings();
  const queryResult =
    await prisma.$queryRaw`SELECT public.get_total_gain_per_seller(${settings.APELPart}) as total_gain_per_seller`;

  return queryResult[0].total_gain_per_seller;

}