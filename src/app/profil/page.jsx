"use client";

import { useEffect, useRef, useState } from "react";
import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import Menu from "../components/Menu/Menu";
import { getUserInfos } from "../helpers/getUserInfos";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter/PasswordStrengthMeter";
import updateAction from "./updateAction";

import "./styles.css";
import isValidPhoneNumber from "../helpers/validatePhoneNumber";
import areIBANandBICcorrects from "../helpers/areIBANandBICcorrects";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password2: "",
    iban: "",
    bic: "",
    return_articles: false,
  });
  const [editingMode, setEditingMode] = useState(false);

  const formRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const user = await getUserInfos();
      setUserInfo({
        firstname: user.firstname,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: "",
        password2: "",
        iban: user.iban,
        bic: user.bic,
        return_articles: user.return_articles,
      });

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase().replace(/\s/g, "");
    if (name === "phone") value = formatPhoneNumber(value);
    setUserInfo({ ...userInfo, [name]: value });

    formRef.current
      .querySelector('input[name="password"]')
      .setCustomValidity("");
    formRef.current
      .querySelector('input[name="password2"]')
      .setCustomValidity("");
    formRef.current.querySelector('input[name="phone"]').setCustomValidity("");

    formRef.current.querySelector('input[name="iban"]').setCustomValidity("");
    formRef.current.querySelector('input[name="bic"]').setCustomValidity("");

    setError("");
  };

  const handleValidateForm = async (e) => {
    e.preventDefault();

    setIsUpdating(true);

    try {
      const passwordInput = formRef.current.querySelector(
        'input[name="password"]'
      );

      if (passwordInput.value.length > 0) {
        const password2Input = formRef.current.querySelector(
          'input[name="password2"]'
        );

        const passwordStrengthComponent = formRef.current.querySelector(
          ".password-strength-meter .progress"
        );
        const passwordStrength = parseInt(passwordStrengthComponent.value);

        passwordInput.setCustomValidity("");
        password2Input.setCustomValidity("");

        if (passwordStrength <= 50) {
          passwordInput.setCustomValidity(
            "Votre mot de passe est trop faible."
          );
          passwordInput.reportValidity();
          setIsUpdating(false);
          return;
        } else if (passwordInput.value !== password2Input.value) {
          password2Input.setCustomValidity(
            "Les mots de passe ne correspondent pas."
          );
          password2Input.reportValidity();
          setIsUpdating(false);
          return;
        }
      }

      const phoneNumber = formRef.current.querySelector('input[name="phone"]');
      phoneNumber.setCustomValidity("");

      if (isValidPhoneNumber(phoneNumber.value) === false) {
        phoneNumber.setCustomValidity("Numéro de téléphone invalide.");
        phoneNumber.reportValidity();
        return;
      } else if (!formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        setIsUpdating(false);
        return;
      }

      const ibanInput = formRef.current.querySelector('input[name="iban"]');
      const bicInput = formRef.current.querySelector('input[name="bic"]');
      ibanInput.setCustomValidity("");
      bicInput.setCustomValidity("");

      const { validIban, validBic } = await areIBANandBICcorrects({
        iban: userInfo.iban,
        bic: userInfo.bic,
      });
      if (!validIban) {
        ibanInput.setCustomValidity("IBAN invalide.");
        ibanInput.reportValidity();
        setIsUpdating(false);
        return;
      } else if (!validBic) {
        bicInput.setCustomValidity("BIC invalide.");
        bicInput.reportValidity();
        setIsUpdating(false);
        return;
      }

      const iban = userInfo.iban.replace(/\s/g, "");
      const bic = userInfo.bic.replace(/\s/g, "");

      const processedData = {
        firstname: userInfo.firstname,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        password: userInfo.password,
        address: userInfo.address,
        iban: iban,
        bic: bic,
      };

      const apiResult = await updateAction(processedData);

      setError(apiResult);
      setEditingMode(false);
      setIsUpdating(false);
    } catch (e) {
      setError("Erreur lors de la mise à jour de vos données.");
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Menu current="/profil" />

      <div className="bandeau-rangement">
        <div className="mainContainer" id="mainContainerProfile">
          <h1>Mon profil</h1>
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <>
              <div>
                <form
                  ref={formRef}
                  onSubmit={handleValidateForm}
                  className="formulaire"
                >
                  <span>
                    <label>
                      Prénom:
                      <input
                        type="text"
                        name="firstname"
                        value={userInfo.firstname}
                        onChange={handleChange}
                        disabled={!editingMode}
                        required
                      />
                    </label>
                    <label>
                      Nom:
                      <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        disabled={!editingMode}
                        required
                      />
                    </label>
                  </span>

                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      disabled={true}
                      required
                    />
                  </label>
                  <label>
                    N° de téléphone:
                    <input
                      type="text"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      disabled={!editingMode}
                      required
                    />
                  </label>

                  <label>
                    Nouveau mot de passe:
                    <input
                      type="password"
                      name="password"
                      value={userInfo.password}
                      onChange={handleChange}
                      disabled={!editingMode}
                    />
                  </label>
                  <PasswordStrengthMeter password={userInfo.password} />
                  <label>
                    Vérification du mot de passe:
                    <input
                      type="password"
                      name="password2"
                      value={userInfo.password2}
                      onChange={handleChange}
                      disabled={!editingMode}
                    />
                  </label>

                  <label>
                    Adresse complète:
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      disabled={!editingMode}
                      required
                    />
                  </label>

                  <label>
                    IBAN:
                    <input
                      type="text"
                      name="iban"
                      value={userInfo.iban}
                      onChange={handleChange}
                      disabled={!editingMode}
                      required
                    />
                  </label>
                  <label>
                    Bic:
                    <input
                      type="text"
                      name="bic"
                      value={userInfo.bic}
                      onChange={handleChange}
                      disabled={!editingMode}
                      required
                    />
                  </label>

                  <label>
                    Retours :
                    <p>
                      {(userInfo.return_articles ? "J'ai " : "Je n'ai pas ") +
                        "souhaité que mes articles invendus me soient retournés par voie postale (non modifiable)."}
                    </p>
                  </label>

                  {editingMode && (
                    <button type="submit" disabled={!editingMode || isUpdating}>
                      {!isUpdating ? "Enregistrer" : "Chargement..."}
                    </button>
                  )}
                </form>
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={editingMode}
                  onChange={() => setEditingMode(!editingMode)}
                />
                Modifier mes informations
              </label>

              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
