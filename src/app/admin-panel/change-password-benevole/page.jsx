import Header from "@/app/components/Header/Header";
import PasswordChanger from "@/app/components/PasswordChanger/PasswordChanger";

import "./styles.css";

const ChangePasswordPage = () => {
    return (
        <div>
            <Header displayAccountButton={false} />
            <div id="registerContainer">
                <div className="formContainer">
                    <h1>Modification du mot de passe Bénévole</h1>
                    <PasswordChanger modifiedAccount="benevole" />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
