// src/App.jsx

import React, { useState } from 'react';
import Registro from './components/Registro';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header'; // Asumo que tienes un componente Header
import Footer from './components/Footer'; // Asumo que tienes un componente Footer

function App() {
  // Estado para controlar qué componente de autenticación se muestra
  const [authView, setAuthView] = useState('login'); // Puede ser 'login' o 'registro'
  
  // Estado para verificar si el usuario está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Lógica para cambiar entre las vistas de Login y Registro
  const handleAuthViewChange = (view) => {
    setAuthView(view);
    console.log(`Cambiando a la vista de: ${view}`);
  };

  // Función de ejemplo para manejar el inicio de sesión
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };
  
  // Función de ejemplo para cerrar la sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Renderizado condicional según si el usuario está autenticado
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-grow overflow-y-auto">
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} /> // Pasamos la función de logout al Dashboard
        ) : (
          <div className="flex justify-center items-center h-full p-4">
            {authView === 'login' ? (
              <Login onAuthViewChange={handleAuthViewChange} onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Registro onAuthViewChange={handleAuthViewChange} />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
