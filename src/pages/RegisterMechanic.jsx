import { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { useForm } from "../hooks/useForm";

const RegisterMechanic = ({ setTitulo }) => {
    useEffect(() => {setTitulo('Agregar Mecánico');}, [setTitulo]);

    const { formData, handleChange, handleSubmit } = useForm({
        values:  {
            username: 'mecanico1',
            firstName: 'Juan',
            lastName: 'Pérez',
            permission: '2',
            phone: '+56953046796',
            email: 'correo@correo.com',
            address: 'Calle falsa 123'},
        formValidator: 'registerMechanicValidation',
        sendTo: '/usuario/agregarUsuario'});
    
    const values = {
       
    }

    return (
        <div>
            <div className="flex-1 overflow-auto p-4 lg:p-6">
                <div className="max-w mx-auto">
                    {/* Encabezado con instrucciones */}
                    <Card className="w-full">
                        <CardBody>
                            <Typography variant="paragraph" color="gray" className="mb-4">
                                Complete todos los campos para registrar un nuevo cliente en el sistema.
                                Los campos marcados con * son obligatorios.
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                
                <div className="mt-6 mx-auto">
                    <Card className="w-full">
                        <CardBody>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Sección Datos del Mecánico */}
                                <div>
                                    <Typography variant="h5" color="blue-gray" className="mb-4">
                                        Datos del Mecánico
                                    </Typography>
                                    <hr className="mb-6" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Input
                                            variant="standard"
                                            name="username"
                                            color="blue"
                                            label="Nombre de usuario *"
                                            type="text"
                                            className="w-full"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                        <Select
                                            variant="standard"
                                            name="permission"
                                            color="blue"
                                            label="Permiso de Usuario *"
                                            className="w-full"
                                            value={formData.permission}
                                            onChange={handleChange}
                                        >
                                            <Option value="1">Administrador</Option>
                                            <Option value="2" selected>Solo mecánico</Option>
                                        </Select>
                                        <Input
                                            variant="standard"
                                            name="firstName"
                                            color="blue"
                                            label="Nombre *"
                                            type="text"
                                            className="w-full"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            
                                        />
                                        <Input
                                            variant="standard"
                                            name="lastName"
                                            color="blue"
                                            label="Apellido *"
                                            type="text"
                                            className="w-full"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                </div>

                                {/* Sección Datos de Contacto */}
                                <div className="mt-8">
                                    <Typography variant="h5" color="blue-gray" className="mb-4">
                                        Datos de contacto
                                    </Typography>
                                    <hr className="mb-6" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Input
                                            variant="standard"
                                            name="phone"
                                            color="blue"
                                            label="Teléfono *"
                                            type="tel"
                                            className="w-full"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            
                                        />
                                        <Input
                                            variant="standard"
                                            name="email"
                                            color="blue"
                                            label="Email *"
                                            type="email"
                                            className="w-full"
                                            value={formData.email}
                                            onChange={handleChange}
                                            
                                        />
                                        <Input
                                            variant="standard"
                                            name="address"
                                            color="blue"
                                            label="Dirección"
                                            type="text"
                                            className="w-full md:col-span-2"
                                            value={formData.address}
                                            onChange={handleChange}

                                        />
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-end gap-4 mt-8">
                                    <Button 
                                        color="blue-gray"
                                        className="flex-shrink-0"
                                        onClick={() => window.history.back()}
                                    >
                                        Volver
                                    </Button>
                                    <Button 
                                        type="submit"
                                        color="blue"
                                        className="flex-shrink-0"
                                    >
                                        Registrar Mecánico
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RegisterMechanic;