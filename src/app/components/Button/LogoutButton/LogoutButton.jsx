import { useContext } from "react";
import removeCookie from "./logoutAction";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";
import { useRouter } from "next/navigation";

const LogoutButton = ({className}) => {
    const router = useRouter();
    const { logout } = useContext(UserInfoContext);

    // Function to handle the logout
    const logoutHandler = async (e) => {
        e.preventDefault();

        // Remove the cookie and update logout state in the context
        await removeCookie();
        await logout();

        // Redirect to the home page
        router.push("/");
    };

    return (
        <form className={className} onSubmit={logoutHandler}>
            <button>Déconnexion</button>
        </form>
    );
};

export default LogoutButton;
