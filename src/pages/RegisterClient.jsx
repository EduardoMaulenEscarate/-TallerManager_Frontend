import { useForm } from "../hooks/useForm";
import { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import FormActionButtons from "../components/FormActionButtons";
import MultiVehicleInput from "../components/MultiVehicleInput";
import ValidatedInput from "../components/form/ValidatedInput";

import api from "../api/api";

const RegisterClient = ({ setTitulo }) => {
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        setTitulo('Agregar Cliente');

        const fetchMarcas = async () => {
            try {
                const response = await api.get('auto/marcas');
                setMarcas(response.data.data);

            } catch (error) {
                console.log('Error al obtener marcas:', error);
            }
        }

        const fetchModelos = async () => {
            try {
                const response = await api.get('auto/modelos');
                setModelos(response.data.data);
            } catch (error) {
                console.log('Error al obtener modelos:', error);
            }
        }
        fetchMarcas();
        fetchModelos();
    }, []);

    const { formData, handleChange, handleSubmit } = useForm({
        values: {
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
            vehiculos: []
        },
        sendTo: '/cliente/agregarCliente',
        formValidator: 'registerClientValidation'
    });
    return (
        <div>
            <div className="flex-1 overflow-auto p-4 lg:p-6">
                {/* Encabezado con instrucciones */}
                <div className="max-w mx-auto">
                    <Card className="w-full">
                        <CardBody>
                            <Typography variant="paragraph" color="gray" className="mb-4">
                                Complete todos los campos para registrar un nuevo cliente en el sistema.
                                Los campos marcados con * son obligatorios.
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* Formulario para agregar cliente */}
                <form onSubmit={handleSubmit}>
                    <Card className="mt-6">
                        <CardBody className="">
                            <div>
                                {/* Datos Cliente */}
                                <Typography variant="lead">
                                    Datos cliente
                                </Typography>
                                <hr />
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ValidatedInput
                                        label="Nombre *"
                                        onChange={handleChange}
                                        name="nombre"
                                        type="text"
                                        value={formData.nombre}
                                        required={true}
                                        minLength={3}
                                        className="w-full"
                                    />

                                    <ValidatedInput
                                        label="Dirección *"
                                        onChange={handleChange}
                                        name="direccion"
                                        type="text"
                                        value={formData.direccion}
                                        required={true}
                                        minLength={3}
                                        className="w-full"
                                    />

                                    <ValidatedInput
                                        label="Teléfono *"
                                        onChange={handleChange}
                                        name="telefono"
                                        type="number"
                                        value={formData.telefono}
                                        required={true}
                                        minLength={9}
                                        className="w-full"
                                    />

                                    <ValidatedInput
                                        label="Correo"
                                        onChange={handleChange}
                                        name="correo"
                                        value={formData.correo}
                                        minLength={6}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mt-11">
                                    {/* Datos Vehículo */}
                                    <Typography variant="lead">
                                        Vehiculos cliente
                                    </Typography>
                                    <hr />
                                    {/* aqui los campos de vehiculo */}
                                    <MultiVehicleInput marcas={marcas} modelos={modelos} onChange={(vehiculos) => {
                                        handleChange({ target: { name: 'vehiculos', value: vehiculos } });
                                    }} />
                                    {/* aqui los botones */}
                                    <FormActionButtons />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </div>

        </div>
    );
}

export default RegisterClient;