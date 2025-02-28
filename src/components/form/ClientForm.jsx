import MultiVehicleInput from "../MultiVehicleInput";
import { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ValidatedInput from "./ValidatedInput";
import FormActionButtons from "../FormActionButtons";
import api from "../../api/api";
const ClientForm = ({ handleChange, formData, handleSubmit }) => {
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
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


    return (
        <div>
            <div className="flex-1 overflow-auto p-4 lg:p-6">
                {/* Encabezado con instrucciones */}
                <div className="max-w mx-auto">
                    <Card className="w-full bg-yellow-100">
                        <CardBody>
                            <Typography variant="paragraph" color="gray">
                                Complete todos los campos para enviar el formulario.
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
                                    <MultiVehicleInput marcas={marcas} modelos={modelos} formVehiculos={formData.vehiculos} onChange={(vehiculos) => {
                                        handleChange({ target: { name: 'vehiculos', value: vehiculos } });
                                    }} />
                                    {/* aqui los botones */}
                                    <FormActionButtons />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    {
                        formData.id && (
                            <input type="hidden" name="id" value={formData.id} />
                        )
                    }
                </form>
            </div>

        </div>
    )
}

export default ClientForm;