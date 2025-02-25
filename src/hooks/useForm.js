import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import * as formVal from "../validations/formsValidation";

export const useForm = ({ values, sendTo, formValidator }) => {
    const [formData, setFormData] = useState(values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        console.log('Datos Formulario: ', formData);
        e.preventDefault();
        const { isValid, msg } = formVal[formValidator](formData);


        if (!isValid) {
            return toast.error(msg, { position: "top-center", autoClose: 2000 });
        }

        //envía formulario a la api
        try {
            const promesa = api.post(sendTo, formData);
            console.log('Datos enviados:', formData);

            toast.promise(promesa, {
                pending: "Cargando... ⏳",
                error: "Error al enviar formulario 🤯",
            })

            const response = await promesa;

            console.log('Respuesta:', response.data);

            if (response.data.status == "success") {
                toast.success(response.data.message, { position: "top-center", autoClose: 2000 });
            } else {
                toast.error(response.data.message, { position: "top-center", autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Error al enviar formulario 🤯", { position: "top-center", autoClose: 2000 });
        }
    }

    return { formData, handleChange, handleSubmit }
}