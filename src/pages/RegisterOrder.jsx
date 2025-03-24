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
            orderVehicle: 51,
            estimatedDelivery: "",
            kilometraje: "",
            photos: [],
            priority: 2,
            state: 1,
            observations: "",
            spareParts: [
                { sparePart: "", quantity: "", price: "" },
                /*  { sparePart: 1, quantity: 1, price: 11 },
                { sparePart: 5, quantity: 1, price: 22 },
                { sparePart: 10, quantity: 1, price: 33 }, */
            ],
            services: [
                { service: "", price: "" },
            ],
            totalSpareParts: 0,
            totalServices: 0,
            total: 0,
        },
        formValidator: "OrderFormValidation",
        sendTo: "/orden/agregarOrden",
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