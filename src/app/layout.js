export const metadata = {
  title: "Bourse à l'uniforme",
  description: "Site de revente des uniformes scolaires de l'abbaye de Pontlevoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="root">
      <body>{children}</body>
    </html>
  );
}
