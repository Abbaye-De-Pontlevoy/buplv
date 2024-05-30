"use server";

import Image from "next/image";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

import buProcess from "../assets/bu_process.webp";

import "./styles.css";

/**
 * Renders the details page.
 * @returns {JSX.Element} The details page component.
 */
export default async function Page() {
    return (
        <>
            <Header />
            <Menu current="/details" />
            <div className="bandeau-rangement">
                <div className="main-container text-justify flex-align-left">
                    <h1 className="width-full text-center margin-top-20 margin-bottom-20">
                        La BU : comment faire ?
                    </h1>
                    <h2>Informations pratiques</h2>
                    <p>
                        La bourse aux uniformes est une des actions menée par
                        l'Apel LPLCP qui a lieu chaque fin d'année scolaire afin
                        de permettre de revendre vos uniformes d’occasion.
                        <br />
                        <ul>
                            <li className="li-no-puces margin-left-20">
                                🗓 Quand ?
                                <b>
                                    {" "}
                                    le 28 juin de 15h00 à 20h00
                                    <br />
                                </b>
                            </li>
                            <li className="li-no-puces margin-left-20">
                                🗺 Où ? <b>Studium</b> à l'Abbaye de Pontlevoy
                                entrée au{" "}
                                <a
                                    href="https://maps.app.goo.gl/VoT5hDzHov7Ldwja7"
                                    target="_blank"
                                >
                                    35&nbsp;rue&nbsp;du&nbsp;Colonel&nbsp;FILLOUX
                                </a>{" "}
                                – Parking place Malingié
                            </li>
                        </ul>
                    </p>
                    <h2>Processus</h2>
                    <Image
                        src={buProcess}
                        id="buProcessImage"
                        alt="Processus de la Boure aux Uniformes"
                    />

                    <h3>
                        1 - Enregistrement en 3 étapes et saisie des article
                    </h3>
                    <h4>Enregistrement</h4>
                    <ul className="margin-left-20">
                        <li>Munissez-vous de votre IBAN et adresse mail</li>
                        <li>
                            Laissez coché don si invendu, si vous faites don de
                            vos invendus à l'Apel LPLCP
                        </li>
                        <li>
                            Décochez «Je souhaite faire don de mes invendus à
                            l'APEL.» si vous souhaitez que vous soient renvoyés
                            vos invendus. Des frais d’envois seront déduits du
                            produit de votre vente.
                        </li>
                    </ul>
                    <h4>Saisie des articles</h4>
                    <p>
                        Il est conseillé d’effectuer cette étape sur un
                        ordinateur. Saisissez vos vêtements en choisissant dans
                        les menus déroulants : niveau, sexe, Article, Taille,
                        quantité. Puis validez au bout de la ligne ☑️.
                    </p>

                    <p>
                        Une fois la saisie de l’ensemble de vos articles
                        finalisée :
                        <ul className="margin-left-50">
                            <li>
                                Téléchargez le fichier des QRcodes et imprimez
                                le
                            </li>
                            <li>
                                Agrafez la page 1 du récapitulatif de vos
                                vêtements sur le sac de vêtements
                            </li>
                            <li>
                                Agrafez les QR code sur l'étiquette de CHAQUE
                                vêtement (A l’emplacement marqué)
                            </li>
                        </ul>
                    </p>

                    <p className="error text-center width-full font-weight-bold">
                        A CETTE ÉTAPE SUR NOTRE SITE, VOS VÊTEMENTS SONT
                        ENREGISTRÉS
                    </p>

                    <h3>2 - Déposez vos vêtements</h3>
                    <p>
                        Confiez votre sac à votre enfant le jour de la collecte
                        définie pour son site. (Les dates sont communiquées par
                        email sur lplcp.fr et sur pronote) Après contrôle du sac
                        par les bénévoles, nous remettrons systématiquement en
                        contrepartie à votre enfant un ticket de bonne
                        réception.
                    </p>

                    <p>
                        <b>NB 1 :</b> si vous avez des enfants sur différents
                        sites et/ou différents niveaux, confiez l'intégralité de
                        vos articles à l’un d’eux.
                    </p>

                    <p>
                        <b>NB 2 :</b> Vous pouvez aussi apporter vos vêtements
                        le jour de la vente à partir de 14h30. Un bénévole devra
                        vérifier votre sac pour que les articles puissent être
                        vendus.
                    </p>

                    <p>
                        <b>NB 3 :</b> Lors du contrôle des vêtements, si ceux-ci
                        sont sales ou trop abimés, ils seront déclarés
                        invendables.
                    </p>

                    <p className="error text-center width-full font-weight-bold">
                        A CETTE ÉTAPE SUR NOTRE SITE, LE STATUS DE VOS VÊTEMENTS
                        EST «INVENTORIÉ» ou «INVENDABLE»
                    </p>

                    <h3>TARIFS 2024</h3>
                    <div className="overFlowXSlider width-full">
                        <table id="tarifsTable">
                            <tr>
                                <th></th>
                                <th>Polo</th>
                                <th>Chemise</th>
                                <th>Pull</th>
                                <th>Doudoune sans manche</th>
                                <th>Cravate</th>
                            </tr>
                            <tr>
                                <td className="tableTitle">Prix de vente</td>
                                <td>7&nbsp;€</td>
                                <td>9&nbsp;€</td>
                                <td>12&nbsp;€</td>
                                <td>15&nbsp;€</td>
                                <td>5&nbsp;€</td>
                            </tr>
                            <tr>
                                <td className="tableTitle">
                                    Montant reversé vendeur
                                </td>
                                <td>5,6&nbsp;€</td>
                                <td>6,6&nbsp;€</td>
                                <td>9,6&nbsp;€</td>
                                <td>12&nbsp;€</td>
                                <td>4&nbsp;€</td>
                            </tr>
                            <tr>
                                <td className="tableTitle">
                                    Montant reversé Apel (20%)
                                </td>
                                <td>1,4&nbsp;€</td>
                                <td>2,4&nbsp;€</td>
                                <td>2,4&nbsp;€</td>
                                <td>3&nbsp;€</td>
                                <td>1&nbsp;€</td>
                            </tr>
                            <tr>
                                <td className="tableTitle">Frais de port</td>
                                <td colspan="5">5&nbsp;€ par coli</td>
                            </tr>
                        </table>
                    </div>

                    <p>
                        Suite à la BU, le bilan sera effectué entre les
                        vêtements vendus – invendables– non vendus.
                    </p>

                    <p className="text-red font-weight-bold">
                        Un virement sera effectué sur votre compte (IBAN fourni
                        à l’inscription de la BU) avant la rentrée de septembre
                        2024.
                    </p>

                    <p className="text-red font-weight-bold">
                        Si vous avez des invendus, et vous avez choisis de vous
                        faire renvoyer
                        <ul className="margin-left-50">
                            <li className="text-red font-weight-bold">
                                L’APPEL vous fera parvenir le colis par voie
                                postale
                            </li>
                            <li className="text-red font-weight-bold">
                                Les frais de port seront déduits de la recette
                                de votre vente
                            </li>
                        </ul>
                    </p>

                    <p className="text-red font-weight-bold">
                        Les invendus que vous aurez donnés seront remis en vente
                        l’année suivante au profit des actions de l’APEL.
                    </p>

                    <form
                        action="/dashboard"
                        className="buttonForm self-center"
                    >
                        <button type="submit" className="padding-20">
                            J'enregistre mes articles !
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
