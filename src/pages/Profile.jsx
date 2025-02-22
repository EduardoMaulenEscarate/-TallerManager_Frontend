import { useEffect, useState } from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { Input, Button } from '@material-tailwind/react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = ({setTitulo}) => {
    useEffect(() => {
        setTitulo('Perfil Mecánico');
      }, [setTitulo]);
    const { user } = useAuth();
    const [formData, setFormData] = useState({ name: user.name, lastname: user.lastname });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos actualizados:", formData);
    };

    if (!user) return <p>Cargando perfil...</p>;


    return (
        <div className='h-full   p-3 '>
            <div className='container flex flex-col md:flex-row gap-6 align-middle items-center justify-center'>
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
            </div>
        </div>
    );
};

export default ProfilePage;