import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({
    id,
    options,
    value,
    onChange,
    label,
    placeholder = "Seleccione una opción",
    className = "",
    required = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const selectRef = useRef(null);

    // Encuentra el option para el valor seleccionado
    useEffect(() => {
        if (value) {
            const option = options.find(opt => opt.value === value);
            setSelectedLabel(option ? option.label : "");
        } else {
            setSelectedLabel("");
        }
    }, [value, options]);

    // Cierra el dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // imita la animación de la línea de un input de tailwindcss material
    const lineAnimation = `
        @keyframes expandLine {
        0% {
            width: 0;
            left: 50%;
        }
        100% {
            width: 100%;
            left: 0;
        }
        }

        @keyframes shrinkLine {
            0% {
                width: 100%;
                left: 0;
            }
            100% {
                width: 0;
                left: 50%;
            }
    `;

    return (
        <div id={id} className={`relative w-full ${className} `} ref={selectRef}>
            <style>{lineAnimation}</style>

            {/* Nombre del select */}
            {label && (
                <label className="block text-xs font-medium text-gray-600 label-title">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                <div
                    className="w-full border-b border-gray-300 py-2 pr-8 flex items-center cursor-pointer"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setIsFocused(true);
                    }}
                >
                    <span className={`${"text-gray-700"}  text-sm`}>
                        {selectedLabel || placeholder}
                    </span>
                    <ChevronDown
                        className={`absolute right-0 h-5 w-5 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""
                            }`}
                    />
                </div>

                {/* Línea de animación */}
                {isFocused ? (
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                        style={{
                            width: '100%',
                            animation: 'expandLine 0.3s ease-out forwards'
                        }}
                    />
                ) : (
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                        style={{
                            width: '0%',
                            animation: 'shrinkLine 0.3s ease-out forwards'
                        }}
                    />
                )}
            </div>

            {/* options */}
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.length === 0 ? (
                        <li className="px-3 py-2 text-gray-500 text-sm">No hay opciones disponibles</li>
                    ) : (

                        options.map((option) => (
                            <li
                                key={option.value}
                                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${option.value === value ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                    }  text-sm`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {
                                    option.svg ? (
                                        <div className="flex items-center gap-2">
                                            <span><img className="w-4" src={`/logos/${option.svg}`} alt={option.svg} /></span>
                                            <span>{option.label}</span>
                                        </div>
                                    ) : (
                                        option.label
                                    )
                                }
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;