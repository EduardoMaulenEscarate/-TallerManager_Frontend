/**
 * @fileoverview componente que renderiza un subItem del menú lateral, con un icono y un texto
 * @param {object} props - Atributos del componente
 * @param {icon} props.icon - Icono del item
 * @param {string} props.text - Texto del item
 * @param {boolean} props.isActive - Estado del item
 * @param {string} props.to - Ruta a la que se redirige
 * @param {function} props.changePage - Función para cambiar de página
 * @returns {JSX.Element} - Componente de React
 * */
const SubMenuItem = ({ icon: Icon, text, isActive, to, changePage }) => (
    <div
      onClick={() => changePage(to)}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition mt-2 ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'
        }`}
    >
      <Icon className="w-5 h-5 text-white" />
      <span className="ml-3 text-white">{text}</span>
    </div>
);

export default SubMenuItem;