
import { FaLongArrowAltLeft } from "react-icons/fa";

import "./styles.css"

const ReturnArrowButton = ({className, text, link}) => {
  return (
    <span className={"accueilReturn " + className}>
      <FaLongArrowAltLeft />
      <a href={link}>{text}</a>
    </span>
  );
};

export default ReturnArrowButton;