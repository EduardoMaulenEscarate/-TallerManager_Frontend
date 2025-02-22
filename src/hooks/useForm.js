import { useState } from "react";
import { toast } from "react-toastify";
import * as formVal from "../validations/formsValidation";

export const useForm = ({ values, to, formValidator }) => {
    const [formData, setFormData] = useState({values});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, msg } = formVal[formValidator](formData);

        if (!isValid) {
            toast.error(msg, { position: "top-center", autoClose: 2000 });
        }
        /* if (!isValid) {
            console.log('Error en la validación:', msg);
            return;
        } */

            /* const promesa = api.post("/auth/login", loginFormData);

    toast.promise(promesa, {
        pending: "Cargando... ⏳",
        error: "Error al iniciar sesión 🤯",
    });

    try {
        const response = await promesa;
        console.log("Datos de la respuesta:", response.data);
        
        if (response.data.status === "error") {
            toast.error(response.data.message, { position: "top-center", autoClose: 2000 });
        } else {
            navigate("/profile");
        }
    } catch (error) {
        console.error("Error capturado:", error);
    } */
        console.log('Datos enviados:', formData);
    }
    return {handleChange, handleSubmit}
}