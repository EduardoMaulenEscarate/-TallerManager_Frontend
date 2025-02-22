import * as val from './validators';

export const loginValidation = (values) => {
    const validations = [
        {value:values.email, method: val.emptyField, args: ['Correo']},
        {value:values.email, method: val.stringLength, args: [3, 45, 'Correo']},
        {value:values.email, method: val.emailFormat, args: []},
        {value:values.password, method: val.emptyField, args: ['Contraseña']},
        {value:values.password, method: val.stringLength, args: [3, 45, 'Contraseña']}
    ];

    const result = val.executeValidations(validations);
    
    return result;
};

/* Validacion formulario de registro mecánico */
export const registerMechanicValidation = ({username,firstName,lastName,permission,phone,email,address}) => {
    const validations = [
        {value:username, method: val.emptyField, args: ['Nombre de usuario']},
        {value:username, method: val.stringLength, args: [3, 45, 'Nombre de usuario']},
        {value:firstName, method: val.emptyField, args: ['Nombre']},
        {value:firstName, method: val.stringLength, args: [3, 45, 'Nombre']},
        {value:lastName, method: val.emptyField, args: ['Apellido']},
        {value:lastName, method: val.stringLength, args: [3, 45, 'Apellido']},
        // {value:permission, method: val.emptyField, args: ['Permiso']},
        {value:phone, method: val.emptyField, args: ['Teléfono']},
        {value:phone, method: val.isNumber, args: ['Teléfono']},
        {value:phone, method: val.stringLength, args: [9, 12, 'Teléfono']},
        {value:email, method: val.emptyField, args: ['Correo']},
        {value:email, method: val.stringLength, args: [3, 45, 'Correo']},
        {value:email, method: val.emailFormat, args: []},
        {value:address, method: val.emptyField, args: ['Dirección'], optional: false},
        {value:address, method: val.stringLength, args: [3, 100, 'Dirección'], optional: false}
    ];

    const result = val.executeValidations(validations);
    
    return result;
}