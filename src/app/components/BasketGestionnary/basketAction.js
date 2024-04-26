"use server"

import prisma from "@/app/lib/prisma"

// Function to get the list of articles with its ID
export const getArticleData = async (productId) => {
	const article = await prisma.article.findUnique({
		where: {
			id: parseInt(productId)
		},
	});

	return article;
}

// Function to validate selling of articles
export const validateBasket = async (basket, paymentMethod) => {
	let transaction = null;

	try{
		// create a transaction representing the sale
		transaction = await prisma.transaction.create({
			data: {
				payment_method: paymentMethod,
				payment_amount: basket.reduce((acc, article) => acc + article.price, 0),
			}
		});

		// set state of all article in basket to 3 (sold)
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

		// if an error occurs and a transaction was created, delete it
		if(transaction){
			await prisma.transaction.delete({
				where: {
					id: transaction.id
				}
			});
		}

		return {
			success: false,
			msg: e
		};
	}

	return {
		success: true,
		msg: "Vente validée."
	};

}