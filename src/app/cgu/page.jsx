"use server";

import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import "../globals.css";
import "./page.css";

export default async function Page() {
  return (
    <>
      <Header  />
      <Menu current="/details" />
      <div className="bandeau-rangement">
        <div className="mainContainer" id="corpus-div">
          <h1>Conditions Générales d'Utilisation</h1>
          <p>
            Ci-dessous beaucoup de choses pour te dire qu'en gros tu n'as pas le
            choix d'accepter les cookies si tu veux vendre tes vêtements car le
            développeur de ce site avait vraiment la flemme de gérer ta session
            user depuis le serveur.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, urna id aliquam aliquet, nunc nisl tincidunt nunc, vitae
            lacinia nisl enim sed mauris. Sed auctor, justo a tincidunt aliquet,
            nunc nisl tincidunt nunc, vitae lacinia nisl enim sed mauris.
          </p>
          <p>
            Nullam euismod, urna id aliquam aliquet, nunc nisl tincidunt nunc,
            vitae lacinia nisl enim sed mauris. Sed auctor, justo a tincidunt
            aliquet, nunc nisl tincidunt nunc, vitae lacinia nisl enim sed
            mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            Sed euismod, urna id aliquam aliquet, nunc nisl tincidunt nunc,
            vitae lacinia nisl enim sed mauris. Sed auctor, justo a tincidunt
            aliquet, nunc nisl tincidunt nunc, vitae lacinia nisl enim sed
            mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </>
  );
}
