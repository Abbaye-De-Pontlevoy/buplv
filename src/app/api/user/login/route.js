import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { parse, SignJWT } from "jose";
import prisma from '@/prisma/client';

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

        if (response === null){
            console.error("Invalid email or password");
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        // Création du token JWT contenant uniquement l'ID de l'utilisateur
        const jwt = await new SignJWT({ email: response.email })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("10 sec from now")
                    .sign(key);

        return NextResponse.json({ token: jwt });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 440 });
    }
}
