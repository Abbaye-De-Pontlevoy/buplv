import { useContext } from "react";
import removeCookie from "./logoutAction";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();
	const { refresh } = useContext(UserInfoContext);

	const logoutHandler = async (e) => {
		e.preventDefault();
		await removeCookie();
		await refresh();
		router.push('/');
	}

	return (
		<form onSubmit={logoutHandler}>
			<button>Déconnexion</button>
		</form>
	);
};

export default LogoutButton;