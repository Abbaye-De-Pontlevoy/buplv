import logoutAction from "./logoutAction";

const LogoutButton = () => {
	return (
		<form action={logoutAction}>
			<button>Logout</button>
		</form>
	);
};

export default LogoutButton;