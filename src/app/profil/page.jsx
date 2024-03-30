import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import Menu from "../components/Menu/Menu";

const ProfilePage = () => {
  return (
    <>
      <Menu current="/profil" />
      <h1>Profile Page</h1>
			<LogoutButton />
    </>
  );
};

export default ProfilePage;
