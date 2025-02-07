import { Input, Button } from '@material-tailwind/react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginFormData, handleLoginChange, handleLoginSubmit } = useLogin();
    const { registerFormData, handleRegisterChange, handleRegisterSubmit } = useRegister();
    const navigate = useNavigate();
    

    return (
        <>
            <div className='flex flex-row justify-center items-center h-screen'>
                <div id="login" className=" shadow-md w-96 rounded-xl flex flex-col justify-center px-6 py-12 lg:px-8 ">
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
                        <div className="space-y-6">
                            <div>
                                <Input color="blue" label="Correo"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={loginFormData.email}
                                    onChange={handleLoginChange}
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <Input color="blue" label="Contraseña"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={loginFormData.password}
                                    onChange={handleLoginChange}
                                    autoComplete="current-password"
                                />
                            </div>

                            <div>
                                <Button color="blue" onClick={handleLoginSubmit} className='flex w-full justify-center'>Iniciar sesión</Button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            No tienes cuenta?{' '}
                            <a onClick={() => { navigate('/register') }} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Registrate
                            </a>
                        </p>
                    </div>
                </div>

                <div id="register" className="hidden w-96 |flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8 ">
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
                            <Input color="blue" label="Nombre" type="text" name='name' value={registerFormData.name} onChange={handleRegisterChange} />
                            <Input color="blue"  label="Apellido" type="text" name='lastname' value={registerFormData.lastname} onChange={handleRegisterChange} />
                            <Input color="blue"  label="Nombre de usuario" type="text" name='username' value={registerFormData.username} onChange={handleRegisterChange} />
                            <Input color="blue"  label="Email" type="email" name='email' value={registerFormData.email} onChange={handleRegisterChange} />
                            <Input color="blue"  label="Contraseña" type="password" name='password' value={registerFormData.password} onChange={handleRegisterChange} />
                            <Input color="blue"  label="Repite la contraseña" type="password" name='password2' value={registerFormData.password2} onChange={handleRegisterChange} />
                            <div>
                                <Button color="blue" onClick={handleRegisterSubmit} className='flex w-full justify-center'>Registrarse</Button>
                            </div>
                        </div>
                        
                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Ya tienes una cuenta?{' '}
                            <a onClick={() => {navigate('/login')}} className="font-semibold text-indigo-600 hover:text-indigo-500">
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
