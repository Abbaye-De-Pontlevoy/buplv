import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

const getRandomId = () => {
	return Math.floor(Math.random() * (999999999 - 1000000 + 1)) + 1000000;
};
  
const addEntryWithRandomId = async (data) => {
	let randomId = getRandomId();
	// Vérifiez si l'ID est déjà utilisé dans votre table
	while (await prisma.maTable.findUnique({ where: { id: randomId } })) {
	  randomId = getRandomId();
	}
	// Une fois qu'un ID unique est généré, ajoutez l'entrée dans la table
	const entry = await prisma.maTable.create({
	  data: {
		id: randomId,
		...data,
	  },
	});
	return entry;
};
  

export async function POST(req) {
	const data = await req.json();

	try{

		const response = await prisma.sellingProduct.create({
			data: {
				seller_id: data.seller_id,
				article_id: data.article_id,
				quantity: data.quantity,
				price: data.price
			},
		});

		return NextResponse.json(response);
	}catch(error){
		console.error("Error parsing JSON:", error);
		return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
	}

}