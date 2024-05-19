"use server";

import prisma from "@/app/lib/prisma";
import { getSettings } from "@/app/helpers/settingsActions";

// Function to get the basic data for the treso report
export async function getRapportTreso() {
  // Get the number of sellers
  const nbSeller = await prisma.seller.count();
  // Get the number of articles
  const nbArticle = await prisma.article.count();
  // Get the list of transactions
  const transactions = await prisma.transaction.findMany();

  // Create an object to store the gains
  // The object will have the payment method as key
  // and the number of transactions and the total amount as values
  const gains = {};

  // Loop through the transactions to calculate the gains
  transactions.forEach((transaction) => {
    // If the payment method is not in the object, add it
    if(!gains[transaction.payment_method]) {
      gains[transaction.payment_method] = {
        nbTransaction: 0,
        amount: 0,
      };
    }
    // Increment the number of transactions and the total amount
    gains[transaction.payment_method].nbTransaction += 1;
    gains[transaction.payment_method].amount += transaction.payment_amount;
  });

  // Add the total number of transactions and the total amount
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


// Function to get datas for the rapport IBAN
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

// Function to get unsold articles which are asked to be returned
export async function getUnsoldArticlesToReturn() {
  const queryResult =
    await prisma.$queryRaw`SELECT public.get_unsold_to_return() as unsold_articles`;
  if(!queryResult[0].unsold_articles){
    return [{
      "ID Vendeur": "Aucun article à retourner",
      "Nom": "",
      "ID Article": "",
      "Article": "",
    }];
  }
  return queryResult[0].unsold_articles;
}

// Function to get gains per seller
export async function getRapportSeller() {
  const settings = await getSettings();
  const queryResult =
    await prisma.$queryRaw`SELECT public.get_total_gain_per_seller(${settings.APELPart}, ${settings.returnFees}) as total_gain_per_seller`;

  // Cannot be empty because of the admin and the benevole

  return queryResult[0].total_gain_per_seller;
}