"use server"

import Nav from "./components/Nav";

export default async function Page() {
  // If connected, display a link to dashboard, else display a link to login
  return (
    <>
      <h1>HOME</h1>
      <Nav/>
      <h2>Login Actions</h2>
      <ul>
        <li><a href="/basket">(temporaire) Créer un panier</a></li>
        <li><a href="/scan-article">(temporaire) Scanner un article</a></li>
      </ul>
    </>
  )
}
