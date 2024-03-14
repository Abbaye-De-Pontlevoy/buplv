import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { parse, SignJWT } from "jose";


import { redirect } from 'next/navigation'

const prisma = new PrismaClient();

const key = new TextEncoder().encode(process.env.SECRET_KEY); // Convertir la clé en tableau d'octets (Uint8Array)

export async function POST(req) {
    const data = await req.json();

    try {
        const response = await prisma.seller.findFirst({
            where: {
                email: data.email,
                password: data.password,
            },
        });

        if (response === null)
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });

        // Création du token JWT contenant uniquement l'ID de l'utilisateur
        const jwt = await new SignJWT({ sub: response.id }) // Utilisez l'ID de l'utilisateur comme subject (sub) du token
            .setProtectedHeader({ alg: "HS256" }) // Algorithme de signature
            .sign(key); // Clé secrète pour la signature

        return NextResponse.json({ token: jwt });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }
}
