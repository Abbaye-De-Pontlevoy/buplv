import DownloadCSVButton from "../Button/DownloadCSVButton/DownloadCSVButton";
import { getRapportsIBAN } from "./rapportsAction";

const RapportsGenerator = () => {
  return (
    <div>
      <DownloadCSVButton
        dataGetterFunction={getRapportsIBAN}
        filename="RAPPORT_IBAN"
      />
    </div>
  );
};

export default RapportsGenerator;
