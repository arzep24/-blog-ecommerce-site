import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a Barley's</h1>
          <p className="hero-subtitle">
            Tu marketplace social para descubrir, comprar y vender artículos únicos.
          </p>
          <Link to="/register" className="hero-cta-button">
            Únete a la Comunidad
          </Link>
        </div>
      </header>
    </div>
  );
}