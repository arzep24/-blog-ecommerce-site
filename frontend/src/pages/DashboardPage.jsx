import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css'; // Archivo CSS para los estilos

function DashboardPage() {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    // 1. Borra el token del localStorage
    localStorage.removeItem('token');

    // 2. Redirige al usuario a la página de inicio
    // El 'replace: true' evita que el usuario pueda volver atrás con el botón del navegador
    navigate('/', { replace: true });
    
    // Opcional: Recarga la página para asegurar que todo el estado se reinicie
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <h1>Tu Panel de Control</h1>
      <p>¡Bienvenido! Has iniciado sesión exitosamente.</p>
      <button onClick={handleLogout} className="btn btn-danger">
        Cerrar Sesión
      </button>
    </div>
  );
}

export default DashboardPage;