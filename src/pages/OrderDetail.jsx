import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import OrderForm from "../components/form/OrderForm";
import { useForm } from "../hooks/useForm";
const OrderDetail = ({setTitulo}) => {
    const [order, setOrder] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    
    const fetchOrder = async () => {
        setLoading(true);
        
        try {
            const response = await api.get(`/orden/ver/${id}`);
            console.log(response);
            
            if (response.status === 200) {
                setOrder(response.data);
                setPhotos(response.data.photos || []);
                setLoading(false);
            } else {
                console.error("Error fetching order:", response.statusText);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setTitulo('Detalle Orden');
        fetchOrder();
    }, [setTitulo]);
    
    console.log("order", order);
    console.log("photos", photos);
    
    const {formData, setFormData, handleChange, handleFileFormSubmit} = useForm({
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

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h1>Order Detail</h1>
            {/* Order detail content goes here */}

            <div>
                {
                    photos && (
                        <div>
                            <h3>Photos</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {
                                    photos.map((photo, index) => (
                                        <img key={index} src={photo.url} alt={`Photo ${index}`} className="w-full h-auto" />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
            <OrderForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleFileFormSubmit={handleFileFormSubmit} />
        </div>
        </div>
    );
}

export default OrderDetail;