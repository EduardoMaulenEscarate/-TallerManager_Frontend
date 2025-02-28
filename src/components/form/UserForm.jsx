import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import ValidatedInput from "./ValidatedInput";
import FormActionButtons from "../FormActionButtons";
import { Input, Button, Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";

const UserForm = ({ handleChange, formData, handleSubmit }) => {
    return (
        <div>
            <div className="flex-1 overflow-auto p-4 lg:p-6">
                <div className="max-w mx-auto ">
                    {/* Encabezado con instrucciones */}
                    <Card className="w-full bg-yellow-100 ">
                        <CardBody>
                            <Typography variant="paragraph" color="gray" >
                                Complete todos los campos para enviar el formulario.
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
                                        <ValidatedInput
                                            label="Nombre de usuario *"
                                            onChange={(e) => handleChange(e)}
                                            name="username"
                                            value={formData.username}
                                            required={true}
                                            minLength={4}
                                        />

                                        <CustomSelect
                                            id={1}
                                            label={"Permiso de Usuario *"}
                                            options={[
                                                { value: 1, label: "Administrador" },
                                                { value: 2, label: "Solo mecánico" }
                                            ]}
                                            value={formData.permission}
                                            onChange={(value) => handleChange({ target: { name: 'permission', value } })}
                                        />

                                        <ValidatedInput
                                            label="Nombre *"
                                            onChange={(e) => handleChange(e)}
                                            name="firstName"
                                            value={formData.firstName}
                                            required={true}
                                            minLength={3}
                                        />

                                        <ValidatedInput
                                            label="Apellido *"
                                            onChange={(e) => handleChange(e)}
                                            name="lastName"
                                            value={formData.lastName}
                                            required={true}
                                            minLength={3}
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
                                        <ValidatedInput
                                            label="Telefono *"
                                            onChange={(e) => handleChange(e)}
                                            name="phone"
                                            value={formData.phone}
                                            required={true}
                                            minLength={9}
                                        />
                                        <ValidatedInput
                                            label="Correo *"
                                            onChange={(e) => handleChange(e)}
                                            name="email"
                                            value={formData.email}
                                            required={true}
                                            minLength={8}
                                        />

                                        <ValidatedInput
                                            label="Dirección *"
                                            onChange={(e) => handleChange(e)}
                                            name="address"
                                            value={formData.address}
                                            required={true}
                                            minLength={8}
                                        />
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <FormActionButtons />

                                {/* Input oculto con el id de usuario en caso de que reciba usuario */}
                                {formData.id && <input type="" name="id" value={formData.id} readOnly />}
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserForm;