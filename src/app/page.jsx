"use server";

import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import "./globals.css";
import "./page.css";

export default async function Page() {
  return (
    <>
      <Header  />
      <Menu current="/" />
      <div className="bandeau-rangement">
        <form action="/dashboard" className="buttonForm">
          <button type="submit" className="padding-20">
            Je participe à la bourse !
          </button>
        </form>
      </div>
      <div className="max-width-800 text-justify margin-left-50 margin-right-50 margin-top-10 margin-bottom-20">
        <h1 className="margin-20">La bourse à l'uniforme</h1>
        <p>
          La bourse à l'uniforme est un événement organisé par l'association des
          parents d'élèves de l'abbaye de Pontlevoy. C'est un moment de partage
          et de solidarité où les familles peuvent donner, échanger ou acheter
          des uniformes scolaires d'occasion. L'objectif de la bourse à
          l'uniforme est de favoriser le recyclage des vêtements et de permettre
          aux familles de réaliser des économies. C'est aussi l'occasion de
          rencontrer d'autres parents et de tisser des liens au sein de la
          communauté éducative.
        </p>
      </div>
    </>
  );
}
