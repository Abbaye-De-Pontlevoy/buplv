import React, { useState } from "react";

import "./styles.css";
import getPasswordStrength from "./getPasswordStrength";

/**
 * Renders a password strength meter component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the component.
 * @param {string} props.password - The password to measure the strength of.
 * @returns {JSX.Element} The rendered PasswordStrengthMeter component.
 */
const PasswordStrengthMeter = ({ className, password }) => {
    const strength = getPasswordStrength(password);

    return (
        <div className={className}>
            <progress
                className={`progress strength-${
                    strength <= 50 ? "red" : strength <= 80 ? "orange" : "green"
                }`}
                value={strength}
                max="100"
            >
                <div pseudo="-webkit-progress-inner-element -moz-progress-bar">
                    <div pseudo="-webkit-progress-bar">
                        <div pseudo="-webkit-progress-value"></div>
                    </div>
                </div>
            </progress>
        </div>
    );
};

export default PasswordStrengthMeter;
