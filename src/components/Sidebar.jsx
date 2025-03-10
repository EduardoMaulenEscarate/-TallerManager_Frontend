import React, { useState } from 'react';
import { Car, Users, User, Calendar, Settings, LibraryBig, BookOpenText, NotebookPen, Wrench, BookUser, LogOut, ChevronDown, ChevronUp, UserPlus, UserSearch, NotebookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import gsap from 'gsap';

/**
 * @fileoverview Componente para el Navbar lateral
 */

// MenuItem - Componente para un item del menú
const MenuItem = ({ icon: Icon, text, to, isActive, navigate, hasSubmenu, isOpen, onClick, children }) => (
  <div className="mb-2">
    <div
      onClick={onClick || (() => changePage(to, navigate))}
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


const SubMenuItem = ({ icon: Icon, text, isActive, to, navigate }) => (
  <div
    onClick={() => changePage(to, navigate)}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'
      }`}
  >
    <Icon className="w-5 h-5 text-white" />
    <span className="ml-3 text-white">{text}</span>
  </div>
);

const changePage = (to, navigate) => {
  if (window.location.pathname !== to) {
    const timelineOut = gsap.timeline({});

    timelineOut.to('#main-content', { scale: 0.9, duration: 0.3, })
      .to('#main-content', { x: 2000, duration: 0.3, delay: 0.1 })
      .call(() => navigate(to))
      .to('#main-content', { x: 0, duration: 0.3, delay: 0.1, })
      .to('#main-content', { scale: 1, duration: 0.3, delay: 0.1 })
  }
}

/**
 * @param {boolean} isOpen - Estado del sidebar
 * @param {function} onClose - Función para cerrar el sidebar
 * @returns {JSX.Element} - Componente de React
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState({
    clientes: false,
    mecanicos: false
  });

  const toggleSubmenu = (menu) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const diconnect = () => {
    gsap.fromTo('#main-content',
      { duration: 1, y: 0, opacity: 1, ease: 'power2.out' },
      { y: 50, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.fromTo('#sideBar-container',
      { duration: 1, x: 0, opacity: 1, ease: 'power2.out' },
      { x: -200, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.fromTo('#header-container',
      { duration: 1, y: 0, opacity: 1, ease: 'power2.out' },
      { y: -50, opacity: 0, duration: 1, ease: 'power2.out', onComplete: () => logout() })
  }

  const menuItems = [
    { icon: Car, text: "Vehículos", to: '/home' },
    {
      icon: Users,
      text: "Usuarios",
      hasSubmenu: true,
      submenuItems: [
        { icon: UserPlus, text: "Agregar usuarios", to: '/mecanicos/agregar' },
        { icon: UserSearch, text: "Ver usuarios", to: '/mecanicos/ver' },
      ]
    },
    {
      icon: BookUser,
      text: "Clientes",
      hasSubmenu: true,
      submenuItems: [
        { icon: UserPlus, text: "Agregar Cliente", to: '/clientes/agregar' },
        { icon: UserSearch, text: "Ver Clientes", to: '/clientes/ver' },
      ]
    },
    {
      icon: LibraryBig,
      text: "Ordenes de Trabajo",
      hasSubmenu: true,
      submenuItems: [
        { icon: NotebookPen, text: "Agregar Orden", to: '/orden/agregar' },
        { icon: BookOpenText, text: "Ver Ordenes", to: '/ordenes/ver' },
      ]
    },
    { icon: Calendar, text: "Citas", to: '/citas' },
  ];

  const footerMenuItems = [
    { icon: User, text: "Mi perfil", to: '/profile' },
    // { icon: Wrench, text: "Soporte", to: '/soporte' },
    // { icon: Settings, text: "Configuración", to: '/configuracion' }
  ];

  return (
    <>
      <div className={`
        bg-blue-800
        fixed lg:static
        w-64
        top-0 lg:top-auto
        h-screen
        transform ${isOpen ? 'translate-x-0 z-50' : '-translate-x-full'}
        lg:translate-x-0
        transition-transform duration-200 ease-in-out
        z-40
        flex flex-col
      `}>
        <div className="lg:hidden h-16"></div>
        <div className="flex flex-col h-full p-4">
          <div className="hidden lg:flex items-center mb-8">
            <Wrench className="w-8 h-8 text-white" />
            <span className="ml-3 font-bold text-lg text-white">Taller Manager</span>
          </div>

          <div className="flex flex-col flex-grow justify-between">
            <div>
              {menuItems.map((item, index) => (
                item.hasSubmenu ? (
                  <MenuItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    hasSubmenu={true}
                    isOpen={openSubmenus[item.text.toLowerCase()]}
                    onClick={() => toggleSubmenu(item.text.toLowerCase())}
                  >
                    {item.submenuItems.map((subItem, subIndex) => (
                      <SubMenuItem
                        key={subIndex}
                        icon={subItem.icon}
                        text={subItem.text}
                        to={subItem.to}
                        navigate={navigate}
                        isActive={window.location.pathname === subItem.to}
                      />
                    ))}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    to={item.to}
                    isActive={window.location.pathname === item.to}
                    navigate={navigate}
                  />
                )
              ))}
            </div>
            <div>
              <hr className="my-4 border-blue-700" />
              {footerMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  to={item.to}
                  isActive={window.location.pathname === item.to}
                  navigate={navigate}
                />
              ))}
              <div
                onClick={diconnect}
                className="flex items-center p-3 rounded-lg mb-2 cursor-pointer transition hover:bg-blue-700"
              >
                <LogOut className="w-5 h-5 text-white" />
                <span className="ml-3 text-white">Cerrar Sesión</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Sidebar;