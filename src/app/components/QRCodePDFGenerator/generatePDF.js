import jsPDF from "jspdf";
import "jspdf-autotable";

export async function generatePDF(data, sellerInfos) {
  const doc = new jsPDF();
  let margin = 15;

  // Add the PETIT TRAIN page
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Petit Train (à imprimer)", 105, 20, null, null, "center");

  // Add seller information
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Vendeur : ${sellerInfos.firstname} ${sellerInfos.name}`, margin, 50, null, null);
  doc.text(`Mail : ${sellerInfos.email}`, margin, 55, null, null);
  doc.text(`Téléphone : ${sellerInfos.phone}`, margin, 60, null, null);
  doc.text(`Adresse : ${sellerInfos.address}`, margin, 65, null, null);

  // Display data as a table
  const columns = ["Article", "Marque", "Taille", "Prix", "Ref Article"];
  const rows = data.map(item => [item.name, item.brand, item.size, `${item.price}€`, item.id]);
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 80,
  });

  // Display number of items in bold
  doc.setFont("helvetica", "bold");
  doc.text(`Nombre d'articles : ${data.length}`, 15, doc.autoTable.previous.finalY + 10, null, null);
  doc.setFont("helvetica", "normal");

  // Add a new page for the QR codes
  doc.addPage();
  margin = 20;

  // Add the document title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Liste des QR codes (à imprimer)", 105, 20, null, null, "center");
  doc.setFont("helvetica", "normal");

  // Initial position for the first QR code
  let y = 40;

  // Loop through each QR code
  for (let i = 0; i < data.length; i++) {
    // Generate the QR code as an image
    const jsonString = JSON.stringify({
      id: data[i].id,
      name: data[i].name,
      brand: data[i].brand,
      size: data[i].size,
      price: data[i].price,
    });
    const qrCodeDataURL = await generateQRCodeDataURL(jsonString);

    // Add the QR code at the specified position in the PDF
    doc.addImage(qrCodeDataURL, "PNG", margin, y + 8, 30, 30);

    // Add the QR code title next to it
    doc.setFontSize(12);
    doc.text(
      60,
      y + 11,
      `Article : ${data[i].name}\nMarque : ${data[i].brand}\nTaille : ${data[i].size}\nPrix : ${data[i].price}€\nRef : ${data[i].id}\nRef Vendeur: ${data[i].seller_id}`
    );
    y += 45;

    // Draw a line under the QR code
    doc.setLineWidth(0.5);
    doc.line(15, y, 190, y);

    // Add a new page if necessary
    if (y > 240) {
      doc.addPage();
      y = 10;
    }
  }

  doc.save("QRCODES_TO_PRINT.pdf");
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
