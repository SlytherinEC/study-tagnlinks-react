// src/components/PinPad.jsx

import React from 'react';

// Este componente recibe como props las funciones y estados del componente padre
function PinPad({ pin, handleDigit, handleDelete, handleAction, actionButtonText }) {
  return (
    <>
      {/* Display del PIN */}
      <div className="flex justify-center gap-2 mb-4">
        {pin.padEnd(6, '•').split('').map((char, index) => (
          <div key={index} className="w-10 h-10 border rounded-full flex items-center justify-center text-xl font-mono">
            {char !== '•' ? '●' : ''}
          </div>
        ))}
      </div>

      {/* Teclado numérico */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[...'123456789'].map(num => (
          <button
            key={num}
            onClick={() => handleDigit(num)}
            className="bg-blue-500 text-white py-3 rounded-full text-xl"
          >
            {num}
          </button>
        ))}
        <button onClick={handleDelete} className="bg-gray-300 py-3 rounded-full text-xl">
          ⌫
        </button>
        <button onClick={() => handleDigit('0')} className="bg-blue-500 text-white py-3 rounded-full text-xl">
          0
        </button>
        <button
          onClick={handleAction}
          className="bg-green-600 text-white py-3 rounded-full text-xl"
        >
          {actionButtonText}
        </button>
      </div>
    </>
  );
}

export default PinPad;
