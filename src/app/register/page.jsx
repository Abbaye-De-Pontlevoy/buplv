"use client";

import { useRef, useState } from "react";
import registerAction from "./registerAction";
import "../globals.css";
import "./styles.css";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter/PasswordStrengthMeter";
import ReturnMenuButton from "../components/Button/ReturnMenuButton/returnMenuButton";
import isValidPhoneNumber from "../helpers/validatePhoneNumber";
import areIBANandBICcorrects from "../helpers/areIBANandBICcorrects";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";
import Header from "../components/Header/Header";

export default function Register() {
  const formRef = useRef(null); // Reference for the form element
  const [step, setStep] = useState(1); // Current step in the registration process
  const [error, setError] = useState(""); // Error message if registration fails
  const [isLoading, setIsLoading] = useState(false); // Loading state while registering
  const [formData, setFormData] = useState({
    // Form data for registration
    firstname: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    address: "",
    comp_address: "",
    zip: "",
    city: "",
    iban: "",
    bic: "",
    return_articles: false,
  });

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "email") updatedValue = value.toLowerCase().replace(/\s/g, "");
    if (name === "phone") updatedValue = formatPhoneNumber(value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));

    // Reset custom validation messages and error
    if (step === 1) {
      formRef.current
        .querySelector('input[name="password"]')
        .setCustomValidity("");
      formRef.current
        .querySelector('input[name="password2"]')
        .setCustomValidity("");
      formRef.current
        .querySelector('input[name="phone"]')
        .setCustomValidity("");
    } else if (step === 3) {
      formRef.current.querySelector('input[name="iban"]').setCustomValidity("");
      formRef.current.querySelector('input[name="bic"]').setCustomValidity("");
    }
    setError("");
  };

  // Function to handle step changes in the registration process
  const handleStepChange = (value, verify = true) => {
    if (!verify) return setStep(value);

    // Validation for each step
    if (step === 2) {
      if (formRef.current.checkValidity()) {
        setStep(value);
      } else {
        formRef.current.reportValidity();
      }
      return;
    }

    const passwordInput = formRef.current.querySelector(
      'input[name="password"]'
    );
    const password2Input = formRef.current.querySelector(
      'input[name="password2"]'
    );
    const passwordStrengthComponent = formRef.current.querySelector(
      ".password-strength-meter .progress"
    );
    const passwordStrength = parseInt(passwordStrengthComponent.value);
    const phoneNumber = formRef.current.querySelector('input[name="phone"]');

    passwordInput.setCustomValidity("");
    password2Input.setCustomValidity("");
    phoneNumber.setCustomValidity("");

    // Validate password strength, match, and phone number format
    if (passwordStrength <= 50) {
      passwordInput.setCustomValidity("Your password is too weak.");
      passwordInput.reportValidity();
    } else if (passwordInput.value !== password2Input.value) {
      password2Input.setCustomValidity("Passwords do not match.");
      password2Input.reportValidity();
    } else if (isValidPhoneNumber(phoneNumber.value) === false) {
      phoneNumber.setCustomValidity("Invalid phone number.");
      phoneNumber.reportValidity();
    } else if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
    } else {
      setStep(value);
    }
  };

  // Function to handle form submission and registration
  const handleValidateForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true

    const ibanInput = formRef.current.querySelector('input[name="iban"]');
    const bicInput = formRef.current.querySelector('input[name="bic"]');
    ibanInput.setCustomValidity(""); // Reset custom validity message for IBAN
    bicInput.setCustomValidity(""); // Reset custom validity message for BIC

    // Check if IBAN and BIC are correct
    const { validIban, validBic } = await areIBANandBICcorrects({
      iban: formData.iban,
      bic: formData.bic,
    });

    // If IBAN is invalid, set custom validity message and stop loading
    if (!validIban) {
      ibanInput.setCustomValidity("Invalid IBAN.");
      ibanInput.reportValidity();
      setIsLoading(false);
      return;
    }
    // If BIC is invalid, set custom validity message and stop loading
    else if (!validBic) {
      bicInput.setCustomValidity("Invalid BIC.");
      bicInput.reportValidity();
      setIsLoading(false);
      return;
    }

    // Concatenate address parts
    const address = `${formData.address}, ${
      formData.comp_address ? formData.comp_address + ", " : ""
    }${formData.zip} ${formData.city}`;

    // Create processed data object for registration
    const processedData = {
      ...formData,
      address,
    };

    // Call register action with processed data
    const apiResult = await registerAction(processedData);
    if (apiResult) {
      setError(apiResult);
      setIsLoading(false);
    }
  };

  // Return JSX for registration form
  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={false} />
      <div id="registerContainer">
        <div className="formContainer">
          <h1 className="formTitle">Créer un compte</h1>

          <span id="circleSpan">
            <p className={`circle ${step >= 1 ? "active" : ""}`}>1</p>
            <div className={`line ${step >= 2 ? "active" : ""}`}></div>
            <p className={`circle ${step >= 2 ? "active" : ""}`}>2</p>
            <div className={`line ${step >= 3 ? "active" : ""}`}></div>
            <p className={`circle ${step >= 3 ? "active" : ""}`}>3</p>
          </span>

          <form
            ref={formRef}
            onSubmit={handleValidateForm}
            className="formulaire"
          >
            {step === 1 && (
              <>
                <span>
                  <label>
                    Prénom:
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Nom:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </span>

                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  N° de téléphone:
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Mot de passe:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <PasswordStrengthMeter password={formData.password} />
                <label>
                  Vérification du mot de passe:
                  <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </label>

                <button onClick={() => handleStepChange(2)}>Suivant</button>
              </>
            )}
            {step === 2 && (
              <>
                <label>
                  N° et nom de la rue:
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Complément d'adresse:
                  <input
                    type="text"
                    name="comp_address"
                    value={formData.comp_address}
                    onChange={handleChange}
                  />
                </label>
                <span>
                  <label>
                    Code postal:
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Ville:
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </span>

                <span className="buttonSpan">
                  <button onClick={() => handleStepChange(1, false)}>
                    Précédent
                  </button>
                  <button onClick={() => handleStepChange(3)}>Suivant</button>
                </span>
              </>
            )}
            {step === 3 && (
              <>
                <label>
                  IBAN:
                  <input
                    type="text"
                    name="iban"
                    value={formData.iban}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Bic:
                  <input
                    type="text"
                    name="bic"
                    value={formData.bic}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  <span>
                    <input
                      type="checkbox"
                      name="return_articles"
                      id="returnCheckBox"
                      checked={formData.return_articles}
                      onChange={() =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          return_articles: !prevFormData.return_articles,
                        }))
                      }
                    />
                    Je souhaite que mes articles invendus me soient retournés
                    par voie postale (frais à ma charge).
                  </span>
                </label>

                <span className="buttonSpan">
                  <button
                    onClick={() => handleStepChange(2, false)}
                    disabled={isLoading}
                  >
                    Précédent
                  </button>
                  <button type="submit" disabled={isLoading}>
                    {!isLoading ? "Valider" : "Chargement..."}
                  </button>
                </span>
              </>
            )}
          </form>
          <p className="errorMessage">{error}</p>
          <p id="loginLink">
            Déjà inscrit ? <a href="/login">Je me connecte</a>
          </p>
        </div>
        <ReturnMenuButton />
      </div>
    </>
  );
}
