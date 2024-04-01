import logoutAction from "./logoutAction";

const LogoutButton = () => {
	return (
		<form action={logoutAction}>
			<button>Déconnexion</button>
		</form>
	);
};

export default LogoutButton;