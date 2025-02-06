import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { StickyNavbar } from '../components/Navbar';
import { ProfileCard } from '../components/ProfileCard';
import { Input, Button } from '@material-tailwind/react';


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const {name, setName} = useState('');
    const {lastname, setLastname} = useState('');
    const {username, setUsername} = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                setUser(response.data.user);

            } catch (err) {
                setLogin(err.response?.data?.login);
                setError(err.response?.data?.error || 'Error desconocido');
                navigate('/login');
            }
        };

      fetchProfile();

      }, [navigate]);
      
    if (error) return <p>{error} login = {login} </p>;
    if (!user) return <p>Cargando...</p>;
    user.cargo = 'Odiosa';
      
    console.log(user);
    


   
    return (
        <>
            <StickyNavbar />
            <div className='h-full w-9/12 m-auto p-3'>
                <div className='flex flex-row gap-6 align-middle'>
                    <div>
                        <ProfileCard user={user} />
                    </div>
                    <div className='mt-auto mb-auto w-96'>
                        <form action="">
                            <div className='space-y-6 p-3 '>
                                <Input color='blue' label="Nombre" type='text' value={user.name} onChange={setName}/>
                                <Input color='blue' label="Apellido" type='text' value={user.lastname} onChange={setLastname}/>
                                <Input color='blue' label="Nombre de usuario" type='text' value={user.username} onChange={setUsername} disabled/>
                                <Input color='blue' label="Cargo" type='text' value={user.cargo} onChange={setError} disabled/>
                                <Input color='blue' label="Email" type='email' value={user.email} disabled/>
                                <Button color='blue' className='flex w-full justify-center'>Actualizar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
