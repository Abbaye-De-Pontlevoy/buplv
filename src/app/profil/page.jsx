"use client";

import { useEffect, useRef, useState } from "react";
import LogoutButton from "../components/Button/LogoutButton/LogoutButton";
import Menu from "../components/Menu/Menu";
import { getUserInfos } from "../helpers/getUserInfos";
import updateAction from "./updateAction";
import isValidPhoneNumber from "../helpers/validatePhoneNumber";
import areIBANandBICcorrects from "../helpers/areIBANandBICcorrects";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";
import Header from "../components/Header/Header";

import "./styles.css";

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
        iban: "",
        bic: "",
        return_articles: false,
    });
    const [password, setPassword] = useState("");
    const [editingMode, setEditingMode] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);

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

    const changeStep = async (newStep, verification = true) => {
        if (verification) {
            const form = formRef.current;
            const phoneNumberInput = form.querySelector('input[name="phone"]');
            const ibanInput = form.querySelector('input[name="iban"]');
            const bicInput = form.querySelector('input[name="bic"]');

            clearInputValidation("phone");
            clearInputValidation("iban");
            clearInputValidation("bic");

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
        }

        setPassword("");
        setStep(newStep);
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
            // Prepare data for API call
            const processedData = {
                ...userInfo,
                iban: userInfo.iban.replace(/\s/g, ""),
                bic: userInfo.bic.replace(/\s/g, ""),
            };

            // Call update action API
            const apiResult = await updateAction({
                password: password,
                data: processedData,
            });

            if (apiResult === true) {
                setStep(0);
                setEditingMode(false);
            } else setError(apiResult);

            setIsUpdating(false);
        } catch (e) {
            setError("Erreur lors de la mise à jour de vos données.");
            setIsUpdating(false);
        }
    };

    // JSX for the component
    return (
        <>
            <Header />
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
                                    {step === 0 ? (
                                        <>
                                            {/* Display user information */}
                                            <span>
                                                <label>
                                                    Prénom:
                                                    <input
                                                        type="text"
                                                        name="firstname"
                                                        value={
                                                            userInfo.firstname
                                                        }
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

                                            {/* Return information */}
                                            <label>
                                                Retours :
                                                <p>
                                                    {(userInfo.return_articles
                                                        ? "J'ai "
                                                        : "Je n'ai pas ") +
                                                        "souhaité que mes articles invendus me soient retournés par voie postale (non modifiable)."}
                                                </p>
                                            </label>

                                            {/* Validate button to submit the form */}
                                            {editingMode && (
                                                <button
                                                    type="button"
                                                    disabled={
                                                        !editingMode ||
                                                        isUpdating
                                                    }
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                    onClick={() =>
                                                        changeStep(1)
                                                    }
                                                >
                                                    Valider
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <label>
                                            Veuillez entrer votre mot de passe
                                            pour enregistrer les modifications :
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                            {error && (
                                                <p style={{ color: "red" }}>
                                                    {error}
                                                </p>
                                            )}
                                            <span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        changeStep(0, false)
                                                    }
                                                >
                                                    Retour
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        !editingMode ||
                                                        isUpdating
                                                    }
                                                >
                                                    {!isUpdating
                                                        ? "Valider"
                                                        : "Chargement..."}
                                                </button>
                                            </span>
                                        </label>
                                    )}
                                </form>
                            </div>

                            {step === 0 && (
                                <>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={editingMode}
                                            onChange={() =>
                                                setEditingMode(!editingMode)
                                            }
                                        />
                                        Modifier mes informations
                                    </label>

                                    <LogoutButton />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
