import { useState } from "react";
import { generatePDF } from "./generatePDF";
import { getUserInfos } from "@/app/helpers/getUserInfos";

/**
 * Component for generating QR code PDFs.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the button.
 * @param {string} props.data - The data used for generating the QR code PDFs.
 * @returns {JSX.Element} The QRCodePDFGenerator component.
 */
const QRCodePDFGenerator = ({ className, data }) => {
    // Initialize state variables
    const [isDisabled, setIsDisabled] = useState(false);

    // Handle button click
    const handleClick = async () => {
        setIsDisabled(true);
        const sellerInfos = await getUserInfos();
        await generatePDF(data, sellerInfos);
        setIsDisabled(false);
    };

    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={isDisabled}
        >
            {isDisabled ? "Téléchargement..." : "Télécharger les QRCodes"}
        </button>
    );
};

export default QRCodePDFGenerator;
