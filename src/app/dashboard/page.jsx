import logoutAction from "./logoutAction";

const Dashboard = () => {

	return (
		<div>
			<h1>Dashboard</h1>
			<ul>
				<li><a>Ajouter des vêtements</a></li>
				<li><a>Modifier des vêtements</a></li>
			</ul>

			<a href="/">Menu principal</a>
			
			<form action={logoutAction}>
				<button type="submit">Logout</button>
			</form>
		</div>
	);
};

export default Dashboard;
