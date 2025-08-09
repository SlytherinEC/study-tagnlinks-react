// src/components/Header.jsx

import React from 'react';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="TagNLink Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-gray-800">TagNLink</h1>
      </div>
    </header>
  );
}

export default Header;
