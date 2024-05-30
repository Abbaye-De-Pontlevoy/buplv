"use server";

import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

import "./styles.css";

/**
 * ContactPage component represents the page for contacting the website.
 * It displays the contact information and a form to send messages.
 *
 * @returns {JSX.Element} The ContactPage component.
 */
const ContactPage = () => {
    return (
        <>
            <Header />
            <Menu current="/contact" />

            <div className="bandeau-rangement">
                <div className="main-container">
                    <h1 className="width-full text-center margin-top-20 margin-bottom-20">
                        Page de contact
                    </h1>
                    <p>
                        En cas de nécessité, vous pouvez nous contacter à
                        l'email suivant :{" "}
                        <a href="mailto:apel@lplcp.fr" target="_blank">apel@lplcp.fr</a>.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
