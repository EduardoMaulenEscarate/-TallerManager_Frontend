import CustomSelect from "./form/CustomSelect";
import ValidatedInput from "./form/ValidatedInput";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Plus, Trash2, ArchiveRestore } from 'lucide-react';

/**
 * @fileoverview Componente para agregar varios repuestos a una orden
 * @param {object} formData - Datos del formulario
 * @param {function} setFormData - Función para actualizar los datos del formulario
 * @param {array} sparePartsOptions - Opciones para los repuestos (Select)
 * @returns {JSX.Element} - Componente de React
 */
const MultiSpareParts = ({ formData, setFormData, sparePartsOptions, 
                           totalSpareParts, setTotalSpareParts }) => {
    
    const [spareParts, setSpareParts] = useState(formData.spareParts);

    // Agrega un nuevo repuesto al formulario
    const addSparePart = () => {
        setSpareParts([
            ...spareParts,
            { sparePart: "", quantity: "", price: "" }
        ]);
    };
    
    /**
     * Actualiza el repuesto en la posición index
     * @param {number} index - Posición del repuesto
     * @param {string} field - Campo a actualizar
     * @param {string|number} value - Valor a asignar
    */
    const handleSparePartChange = (index, field, value) => {
        const updatedSpareParts = spareParts.map((sparePart, i) => {
            if (i === index) {
                return { ...sparePart,[field]: value }
            }

            return sparePart;
        })

        if (field === 'quantity' || field === 'price') {
            setTotalSpareParts(
                updatedSpareParts.reduce((acc, curr) => {
                    return acc + (curr.quantity * curr.price);
                }, 0)
            );
        }

        setSpareParts(updatedSpareParts);
        setFormData({ ...formData, spareParts: updatedSpareParts }); 
    }

    /** 
     * Elimina un repuesto en la posición index
     * @param {number} index - Posición del repuesto a eliminar  
    */
    const removeSparePart = (index) => {
        const updatedSpareParts = spareParts.filter((_, i) => i !== index);
        setSpareParts(updatedSpareParts);
        setTotalSpareParts(
            updatedSpareParts.reduce((acc, curr) => {
                return acc + (curr.quantity * curr.price);
            }, 0)
        );
        setFormData({ ...formData, spareParts: updatedSpareParts });
    }

    return (
        <>
            {/* Repuesto */}
            <div className="space-y-6 mt-10">
                <div
                    className="bg-white rounded-lg border border-blue-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                {/* Encabezado del vehículo */}
                <div className="bg-blue-gray-50 p-4 rounded-t-lg flex justify-between items-center align-middle">
                    <div className="flex items-center gap-2">
                        <ArchiveRestore className="h-5 w-5 text-blue-gray-700" />
                        <Typography variant="h6" color="blue-gray">
                            Repuestos
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                        Subtotal: ${totalSpareParts}
                        </Typography>
                    </div>
                </div>
                {
                    spareParts.map((sparePart, index) => {
                        return ( 
                            <div className="flex items-center w-full justify-between " key={index}>
                                <div  className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <CustomSelect
                                        label={"Repuesto"}
                                        value={sparePart.sparePart}
                                        options={sparePartsOptions}
                                        required={true}
                                        onChange={(value) => handleSparePartChange(index, 'sparePart', value)}
                                    />
                                    <ValidatedInput
                                        label="Cantidad"
                                        name="quantity"
                                        value={sparePart.quantity}
                                        onChange={(e) => handleSparePartChange(index, 'quantity', e.target.value)}
                                        required={true}
                                        type="number"
                                        min={1}
                                    />
                                    <ValidatedInput
                                        label="Precio"
                                        name="price"
                                        value={sparePart.price}
                                        onChange={(e) => handleSparePartChange(index, 'price', e.target.value)}
                                        required={true}
                                        type="number"
                                        min={1}
                                    />
                                </div>   
                                <div className="pr-4">
                                    {spareParts.length > 1 && (
                                        <Button
                                            variant="text"
                                            color="red"
                                            className="p-2 "
                                            onClick={() => removeSparePart(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>       
                            </div>
                        )
                    })
                }
            
            {/* Botón para agregar Repuesto */}
            <Button
                color="green"
                type="button"
                className=" flex items-center gap-2 w-fit m-4"
                onClick={addSparePart}
            >
                <Plus className="h-4 w-4" />
                Agregar otro repuesto
            </Button>
                </div>
            </div>
        </>
    );
}

export default MultiSpareParts;