// MobileHeader.jsx
import React from 'react';
import { Menu, X, Wrench } from 'lucide-react';

const MobileHeader = ({ isOpen, onMenuClick }) => {
  return (
    <>
      {/* Header Móvil - Fijo */}
      <div className="lg:hidden bg-white fixed top-0 left-0 right-0 p-4 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center">
          <Wrench className="w-6 h-6 text-blue-800" />
          <span className="ml-2 font-bold text-lg text-slate-800">Taller Manager</span>
        </div>
        <button 
          onClick={onMenuClick}
          className="text-slate-800"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className="lg:hidden h-16"></div>
      
    </>
  );
};

export default MobileHeader;