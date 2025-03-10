import * as val from './validators';

/** 
 * @fileoverview Funciones de validación de formularios
 * @module validations/formsValidation
 * @imports module:validations/validators  
 * @exports loginValidation
 * @exports registerMechanicValidation
 * @exports registerClientValidation
 * @exports OrderFormValidation
 * */

/** 
 * Valida el formulario de inicio de sesión
 * @param {Object} values - Valores del formulario
 * @param {string} values.email - Correo electrónico
 * @param {string} values.password - Contraseña
 * @returns {Object{ isValid: boolean, msg: string }} - Resultado de la validación
*/
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


/**
 * Valida el formulario de registro de mecánico
 * @param {Object} values - Valores del formulario
 * @param {string} values.username - Nombre de usuario
 * @param {string} values.firstName - Nombre
 * @param {string} values.lastName - Apellido
 * @param {string} values.permission - Permiso
 * @param {string} values.phone - Teléfono
 * @param {string} values.email - Correo
 * @param {string} values.address - Dirección
 * @returns {Object{ isValid: boolean, msg: string }} - Resultado de la validación
 * */
const registerMechanicValidation = ({ username, firstName, lastName, permission, phone, email, address }) => {
    const validations = [
        { value: username, method: val.emptyField, args: ['Nombre de usuario'] },
        { value: username, method: val.stringLength, args: [3, 45, 'Nombre de usuario'] },
        { value: permission, method: val.emptyField, args: ['Permiso'] },
        { value: firstName, method: val.emptyField, args: ['Nombre'] },
        { value: firstName, method: val.stringLength, args: [3, 45, 'Nombre'] },
        { value: lastName, method: val.emptyField, args: ['Apellido'] },
        { value: lastName, method: val.stringLength, args: [3, 45, 'Apellido'] },

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

/**
 * Valida el formulario de registro de cliente
 * @param {Object} values - Valores del formulario
 * @param {string} values.nombre - Nombre
 * @param {string} values.direccion - Dirección
 * @param {string} values.telefono - Teléfono
 * @param {string} values.correo - Correo
 * @param {Array} values.vehiculos - Vehículos
 * @returns {Object{ isValid: boolean, msg: string }} - Resultado de la validación
 * */
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
        for (const [index, { id, marca, modelo, patente, chasis }] of vehiculos.entries()) {
            console.log("vehiculos: ", chasis);
            console.log("largo chasis: ", chasis.length);

            let vehicleValidations = [
                { value: marca, method: val.emptyField, args: [`Marca de Vehículo ${index + 1}`] },
                { value: modelo, method: val.emptyField, args: [`Modelo de Vehículo ${index + 1}`] },
                { value: patente, method: val.emptyField, args: [`Patente de Vehículo ${index + 1}`] },
                { value: patente, method: val.stringLength, args: [6, 8, `Patente de Vehículo ${index + 1}`] },
                { value: chasis, method: val.emptyField, args: [`Numero de chasis de Vehículo ${index + 1}`], optional: true },
                { value: chasis, method: val.stringLength, args: [10, 12, `Numero de chasis de Vehículo ${index + 1}`], optional: true },
            ]

            result = val.executeValidations(vehicleValidations);

            if (!result.isValid) { break; }
        }
    }

    return result;
}

/**
 * Valida el formulario de orden de trabajo
 * @param {Object} values - Valores del formulario
 * @param {string} values.client - Cliente
 * @param {string} values.orderVehicle - Vehículo
 * @param {string} values.stimatedDelivery - Fecha estimada de entrega
 * @param {string} values.kilometraje - Kilometraje
 * @param {string} values.priority - Prioridad
 * @param {string} values.state - Estado
 * @param {string} values.observations - Observaciones
 * @param {Array [{ sparePart: number, quantity: number, price: number  }]} values.spareParts - Repuestos
 * @param {Array [{ service: number, price: number }]} values.services - Servicios
 * @returns {Object{ isValid: boolean, msg: string }} - Resultado de la validación
 * */
const OrderFormValidation = ({client, orderVehicle, estimatedDelivery, 
                              kilometraje, priority, state,
                              observations, spareParts, services}) => {
    
    // Valida información basica
    const validations = [
        { value: client, method: val.emptyField, args: ['Cliente'] },
        { value: client, method: val.stringLength, args: [2, 45, 'Cliente'] },
        { value: orderVehicle, method: val.emptyField, args: ['Vehículo'] },
        { value: estimatedDelivery, method: val.isDate, args: ['Fecha estimada de entrega'] },
        { value: estimatedDelivery, method: val.minDateToday, args: ['Fecha estimada de entrega'] },
        { value: kilometraje, method: val.isNumber, args: ['Kilometraje'], optional: true },
        { value: kilometraje, method: val.minNumber, args: [10, 'Kilometraje'], optional: true },
    ];

    let result = val.executeValidations(validations);
    
    
    if (!result.isValid) return result;

    // Valida los repuestos
    for (const [index, { sparePart, quantity, price }] of spareParts.entries()) {
        const sparePartValidations = [
            { value: sparePart, method: val.emptyField, args: [`Repuesto ${index + 1}`] },
            { value: quantity, method: val.isNumber, args: [`Cantidad de repuesto ${index + 1}`] },
            { value: quantity, method: val.minNumber, args: [1, `Cantidad de repuesto ${index + 1}`] },
            { value: price, method: val.isNumber, args: [`Precio de repuesto ${index + 1}`] },
            { value: price, method: val.minNumber, args: [1000, `Precio de repuesto ${index + 1}`] },
        ];

        result = val.executeValidations(sparePartValidations);

        if (!result.isValid) { return result; }
    }

    // Valida los servicios
    for (const [index, { service, price }] of services.entries()) {
        const serviceValidations = [
            { value: service, method: val.emptyField, args: [`Servicio ${index + 1}`] },
            { value: price, method: val.isNumber, args: [`Precio de servicio ${index + 1}`] },
            { value: price, method: val.minNumber, args: [1000, `Precio de servicio ${index + 1}`] },
        ];

        result = val.executeValidations(serviceValidations);

        if (!result.isValid) { return result }
    }

    // Valida las observaciones
    const observationsValidations = [
        { value: state, method: val.emptyField, args: ['Estado'] },
        { value: state, method: val.isNumber, args: ['Estado'] },
        { value: observations, method: val.stringLength, args: [10, 200, 'Observaciones'], optional: true }
    ];

    result = val.executeValidations(observationsValidations)
    
    return result;
}

export { loginValidation, registerMechanicValidation, registerClientValidation, OrderFormValidation }