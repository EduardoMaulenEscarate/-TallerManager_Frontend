import { Input, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useLogin } from '../hooks/useLogin';
import { loginValidation } from "../validations/formsValidation";
import gsap from 'gsap';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: 'kiki@correo.com', password: 'clavePulenta@1' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    useEffect(() => {
        gsap.fromTo(
            "#login",
            { y: -300, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
    }, []);

    const handleSubmit = async () => {
        const { isValid, msg } = loginValidation(formData);

        if (!isValid) {
            toast.error(msg, { position: "top-center", autoClose: 2000 });
            return;
        }

        try {
            const result = await login(formData);
            if (result.success) {
                toast.success('Bienvenido', { position: "top-center", autoClose: 1000 });
                gsap.fromTo(
                    "#login",
                    { y: 0, opacity: 1 },
                    {
                        y: -300, opacity: 0, duration: 1, onComplete: () => {
                            navigate('/');
                        }
                    }
                );
            } else {
                toast.error(result.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            toast.error('Error al iniciar sesión');
        }
    };

    return (
        <div className='flex flex-row justify-center items-center h-screen bg-gray-100'>
            <div id="login" className="-my-48 shadow-md w-96 rounded-xl flex flex-col justify-center px-6 py-12 lg:px-8 bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Iniciar sesión
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <Input
                                color="blue"
                                label="Correo"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <Input
                                color="blue"
                                label="Contraseña"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                        </div>

                        <div>
                            <Button
                                color="blue"
                                onClick={handleSubmit}
                                className='flex w-full justify-center'
                            >
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        ¿No tienes cuenta?{' '}
                        <a
                            onClick={() => navigate('/register')}
                            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;