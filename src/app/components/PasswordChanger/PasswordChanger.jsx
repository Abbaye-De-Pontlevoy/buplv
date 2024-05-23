"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "../PasswordStrengthMeter/PasswordStrengthMeter";
import changePassword from "./passwordChangerAction";
import PasswordInput from "../PasswordInput/PasswordInput";

/**
 * Renders a form for changing the password.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the component.
 * @param {Object} props.modifiedAccount - The modified account object.
 * @returns {JSX.Element} The PasswordChanger component.
 */
const PasswordChanger = ({ className, modifiedAccount }) => {
    const formRef = useRef(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        modifiedAccount: modifiedAccount,
        password: "",
        password2: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        formRef.current
            .querySelector('input[name="password"]')
            .setCustomValidity("");
        formRef.current
            .querySelector('input[name="password2"]')
            .setCustomValidity("");

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Check if the passwords match
        const passwordInput = formRef.current.querySelector(
            'input[name="password"]',
        );

        const password2Input = formRef.current.querySelector(
            'input[name="password2"]',
        );
        const passwordStrengthComponent = formRef.current.querySelector(
            ".progress",
        );
        const passwordStrength = parseInt(passwordStrengthComponent.value);

        passwordInput.setCustomValidity("");
        password2Input.setCustomValidity("");

        // Validate password strength, match, and phone number format
        if (passwordStrength <= 50) {
            passwordInput.setCustomValidity("Your password is too weak.");
            passwordInput.reportValidity();
        } else if (passwordInput.value !== password2Input.value) {
            password2Input.setCustomValidity("Passwords do not match.");
            password2Input.reportValidity();
        } else if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
        } else {
            passwordInput.setCustomValidity("");
            password2Input.setCustomValidity("");

            const result = await changePassword(formData);

            if (result.success) {
                alert(result.message);
                router.push("/admin-panel");
            } else {
                setError(result.message);
            }
        }

        setIsLoading(false);
    };

    return (
        <div className={className}>
            <form ref={formRef} onSubmit={handleSubmit}>
                <label>Nouveau mot de passe :</label>
                <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={true}
                />
                <PasswordStrengthMeter password={formData.password} />
                <label>Vérification du mot de passe :</label>
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />

                <p className="error">{error}</p>

                <button type="submit" disabled={isLoading} className="margin-top-10 width-full">
                    Changer le mot de passe
                </button>
            </form>
        </div>
    );
};

export default PasswordChanger;
