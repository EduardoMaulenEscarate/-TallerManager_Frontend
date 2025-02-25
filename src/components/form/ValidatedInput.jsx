import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";

const ValidatedInput = ({
    label,
    value,
    variant = "standard",
    onChange,
    name,
    color = "blue",
    type = "text",
    required = false,
    requiredMessage = "Este campo es obligatorio",
    minLength = 0,
    minLengthMessage = "No cumple con la longitud mínima requerida",
    customErrorMessage,
    className = "w-full",
    ...props
}) => {
    const [error, setError] = useState("");

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }

        validateInput(e.target.value);
    };

    const handleBlur = (value) => {
        validateInput(value);
    };

    const validateInput = (inputValue) => {
        // Validación de campo requerido
        if (required && (!inputValue || inputValue.trim() === "")) {
            setError(requiredMessage);
            return;
        }

        // Validación de longitud mínima
        if (minLength > 0 && inputValue.length < minLength) {
            setError(minLengthMessage);

            if (!required && inputValue.length === 0) {
                setError("");
            }
            return
        }

        // Sin errores
        setError("");
    };

    return (
        <div className={`${className}`}>
            <Input
                type={type}
                label={label}
                variant={variant}
                color={color}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={(e) => (handleBlur(e.target.value))}
                error={!!error}
                {...props}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ValidatedInput;