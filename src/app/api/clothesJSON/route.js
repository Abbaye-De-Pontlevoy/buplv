import { NextResponse } from "next/server";
import { clothesJSON } from "@/app/data/clothesJSON";

export async function GET(request) {
	return NextResponse.json(clothesJSON);
}