import { Input, Select, Option, Button, Typography } from "@material-tailwind/react";
import { Plus, Trash2, Car } from 'lucide-react';
import { useState } from "react";

const MultiVehicleInput = ({onChange}) => {
    const [vehicles, setVehicles] = useState([
        { id:0, marca: '', modelo: '', patente: '', chasis: '' },
    ]);

    const handleVehicleChange = (index, field, value) => {
        const updatedVehicles = vehicles.map((vehicle, i) => {
            if (i === index) {
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
                id: vehicles.length,
                marca: '',
                modelo: '',
                patente: '',
                chasis: ''
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

    return (
        <div className="space-y-6 mt-10">
            {vehicles.map((vehicle, index) => (
                <div 
                    key={vehicle.id} 
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
                        <Select
                            variant="standard"
                            label="Marca vehículo *"
                            color="blue"
                            className="w-full"
                            value={vehicle.marca}
                            onChange={(value) => handleVehicleChange(index, 'marca', value)}
                        >
                            <Option value="">Seleccione una marca</Option>
                            <Option value="1">example 1</Option>
                            <Option value="2">example 2</Option>
                        </Select>
                        <Select
                            variant="standard"
                            label="Modelo vehículo *"
                            color="blue"
                            className="w-full"
                            value={vehicle.modelo}
                            onChange={(value) => handleVehicleChange(index, 'modelo', value)}
                        >
                            <Option value="">Seleccione un modelo</Option>
                            <Option value="1">example 1</Option>
                            <Option value="2">example 2</Option>
                        </Select>
                        <Input
                            variant="standard"
                            value={vehicle.patente}
                            color="blue"
                            label="Patente vehículo *"
                            type="text"
                            className="w-full"
                            onChange={(e) => handleVehicleChange(index, 'patente', e.target.value)}
                        />
                        <Input
                            variant="standard"
                            value={vehicle.chasis}
                            color="blue"
                            label="Número de chasis *"
                            type="text"
                            className="w-full"
                            onChange={(e) => handleVehicleChange(index, 'chasis', e.target.value)}
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