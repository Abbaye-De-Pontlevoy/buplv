import { useState } from "react";
import { generatePDF } from "./generatePDF";
import { getUserInfos } from "@/app/helpers/getUserInfos";

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
