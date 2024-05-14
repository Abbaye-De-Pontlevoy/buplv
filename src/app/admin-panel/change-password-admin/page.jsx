import Header from "@/app/components/Header/Header";
import PasswordChanger from "@/app/components/PasswordChanger/PasswordChanger";

import "./styles.css";

const ChangePasswordPage = () => {
    return (
        <div>
            <Header displayAccountButton={false} />
            <div id="registerContainer">
                <div className="formContainer">
                    <h1>Modification du mot de passe Adminitrateur</h1>
                    <PasswordChanger modifiedAccount="admin" />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
