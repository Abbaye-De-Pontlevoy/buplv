export const downloadCSV = async (data, fileName) => {
  // Convertir les données en CSV
  const headers = Object.keys(data[0]).join(";");
  const rows = data.map((obj) => Object.values(obj).join(";")).join("\n");
  const csv = `${headers}\n${rows}`;

  // Ajoute la date actuelle au nom du fichier
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:]/g, "")
    .slice(0, -5);
  fileName += `_${formattedDate}.csv`;

  // Créer un objet Blob avec le contenu CSV
  const blob = new Blob([csv], { type: "text/csv" });

  // Créer un objet URL pour le Blob
  const url = window.URL.createObjectURL(blob);

  // Créer un élément d'ancre pour le téléchargement
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  // Simuler un clic sur le lien pour déclencher le téléchargement
  document.body.appendChild(link);
  link.click();

  // Nettoyer après le téléchargement
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
