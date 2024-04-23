"use client";

import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../config/settings";

import "./styles.css";

const SettingsForm = () => {
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
    <form onSubmit={handleSubmit}>
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
                  value={formState.closureDate || new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </span>
            </label>
          )}

          <button id="SubmitSettingsChanges" type="submit">Enregistrer</button>
        </>
      )}
    </form>
  );
};

export default SettingsForm;
