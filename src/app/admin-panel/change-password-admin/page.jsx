import Header from "@/app/components/Header/Header";
import PasswordChanger from "@/app/components/PasswordChanger/PasswordChanger";
import ReturnArrowButton from "@/app/components/Button/returnArrowButton/ReturnArrowButton";

const ChangePasswordPage = () => {
    return (
        <>
            <Header displayAccountButton={false} />

            <div className="flex-column flex-center margin-bottom-50 max-width-90p">
                <div className="form-container">
                    <h1 className="margin-bottom-20">
                        Modification du mot de passe Adminitrateur
                    </h1>
                    <PasswordChanger modifiedAccount="admin" className="width-full"/>
                </div>

                <ReturnArrowButton
                    className="margin-top-10 self-left"
                    text="Retour aux paramètres"
                    link="/admin-panel"
                />
            </div>
        </>
    );
};

export default ChangePasswordPage;
