import Header from "@/app/components/Header/Header";
import PasswordChanger from "@/app/components/PasswordChanger/PasswordChanger";
import ReturnArrowButton from "@/app/components/Button/returnArrowButton/ReturnArrowButton";

import "./styles.css";

const ChangePasswordPage = () => {
    return (
        <div>
            <Header displayAccountButton={false} />
            <div id="registerContainer">
                <div className="form-container">
                    <h1>Modification du mot de passe Adminitrateur</h1>
                    <PasswordChanger modifiedAccount="admin" />
                </div>
            </div>
            <ReturnArrowButton className="marginTop-10px" text="Retour aux paramètres" link="/admin-panel"/>
        </div>
    );
};

export default ChangePasswordPage;
