import { Car, Users, User, Calendar, Settings, LibraryBig, BookOpenText, NotebookPen, Wrench, BookUser, LogOut, ChevronDown, ChevronUp, UserPlus, UserSearch, NotebookText } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import gsap from "gsap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @fileoverview Hook para manejar la barra de navegación
 * @returns {object} - Funciones y estados para manejar la barra de navegación 
*/
const useNavBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const [openSubmenus, setOpenSubmenus] = useState({
        clientes: false,
        mecanicos: false,
        ordenes: false,
      });

    /**
     * Función para cambiar de página
     * @param {string} to - Ruta a la que se redirige  
    */
    const changePage = (to) => {
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
     * Función para desconectar al usuario
     * */
    const disconnect = () => {
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

    // Items del menú
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
          text: "Ordenes",
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

    /**
     * Función para mostrar u ocultar un submenu
     * @param {string} menu - Nombre del submenu
     * */
    const toggleSubmenu = (menu) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };
    
    return { changePage, disconnect, menuItems, footerMenuItems, toggleSubmenu, openSubmenus };
}   

export default useNavBar;