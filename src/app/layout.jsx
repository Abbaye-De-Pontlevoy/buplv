import Footer from "./components/Footer/Footer";
import { UserInfoProvider } from "./components/UserInfoProvider/UserInfoProvider";

import "./globals.css";

export const metadata = {
  title: "Bourse à l'uniforme",
  description:
    "Site de revente des uniformes scolaires de l'abbaye de Pontlevoy",
};

/**
 * Root layout component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body id="root">
        <UserInfoProvider>
          <div className="pageCorpusContent">
            {children}
            <Footer />
          </div>
        </UserInfoProvider>
      </body>
    </html>
  );
}
