"use client";

import React, { useEffect, useState } from "react";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import { getSettings, updateSettings } from "../config/settings";

import "./styles.css";

const SiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const settingsData = await getSettings();
      setSettings(settingsData);
      setFormState(settingsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "publicAccess" && !newValue) {
      setFormState((prevState) => ({
        ...prevState,
        allowArticleRegistration: false,
        publicAccess: newValue,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateSettings(formState);
    alert("Paramètres enregistrés avec succès!");
  };

  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/site-settings" hasAdminCookie={true} />
      <div className="bandeau-rangement">
        <div className="mainContainer" id="settingsContainer">
          <form onSubmit={handleSubmit}>
            <h1 className="formTitle">Paramètres du site</h1>
            {isLoading ? (
              <p>Chargement...</p>
            ) : (
              <>
                <label>
                  <span>
                    Site ouvert
                    <input
                      type="checkbox"
                      name="publicAccess"
                      checked={formState.publicAccess}
                      onChange={handleChange}
                    />
                  </span>
                </label>

                {formState.publicAccess && (
                  <label>
                    <span>
                      Autoriser l'ajout/modification d'articles
                      <input
                        type="checkbox"
                        name="allowArticleRegistration"
                        checked={formState.allowArticleRegistration}
                        onChange={handleChange}
                      />
                    </span>
                  </label>
                )}
                {formState.allowArticleRegistration && (
                  <label>
                    <span>
                      Fin des enregistrements
                      <input
                        type="date"
                        name="closureDate"
                        value={formState.closureDate || ""}
                        onChange={handleChange}
                      />
                    </span>
                  </label>
                )}

                <button type="submit">Enregistrer</button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
