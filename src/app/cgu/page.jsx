"use server";

import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import "./page.css";

/**
 * Represents the Site CGU page.
 * @component
 */
export default async function Page() {
    return (
        <>
            <Header />
            <Menu />
            <div className="bandeau-rangement">
                <div className="main-container text-justify flex-align-left">
                    <h1 className="width-full text-center margin-top-20 margin-bottom-20">
                        Conditions Générales d'Utilisation
                    </h1>

                    <p className="width-full text-center">
                        En vigueur au 28/05/2024
                    </p>

                    <p>
                        Les présentes conditions générales d'utilisation (dites
                        « <b>CGU</b> ») ont pour objet l'encadrement juridique
                        des modalités de mise à disposition du site et des
                        services par APEL du collège/lycée catholique de
                        Pontlevoy et de définir les conditions d’accès et
                        d’utilisation des services par «<b>l'Utilisateur</b>».
                    </p>

                    <p>
                        Les présentes CGU sont accessibles sur le site à la
                        rubrique «Conditions Générales».
                    </p>

                    <p>
                        Toute inscription ou utilisation du site implique
                        l'acceptation sans aucune réserve ni restriction des
                        présentes CGU par l’utilisateur. Lors de l'inscription
                        sur le site via le Formulaire d’inscription, chaque
                        utilisateur accepte expressément les présentes CGU en
                        cochant la case précédant le texte suivant : « Je
                        reconnais avoir lu et compris les conditions générales
                        d'utilisation et je les accepte ». En cas de
                        non-acceptation des CGU stipulées dans le présent
                        contrat, l'Utilisateur se doit de renoncer à l'accès des
                        services proposés par le site.{" "}
                        <a href="https://bu.apel.lplcp.fr/" target="_blank">
                            bu.apel.lplcp.fr
                        </a>{" "}
                        se réserve le droit de modifier unilatéralement et à
                        tout moment le contenu des présentes CGU.
                    </p>

                    <h2>ARTICLE 1 : LES MENTIONS LÉGALES</h2>
                    <p>
                        L'édition du site Bourse à l’uniforme est assurée par
                        l’APEL du LPLCP situé au
                        38&nbsp;Rue&nbsp;de&nbsp;la&nbsp;Fontaine&nbsp;ST&nbsp;Urbain
                        &nbsp;41120&nbsp;SAMBIN
                        <br />
                        Adresse e-mail :{" "}
                        <a href="mailto:apel@lplcp.fr">apel@lplcp.fr</a>
                        <br />
                        Le Directeur de la publication est : Aymeric&nbsp;Ruyant
                    </p>

                    <p>
                        Ce site est hébergé par la société Vercel Inc., située
                        340&nbsp;S&nbsp;Lemon&nbsp;Ave&nbsp;#4133&nbsp;Walnut,&nbsp;CA&nbsp;91789,
                        et joignable au (559) 288-7060.
                    </p>

                    <h2>ARTICLE 2 : ACCÈS AU SITE</h2>
                    <p>
                        Le site Bourse à l’uniforme permet à l'Utilisateur un
                        accès gratuit aux services suivants : Création d'un
                        espace personnel; Enregistrement d'articles ; Impression
                        de QRcodes liés aux articles ; Suivi du statut des
                        articles.
                        <br />
                        Le site est accessible gratuitement en tout lieu à tout
                        Utilisateur ayant un accès à Internet. Tous les frais
                        supportés par l'Utilisateur pour accéder au service
                        (matériel informatique, logiciels, connexion Internet,
                        etc.) sont à sa charge.
                    </p>

                    <p>
                        L’Utilisateur non membre n'a pas accès aux services
                        réservés. Pour cela, il doit s’inscrire en remplissant
                        le formulaire. En acceptant de s’inscrire aux services
                        réservés, l’Utilisateur membre s’engage à fournir des
                        informations sincères et exactes concernant son état
                        civil et ses coordonnées, notamment son adresse email.
                    </p>

                    <p>
                        Pour accéder aux services, l’Utilisateur doit ensuite
                        s'identifier à l'aide de son identifiant et de son mot
                        de passe qu’il aura saisi à son inscription. Tout
                        Utilisateur membre régulièrement inscrit pourra
                        également solliciter sa désinscription en s’adressant
                        par email à l’adresse email de l’éditeur communiqué à
                        l’ARTICLE&nbsp;1. Celle-ci sera effective dans un délai
                        raisonnable. L’ensemble des comptes et de l’ensemble des
                        informations personnelles des Utilisateurs seront
                        supprimés chaque année. Tout événement dû à un cas de
                        force majeure ayant pour conséquence un
                        dysfonctionnement du site ou serveur et sous réserve de
                        toute interruption ou modification en cas de
                        maintenance, n'engage pas la responsabilité de APEL du
                        collège/lycée catholique de Pontlevoy. Dans ces cas,
                        l’Utilisateur accepte ainsi ne pas tenir rigueur à
                        l’éditeur de toute interruption ou suspension de
                        service, même sans préavis. L'Utilisateur a la
                        possibilité de contacter le site par messagerie
                        électronique à l’adresse email de l’éditeur communiqué à
                        l’ARTICLE&nbsp;1.
                    </p>

                    <h2>ARTICLE 3 : COLLECTE DES DONNÉES</h2>
                    <p>
                        Le site assure à l'Utilisateur une collecte et un
                        traitement d'informations personnelles dans le respect
                        de la vie privée conformément à la loi n°78-17 du 6
                        janvier 1978 relative à l'informatique, aux fichiers et
                        aux libertés.
                    </p>

                    <p>
                        En vertu de la loi Informatique et Libertés, en date du
                        6 janvier 1978, l'Utilisateur dispose d'un droit
                        d'accès, de rectification, de suppression et
                        d'opposition de ses données personnelles. L'Utilisateur
                        exerce ce droit :
                        <ul className="margin-left-50">
                            <li>par mail à l'adresse email apel@lplcp.fr</li>
                            <li>via son espace personnel</li>
                        </ul>
                    </p>

                    <h2>ARTICLE 4 : PROPRIÉTÉ INTELLECTUELLE</h2>
                    <p>
                        Les marques, logos, signes ainsi que tous les contenus
                        du site (textes, images, son…) font l'objet d'une
                        protection par le Code de la propriété intellectuelle et
                        plus particulièrement par le droit d'auteur.
                    </p>

                    <p>
                        L'Utilisateur doit solliciter l'autorisation préalable
                        du site pour toute reproduction, publication, copie des
                        différents contenus. Il s'engage à une utilisation des
                        contenus du site dans un cadre strictement privé, toute
                        utilisation à des fins commerciales et publicitaires est
                        strictement interdite.
                    </p>

                    <p>
                        Toute représentation totale ou partielle de ce site par
                        quelque procédé que ce soit, sans l’autorisation
                        expresse de l’exploitant du site Internet constituerait
                        une contrefaçon sanctionnée par l’article L&nbsp;335-2
                        et suivants du Code de la propriété intellectuelle.
                    </p>

                    <p>
                        Il est rappelé conformément à l’article&nbsp;L122-5 du
                        Code de propriété intellectuelle que l’Utilisateur qui
                        reproduit, copie ou publie le contenu protégé doit citer
                        l’auteur et sa source.
                    </p>

                    <h2>ARTICLE 5 : RESPONSABILITÉ</h2>
                    <p>
                        Les sources des informations diffusées sur le site
                        Bourse à l’uniforme sont réputées fiables mais le site
                        ne garantit pas qu’il soit exempt de défauts, d’erreurs
                        ou d’omissions.
                    </p>

                    <p>
                        Les informations communiquées sont présentées à titre
                        indicatif et général sans valeur contractuelle. Malgré
                        des mises à jour régulières, le site Bourse à l’uniforme
                        ne peut être tenu responsable de la modification des
                        dispositions administratives et juridiques survenant
                        après la publication. De même, le site ne peut être
                        tenue responsable de l’utilisation et de
                        l’interprétation de l’information contenue dans ce site.
                        <br />
                        L'Utilisateur s'assure de garder son mot de passe
                        secret. Toute divulgation du mot de passe, quelle que
                        soit sa forme, est interdite. Il assume les risques liés
                        à l'utilisation de son identifiant et mot de passe. Le
                        site décline toute responsabilité.
                        <br />
                        Le site Bourse à l’uniforme ne peut être tenu pour
                        responsable d’éventuels virus qui pourraient infecter
                        l’ordinateur ou tout matériel informatique de
                        l’Internaute, suite à une utilisation, à l’accès, ou au
                        téléchargement provenant de ce site.
                    </p>

                    <p>
                        La responsabilité du site ne peut être engagée en cas de
                        force majeure ou du fait imprévisible et insurmontable
                        d'un tiers.
                    </p>

                    <h2>ARTICLE 6 : LIENS HYPERTEXTES</h2>
                    <p>
                        Des liens hypertextes peuvent être présents sur le site.
                        L’Utilisateur est informé qu’en cliquant sur ces liens,
                        il sortira du site Bourse à l’uniforme. Ce dernier n’a
                        pas de contrôle sur les pages web sur lesquelles
                        aboutissent ces liens et ne saurait, en aucun cas, être
                        responsable de leur contenu.
                    </p>

                    <h2>ARTICLE 7 : COOKIES</h2>
                    <p>
                        L’Utilisateur est informé que lors de ses visites sur le
                        site, un cookie peut s’installer automatiquement sur son
                        logiciel de navigation.
                    </p>

                    <p>
                        Les cookies sont de petits fichiers stockés
                        temporairement sur le disque dur de l’ordinateur de
                        l’Utilisateur par votre navigateur et qui sont
                        nécessaires à l’utilisation du site Bourse à l’uniforme.
                        Les cookies ne contiennent pas d’information personnelle
                        et ne peuvent pas être utilisés pour identifier
                        quelqu’un. Un cookie contient un identifiant unique,
                        généré aléatoirement et donc anonyme. Les cookies de ce
                        site expirent 3 jours après la fin de la visite de
                        l’Utilisateur.
                    </p>

                    <p>
                        L’information contenue dans les cookies est utilisée
                        pour améliorer le site Bourse à l’uniforme.
                    </p>

                    <p>
                        En naviguant sur le site, L’Utilisateur les accepte.
                        L’Utilisateur pourra désactiver ces cookies par
                        l’intermédiaire des paramètres figurant au sein de son
                        logiciel de navigation.
                    </p>

                    <h2>
                        ARTICLE 8 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE
                    </h2>
                    <p>
                        La législation française s'applique au présent contrat.
                        En cas d'absence de résolution amiable d'un litige né
                        entre les parties, les tribunaux français seront seuls
                        compétents pour en connaître. Pour toute question
                        relative à l’application des présentes CGU, vous pouvez
                        joindre l’éditeur aux coordonnées inscrites à
                        l’ARTICLE&nbsp;1.
                    </p>
                </div>
            </div>
        </>
    );
}
