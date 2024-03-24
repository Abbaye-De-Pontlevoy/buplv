"use client"

import { useEffect, useState } from "react";
import ArticleForm from "../components/Article/ArticleForm";
import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import MenuButton from "../components/Button/MenuButton/MenuButton";

const Dashboard = () => {
	const [articleList, setArticleList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/api/selling/get-selling-list/");
			const data = await response.json();
			setArticleList(data.sellingProducts);
			console.log(data.sellingProducts);
		};
		fetchData();
	}, []);


	return (
		<>
			<h1>Dashboard</h1>
			<h2>Liste des articles enregistrés</h2>
			<ul>
				{Object.keys(articleList).map((index) => (
					<li key={articleList[index].id}>
						{articleList[index].name} - {articleList[index].brand} - {articleList[index].size}
					</li>
				))}
			</ul>

			<h2>Ajouter un article</h2>
			<ArticleForm />

			<h2>Actions</h2>
			<LogoutButton />
			<MenuButton />
		</>
	);
};

export default Dashboard;
