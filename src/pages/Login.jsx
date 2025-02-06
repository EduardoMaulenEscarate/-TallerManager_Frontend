import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginValidation } from '../validations/authValidation';
import { Input, Button } from '@material-tailwind/react';

const LoginPage = () => {
    const [email, setEmail] = useState('kiki@correo.com');
    const [password, setPassword] = useState('clavePulenta@1');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        // Valida los datos del formulario
        const { isValid, msg } = loginValidation({ email, password });


        if (!isValid) {
            toast.error(msg, {
                position: "top-center",
                autoClose: 2000,
            });
        } else {
            const promesa = api.post('/auth/login', { email, password });

            toast.promise(promesa, {
                pending: "Cargando... ⏳",
                error: "Error al iniciar sesión 🤯",
            });

            try {
                const response = await promesa; // Espera a que la promesa se resuelva
                console.log("Datos de la respuesta:", response.data); // Accede a los datos
                const data = response.data;
                console.log(data);

                if (data.status === "error") {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                } else {
                    navigate('/profile');
                }
            } catch (error) {
                console.error("Error capturado:", error); // Maneja cualquier error
            }
        }
    };


    const {name, setName} = useState('');
    const {lastname, setLastname} = useState('');
    const {username, setUsername} = useState('');
    const {password2, setPassword2} = useState('');


    const handleRegister = async () => {
        // Valida los datos del formulario
        // const { isValid, msg } = registerValidation({ name, lastname, username, email, password, password2 });


    };

    return (
        <>
            <div className='flex flex-row'>
                <div id="login" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Iniciar sesión
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <p>{error}</p>
                        <div className="space-y-6">
                            <div>
                                <Input color="blue" label="Correo"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <Input color="blue" label="Contraseña"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>

                            <div>
                                <Button color="blue" onClick={handleLogin} className='flex w-full justify-center'>Iniciar sesión</Button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            No tienes cuenta?{' '}
                            <a onClick={(e) => { navigate('/register') }} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Registrate
                            </a>
                        </p>
                    </div>
                </div>
                <div id="register" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Registrarse
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <Input color="blue" label="Nombre" type="text" value={name} onChange={setName} />
                        <Input color="blue"  label="Apellido" type="text" value={lastname} onChange={setLastname} />
                        <Input color="blue"  label="Nombre de usuario" type="text" value={username} onChange={setUsername} />
                        <Input color="blue"  label="Email" type="email" value={email} onChange={setEmail} />
                        <Input color="blue"  label="Contraseña" type="password" value={password} onChange={setPassword} />
                        <Input color="blue"  label="Repite la contraseña" type="password" value={password2} onChange={setPassword2} />
                        <div>
                            <Button color="blue" onClick={handleRegister} className='flex w-full justify-center'>Registrarse</Button>
                        </div>
                    </div>
                    
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Ya tienes una cuenta?{' '}
                        <a onClick={(e) => {navigate('/login')}} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Iniciar sesión
                        </a>
                    </p>
                </div>
            </div>
            </div>
        </>
    );
};



export default LoginPage;
