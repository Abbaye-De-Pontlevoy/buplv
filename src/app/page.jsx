"use server"

import { isUserConnected, userLogout } from "@/lib";

export default async function Page() {
  // If connected, display a link to dashboard, else display a link to login

  const links = isUserConnected() ? (
    <>
      <form action="/dashboard">
        <button type="submit">Dashboard</button>
      </form>
      <form action={userLogout}>
          <button type="submit">Déconnexion</button>
      </form>
    </>
  ) : (
    <form action={"/login"}>
        <button type="submit">Connexion</button>
    </form>
  );

  return (
    <div>
      <h1>Bourse à l'uniforme 2024</h1>
        <a href="/dashboard">Enregistrer des vêtements</a>
        {links}
    </div>
  );
}
