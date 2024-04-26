"use server";

import Image from "next/image";
import logo_plv from "../../assets/logo_plv_reduced.webp";

import "./styles.css";

const Footer = () => {
  return (
    <footer>
      <div id="footerContent">
        <div className="footerColumn desktopOnly" id="column1">
          <a href="/">Accueil</a>
          <a href="/dashboard">Tableau de bord</a>
          <a href="/profil">Mon profil</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footerColumn" id="column2">
          <Image src={logo_plv} alt="Logo de l'abbaye de Pontlevoy" />
          <h3>BOURSE À L'UNIFORME</h3>
        </div>
        <div className="footerColumn phoneOnly" id="column1">
          <a href="/">Accueil</a>
          <a href="/dashboard">Tableau de bord</a>
          <a href="/profil">Mon profil</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footerColumn" id="column3">
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
