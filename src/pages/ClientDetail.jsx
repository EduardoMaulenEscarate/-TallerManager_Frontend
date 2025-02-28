import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientForm from "../components/form/ClientForm";
import { useForm } from "../hooks/useForm";
import api from "../api/api";
const ClientDetail = ({ setTitulo }) => {
    const [loading, setLoading] = useState(true);
    const [cliente, setCliente] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setTitulo('Detalle Cliente');
        fetchCliente();
    }, [setTitulo]);

    const fetchCliente = async () => {
        try {
            const response = await api.get(`/cliente/detalle/${id}`);
            setCliente(response.data.cliente);
            console.log("respuesta:", response.data);

            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const { formData, setFormData, handleChange, handleSubmit } = useForm({
        values: {
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
            vehiculos: []
        },
        sendTo: '/cliente/editar',
        formValidator: 'registerClientValidation',
        method: 'put'
    });

    useEffect(() => {
        if (cliente && Object.keys(cliente).length > 0) {
            setFormData({
                id: cliente.id || '',
                nombre: cliente.nombre || '',
                direccion: cliente.direccion || '',
                telefono: cliente.telefono || '',
                correo: cliente.correo || '',
                vehiculos: cliente.vehiculos || []
            });
        }
    }, [cliente]);

    return (
        <div>
            <ClientForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default ClientDetail;