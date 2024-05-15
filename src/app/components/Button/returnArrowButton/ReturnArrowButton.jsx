import { FaLongArrowAltLeft } from "react-icons/fa";

const ReturnArrowButton = ({ className, text, link }) => {
    return (
        <span className={className}>
            <FaLongArrowAltLeft />
            <a href={link} className="decoration-none">
                {text}
            </a>
        </span>
    );
};

export default ReturnArrowButton;
