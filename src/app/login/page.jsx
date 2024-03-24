"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAction";
import MenuButton from "../components/Button/MenuButton/MenuButton";

export default function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
      <MenuButton />
    </div>
  );
}
