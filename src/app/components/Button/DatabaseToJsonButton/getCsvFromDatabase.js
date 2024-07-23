"use server";

import prisma from "@/app/lib/prisma";
import { Parser } from "json2csv";

export const getCsvFromDatabase = async () => {
    const articles = await prisma.article.findMany();
    const sellers = await prisma.seller.findMany();
    const transactions = await prisma.transaction.findMany();
    const config = await prisma.config.findMany();

    // Fonction pour convertir JSON en CSV
    const jsonToCsv = (data) => {
        const json2csvParser = new Parser();
        return json2csvParser.parse(data);
    };

    // Convertir chaque table en CSV
    const articlesCsv = jsonToCsv(articles);
    const sellersCsv = jsonToCsv(sellers);
    const transactionsCsv = jsonToCsv(transactions);
    const configCsv = jsonToCsv(config);

    return [
        { tableName: "articles", csv: articlesCsv },
        { tableName: "sellers", csv: sellersCsv },
        { tableName: "transactions", csv: transactionsCsv },
        { tableName: "config", csv: configCsv },
    ];
};
