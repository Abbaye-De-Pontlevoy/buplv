"use client";

import { useRef, useState } from "react";
import loginAction from "./loginAction";
import ReturnMenuButton from "../components/Button/ReturnMenuButton/returnMenuButton";

import "./styles.css";
import Header from "../components/Header/Header";

// Component for handling user login
export default function Login() {
  const formRef = useRef(null); // Reference to the form element

  // State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to handle form submission
  const handleValidate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true

    // Call loginAction function to validate user login
    const result = await loginAction(formData);
    if (result) {
      setError(result); // Set error message if loginAction returns an error
      setIsLoading(false); // Set loading state to false
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase().replace(/\s/g, ""); // Normalize email input
    setFormData({ ...formData, [name]: value }); // Update form data state
  };

  // Render the login form
  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={false} />
      <div id="loginContainer">
        <div className="formContainer">
          <h1 className="formTitle">Connexion</h1>
          <form ref={formRef} onSubmit={handleValidate} className="formulaire">
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
              Mot de Passe:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" disabled={isLoading}>
              {!isLoading ? "Valider" : "Chargement..."}
            </button>
          </form>

          <p className="errorMessage">{error}</p>
          <a href="/register">Pas encore inscrit ?</a>
        </div>
        <ReturnMenuButton />
      </div>
    </>
  );
}
