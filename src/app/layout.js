import Footer from "./components/Footer/Footer";
import { UserInfoProvider } from "./components/UserInfoProvider/UserInfoProvider";

import "./globals.css";

export const metadata = {
  title: "Bourse à l'uniforme",
  description:
    "Site de revente des uniformes scolaires de l'abbaye de Pontlevoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <UserInfoProvider>
        <body id="root">
          <div className="pageCorpusContent">
            {children}
            <Footer />
          </div>
        </body>
      </UserInfoProvider>
    </html>
  );
}
