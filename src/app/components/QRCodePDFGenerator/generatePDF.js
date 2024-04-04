import jsPDF from "jspdf";

export async function generatePDF(data) {
  const doc = new jsPDF();

  // Ajouter le titre du document
  doc.setFontSize(18);
  doc.text("Liste des QRCodes à imprimer", 105, 20, null, null, "center");

  // Position initiale pour le premier QR code
  let y = 40;

  // Boucle à travers chaque QR code
  for (let i = 0; i < data.length; i++) {
    // Générer le QR code en tant qu'image
    const jsonString = JSON.stringify({
      id: data[i].id,
      name: data[i].name,
      brand: data[i].brand,
      size: data[i].size,
      price: data[i].price,
    });
    const qrCodeDataURL = await generateQRCodeDataURL(jsonString);

    // Ajouter le QR code à la position spécifiée dans le PDF
    doc.addImage(qrCodeDataURL, "PNG", 15, y + 8, 30, 30);

    // Ajouter le titre du QR code à côté de celui-ci
    doc.setFontSize(12);
    doc.text(
      50,
      y + 15,
      `Article : ${data[i].name}\nMarque : ${data[i].brand}\nTaille : ${data[i].size}\nPrix : ${data[i].price}€\nREF : ${data[i].id}  `
    );
    y += 40;

    // Dessiner une ligne sous le QRCode
    doc.setLineWidth(0.5);
    doc.line(10, y, 190, y);

    // Ajouter une nouvelle page si nécessaire
    if (y > 240) {
      doc.addPage();
      y = 10;
    }
  }

  doc.save("QRCODES_BU_A_IMPRIMER.pdf");
}

const generateQRCodeDataURL = async (url) => {
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      url
    )}`
  );
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};