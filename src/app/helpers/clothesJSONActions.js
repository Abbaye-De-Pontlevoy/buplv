"use server";

import prisma from "../lib/prisma";

export async function getClothesJSON() {
    const data = await prisma.config.findFirst({
        where: {
            key: "clothesJSON",
        },
        select: {
            value: true,
        },
    });

    return data.value;
}

/**
 * Retrieves all clothes information from the clothes JSON.
 * @returns {Promise<{brand: string[], name: string[], size: string[]}>} An object containing arrays of brands, names, and sizes.
 */
export async function getAllClothesInfo() {
    const clothesJSON = await getClothesJSON();

    let brand = new Set();
    let name = new Set();
    let size = new Set();

    for (let grade in clothesJSON) {
        for (let sex in clothesJSON[grade]) {
            for (let currentBrand in clothesJSON[grade][sex]) {
                brand.add(currentBrand);
                for (let currentName in clothesJSON[grade][sex][currentBrand]) {
                    name.add(currentName);
                    clothesJSON[grade][sex][currentBrand][
                        currentName
                    ].size.forEach((s) => size.add(s));
                }
            }
        }
    }

    // Convert sets to arrays and sort them
    let brandArray = Array.from(brand).sort();
    let nameArray = Array.from(name).sort();
    let sizeArray = Array.from(size).sort();

    return {
        brand: brandArray,
        name: nameArray,
        size: sizeArray,
    };
}

export async function updateClothesJSON(newClothesJSON) {
    try {
        await prisma.config.update({
            where: {
                key: "clothesJSON",
            },
            data: {
                value: newClothesJSON,
            },
        });

        console.log("Clothes JSON updated successfully.");
        return {
            success: true,
            message: "Clothes JSON updated successfully.",
        };

    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: "Error updating clothes JSON.",
        };
    }
}
