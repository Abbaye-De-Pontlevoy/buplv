import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

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
