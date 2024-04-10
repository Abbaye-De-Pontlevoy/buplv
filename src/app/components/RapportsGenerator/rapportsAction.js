"use server";

import prisma from "@/app/lib/prisma";

export async function getRapportsIBAN() {
	const data = await prisma.seller.findMany();
	const rapportData = data.map((seller) => {
		return {
			"Nom": seller.name,
			"Prénom": seller.firstname,
			"IBAN": seller.iban,
			"BIC": seller.bic,
		};
	});
	
	return rapportData;
};