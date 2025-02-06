import { useState } from 'react';
import api from '../api/api';
import { Input, Button } from '@material-tailwind/react';
import { registerValidation } from '../validations/authValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () =>{
    const [name, setName] = useState('Victoria');
    const [lastname, setLastname] = useState('Soto');
    const [username, setUsername] = useState('kiki');
    const [email, setEmail] = useState('kiki@correo.com');
    const [password, setPassword] = useState('clavePulenta@1');
    const [password2, setPassword2] = useState('clavePulenta@1');
    const navigate = useNavigate();


    const handleRegister = async () => {
        // Valida los datos del formulario
        const { isValid, msg } = registerValidation({ name, lastname, username, email, password, password2 });

        if (!isValid) {
            toast.error(msg, {
                autoClose: 3000,
                position: "top-center",
            });
        }  else {

            const promesa = api.post('/auth/register', { name, lastname, username, email, password, password2 });

            toast.promise(promesa, {
                pending: "Cargando... ⏳",
                error: "Error al registrar usuario 🤯",
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
                    toast.success("Registrado con exito");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error capturado:", error); // Maneja cualquier error
            }
        }
    };

    return (
        <>
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
                        <Input color="blue" label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input color="blue"  label="Apellido" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <Input color="blue"  label="Nombre de usuario" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input color="blue"  label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input color="blue"  label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input color="blue"  label="Repite la contraseña" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        
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
        </>
    );
}

export default Register;