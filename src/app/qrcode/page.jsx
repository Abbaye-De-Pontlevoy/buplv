"use client"

// Importez le composant QRCodePDFGenerator
import QRCodePDFGenerator from "../components/QRCodePDFGenerator/QRCodePDFGenerator";

// Définissez les données des QR codes (titres et URLs)
const qrCodes = [
  { title: 'QR Code 1', url: 'https://www.example.com/page1' },
  { title: 'QR Code 2', url: 'https://www.example.com/page2' },
  { title: 'QR Code 3', url: 'https://www.example.com/page3' },
];

// Utilisez le composant QRCodePDFGenerator en passant les données des QR codes
const YourComponent = () => (
  <div>
    {/* Affichez le composant QRCodePDFGenerator avec les données des QR codes */}
    <QRCodePDFGenerator data={qrCodes} />
  </div>
);

export default YourComponent;
