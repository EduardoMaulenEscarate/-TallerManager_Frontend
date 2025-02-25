import * as val from './validators';

const loginValidation = (values) => {
    const validations = [
        { value: values.email, method: val.emptyField, args: ['Correo'] },
        { value: values.email, method: val.stringLength, args: [3, 45, 'Correo'] },
        { value: values.email, method: val.emailFormat, args: [] },
        { value: values.password, method: val.emptyField, args: ['Contraseña'] },
        { value: values.password, method: val.stringLength, args: [3, 45, 'Contraseña'] }
    ];

    const result = val.executeValidations(validations);

    return result;
};

/* Validacion formulario de registro mecánico */
const registerMechanicValidation = ({ username, firstName, lastName, permission, phone, email, address }) => {
    const validations = [
        { value: username, method: val.emptyField, args: ['Nombre de usuario'] },
        { value: username, method: val.stringLength, args: [3, 45, 'Nombre de usuario'] },
        { value: firstName, method: val.emptyField, args: ['Nombre'] },
        { value: firstName, method: val.stringLength, args: [3, 45, 'Nombre'] },
        { value: lastName, method: val.emptyField, args: ['Apellido'] },
        { value: lastName, method: val.stringLength, args: [3, 45, 'Apellido'] },
        // {value:permission, method: val.emptyField, args: ['Permiso']},
        { value: phone, method: val.emptyField, args: ['Teléfono'] },
        { value: phone, method: val.isNumber, args: ['Teléfono'] },
        { value: phone, method: val.stringLength, args: [9, 12, 'Teléfono'] },
        { value: email, method: val.emptyField, args: ['Correo'] },
        { value: email, method: val.stringLength, args: [3, 45, 'Correo'] },
        { value: email, method: val.emailFormat, args: [] },
        { value: address, method: val.emptyField, args: ['Dirección'], optional: false },
        { value: address, method: val.stringLength, args: [3, 100, 'Dirección'], optional: false }
    ];

    const result = val.executeValidations(validations);

    return result;
}

// Validación formulario registro cliente
const registerClientValidation = ({ nombre, direccion, telefono, correo, vehiculos }) => {
    const validations = [
        { value: nombre, method: val.emptyField, args: ['Nombre'] },
        { value: nombre, method: val.stringLength, args: [3, 45, 'Nombre'] },
        { value: direccion, method: val.emptyField, args: ['Dirección'] },
        { value: direccion, method: val.stringLength, args: [3, 45, 'Dirección'] },
        { value: telefono, method: val.emptyField, args: ['Teléfono'] },
        { value: telefono, method: val.stringLength, args: [9, 12, 'Teléfono'] },
        { value: telefono, method: val.isNumber, args: ['Teléfono'] },
        { value: correo, method: val.emptyField, args: ['Correo'], optional: true },
        { value: correo, method: val.stringLength, args: [3, 45, 'Correo'], optional: true },
        { value: correo, method: val.emailFormat, args: [], optional: true },
    ]

    let result = val.executeValidations(validations);

    if (result.isValid) {
        //valida los campos de vehículos
        for (const { id, marca, modelo, patente, chasis } of vehiculos) {
            let vehicleValidations = [
                { value: marca, method: val.emptyField, args: [`Marca de Vehículo ${id + 1}`] },
                { value: modelo, method: val.emptyField, args: [`Modelo de Vehículo ${id + 1}`] },
                { value: patente, method: val.emptyField, args: [`Patente de Vehículo ${id + 1}`] },
                { value: patente, method: val.stringLength, args: [8, 8, `Patente de Vehículo ${id + 1}`] },
                { value: chasis, method: val.emptyField, args: [`Numero de chasis de Vehículo ${id + 1}`], optional: true },
                { value: chasis, method: val.stringLength, args: [10, 11, `Numero de chasis de Vehículo ${id + 1}`], optional: true },
            ]

            result = val.executeValidations(vehicleValidations);

            if (!result.isValid) { break; }
        }
    }

    return result;
}


export { loginValidation, registerMechanicValidation, registerClientValidation }