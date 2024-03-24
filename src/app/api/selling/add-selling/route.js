import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getUserID } from "@/app/helpers/getUserID";

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
		const userID = await getUserID();
		const response = await prisma.sellingProduct.create({
			data: {
				seller_id: userID,
				name: data.name,
				brand: data.brand,
				size: data.size,
				price: data.price
			},
		});

		return NextResponse.json(response);
	}catch(error){
		console.error("Error parsing JSON:", error);
		return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
	}

}