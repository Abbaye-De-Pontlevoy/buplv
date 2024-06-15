"use server"

import { isUserAdmin } from "./isUserAdmin";
import prisma from "../lib/prisma";

// Function to get the list of sellers
export async function getSellerList(request) {

	// Refuse request if the user is not an admin
	const admin = isUserAdmin(request);
	if (!admin) return [];

    const data = await prisma.seller.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            firstname: true,
        },
    });

    return data.map((seller) => {
        return {
            id: seller.id,
            email: seller.email,
            name: seller.name + " " + seller.firstname,
        };
    });
}
