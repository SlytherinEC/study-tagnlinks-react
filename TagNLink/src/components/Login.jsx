// src/components/Login.jsx

import React, { useState } from 'react';
import PinPad from './PinPad';

function Login() {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: PIN
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Lógica del teclado numérico
  const handleDigit = (digit) => {
    // Solo permitimos 6 dígitos en el PIN
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  // ✅ Función para avanzar al paso 2 (PIN)
  const handleNext = () => {
    setError('');
    // Validación del email antes de avanzar
    if (!email || !email.includes('@')) {
      setError('Por favor, introduce un email válido.');
    } else {
      setStep(2); // Pasa al paso del PIN
    }
  };

  // ✅ Lógica para iniciar sesión
  const handleLogin = async () => {
    setError('');
    // Validación del PIN antes de enviar al backend
    if (pin.length < 6) {
      setError('El PIN debe tener 6 dígitos.');
      return;
    }

    const payload = {
      email,
      password: pin, // El PIN se envía como la contraseña
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales incorrectas');
      }

      // Si el inicio de sesión es exitoso
      setSuccess('✅ ¡Inicio de sesión exitoso!');
      // TODO: Guardar el token en el almacenamiento local o contexto
      console.log('Token de sesión:', data.token);

      // Opcional: limpiar los campos después del éxito
      setEmail('');
      setPin('');
      setStep(1); // Volver al inicio
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  // ✅ Renderizado de la interfaz según el paso
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Inicia sesión con tu email</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-full mb-4 text-center"
            />
            <button
              onClick={handleNext}
              className="bg-green-600 text-white py-3 rounded-full text-xl w-full"
            >
              Continuar
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Introduce tu PIN (6 dígitos)</h2>
              <PinPad
                pin={pin}
                handleDigit={handleDigit}
                handleDelete={handleDelete}
                handleAction={handleLogin}
                actionButtonText="Entrar"
              />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        {renderContent()}

        {/* Mensajes de error o éxito */}
        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4 text-center">{success}</p>}
      </div>
    </div>
  );
}

export default Login;
