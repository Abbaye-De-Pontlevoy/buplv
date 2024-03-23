import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req) {
	const data = await req.json();

	try{
		const response = await prisma.article.create({
			data: {
				brand: data.brand,
				name: data.name,
				size: data.size,
				price: data.price,
			},
		});

		return NextResponse.json(response);
	}catch(error){
		console.error("Error parsing JSON:", error);
		return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
	}

}