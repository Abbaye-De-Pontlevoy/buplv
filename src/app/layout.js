import Header from "./components/Header/Header";

import "./globals.css";

export const metadata = {
  title: "Bourse à l'uniforme",
  description:
    "Site de revente des uniformes scolaires de l'abbaye de Pontlevoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body id="root">
        <Header />
        {children}
      </body>
    </html>
  );
}
