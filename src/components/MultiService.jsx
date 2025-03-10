import CustomSelect from "./form/CustomSelect";
import ValidatedInput from "./form/ValidatedInput";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Plus, Trash2, Wrench } from 'lucide-react';

/**
 * @fileoverview Componente para agregar varios servicios a una orden
 * @param {object} formData - Datos del formulario
 * @param {function} setFormData - Función para actualizar los datos del formulario
 * @param {array} serviceOptions - Opciones para los servicios (Select)
 * @returns {JSX.Element} - Componente de React
 
 */
const MultiService = ({ formData, setFormData, servicesOptions,
                        totalServices, setTotal, total, setTotalServices
                     }) => {
    const [services, setServices] = useState(formData.services);
    // Agrega un nuevo servicio al formulario
    const addService = () => {
        setServices([
            ...services,
            { service: "", price: "" }
        ])
    };

    /**
     * Elimina un servicio en la posición index
     * @param {number} index - Posición del servicio a eliminar
    */
    const removeService = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
        setFormData({ ...formData, services: updatedServices });
    }
    
    /**
     * Actualiza el servicio en la posición index
     * @param {number} index - Posición del servicio
     * @param {string} field - Campo a actualizar
     * @param {string|number} value - Valor a asignar
    */
    const handleServiceChange = (index, field, value) => {
        const updatedServices = services.map((service, i) => {
            if (i === index) {
                return { ...service, [field]: value}
            }

            return service;
        })

        if (field === "price") {
            console.log("price", value);
            
            setTotalServices(
                updatedServices.reduce((acc, curr) => {
                    return acc + (curr.price * 1);
                }, 0)
            );
        }

        setServices(updatedServices);
        setFormData({ ...formData, services: updatedServices });
    }


    return (
        <>
            {/* Servicios */}
            <div className="space-y-6 mt-10">
                <div
                    className="bg-white rounded-lg border border-blue-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    {/* Encabezado del vehículo */}
                    <div className="bg-blue-gray-50 p-4 rounded-t-lg flex justify-between items-center align-middle">
                        <div className="flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-blue-gray-700" />
                            <Typography variant="h6" color="blue-gray">
                                Servicios
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Subtotal: ${totalServices}
                            </Typography>
                        </div>
                    </div>
                    {
                services.map((service, index) => {
                    return (
                        <div className="flex items-center w-full justify-between " key={index}>
                            <div  className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                <CustomSelect
                                    label={"Repuesto"}
                                    value={service.service}
                                    options={servicesOptions}
                                    required={true}
                                    onChange={(value) => handleServiceChange(index, 'service', value)}
                                    className="col-span-2"
                                />
                                <ValidatedInput
                                    label="Precio"
                                    name="price"
                                    value={service.price}
                                    onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                    required={true}
                                    type="number"
                                    min={1}
                                />
                                
                            </div>   
                            <div className="pr-4">
                                {services.length > 1 && (
                                    <Button
                                        variant="text"
                                        color="red"
                                        className="p-2 "
                                        onClick={() => removeService(index)}
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
                onClick={addService}
            >
                <Plus className="h-4 w-4" />
                Agregar otro servicio
            </Button>
                </div>
            </div>
            
        </>
    )
}

export default MultiService;