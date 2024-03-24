"use server"

import prisma from "@/app/lib/prisma";

export default async function removeArticleAction({id}){
	await prisma.sellingProduct.delete({
		where: {
			id: id
		}
	});
}