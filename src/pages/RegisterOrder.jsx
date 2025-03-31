import { useEffect } from "react";
import OrderForm from "../components/form/OrderForm";
import { useForm } from "../hooks/useForm";

/**  
    * @fileoverview Componente para registrar una orden
                    se usa para crear una orden, pasa formData y setFormData a OrderForm
    * @param {function} setTitulo - Función para cambiar el título de la página
    * 
*/
const RegisterOrder = ({setTitulo}) => {
    const { formData, setFormData, handleChange, handleFileFormSubmit } = useForm({
        values: {
            client: "",
            orderVehicle: "",
            estimatedDelivery: "",
            kilometraje: "",
            photos: [],
            priority: 2,
            state: 1,
            observations: "",
            spareParts: [
                { sparePart: "", quantity: "", price: "" },
            ],
            services: [
                { service: "", price: "" },
            ],
            admissionReason: "",
            diagnosis: "",
            totalSpareParts: 0,
            totalServices: 0,
            total: 0,
        },
        formValidator: "OrderFormValidation",
        sendTo: "/orden/",
        method: "post",
    });

    useEffect(() => {
        setTitulo("Registrar Orden");
    }, [setTitulo]);

    return (
        <div>
            <OrderForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleFileFormSubmit={handleFileFormSubmit} />
        </div>
    );
}


export default RegisterOrder;