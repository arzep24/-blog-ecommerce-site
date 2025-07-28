import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from "../components/features/auth/RegisterForm";
import {RegisterService as register} from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (userData) => {
    try {
        setError('');
        setMessage('');
        const response = await register(userData);
        setMessage(`Usuario registrado exitosamente: ${response.username}`);
        //Redirigir al login
        navigate('/login', { replace: true });
    } catch (error) {
      setMessage(`Error al registrar el usuario: ${error.message}`);
    }
  };
  return (
    <div>
      <h1>Registro de Usuario</h1>
      <RegisterForm onSubmit={handleRegister} />
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
}