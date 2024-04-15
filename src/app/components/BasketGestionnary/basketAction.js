"use server"

import prisma from "@/app/lib/prisma"

export const getArticleData = async (productId) => {
	const article = await prisma.article.findUnique({
		where: {
			id: parseInt(productId)
		},
	});

	return article;
}

export const validateBasket = async (basket, paymentMethod) => {
	let transaction = null;

	try{
		transaction = await prisma.transaction.create({
			data: {
				payment_method: paymentMethod,
				payment_amount: basket.reduce((acc, article) => acc + article.price, 0),
			}
		});

		// set state of all article in basket to 2
		const articleIds = basket.map((article) => article.id);
		const articles = await prisma.article.updateMany({
			where: {
				id: {
					in: articleIds
				}
			},
			data: {
				state: 3
			}
		});
	}
	catch(e){
		console.error(e);
		if(transaction){
			await prisma.transaction.delete({
				where: {
					id: transaction.id
				}
			});
		}
	}

}