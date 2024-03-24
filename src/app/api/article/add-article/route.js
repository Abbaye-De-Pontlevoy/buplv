import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getUserID } from "@/app/helpers/getUserID";

export async function POST(req) {
  const data = await req.json();

  try {
    const userID = await getUserID();
    const response = await prisma.article.create({
      data: {
        seller_id: userID,
        name: data.name,
        brand: data.brand,
        size: data.size,
        price: data.price,
        state: 0,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}
