/**
 * @fileoverview Funciones de validación de campos
 * @module validations/validators
 * @exports stringField - Valida un campo de texto
 * @exports emptyField - Valida un campo vacío
 * @exports stringLength - Valida la longitud de un campo de texto
 * @exports emailFormat - Valida el formato de un email
 * @exports isDate - Valida si un campo es una fecha
 * @exports minDate - Valida si una fecha es mayor a un mínimo
 * @exports minDateToday - Valida si una fecha es mayor o igual a hoy
 * @exports isNumber - Valida si un campo es un número
 * @exports minNumber - Valida si un número es mayor a un mínimo
 * @exports passwordMatch - Valida si dos contraseñas coinciden
 * @exports checkPasswordComplexity - Valida la complejidad de una contraseña
 * @exports executeValidations - Ejecuta un arreglo de validaciones
 */


/**
 * Valida un campo de texto
 * @param {Object} options - Opciones de validación
 * @param {string} options.texto - Texto a validar
 * @param {string} options.campo - Nombre del campo
 * @param {number} options.min - Longitud mínima
 * @param {number} options.max - Longitud máxima
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const stringField = ({ texto, campo, min, max }) => {
    let isValid = true;
    let msg = null;

    //valida que el campo no esté vacío	
    if (texto === null || texto === undefined || texto === "") {
        isValid = false;
        msg = `El campo ${campo} es requerido`;
    }

    //valida que el campo no exceda el mínimo y máximo de caractereseto
    if (isValid) {
        if (texto.length < min || texto.length > max) {
            return `El campo ${campo} debe tener entre ${min} y ${max} caracteres`;
        }
    }

    return { isValid, msg };
}

/**
 * Valida si el campo está vacío
 * @param {string} value - Valor del campo
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const emptyField = (value, name) => {
    let isValid = true;
    let msg = '';

    if (!value) {
        isValid = false;
        msg = `El campo ${name} es requerido`;
    }

    return { isValid, msg };
}

/**
 * Valida la longitud de un campo de texto
 * @param {string} value - Valor del campo
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const stringLength = (value, min, max, name) => {
    let isValid = true;
    let msg = '';

    if (value.length < min || value.length > max) {
        isValid = false;
        msg = `El campo ${name} debe tener entre ${min} y ${max} caracteres`;
    }

    return { isValid, msg };
}

/**
 * Valida el formato de un email
 * @param {string} email - Email a validar
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const emailFormat = (email) => {
    let isValid = true;
    let msg = null;

    if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        msg = `El email es inválido`;
    }

    return { isValid, msg };
}

/**
 * Valida si un campo es una fecha
 * @param {string} date - Fecha a validar
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const isDate = (date, name) => {
    let isValid = true;
    let msg = null;

    if (isNaN(Date.parse(date))) {
        isValid = false;
        msg = `${name} debe ser una fecha válida`;
    }

    return { isValid, msg };
}

/**
 * Valida si una fecha es mayor a un mínimo
 * @param {string} date - Fecha a validar
 * @param {string} min - Fecha mínima
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const minDate = (date, min, name) => {
    let isValid = true;
    let msg = null;

    if (Date.parse(date) < Date.parse(min)) {
        isValid = false;
        msg = `${name} debe ser mayor o igual a ${min}`;
    }

    return { isValid, msg };
}

/**
 * Valida si una fecha es mayor o igual a hoy
 * @param {string} date - Fecha a validar
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const minDateToday = (date, name) => {
    let isValid = true;
    let msg = null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Date.parse(date) < today.getTime()){
        isValid = false;
        msg = `${name} debe ser mayor o igual a hoy`;
    }

    return { isValid, msg };
}

/**
 * Valida si un campo es numérico
 * @param {string} number - Número a validar
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const isNumber = (number, name ) => {
    let isValid = true;
    let msg = null;

    if (isNaN(number)) {
        isValid = false;
        msg = `El campo ${name} debe ser numérico`;
    }

    return { isValid, msg };
}

/**
 * Valida si un número es mayor a un mínimo
 * @param {number} number - Número a validar
 * @param {number} min - Número mínimo
 * @param {string} name - Nombre del campo
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const minNumber = (number, min, name) => {
    let isValid = true;
    let msg = null;

    if (number < min) {
        isValid = false;
        msg = `El campo ${name} debe ser mayor o igual a ${min}`;
    }

    return { isValid, msg };
}

/**
 * Valida si dos contraseñas coinciden
 * @param {Object} passwords - Contraseñas a validar
 * @param {string} passwords.password - Contraseña
 * @param {string} passwords.password2 - Confirmación de contraseña
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const passwordMatch = ({ password, password2 }) => {
    let isValid = true;
    let msg = null;

    if (password !== password2) {
        isValid = false;
        msg = `Las contraseñas no coinciden`;
    }

    return { isValid, msg };
}

/**
 * Valida la complejidad de una contraseña
 * @param {Object} password - Contraseña a validar
 * @param {string} password.password - Contraseña
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const checkPasswordComplexity = ({ password }) => {
    let isValid = true;
    let msg = null;

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
        isValid = false;
        msg = `La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número`;
    }

    return { isValid, msg };
}


/**
 * Ejecuta un arreglo de validaciones
 * @param {Array [{ value: {string|number|date|etc}, method: val.method(), args: [] }]} validations - Arreglo de validaciones
 * @returns {Object {isValid: boolean, msg: string}} - Objeto con el resultado de la validación
 */
export const executeValidations = (validations) => {
  // Ejecuta validaciones
  for (const { value, method, args, optional } of validations) {
    if (optional && (value === undefined || value === "")) continue;
    const result = method(value, ...args);
    if (!result.isValid) return result;
  }

  return { isValid: true };
}