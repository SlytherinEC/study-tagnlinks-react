// src/components/Registro.jsx

import React, { useState } from 'react';
import PinPad from './PinPad';

function Registro() {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: PIN, 3: Confirmar PIN
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Lógica para el teclado
  const handleDigit = (digit) => {
    // Solo permitimos 6 dígitos en cada paso
    if (step === 2 && pin.length < 6) {
      setPin(prev => prev + digit);
    } else if (step === 3 && confirmPin.length < 6) {
      setConfirmPin(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    if (step === 2) {
      setPin(prev => prev.slice(0, -1));
    } else if (step === 3) {
      setConfirmPin(prev => prev.slice(0, -1));
    }
  };

  // ✅ Función para avanzar entre pasos
  const handleNext = () => {
    setError('');
    // Validar el paso actual antes de avanzar
    if (step === 1) {
      // Validamos que el email no esté vacío y tenga un formato básico
      if (!email || !email.includes('@')) {
        setError('Por favor, introduce un email válido.');
      } else {
        setStep(2); // Avanza al paso del PIN
      }
    } else if (step === 2) {
      if (pin.length < 6) {
        setError('El PIN debe tener 6 dígitos.');
      } else {
        setStep(3); // Avanza al paso de confirmar
      }
    }
  };

  // ✅ Lógica para registrar al usuario
  const handleRegister = async () => {
    setError('');
    if (pin !== confirmPin) {
      setError('Los PIN no coinciden.');
      return;
    }

    const payload = {
      email,
      password: pin,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      setSuccess('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      // Opcional: limpiar los campos después del éxito
      setEmail('');
      setPin('');
      setConfirmPin('');
      setStep(1); // Volver al inicio
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  // ✅ Componentes de la interfaz según el paso
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Registro introduce tu email</h2>
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
            <h2 className="text-2xl font-semibold mb-4 text-center">Crea tu PIN (6 dígitos)</h2>
            <PinPad 
              pin={pin}
              handleDigit={handleDigit}
              handleDelete={handleDelete}
              handleAction={handleNext}
              actionButtonText="Ok"
            /> 
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Confirma tu PIN</h2>
            <PinPad 
              pin={confirmPin}
              handleDigit={handleDigit}
              handleDelete={handleDelete}
              handleAction={handleRegister}
              actionButtonText="Enviar"
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

export default Registro;
