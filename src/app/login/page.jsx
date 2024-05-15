"use client";

import { useContext, useEffect, useRef, useState } from "react";
import loginAction, { removeCookie } from "./loginAction";
import ReturnArrowButton from "../components/Button/ReturnArrowButton/ReturnArrowButton";
import Header from "../components/Header/Header";
import { UserInfoContext } from "../components/UserInfoProvider/UserInfoProvider";
import { useRouter } from "next/navigation";

import "./styles.css";

export default function Login() {
  // Get the router object
  // Used to redirect the user after login
  const router = useRouter();

  // Reference to the form
  const formRef = useRef(null);

  // Get user information from the context
  const { login } = useContext(UserInfoContext);

  // State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    removeCookie();
  }, []);

  // Function to handle form submission
  const handleValidate = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Call loginAction function to validate user login
    const result = await loginAction(formData);
    if (result.access) {
      router.push("/dashboard");
      login(result);
    }

    setError(result.msg);
    setIsLoading(false);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase().replace(/\s/g, ""); // Normalize email input
    setFormData({ ...formData, [name]: value });
  };

  // Render the login form
  return (
    <>
      <Header displayAccountButton={false} />
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

          <p className="error">{error}</p>
          <a href="/register">Pas encore inscrit ?</a>
        </div>
        <ReturnArrowButton text="Retour à l'accueil" link="/"/>
      </div>
    </>
  );
}
