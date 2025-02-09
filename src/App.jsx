import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import RegisterCliente from './pages/RegisterCliente';

const App = () => {
  return (
    <div >
      <ToastContainer />

      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registerCliente" element={<RegisterCliente/>} />
        <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;