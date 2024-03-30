"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAction";
import ReturnMenuButton from "../components/Button/ReturnMenuButton/returnMenuButton";

import "./styles.css";

export default function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <h1 className="formTitle">Connexion</h1>
        <form action={formAction} className="formulaire">
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Mot de Passe:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Valider</button>
        </form>

        {error && <p>{error}</p>}
        <a href="/register">Pas encore inscrit ?</a>
      </div>
      <ReturnMenuButton/>
    </div>
  );
}
