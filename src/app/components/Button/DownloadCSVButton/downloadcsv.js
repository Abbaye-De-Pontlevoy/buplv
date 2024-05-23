/**
 * Downloads data as a CSV file.
 * @param {Array<Object>} data - The data to be converted to CSV.
 * @param {string} fileName - The name of the CSV file.
 * @returns {Promise<void>} - A promise that resolves when the download is complete.
 */
export const downloadCSV = async (data, fileName) => {
  // Convert data to CSV
  const headers = Object.keys(data[0]).join(";");
  const rows = data.map((obj) => Object.values(obj).join(";")).join("\n");
  const csv = `${headers}\n${rows}`;

  // Add current date to the file name
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:]/g, "")
    .slice(0, -5);
  fileName += `_${formattedDate}.csv`;

  // Create a Blob object with the CSV content
  const blob = new Blob([csv], { type: "text/csv" });

  // Create a URL object for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create an anchor element for the download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  // Simulate a click on the link to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up after the download
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
