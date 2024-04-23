import { useEffect, useState } from "react";
import DownloadCSVButton from "../Button/DownloadCSVButton/DownloadCSVButton";
import {
  getRapportSeller,
  getRapportsIBAN,
  getRapportTreso,
  getUnsoldArticlesToReturn,
} from "./rapportsAction";

import "./styles.css";

const RapportsGenerator = () => {
  const [rapportTreso, setRapportTreso] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getRapportTreso();
      setRapportTreso(
        <div className="overFlowSlider">
          <p>Nombre de vendeurs : {data.nbSeller}</p>
          <p>Nombre d'articles : {data.nbArticle}</p>
          <table id="rapportTresoTable">
            <thead>
              <tr>
                <th>Moyen de paiement</th>
                <th>Nombre de transactions</th>
                <th>Montant total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.gains).map((key) => (
                <tr key={key} id={key==="Total" ? "total": ""}>
                  <td>{key}</td>
                  <td>{data.gains[key].nbTransaction}</td>
                  <td>{data.gains[key].amount} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div id="rapportsContainer">
          <div id="rapportTreso">
            <h2>Rapport de trésorerie</h2>
            {rapportTreso}
          </div>

          <DownloadCSVButton
            dataGetterFunction={getRapportsIBAN}
            filename="DESTINATAIRES_VIREMENTS"
            buttonText="Destinataires des virements"
          />

          <DownloadCSVButton
            dataGetterFunction={getUnsoldArticlesToReturn}
            filename="LISTE_INVENDUS_A_RETOURNER"
            buttonText="Liste des invendus à renvoyer"
          />

          <DownloadCSVButton
            dataGetterFunction={getRapportSeller}
            filename="LISTE_GAIN_PAR_VENDEUR"
            buttonText="Liste des gains par vendeur"
          />
        </div>
      )}
    </>
  );
};

export default RapportsGenerator;
