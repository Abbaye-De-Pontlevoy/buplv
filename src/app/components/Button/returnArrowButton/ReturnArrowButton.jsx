import { FaLongArrowAltLeft } from "react-icons/fa";

/**
 * ReturnArrowButton component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @param {string} props.text - The text to display in the button.
 * @param {string} props.link - The link to navigate to when the button is clicked.
 * @returns {JSX.Element} The rendered ReturnArrowButton component.
 */
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
