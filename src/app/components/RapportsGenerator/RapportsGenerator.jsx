import DownloadCSVButton from "../Button/DownloadCSVButton/DownloadCSVButton";
import { getRapportsIBAN } from "./rapportsAction";

const MyComponent = () => {
  return (
    <div>
      <DownloadCSVButton
        dataGetterFunction={getRapportsIBAN}
        filename="RAPPORT_IBAN"
      />
    </div>
  );
};

export default MyComponent;
