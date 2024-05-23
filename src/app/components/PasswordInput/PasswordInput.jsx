import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

/**
 * PasswordInput component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.value - The value of the input element.
 * @param {function} props.onChange - The onChange event handler for the input element.
 * @param {boolean} props.required - Indicates whether the input is required.
 * @returns {JSX.Element} The PasswordInput component.
 */
const PasswordInput = ({ className, name, value, onChange, required }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <span className={className}>
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Mot de passe"
				required={required}
            />
            {!showPassword ? (
                <FaRegEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="showPassword"
                />
            ) : (
                <FaRegEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="showPassword"
                />
            )}
        </span>
    );
};

export default PasswordInput;
