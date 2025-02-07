import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { StickyNavbar } from '../components/Navbar';
import { ProfileCard } from '../components/ProfileCard';
import { Input, Button } from '@material-tailwind/react';


const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', lastname: '' });
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                setUser(response.data.user);
                setFormData({
                    name: response.data.user.name || '',
                    lastname: response.data.user.lastname || ''
                });
            } catch (err) {
                setLogin(err.response?.data?.login);
                setError(err.response?.data?.error || 'Error desconocido');
                console.log(error);
                console.log(login);
                
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate, error, login]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(formData);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos actualizados:", formData);
        // Aquí puedes enviar los datos del formulario sin modificar `user`
    };
    

    // Evitar renderizar si `user` todavía no está cargado
    if (!user) return <p>Cargando perfil...</p>;

   
    return (
        <>
            <StickyNavbar />
            <div className='h-full w-9/12 m-auto p-3'>
                <div className='container flex flex-col md:flex-row gap-6 align-middle items-center'>
                    <div>
                        <ProfileCard user={user} />
                    </div>
                    <div className='mt-auto mb-auto w-96'>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 p-3">
                                <Input 
                                    color="blue" 
                                    label="Nombre" 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                                <Input 
                                    color="blue" 
                                    label="Apellido" 
                                    type="text" 
                                    name="lastname" 
                                    value={formData.lastname} 
                                    onChange={handleChange} 
                                />
                                <Input 
                                    color="blue" 
                                    label="Nombre de usuario" 
                                    type="text" 
                                    value={user.username} 
                                    disabled 
                                />
                                <Input 
                                    color="blue" 
                                    label="Cargo" 
                                    type="text" 
                                    value={user.cargo} 
                                    disabled 
                                />
                                <Input 
                                    color="blue" 
                                    label="Email" 
                                    type="email" 
                                    value={user.email} 
                                    disabled 
                                />
                                <Button color="blue" className="flex w-full justify-center">
                                    Actualizar
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className='mt-auto mb-auto w-96'>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 p-3">
                                <Input 
                                    color="blue" 
                                    label="Nombre" 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                                <Input 
                                    color="blue" 
                                    label="Apellido" 
                                    type="text" 
                                    name="lastname" 
                                    value={formData.lastname} 
                                    onChange={handleChange} 
                                />
                                <Input 
                                    color="blue" 
                                    label="Nombre de usuario" 
                                    type="text" 
                                    value={user.username} 
                                    disabled 
                                />
                                <Input 
                                    color="blue" 
                                    label="Cargo" 
                                    type="text" 
                                    value={user.cargo} 
                                    disabled 
                                />
                                <Input 
                                    color="blue" 
                                    label="Email" 
                                    type="email" 
                                    value={user.email} 
                                    disabled 
                                />
                                <Button color="blue" className="flex w-full justify-center">
                                    Actualizar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
