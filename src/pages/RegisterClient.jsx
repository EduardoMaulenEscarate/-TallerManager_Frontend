import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { Input, Button, Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import FormActionButtons from "../components/FormActionButtons";
import MultiVehicleInput from "../components/MultiVehicleInput";

const RegisterClient = ({ setTitulo }) => {
    useEffect(() => { setTitulo('Agregar Cliente'); });
    const { handleChange, handleSubmit } = useForm({
        values: {
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
            vehiculos: []
        },
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
                                    <Input
                                        variant="standard"
                                        name="nombre"
                                        color="blue"
                                        label="Nombre *"
                                        type="text"
                                        className="w-full"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        variant="standard"
                                        name="direccion"
                                        color="blue"
                                        label="Dirección *"
                                        type="text"
                                        className="w-full"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        variant="standard"
                                        name="telefono"
                                        color="blue"
                                        label="Teléfono *"
                                        type="number"
                                        className="w-full"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        variant="standard"
                                        name="correo"
                                        color="blue"
                                        label="Correo *"
                                        type="text"
                                        className="w-full"
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="mt-11">
                                    {/* Datos Vehículo */}
                                    <Typography variant="lead">
                                        Vehiculos cliente
                                    </Typography>
                                    <hr />
                                    {/* aqui los campos de vehiculo */}
                                    <MultiVehicleInput onChange={(vehiculos) => {
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