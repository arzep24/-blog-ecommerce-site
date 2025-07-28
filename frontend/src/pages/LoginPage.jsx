import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { LoginForm } from "../components/features/auth/LoginForm";
import {LoginService} from "../services/authService";

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth() // Implementar la función login del contexto
  
  
  const handleLogin = async (userData) => {
    try {
        setError('');
        setMessage('');
        
        const response = await LoginService(userData);
        setMessage(`Nueva sesión exitosa de ${userData.email}`);
        // Aqui guardaba el token en el localStorage, ahora utilizare contexto
        if (response.token){
	        login(response.token); //guardamos el token en la función del contexto
	        // Redirigir al dashboard
	        navigate('/dashboard', { replace: true });
        }
        
      } catch (error) {
        setError(`Error al iniciar sesión: ${error.response ? error.response.data.message : error.message}`);
      }
  };
  return (
    <div>
      <h1>Inicio de sesión</h1>
      <LoginForm onSubmit={handleLogin} />
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color:'red' }}>{error}</p>}
      <p>¿No tienes una cuenta?<Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
}