"use client";

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import signupAction from "./signupAction";

export default function Signup() {
  const [error, formAction] = useFormState(signupAction, undefined);

  return (
    <div>
      <h1>Signup</h1>
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
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
