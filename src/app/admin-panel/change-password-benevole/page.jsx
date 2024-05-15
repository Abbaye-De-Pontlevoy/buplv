import Header from "@/app/components/Header/Header";
import PasswordChanger from "@/app/components/PasswordChanger/PasswordChanger";
import ReturnArrowButton from "@/app/components/Button/ReturnArrowButton/returnArrowButton";

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
            <ReturnArrowButton className="marginTop-10px" text="Retour aux paramètres" link="/admin-panel"/>
        </div>
    );
};

export default ChangePasswordPage;
