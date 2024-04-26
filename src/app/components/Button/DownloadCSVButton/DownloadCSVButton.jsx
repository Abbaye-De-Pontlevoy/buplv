import { useState } from "react";
import { downloadCSV } from "./downloadcsv";

const DownloadCSVButton = ({ dataGetterFunction, filename, buttonText }) => {
  // Initialize state variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle the download form submission
  const download = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get the data, transorm it into a CSV and download it
      const data = await dataGetterFunction();
      await downloadCSV(data, filename);
    } catch (e) {
      setError(
        "Erreur lors du chargement des données. Essayez de recharger la page."
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={download}>
        <button type="submit" disabled={loading}>
          {loading ? "Téléchargement..." : buttonText}
        </button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default DownloadCSVButton;
