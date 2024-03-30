
import { FaLongArrowAltLeft } from "react-icons/fa";

import "./styles.css"

const ReturnMenuButton = () => {
  return (
    <span className="accueilReturn">
      <FaLongArrowAltLeft />
      <a href="/">Retour à l'accueil</a>
    </span>
  );
};

export default ReturnMenuButton;