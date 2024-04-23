"use client";

import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../config/settings";

import "./styles.css";

const SettingsForm = () => {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const settingsData = await getSettings();
      settingsData.APELPart *= 100;
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
        endRegisterDate: null,
        publicAccess: newValue,
      }));
    } else if (name === "allowArticleRegistration" && !newValue) {
      setFormState((prevState) => ({
        ...prevState,
        endRegisterDate: null,
        allowArticleRegistration: newValue,
      }));
    } else {
      let updatedValue = newValue;
      if (name === "endRegisterDate" && new Date(newValue) < new Date()) {
        updatedValue = new Date().toISOString().split("T")[0]; // Date du jour au format YYYY-MM-DD
      }
      setFormState((prevState) => ({
        ...prevState,
        [name]: updatedValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.APELPart = formState.APELPart / 100;
    console.log(formState);
    await updateSettings(formState);
    formState.APELPart *= 100;
    alert("Paramètres enregistrés avec succès!");
  };

  return (
    <form onSubmit={handleSubmit} id="paramForm">
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div id="paramDiv">
          <div>
            <h3>Paramètres Généraux</h3>
            <span>
              <label>Site ouvert</label>
              <input
                type="checkbox"
                name="publicAccess"
                checked={formState.publicAccess}
                onChange={handleChange}
              />
            </span>

            {formState.publicAccess && (
              <span>
                <label>Autoriser l'ajout/modification d'articles</label>
                <input
                  type="checkbox"
                  name="allowArticleRegistration"
                  checked={formState.allowArticleRegistration}
                  onChange={handleChange}
                />
              </span>
            )}
            {formState.allowArticleRegistration && (
              <span>
                <label>Fin des enregistrements</label>
                <input
                  type="date"
                  name="endRegisterDate"
                  value={
                    formState.endRegisterDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                />
              </span>
            )}
          </div>

          <div>
            <h3>Comptabilité</h3>
            <span>
              <label>Part de l'APEL</label>
              <span style={{ width: "min-content" }}>
                <input
                  type="number"
                  name="APELPart"
                  value={formState.APELPart}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  style={{ textAlign: "right", maxWidth: "100px" }}
                />
                %
              </span>
            </span>
          </div>

          <button id="SubmitSettingsChanges" type="submit" disabled={isLoading}>
            Enregistrer
          </button>
        </div>
      )}
    </form>
  );
};

export default SettingsForm;
