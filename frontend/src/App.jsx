import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FeedPage from './pages/FeedPage.jsx';

import MainLayout from './components/layout/MainLayout.jsx';

// Importar aquí paginas adicionales si es necesario (HomePage, LoginPage )
import './App.css'

function App() {
  return (
      <Routes>
        {/* Usar MainLayout para envolver las rutas */}
        <Route element={<MainLayout />}>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} /> 
          {/* Ruta protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<FeedPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
          </Route>
        </Route>    
      </Routes>
  )
}

export default App;
