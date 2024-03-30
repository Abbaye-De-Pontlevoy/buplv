"use client";

import { useRef, useState } from "react";
import loginAction from "./loginAction";
import ReturnMenuButton from "../components/Button/ReturnMenuButton/returnMenuButton";

import "./styles.css";

export default function Login() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginAction(formData);
    if (result) {
      setError(result);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase().replace(/\s/g, "");
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <h1 className="formTitle">Connexion</h1>
        <form ref={formRef} onSubmit={handleValidate} className="formulaire">
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Mot de Passe:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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
  );
}
