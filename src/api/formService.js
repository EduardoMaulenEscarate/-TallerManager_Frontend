import api from "./api";

/** 
 * @fileoverview Hace una petición a la API para obtener los campos requeridos
 * @params {String} fields - Campos requeridos
 * @return {Promise} Promesa con los campos requeridos
*/ 
const formService = {
    async getFields(fields) {
        try {
            const response = await api.get(`campos/${fields}`);
            return response.data;
        } catch (error) {
            console.log('Error al obtener campos:', error);
        }
    },
}

export default formService;