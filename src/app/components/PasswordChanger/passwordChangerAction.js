"use server";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export default async function changePassword(formData) {
    // Get the data off the form
    const { password, modifiedAccount } = formData;

	// get the user ID from the headers
	const { connected, admin, id } = await getConnexionInfo();
	let userID = id;

	if (!connected) {
		return {
			success: false,
			message: "User not connected. Please log in as an admin.",
		};
	}
	if (!admin) {
		return {
			success: false,
			message: "User not an admin. Please log in as an admin.",
		};
	}

	// at this point, the user is connected and is an admin
	if(!modifiedAccount || (modifiedAccount !== "admin" && modifiedAccount !== "benevole")) {
		return {
			success: false,
			message: "Please select an account to modify.",
		};
	}

	if(modifiedAccount === "benevole"){
		// get all benevoles
		const benevoles = await prisma.seller.findMany({
			where: {
				benevole: true,
			},
			select: {
				id: true,
			},
		});

		// if more than one benevole, return error (admin is benevole too so there should be two benevole accounts)
		if(benevoles.length > 2){
			return {
				success: false,
				message: "More than one benevole found. Please contact the developer.",
			};
		}

		// get the benevole ID
		userID = benevoles[0].id;
	}

	// at this point, the user is connected, is an admin, and the account to modify is selected

    try {
        // Hash the password
        const hash = bcrypt.hashSync(password, 8);

        // Update seller password in db
        await prisma.seller.update({
            where: {
                id: userID,
            },
            data: {
                password: hash,
            },
        });

		console.log("User " + userID + ": password changed successfully.");

        return {
            success: true,
            message: "Mot de passe modifié avec succès.",
        };

    } catch (e) {
        console.log(e);
        return {
			success: false,
			message: "User " + userID + ": Erreur lors de la modification du mot de passe.",
		};
    }
}
