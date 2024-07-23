import { useEffect, useState } from "react";
import DownloadCSVButton from "../Button/DownloadCSVButton/DownloadCSVButton";
import {
    getRapportSeller,
    getRapportsIBAN,
    getRapportTreso,
    getUnsoldArticlesToReturn,
} from "./rapportsAction";
import { exportArticles, exportSellers } from "./bddActions";
import ResetBDDButton from "../Button/ResetBDDButton/ResetBDDButton";
import GetPdfBySeller from "../GetPdfBySeller/GetPdfBySeller";

import "./styles.css";
import DatabaseToJsonButton from "../Button/DatabaseToJsonButton/DatabaseToJsonButton";

/**
 * Renders the RapportsGenerator component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @returns {JSX.Element} The rendered RapportsGenerator component.
 */
const RapportsGenerator = ({ className }) => {
    // Initialize state variables
    const [rapportTreso, setRapportTreso] = useState(<></>);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data for the 'Rapport de trésorerie' section when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const data = await getRapportTreso();
            setRapportTreso(
                <div className="overFlowXSlider width-full">
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
                                <tr
                                    key={key}
                                    className={
                                        key === "Total"
                                            ? "font-weight-bold"
                                            : ""
                                    }
                                >
                                    <td>{key}</td>
                                    <td>{data.gains[key].nbTransaction}</td>
                                    <td>{data.gains[key].amount}&nbsp;€</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>,
            );

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className={className}>
            {isLoading ? (
                <p className="text-center">Chargement...</p>
            ) : (
                <div className="flex-column gap-10">
                    <div id="rapportTreso">
                        <h2 className="margin-bottom-10">
                            Rapport de trésorerie
                        </h2>
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

                    <div className="separator"></div>

                    {/* Display the form to generate the QR codes of sellers */}
                    <div className="flex-column gap-10 margin-top-20">
                        <h2>Génération des petits trains vendeur</h2>
                        <GetPdfBySeller className="flex-row gap-10 width-full" />
                    </div>

                    <div className="separator"></div>

                    <div className="flex-column gap-10 margin-top-20">
                        <h2>Base de données</h2>

                        <DownloadCSVButton
                            dataGetterFunction={exportSellers}
                            filename="BDD_LISTE_VENDEURS"
                            buttonText="Exporter la liste des vendeurs"
                        />

                        <DownloadCSVButton
                            dataGetterFunction={exportArticles}
                            filename="BDD_LISTE_ARTICLES"
                            buttonText="Exporter la liste des articles"
                        />
                        
                        <DatabaseToJsonButton className="width-full" />
                        <ResetBDDButton className="width-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RapportsGenerator;
