"use client";

import { useRef, useState } from "react";
import registerAction from "./registerAction";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter/PasswordStrengthMeter";
import ReturnArrowButton from "../components/Button/returnArrowButton/ReturnArrowButton";
import isValidPhoneNumber from "../helpers/validatePhoneNumber";
import areIBANandBICcorrects from "../helpers/areIBANandBICcorrects";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";
import Header from "../components/Header/Header";
import PasswordInput from "../components/PasswordInput/PasswordInput";

import "./styles.css";

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
    don_apel: true,
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
      ".progress"
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
      return_articles: !formData.don_apel,
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
      <Header displayAccountButton={false} />
      <div className="flex-column flex-center margin-bottom-50  max-width-90p">
        <div className="form-container">
          <h1 className="padding-30">Créer un compte</h1>

          <span className="margin-top-10 margin-bottom-20 flex-center">
            <p className={`circle ${step >= 1 ? "activeCircle" : ""}`}>1</p>
            <div className={`line ${step >= 2 ? "activeCircle" : ""}`}></div>
            <p className={`circle ${step >= 2 ? "activeCircle" : ""}`}>2</p>
            <div className={`line ${step >= 3 ? "activeCircle" : ""}`}></div>
            <p className={`circle ${step >= 3 ? "activeCircle" : ""}`}>3</p>
          </span>

          <form
            ref={formRef}
            onSubmit={handleValidateForm}
            className="formulaire"
          >
            {step === 1 && (
              <>
                <span>
                  <div style={{ width: "100%" }}>
                    <label>Prénom :</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <label>Nom :</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </span>

                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>N° de téléphone :</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <label>Mot de passe :</label>
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={true}
                />
                <PasswordStrengthMeter password={formData.password} />
                <label>Vérification du mot de passe :</label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />

                <button onClick={() => handleStepChange(2)}>Suivant</button>
              </>
            )}
            {step === 2 && (
              <>
                <label>N° et nom de la rue :</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <label>Complément d'adresse :</label>
                <input
                  type="text"
                  name="comp_address"
                  value={formData.comp_address}
                  onChange={handleChange}
                />
                <span>
                  <div style={{ width: "100%" }}>
                    <label>Code postal :</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <label>Ville:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </span>

                <span className="sideToSideButton margin-top-10">
                  <button onClick={() => handleStepChange(1, false)}>
                    Précédent
                  </button>
                  <button onClick={() => handleStepChange(3)}>Suivant</button>
                </span>
              </>
            )}
            {step === 3 && (
              <>
                <label>IBAN :</label>
                <input
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  required
                />
                <label>Bic:</label>
                <input
                  type="text"
                  name="bic"
                  value={formData.bic}
                  onChange={handleChange}
                  required
                />

                <div className="margin-bottom-10">
                  <span>
                    <input
                      type="checkbox"
                      name="don_apel"
                      className="checkbox"
                      checked={formData.don_apel}
                      onChange={() =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          don_apel: !prevFormData.don_apel,
                        }))
                      }
                    />
                    <label>
                      Je souhaite faire don de mes invendus à l'APEL.
                    </label>
                  </span>

                  {!formData.don_apel && (
                    <span>
                      <input type="checkbox" className="checkbox" required />
                      <label style={{ color: "red" }}>
                        J'ai conscience qu'en refusant de faire don de mes
                        invendus à l'APEL je demande à ce que ceux-ci me soient
                        renvoyés à mes frais (frais automatiquement déduits de
                        mes ventes).
                      </label>
                    </span>
                  )}

                  <span>
                    <input type="checkbox" className="checkbox" required/>
                    <label>
                      J'accepte les{" "}
                      <a href="/cgu" target="_blank">
                        conditions générales d'utilisation.
                      </a>
                    </label>
                  </span>
                </div>

                <span className="sideToSideButton">
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
          <p className="error">{error}</p>
          <p className="margin-top-20">
            Déjà inscrit ? <a href="/login">Je me connecte</a>
          </p>
        </div>
        <ReturnArrowButton text="Retour à l'accueil" link="/" className="self-left margin-top-10"/>
      </div>
    </>
  );
}
