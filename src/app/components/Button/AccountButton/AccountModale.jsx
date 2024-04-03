

import logoutAction from "../LogoutButton/logoutAction";
import "./styles.css";

const AccountModale = () => {
  return (
    <div className="profileModal">
      <a href="/profil">Mon Compte</a>
      <form action={logoutAction}>
        <button id="logoutButton" type="submit">
          Déconnexion
        </button>
      </form>
    </div>
  );
};

export default AccountModale;
