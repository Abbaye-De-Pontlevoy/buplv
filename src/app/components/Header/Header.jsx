import Image from "next/image";
import logo_plv from "../../assets/logo_plv_reduced.webp";
import AccountButton from "../Button/AccountButton/AccountButton";

import "./styles.css";

// Header component
const Header = ({displayAccountButton = true}) => {
  return (
    <div className="header">
      { displayAccountButton && <AccountButton className="accountButton"/>}
      <a href="/" className="title">
        <div id="logoDiv">
          {/* Logo image */}
          <Image src={logo_plv} alt="logo" id="plvlogo" priority={true} />
        </div>
        {/* Title */}
        <h1>BOURSE À L'UNIFORME</h1>
      </a>
    </div>
  );
};

export default Header;
