import { Wrench, LogOut } from 'lucide-react';
import MenuItem from './navBar/MenuItem';
import SubMenuItem from './navBar/SubmenuItem';
import useNavBar from '../hooks/useNavBar';
/**
 * @fileoverview Componente que renderiza el sidebar de la aplicación
 * @param {object} props - Atributos del componente
 * @param {boolean} isOpen - Estado del sidebar
 * @param {function} onClose - Función para cerrar el sidebar
 * @returns {JSX.Element} - Componente de React
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { changePage, disconnect, toggleSubmenu, menuItems, footerMenuItems, openSubmenus } = useNavBar();

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
        <div className="flex flex-col h-full p-4 overflow-auto">
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
                    changePage={changePage}
                  >
                    {item.submenuItems.map((subItem, subIndex) => (
                      <SubMenuItem
                        key={subIndex}
                        icon={subItem.icon}
                        text={subItem.text}
                        to={subItem.to}
                        isActive={window.location.pathname === subItem.to}
                        changePage={changePage}
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
                    changePage={changePage}
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
                  changePage={changePage}
                />
              ))}
              <div
                onClick={disconnect}
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