"use client";

import { useContext, useEffect, useRef, useState } from "react";
import loginAction, { removeCookie } from "./loginAction";
import ReturnMenuButton from "../components/Button/ReturnMenuButton/returnMenuButton";
import Header from "../components/Header/Header";
import { UserInfoContext } from "../components/UserInfoProvider/UserInfoProvider";
import { useRouter } from "next/navigation";

import "./styles.css";

export default function Login() {
  const router = useRouter();

  const formRef = useRef(null);

  // State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(UserInfoContext);

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
      console.log("Login successful");
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

          <p className="error">{error}</p>
          <a href="/register">Pas encore inscrit ?</a>
        </div>
        <ReturnMenuButton />
      </div>
    </>
  );
}
