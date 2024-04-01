
import { useState } from "react";
import { generatePDF } from "./generatePDF";

const QRCodePDFGenerator = ({ data }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    setIsDisabled(true);
    await generatePDF( data );
    setIsDisabled(false);
  };

  return <button onClick={handleClick} disabled={isDisabled}>Télécharger les QRCodes</button>;
};

export default QRCodePDFGenerator;
