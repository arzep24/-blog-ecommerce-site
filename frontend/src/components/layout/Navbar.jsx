import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Grupo Izquierda: La marca */}
      <div className="navbar-brand">
        <Link to="/">Barley's</Link>
      </div>

      {/* Grupo Centro: Navegación principal */}
      <div className="navbar-center">
        <Link to="/feed">Inicio</Link>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {/* Grupo Derecha: Acciones de usuario */}
      <div className="navbar-actions">
        {isAuthenticated ? (
          <button onClick={logout} className="navbar-button">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="navbar-button-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}