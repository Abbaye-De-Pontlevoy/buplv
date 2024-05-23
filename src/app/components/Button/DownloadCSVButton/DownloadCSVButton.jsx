import { useState } from "react";
import { downloadCSV } from "./downloadcsv";

/**
 * A button component that allows downloading data as a CSV file.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the button container.
 * @param {Function} props.dataGetterFunction - The function that retrieves the data to be downloaded.
 * @param {string} props.filename - The name of the downloaded CSV file.
 * @param {string} props.buttonText - The text to be displayed on the button.
 * @returns {JSX.Element} The DownloadCSVButton component.
 */
const DownloadCSVButton = ({
    className,
    dataGetterFunction,
    filename,
    buttonText,
}) => {
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
                "Erreur lors du chargement des données. Essayez de recharger la page.",
            );
        }
        setLoading(false);
    };

    return (
        <div className={className}>
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
