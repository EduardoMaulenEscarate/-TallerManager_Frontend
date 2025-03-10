import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import * as formVal from "../validations/formsValidation";

/**
 * @fileoverview Hook para manejar formularios
 * @param {object} values - Valores iniciales del formulario
 * @param {string} sendTo - Ruta a la que se enviará el formulario
 * @param {string} formValidator - Validador del formulario
 * @param {string} method - Método HTTP
 * @returns {object} - Datos del formulario y funciones para manejarlo
 */
export const useForm = ({ values, sendTo, formValidator, method }) => {
    const [formData, setFormData] = useState(values);

    // Maneja el cambio de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { isValid, msg } = formVal[formValidator](formData);

        if (!isValid) {
            return toast.error(msg, { position: "top-center", autoClose: 2000 });
        }

        //envía formulario a la api
        try {
            const promesa = api[method](sendTo, formData);

            toast.promise(promesa, {
                pending: "Cargando... ⏳",
                error: "Error al enviar formulario 🤯",
            })

            const response = await promesa;

            console.log('Respuesta:', response.data);

            if (response.data.status == "success") {
                let msgWidth = response.data.message.length * 10 > 600 ? 600 - 40 : response.data.message.length * 10;

                toast.success(response.data.message, { position: "top-center", autoClose: 2000, style: { width: msgWidth } },);
            } else {
                toast.error(response.data.message, { position: "top-center", autoClose: 2000 });
            }
        } catch (error) {
            // toast.error("Error al enviar formulario 🤯", { position: "top-right", autoClose: 2000 });
        }
    }

    // Formatea la fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';

        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return { formData, setFormData, handleChange, handleSubmit, formatDate }
}