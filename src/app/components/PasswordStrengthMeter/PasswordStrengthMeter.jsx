import React, { useState } from "react";

import "./styles.css";
import getPasswordStrength from "./getPasswordStrength";

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
