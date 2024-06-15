import jsPDF from "jspdf";
import "jspdf-autotable";
import { getUserInfosByID } from "@/app/helpers/getUserInfos";
import { getArticleList } from "../Article/ArticleGestionnary/removeArticleAction";


export const getPdfFromSellerID = async (sellerID) => {
  // Get all articles from the seller
    const articles = await getArticleList(sellerID);

    // Get the seller informations
    const sellerInfos = await getUserInfosByID(sellerID);

    // Generate the PDF
    return generatePDF(articles, sellerInfos, `QRCODES_TO_PRINT_${sellerInfos.name}_${sellerInfos.firstname}.pdf`);
}

/**
 * Generates a PDF document with a summary and QR codes for the given data and seller information.
 * @param {Array} data - The array of items to be included in the PDF.
 * @param {Object} sellerInfos - The information of the seller.
 * @returns {Promise<void>} - A promise that resolves when the PDF is generated and saved.
 */
export async function generatePDF(data, sellerInfos, filename="QRCODES_TO_PRINT.pdf") {
  const doc = new jsPDF();
  let margin = 15;

  // TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Récapitulatif (à imprimer)", 105, 20, null, null, "center");

  // SUBTITLE
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("Imprimer et fixer fermement sur le sac contenant\nla TOTALITÉ des articles à vendre.", 105, 26, null, null, "center");

  // Add seller information
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Vendeur : ${sellerInfos.firstname} ${sellerInfos.name}`, margin, 50, null, null);
  doc.text('ID Vendeur : ' + sellerInfos.id, margin, 55, null, null);
  doc.text(`Mail : ${sellerInfos.email}`, margin, 60, null, null);
  doc.text(`Téléphone : ${sellerInfos.phone}`, margin, 65, null, null);
  doc.text(`Adresse : ${sellerInfos.address}`, margin, 70, null, null);

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

  // TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Liste des QR codes (à imprimer)", 105, 20, null, null, "center");

  // SUBTITLE
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("QR codes et description à découper et à agrafer\nsur l'étiquette de chaque vêtement (cf. emplacement de l'agrafe)", 105, 26, null, null, "center");

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
    doc.addImage(qrCodeDataURL, "PNG", margin, y + 5, 20, 20);

    // Add the QR code title next to it
    // Add staple illustration
    doc.setLineWidth(0.5);
    doc.line(margin+30, y+3, margin+32, y+3);
    doc.line(margin+33, y+3, margin+32, y+3);

    // QR code data
    doc.setFontSize(8);
    doc.text(
      margin + 30,
      y + 8,
      `Article : ${data[i].name}\nMarque : ${data[i].brand}\nTaille : ${data[i].size}\nPrix : ${data[i].price}€\nRef : ${data[i].id}\nRef Vendeur: ${data[i].seller_id}`
    );

    // Draw a line over the QR code
    doc.setLineWidth(0.3);
    doc.line(margin-5, y, margin+72, y);

    // Draw a line at left and right of the QR code
    doc.setLineWidth(0.3);
    doc.line(margin-5, y, margin-5, y+27);
    doc.line(margin+72, y, margin+72, y+27);

    y += 27;

    // Draw a line under the QR code
    doc.setLineWidth(0.3);
    doc.line(margin-5, y, margin+72, y);

    // if we are on the bottom of the page, use the next side
    // if we are already on the next side, add a new page
    if (y > 240) {
      if(margin === 20)
        margin = 100;
      else{
        doc.addPage();
        margin = 20;
        // add title and subtitle again
        // TITLE
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Liste des QR codes (à imprimer)", 105, 20, null, null, "center");

        // SUBTITLE
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.text("QR codes et description à découper et à agrafer\nsur l'étiquette de chaque vêtement (cf. emplacement de l'agrafe)", 105, 26, null, null, "center");

        doc.setFont("helvetica", "normal");
      }
      y = 40;
    }
  }

  doc.save(filename);
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
