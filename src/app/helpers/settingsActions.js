"use server";

import prisma from "../lib/prisma";

export const getSettings = async () => {
    const settingsJSON = await prisma.config.findFirst({
        where: {
            key: "settings",
        },
        select: {
            value: true,
        },
    });

    const verifiedSettings = await verifySettings(settingsJSON.value);

    // check if all keys and values are identical
    for(let key in settingsJSON.value){
        if(settingsJSON.value[key] !== verifiedSettings[key]){
            // if a key is different, update the settings
            updateSettings(verifiedSettings);
        }
    }

    return verifiedSettings;
};

export const updateSettings = async (newSettings) => {
    try {
        newSettings = await verifySettings(newSettings);

        await prisma.config.update({
            where: {
                key: "settings",
            },
            data: {
                value: newSettings,
            },
        });

        return { success: true, msg: "Les paramètres ont été mis à jour." };
    } catch (e) {
        console.error(e);
        return {
            success: false,
            msg: "Erreur lors de la mise à jour des paramètres.",
        };
    }
};

export const verifySettings = async (settingsJSON) => {
    // verify if public access is allowed
    if (!settingsJSON.publicAccess)
        settingsJSON.allowArticleRegistration = false;

    // Verify if the register is closed
    const endRegisterDate = new Date(settingsJSON.endRegisterDate);
    if (Date.now() >= endRegisterDate) {
        settingsJSON.allowArticleRegistration = false;
    }

    return settingsJSON;
};
