import * as val from './validators';

export const loginValidation = (values) => {
    console.log(values);
    
    let result = val.stringField({texto: values.email, campo: 'email', min: 1, max: 50});
    
    if (result.isValid){
        result = val.emailFormat({email: values.email});
        console.log(result);
        
    }

    if (result.isValid) {
        result = val.stringField({texto: values.password, campo: 'contraseña', min: 1, max: 50});
    }
    return {isValid: result.isValid, msg:result.msg};
};

export const registerValidation = (values) => {
    let result = val.stringField({texto: values.name, campo: 'nombre', min: 1, max: 50});
    
    console.log(values);
    
    if (result.isValid){
        result = val.stringField({texto: values.lastname, campo: 'apellido', min: 1, max: 50});
    }

    if (result.isValid){
        result = val.stringField({texto: values.username, campo: 'nombre de usuario', min: 1, max: 50});
    }

    if (result.isValid){
        result = val.emailFormat({email: values.email});
    }

    if (result.isValid){
        result = val.stringField({texto: values.password, campo: 'contraseña', min: 1, max: 50});
    }

    if (result.isValid){
        result = val.stringField({texto: values.password2, campo: 'repetir contraseña', min: 1, max: 50});
    }

    if (result.isValid){
        result = val.checkPasswordComplexity({password: values.password});
    }
    
    if (result.isValid){
        result = val.passwordMatch({password: values.password, password2: values.password2});
    }

    console.log({isValid: result.isValid, msg:result.msg} );
   
    
    return {isValid: result.isValid, msg:result.msg};
}