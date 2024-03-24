"use client";

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import registerAction from "./registerAction";
import MenuButton from "../components/Button/MenuButton/MenuButton";

export default function register() {
  const [error, formAction] = useFormState(registerAction, undefined);

  return (
    <div>
      <h1>Register</h1>
      <form action={formAction}>
        <label>
          Student Name:
          <input type="text" name="student_name" required />
        </label>
        <label>
          Grade:
          <input type="text" name="grade" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          phone:
          <input type="text" name="phone" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <label>
          Iban:
          <input type="text" name="iban" required />
        </label>
        <label>
          Bic:
          <input type="text" name="bic" required />
        </label>
        <label>
          Code Pays:
          <input type="text" name="country_code" required />
        </label>
        <button type="submit">register</button>
      </form>
      {error && <p>{error}</p>}
      <MenuButton />
    </div>
  );
}
