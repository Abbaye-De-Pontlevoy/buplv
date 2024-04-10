"use client";

import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";

import "./styles.css";
import SettingsForm from "../components/SettingsForm/SettingsForm";

const SiteSettings = () => {
  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/site-settings" hasAdminCookie={true} />
      <div className="bandeau-rangement">
        <div className="mainContainer" id="settingsContainer">
          <SettingsForm />
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
