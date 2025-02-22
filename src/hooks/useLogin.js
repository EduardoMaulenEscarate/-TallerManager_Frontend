import { useState } from "react";
import { toast } from "react-toastify";
import { loginValidation } from "../validations/formsValidation";
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
  const [loginFormData, setLoginFormData] = useState({ email: 'kiki@correo.com', password: 'clavePulenta@1' });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    const { isValid, msg } = loginValidation(loginFormData);
    const { login } = useAuth();

    if (!isValid) {
      toast.error(msg, { position: "top-center", autoClose: 2000 });
      return;
    }
    
    login(loginFormData);
  };

  return { loginFormData, handleLoginChange, handleLoginSubmit };
}