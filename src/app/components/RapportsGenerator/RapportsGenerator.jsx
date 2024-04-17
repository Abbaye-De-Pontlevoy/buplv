import { useEffect, useState } from "react";
import DownloadCSVButton from "../Button/DownloadCSVButton/DownloadCSVButton";
import {
  getRapportsIBAN,
  getRapportTreso,
  getUnsoldArticlesToReturn,
} from "./rapportsAction";

import "./styles.css";

const RapportsGenerator = () => {
  const [rapportTreso, setRapportTreso] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getRapportTreso();
      setRapportTreso(data);
      setIsLoading(false);

      getUnsoldArticles();
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
            <ul>
              <li>Nombre de vendeurs : {rapportTreso?.nbSeller}</li>
              <li>Nombre d'articles : {rapportTreso?.nbArticle}</li>
              <li>Gains totaux : {rapportTreso?.totalGains} €</li>
            </ul>
          </div>

          <DownloadCSVButton
            dataGetterFunction={getRapportsIBAN}
            filename="RAPPORT_IBAN"
            buttonText="Rapport IBAN"
          />

          <DownloadCSVButton
            dataGetterFunction={getUnsoldArticlesToReturn}
            filename="UNSOLD_ARTICLES"
            buttonText="Rapport des invendus"
          />
        </div>
      )}
    </>
  );
};

export default RapportsGenerator;
