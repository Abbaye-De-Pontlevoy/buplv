import Image from "next/image";
import logo_plv from "../../assets/logo_plv_reduced.webp";
import AccountButton from "../Button/AccountButton/AccountButton";

import "./styles.css";

// Header component
/**
 * Header component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the header container.
 * @param {boolean} [props.displayAccountButton=true] - Whether to display the account button or not.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ className, displayAccountButton = true }) => {
    return (
        <div className={"header " + className}>
            {displayAccountButton && <AccountButton className="self-right" />}
            <a href="/" className="decoration-none text-center">
                <div className="width-full height-100">
                    {/* Logo image */}
                    <Image
                        src={logo_plv}
                        alt="logo"
                        className="width-full height-full object-fit-contain"
                        priority={true}
                    />
                </div>
                {/* Title */}
                <h1>BOURSE À L'UNIFORME</h1>
            </a>
        </div>
    );
};

export default Header;
