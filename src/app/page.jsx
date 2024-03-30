"use server";

import Image from "next/image";
import BU_rangement from "@/app/assets/BU_rangement.webp";

import "./globals.css";
import "./page.css";

export default async function Page() {
  return (
    <>
      <div id="bandeau-rangement">
        <form action="/dashboard" className="buttonForm">
          <button type="submit"> Je participe à la bourse !</button>
        </form>
      </div>

      <div id="information-div">
        <h1>La bourse à l'uniforme</h1>
        <p>
          La bourse à l'uniforme est un événement organisé par l'association des
          parents d'élèves de l'abbaye de Pontlevoy. C'est un moment de partage
          et de solidarité où les familles peuvent donner, échanger ou acheter
          des uniformes scolaires d'occasion.
        </p>
        <p>
          L'objectif de la bourse à l'uniforme est de favoriser le recyclage des
          vêtements et de permettre aux familles de réaliser des économies.
          C'est aussi l'occasion de rencontrer d'autres parents et de tisser des
          liens au sein de la communauté éducative.
        </p>
        <p>
          La bourse à l'uniforme se déroule une fois par an en fin d'année
          scolaire. Les familles peuvent déposer leurs uniformes d'occasion en
          bon état et en bon état de propreté. Les vêtements sont ensuite triés
          et mis en vente à des prix très avantageux.
        </p>
        <p>
          Pour participer à la bourse à l'uniforme, il vous suffit de vous
          inscrire en ligne et de déposer vos uniformes d'occasion lors de
          l'événement. Vous pourrez ainsi faire des économies tout en
          contribuant à une démarche éco-responsable.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </>
  );
}
