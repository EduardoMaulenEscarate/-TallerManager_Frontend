import { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { useForm } from "../hooks/useForm";
import UserForm from "../components/form/UserForm";

const RegisterMechanic = ({ setTitulo }) => {
    useEffect(() => { setTitulo('Agregar Mecánico'); }, [setTitulo]);

    const { formData, handleChange, handleSubmit } = useForm({
        /*  values: {
             username: 'mecanico1',
             firstName: 'Juan',
             lastName: 'Pérez',
             permission: '2',
             phone: '+56953046796',
             email: 'correo@correo.com',
             address: 'Calle falsa 123'
         }, */
        values: {
            username: '',
            firstName: '',
            lastName: '',
            permission: '',
            phone: '',
            email: '',
            address: ''
        },
        formValidator: 'registerMechanicValidation',
        sendTo: '/usuario/agregarUsuario',
        method: 'post'
    });

    return (
        <div>
            <UserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default RegisterMechanic;