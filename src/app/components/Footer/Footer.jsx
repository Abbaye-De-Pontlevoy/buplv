"use server";

import Image from "next/image";
import logo_plv from "../../assets/logo_plv_reduced.webp";

import "./styles.css";

/**
 * Footer component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the footer.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = ({ className }) => {
    return (
        <footer className={className}>
            <div id="footerContent">
                <div className="footerColumn desktop-only" id="column1">
                    <a href="/">Accueil</a>
                    <a href="/dashboard">Tableau de bord</a>
                    <a href="/profil">Mon profil</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footerColumn" id="column2">
                    <Image id="plvImg" src={logo_plv} alt="Logo de l'abbaye de Pontlevoy" />
                    <h3 className="text-center self-center">BOURSE À L'UNIFORME</h3>
                </div>
                <div className="footerColumn phone-only" id="column1">
                    <a href="/">Accueil</a>
                    <a href="/dashboard">Tableau de bord</a>
                    <a href="/profil">Mon profil</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footerColumn flex-align-right text-right" id="column3">
                    <p>APEL de l'Abbaye de Pontlevoy</p>
                    <a href="/cgu">Conditions Générales</a>
                    <a href="https://github.com/Maclow42/" target="_blank">
                        Github : Maclow42
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
