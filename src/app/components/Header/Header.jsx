import Image from "next/image";
import logo_plv from "../../assets/logo_plv_reduced.webp";
import AccountButton from "../Button/AccountButton/AccountButton";

import "./styles.css";

const Header = ({hasConnectedToken, displayAccountButton, displayMenu}) => {
  return (
    <div className="header">
      { displayAccountButton && <AccountButton className="accountButton" hasConnectedToken={hasConnectedToken}/>}
      <a href="/" className="title">
        <div id="logoDiv">
          <Image src={logo_plv} alt="logo" id="plvlogo" priority />
        </div>
        <h1>BOURSE À L'UNIFORME</h1>
      </a>
    </div>
  );
};

export default Header;
