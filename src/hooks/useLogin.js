import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { loginValidation } from "../validations/authValidation";

export const useLogin = () => {
  const [loginFormData, setLoginFormData] = useState({ email: 'kiki@correo.com', password: 'clavePulenta@1' });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    const { isValid, msg } = loginValidation(loginFormData);

    if (!isValid) {
        toast.error(msg, { position: "top-center", autoClose: 2000 });
        return;
    }

    const promesa = api.post("/auth/login", loginFormData);

    toast.promise(promesa, {
        pending: "Cargando... ⏳",
        error: "Error al iniciar sesión 🤯",
    });

    try {
        const response = await promesa;
        console.log("Datos de la respuesta:", response.data);
        
        if (response.data.status === "error") {
            toast.error(response.data.message, { position: "top-center", autoClose: 2000 });
        } else {
            navigate("/profile");
        }
    } catch (error) {
        console.error("Error capturado:", error);
    }
  };

  return { loginFormData, handleLoginChange, handleLoginSubmit };
}