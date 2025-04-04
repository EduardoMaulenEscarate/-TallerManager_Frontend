import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useState, useRef } from 'react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RegisterMechanic from './pages/RegisterMechanic';
import RegisterClient from './pages/RegisterClient';
import ClientList from './pages/ClientList';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';
import ClientDetail from './pages/ClientDetail';
import OrderList from './pages/OrderList';

// Components
import Sidebar from './components/Sidebar';
import DesktopHeader from './components/DesktopHeader';
import MobileHeader from './components/MobileHeader';
import CustomSelect from './components/form/CustomSelect';
import gsap from 'gsap';
import RegisterOrder from './pages/RegisterOrder';

/**
 * Layout protegido (requiere autenticación)
 * @param {object} props - Propiedades del componente
 * @param {object} props.children - Componentes hijos
 * @returns {JSX.Element} - Layout protegido
 */
const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [titulo, setTitulo] = useState(null);

  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    //si los componentes no se han montado no se puede hacer la animación
    if (!sidebarRef.current || !mainContentRef.current || !headerRef.current) return;

    gsap.fromTo('#sideBar-container',
      { duration: 1, x: -200, opacity: 0, ease: 'power2.out' },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' });
    gsap.fromTo('#main-content',
      { duration: 1, y: 50, opacity: 0, ease: 'power2.out' },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
    gsap.fromTo('#header-container',
      { duration: 1, y: -50, opacity: 0, ease: 'power2.out' },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <div ref={sidebarRef}
        id="sideBar-container"
        className={`fixed lg:static z-30`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden ">
        <div ref={headerRef} id="header-container" className='z-40'>
          <MobileHeader
            isOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <DesktopHeader titulo={titulo} />
        </div>

        <div ref={mainContentRef} id="main-content" className={`flex flex-col overflow-auto ${sidebarOpen ? 'z-0' : 'z-10'}`}>
          {/* Clonar children para pasar setTitulo */}
          {React.cloneElement(children, { setTitulo })}
        </div>
      </div>
    </div>
  );
};

/**
 * Contenido de la aplicación
 * @returns {JSX.Element} - Contenido de la aplicación
 */
const AppContent = () => {

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedLayout><Home /></ProtectedLayout>} />
        <Route path="/about" element={<ProtectedLayout> <About /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        <Route path="/clientes/agregar" element={<ProtectedLayout><RegisterClient /></ProtectedLayout>} />
        <Route path="/clientes/ver" element={<ProtectedLayout><ClientList /></ProtectedLayout>} />
        <Route path="/clientes/detalle/:id" element={<ProtectedLayout><ClientDetail /></ProtectedLayout>} />
        <Route path="/mecanicos/agregar" element={<ProtectedLayout>< RegisterMechanic /></ProtectedLayout>} />
        <Route path="/mecanicos/ver" element={<ProtectedLayout>< UsersList /></ProtectedLayout>} />
        <Route path="/mecanicos/detalle/:id" element={<ProtectedLayout>< UserDetail /></ProtectedLayout>} />
        <Route path="/orden/agregar" element={<ProtectedLayout>< RegisterOrder /></ProtectedLayout>} />
        <Route path="/ordenes/ver" element={<ProtectedLayout>< OrderList /></ProtectedLayout>} />

        {/* Ruta por defecto */}
        <Route path="*" element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        } />
      </Routes>
    </Router>
  );
};

/**
 * Aplicación
 * @returns {JSX.Element} - Aplicación
 */
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;