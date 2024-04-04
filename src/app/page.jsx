"use server";

import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import "./globals.css";
import "./page.css";

export default async function Page() {
  return (
    <>
      <Header displayAccountButton={true}/>
      <Menu current="/" />
      <div className="bandeau-rangement">
        <form action="/details" className="buttonForm">
          <button type="submit" id="participeButton"> Je participe à la bourse !</button>
        </form>
      </div>
    </>
  );
}
