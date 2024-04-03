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
import Header from "../components/Header/Header";

const ProfilePage = () => {
  // Ref for the form element
  const formRef = useRef(null);

  // State variables
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
  const [error, setError] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const user = await getUserInfos();
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...user }));

      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update userInfo state with new input value
    const newValue =
      name === "email"
        ? value.toLowerCase().replace(/\s/g, "")
        : name === "phone"
        ? formatPhoneNumber(value)
        : value;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: newValue }));
    // Clear validation messages
    clearInputValidation(name);
    setError("");
  };

  // Clear input validation messages
  const clearInputValidation = (name) => {
    formRef.current
      .querySelector(`input[name="${name}"]`)
      .setCustomValidity("");
  };

  // Handle form submission
  const handleValidateForm = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const form = formRef.current;
      const passwordInput = form.querySelector('input[name="password"]');
      const password2Input = form.querySelector('input[name="password2"]');
      const phoneNumberInput = form.querySelector('input[name="phone"]');
      const ibanInput = form.querySelector('input[name="iban"]');
      const bicInput = form.querySelector('input[name="bic"]');

      // Clear all input validation messages
      clearInputValidation("password");
      clearInputValidation("password2");
      clearInputValidation("phone");
      clearInputValidation("iban");
      clearInputValidation("bic");

      // Password strength validation
      if (passwordInput.value.length > 0) {
        const passwordStrength = parseInt(
          form.querySelector(".password-strength-meter .progress").value
        );

        if (passwordStrength <= 50) {
          passwordInput.setCustomValidity("Your password is too weak.");
          passwordInput.reportValidity();
          setIsUpdating(false);
          return;
        } else if (passwordInput.value !== password2Input.value) {
          password2Input.setCustomValidity("Passwords do not match.");
          password2Input.reportValidity();
          setIsUpdating(false);
          return;
        }
      }

      // Phone number validation
      if (!isValidPhoneNumber(phoneNumberInput.value)) {
        phoneNumberInput.setCustomValidity("Invalid phone number.");
        phoneNumberInput.reportValidity();
        setIsUpdating(false);
        return;
      }

      // Check form validity
      if (!form.checkValidity()) {
        form.reportValidity();
        setIsUpdating(false);
        return;
      }

      // IBAN and BIC validation
      const { validIban, validBic } = await areIBANandBICcorrects({
        iban: userInfo.iban,
        bic: userInfo.bic,
      });
      if (!validIban) {
        ibanInput.setCustomValidity("Invalid IBAN.");
        ibanInput.reportValidity();
        setIsUpdating(false);
        return;
      } else if (!validBic) {
        bicInput.setCustomValidity("Invalid BIC.");
        bicInput.reportValidity();
        setIsUpdating(false);
        return;
      }

      // Prepare data for API call
      const processedData = {
        ...userInfo,
        iban: userInfo.iban.replace(/\s/g, ""),
        bic: userInfo.bic.replace(/\s/g, ""),
      };

      // Call update action API
      const apiResult = await updateAction(processedData);
      setError(apiResult);
      setEditingMode(false);
      setIsUpdating(false);
    } catch (e) {
      setError("Error updating your data.");
      setIsUpdating(false);
    }
  };

  // JSX for the component
  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
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
                    <button
                      type="submit"
                      disabled={!editingMode || isUpdating}
                      style={{ marginTop: "20px" }}
                    >
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
