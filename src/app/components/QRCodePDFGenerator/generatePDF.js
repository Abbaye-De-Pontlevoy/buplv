import jsPDF from "jspdf";
import "jspdf-autotable";

export async function generatePDF(data, sellerInfos) {
  const doc = new jsPDF();
  let margin = 15;

  // Ajouter la page PETIT TRAIN
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Informations vendeur à imprimer", 105, 20, null, null, "center");

  // Ajouter les informations du vendeur
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Vendeur : ${sellerInfos.firstname} ${sellerInfos.name}`, margin, 50, null, null);
  doc.text(`Email : ${sellerInfos.email}`, margin, 55, null, null);
  doc.text(`Téléphone : ${sellerInfos.phone}`, margin, 60, null, null);
  doc.text(`Adresse : ${sellerInfos.address}`, margin, 65, null, null);

  // Afficher les données sous forme de tableau
  const columns = ["Article", "Marque", "Taille", "Prix", "Ref article"];
  const rows = data.map(item => [item.name, item.brand, item.size, `${item.price}€`, item.id]);
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 80,
  });

  // display number of article in bold
  doc.setFont("helvetica", "bold");
  doc.text(`Nombre d'articles : ${data.length}`, 15, doc.autoTable.previous.finalY + 10, null, null);
  doc.setFont("helvetica", "normal");

  // Ajouter une nouvelle page pour les QR codes
  doc.addPage();
  margin = 20;

  // Ajouter le titre du document
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Liste des QRCodes à imprimer", 105, 20, null, null, "center");
  doc.setFont("helvetica", "normal");

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
    doc.addImage(qrCodeDataURL, "PNG", margin, y + 8, 30, 30);

    // Ajouter le titre du QR code à côté de celui-ci
    doc.setFontSize(12);
    doc.text(
      60,
      y + 11,
      `Article : ${data[i].name}\nMarque : ${data[i].brand}\nTaille : ${data[i].size}\nPrix : ${data[i].price}€\nREF : ${data[i].id}\nRef vendeur: ${data[i].seller_id}`
    );
    y += 45;

    // Dessiner une ligne sous le QRCode
    doc.setLineWidth(0.5);
    doc.line(15, y, 190, y);

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
