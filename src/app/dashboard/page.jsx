"use client"

import { useEffect, useState } from "react";
import ArticleForm from "../components/Article/ArticleForm/ArticleForm";
import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import MenuButton from "../components/Button/MenuButton/MenuButton";
import { ArticleList } from "../components/Article/ArticleList/ArticleList";

import { revalidatePath } from "next/cache";

const Dashboard = () => {
	const [articleList, setArticleList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchArticleList = async () => {
			setIsLoading(true);
			await updateArticleList();
			setIsLoading(false);
		};
	
		fetchArticleList();
	}, []);
	

	const updateArticleList = async () => {
		const response = await fetch("/api/article/get-article-list/");
		const data = await response.json();
		setArticleList(data.articles);
	}

	return (
		<>
			<h1>Dashboard</h1>
			<h2>Liste des articles enregistrés</h2>
			{isLoading?
				"Chargement..."
			: 
				<>
					<ArticleList
						articleJSON={articleList}
						callAfterSubmit={updateArticleList}
					/>

					<h2>Ajouter un article</h2>

					<ArticleForm 
						callAfterSubmit={updateArticleList}
					/>
				</>
			}

			<h2>Actions</h2>
			<LogoutButton />
			<MenuButton />
		</>
	);
};

export default Dashboard;
