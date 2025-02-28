import { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Plus, Trash2, Car } from 'lucide-react';
import { useState } from "react";
import CustomSelect from "./form/CustomSelect";
import ValidatedInput from "./form/ValidatedInput";

const MultiVehicleInput = ({ marcas, modelos, onChange, formVehiculos }) => {
    const [vehicles, setVehicles] = useState(() => [{
        index: 0,
        id: 0,
        marca: '',
        modelo: '',
        patente: '',
        chasis: '',
        modelosOptions: [],
        placeholderModelos: 'Primero seleccione una marca'
    }]);

    useEffect(() => {
        if (formVehiculos && formVehiculos.length > 0) {
            const mappedVehicles = formVehiculos.map((vehiculo, index) => {
                const marcaValue = vehiculo.marca || '';
                return {
                    index: index,
                    id_auto_cliente: vehiculo.id_auto_cliente,
                    id_auto: vehiculo.id_auto,
                    // id: vehiculo.id,
                    marca: marcaValue,
                    modelo: vehiculo.modelo || '',
                    patente: vehiculo.patente || '',
                    chasis: vehiculo.chasis || '',
                    modelosOptions: marcaValue ? getModelosMarca(marcaValue) : [],
                    placeholderModelos: marcaValue ? 'Seleccione un modelo' : 'Primero seleccione una marca'
                };
            });
            setVehicles(mappedVehicles);
        }
    }, [formVehiculos]);

    console.log("vehicles:", vehicles);

    const getModelosMarca = (marca) => {
        const modelosMarca = modelos
            .filter(modelo => modelo.marca === parseInt(marca))
            .map(modelo => ({
                value: modelo.id.toString(),
                label: modelo.modelo,
            }));

        return modelosMarca;
    };

    const handleVehicleChange = (index, field, value) => {
        const updatedVehicles = vehicles.map((vehicle, i) => {
            if (i === index) {
                if (field === "marca") {
                    return {
                        ...vehicle,
                        [field]: value,
                        modelo: '',
                        modelosOptions: getModelosMarca(value),
                        placeholderModelos: "Seleccione un modelo"
                    };
                }

                return { ...vehicle, [field]: value };
            }
            return vehicle;
        });

        setVehicles(updatedVehicles);
        onChange && onChange(updatedVehicles);
    };

    const addVehicle = () => {
        setVehicles([
            ...vehicles,
            {
                index: vehicles.length,
                id: 0,
                marca: '',
                modelo: '',
                patente: '',
                chasis: '',
                modelosOptions: []
            }
        ]);
    };

    const removeVehicle = (index) => {
        if (vehicles.length > 1) {
            const updatedVehicles = vehicles.filter((_, i) => i !== index);
            setVehicles(updatedVehicles);
            onChange && onChange(updatedVehicles);
        }
    };

    // Convertir marcas al formato que espera el CustomSelect
    const marcasOptions = marcas.map(marca => ({
        value: marca.id.toString(),
        label: marca.nombre,
    }));



    return (
        <div className="space-y-6 mt-10">
            {vehicles.map((vehicle, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg border border-blue-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    {/* Encabezado del vehículo */}
                    <div className="bg-blue-gray-50 p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-blue-gray-700" />
                            <Typography variant="h6" color="blue-gray">
                                Vehículo {index + 1}
                            </Typography>
                        </div>
                        {vehicles.length > 1 && (
                            <Button
                                variant="text"
                                color="red"
                                className="p-2"
                                onClick={() => removeVehicle(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Contenido del vehículo */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                            id="marca"
                            label="Marca vehículo"
                            options={marcasOptions}
                            value={vehicle.marca}
                            onChange={(value) => handleVehicleChange(index, 'marca', value)}
                            placeholder="Seleccione una marca"
                            required={true}
                        />
                        <CustomSelect
                            id="modelo"
                            label="Modelo vehículo"
                            options={vehicle.modelosOptions}
                            value={vehicle.modelo}
                            onChange={(value) => handleVehicleChange(index, 'modelo', value)}
                            placeholder={vehicle.placeholderModelos}
                            required={true}
                        />
                        <ValidatedInput
                            label="Patente vehículo *"
                            onChange={(e) => handleVehicleChange(index, 'patente', e.target.value)}
                            name="patente"
                            value={vehicle.patente}
                            required={true}
                            minLength={6}
                        />
                        <ValidatedInput
                            label="Número de chasis"
                            onChange={(e) => handleVehicleChange(vehicle.index, 'chasis', e.target.value)}
                            name="chasis"
                            value={vehicle.chasis}
                            minLength={10}
                        />
                    </div>
                </div>
            ))}

            {/* Botón para agregar Vehículo */}
            <Button
                color="green"
                type="button"
                className="mt-6 flex items-center gap-2"
                onClick={addVehicle}
            >
                <Plus className="h-4 w-4" />
                Agregar otro vehículo
            </Button>
        </div>
    );
};

export default MultiVehicleInput;