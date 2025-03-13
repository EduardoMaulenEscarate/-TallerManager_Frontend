import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * @fileoverview Componente que renderiza un item del menú lateral, con un icono y un texto
 * @param {object} props - Atributos del componente
 * @param {icon} props.icon - Icono del item
 * @param {string} props.text - Texto del item
 * @param {string} props.to - Ruta a la que se redirige
 * @param {boolean} props.isActive - Estado del item
 * @param {boolean} props.hasSubmenu - Indica si el item tiene un submenu
 * @param {boolean} props.isOpen - Estado del 
 * @param {function} props.onClick - Función que se ejecuta al hacer click
 * @param {JSX.Element} props.children - Componente hijo
 * @param {function} props.changePage - Función para cambiar de página
 * @returns {JSX.Element} - Componente de React
 */
const MenuItem = ({ icon: Icon, text, to, isActive, hasSubmenu, isOpen, onClick, children, changePage }) => (
    <div className="mb-2">
      <div
        onClick={onClick || (() => changePage(to))}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
      >
        <Icon className="w-5 h-5 text-white" />
        <span className="ml-3 text-white flex-grow">{text}</span>
        {hasSubmenu && (
          <div className="text-white transition-transform duration-200">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        )}
      </div>
      {hasSubmenu && (
        <div className={`ml-7 mt-1 overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          {children}
        </div>
      )}
    </div>
  );

export default MenuItem;