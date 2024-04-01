import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import Menu from "../components/Menu/Menu";

import "./styles.css";

const ProfilePage = () => {
  return (
    <>
      <Menu current="/profil" />

      <div className="bandeau-rangement">
        <div className="mainContainer">
          <h1>Mon profil</h1>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
