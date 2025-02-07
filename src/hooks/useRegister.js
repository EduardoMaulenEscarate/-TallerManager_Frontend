import { useState } from "react";
import { toast } from "react-toastify";
import { registerValidation } from "../validations/authValidation";

export const useRegister = () => {
  const [registerFormData, setRegisterFormData] = useState({ name: '', lastname: '', username: '', email: '', password: '', password2: '' });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prev) => ({
        ...prev,
        [name]: value
    }));

    console.log(registerFormData);
  }


  const handleRegisterSubmit = async () => {
      // Valida los datos del formulario
      const { isValid, msg } = registerValidation(registerFormData);

      if (!isValid) {
        toast.error(msg, { position: "top-center", autoClose: 2000 });
        return;
    }

    console.log("Registro enviado:", registerFormData);
  };

  return { registerFormData, handleRegisterChange, handleRegisterSubmit}
}