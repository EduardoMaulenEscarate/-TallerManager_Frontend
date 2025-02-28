import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import UserForm from "../components/form/UserForm";
import { useForm } from "../hooks/useForm";

const UserDetail = ({ setTitulo }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const fetchUser = async () => {
        try {
            const response = await api.get(`usuario/detalle/${id}`);
            setUser(response.data.user);
            setError(null);

        } catch (error) {
            console.log('Error al obtener usuario:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setTitulo('Detalle de Usuario');
        fetchUser(id);
    }, [setTitulo, id]);

    useEffect(() => {
        console.log('User:', user);

        if (user && Object.keys(user).length > 0) {
            setFormData({
                username: user.username || '',
                firstName: user.name || '',
                lastName: user.lastname || '',
                permission: user.type || '',
                phone: user.phone || '',
                email: user.email || '',
                address: user.address || '',
                id: user.id || ''
            });
        }
    }, [user]);

    const { formData, setFormData, handleChange, handleSubmit } = useForm({
        values: {
            username: '',
            firstName: '',
            lastName: '',
            permission: '',
            phone: '',
            email: '',
            address: '',
            id: ''
        },
        formValidator: 'registerMechanicValidation',
        sendTo: '/usuario/editar',
        method: 'put'
    });

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <div>
            <UserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default UserDetail;