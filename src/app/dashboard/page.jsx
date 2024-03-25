"use client"

import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import MenuButton from "../components/Button/MenuButton/MenuButton";

const Dashboard = () => {
	return (
		<>
			<h1>Dashboard</h1>

			<h2>Liste des articles enregistrés</h2>
			<ArticleGestionnary/>

			<h2>Actions</h2>
			<LogoutButton />
			<MenuButton />
		</>
	);
};

export default Dashboard;
