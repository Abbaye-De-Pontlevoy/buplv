"use client";

import { useState } from "react";
import { getCsvFromDatabase } from "./getCsvFromDatabase";
import JSZip from "jszip";

const DatabaseToJsonButton = ({ className }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Function to download the CSV files as a ZIP
    const downloadCsvAsZip = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const csvData = await getCsvFromDatabase();
            const zip = new JSZip();

            // Add each CSV to the ZIP file
            csvData.forEach(table => {
                zip.file(`${table.tableName}.csv`, table.csv);
            });

            // Generate the ZIP file and create a Blob
            const zipBlob = await zip.generateAsync({ type: "blob" });

            // Create a URL for the Blob
            const url = URL.createObjectURL(zipBlob);

            // Create a download link and simulate a click
            const link = document.createElement("a");
            link.href = url;
            link.download = "BUPLV_BDD_" + Date.now() + ".zip";
            document.body.appendChild(link);
            link.click();

            // Clean up the DOM by removing the link and revoking the object URL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (e) {
            setError("Erreur lors du téléchargement des données.");
        }

        setLoading(false);
    };

    return (
        <div className={className}>
            <form onSubmit={downloadCsvAsZip}>
                <button type="submit" disabled={loading}>
                    {loading
                        ? "Téléchargement..."
                        : "Télécharger une copie de la BDD"}
                </button>
                <p className="error">{error}</p>
            </form>
        </div>
    );
};

export default DatabaseToJsonButton;