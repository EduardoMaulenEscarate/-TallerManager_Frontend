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

export const emptyField = (value, name) => {
    let isValid = true;
    let msg = '';

    if (!value) {
        isValid = false;
        msg = `El campo ${name} es requerido`;
    }

    return { isValid, msg };
}

export const stringLength = (value, min, max, name) => {
    let isValid = true;
    let msg = '';

    if (value.length < min || value.length > max) {
        isValid = false;
        msg = `El campo ${name} debe tener entre ${min} y ${max} caracteres`;
    }

    return { isValid, msg };
}

export const emailFormat = (email) => {
    let isValid = true;
    let msg = null;

    if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        msg = `El email es inválido`;
    }

    return { isValid, msg };
}

export const isNumber = (number, name ) => {
    let isValid = true;
    let msg = null;

    if (isNaN(number)) {
        isValid = false;
        msg = `El campo ${name} debe ser numérico`;
    }

    return { isValid, msg };
}
export const passwordMatch = ({ password, password2 }) => {
    let isValid = true;
    let msg = null;

    if (password !== password2) {
        isValid = false;
        msg = `Las contraseñas no coinciden`;
    }

    return { isValid, msg };
}

export const checkPasswordComplexity = ({ password }) => {
    let isValid = true;
    let msg = null;

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
        isValid = false;
        msg = `La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número`;
    }

    return { isValid, msg };
}


export const executeValidations = (validations) => {
  // Ejecuta validaciones
  for (const { value, method, args, optional } of validations) {
    if (optional && (value === undefined || value === "")) continue;
    const result = method(value, ...args);
    if (!result.isValid) return result;
  }

  return { isValid: true };
}