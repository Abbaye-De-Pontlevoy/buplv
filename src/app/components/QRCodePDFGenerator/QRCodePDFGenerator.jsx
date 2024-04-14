
import { useState } from "react";
import { generatePDF } from "./generatePDF";
import { getUserInfos } from "@/app/helpers/getUserInfos";

const QRCodePDFGenerator = ({ data }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    setIsDisabled(true);
    const sellerInfos = await getUserInfos();
    await generatePDF( data, sellerInfos );
    setIsDisabled(false);
  };

  return <button onClick={handleClick} disabled={isDisabled}>Télécharger les QRCodes</button>;
};

export default QRCodePDFGenerator;
