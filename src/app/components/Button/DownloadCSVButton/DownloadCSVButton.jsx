import { useState } from "react";
import { downloadCSV } from "./downloadcsv";

const DownloadCSVButton = ({ dataGetterFunction, filename }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const download = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
          {loading ? "Téléchargement..." : "Télécharger CSV"}
        </button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default DownloadCSVButton;
