"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Dashboard = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);		
	}, []);



	return (
		<div>
			<h1>Dashboard</h1>
			<ul>
				<li><a>Ajouter des vêtements</a></li>
				<li><a>Modifier des vêtements</a></li>
			</ul>

			<a href="/">Menu principal</a>
			<a href="/" onClick={() => {Cookies.remove('buConnectedToken')}}>Logout</a>
		</div>
	);
};

export default Dashboard;
