import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Desarrollo from './pages/Desarrollo';
import Hosting from './pages/Hosting';
import Integracion from './pages/Integracion';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import About from './pages/About';
import Politicas from './pages/Politicas';
import Cotizacion from './pages/Cotizacion';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} >
        <Route path="desarrollo" element={<Desarrollo />} />
        <Route path="hosting" element={<Hosting />} />
        <Route path="integracion" element={<Integracion />} />
      </Route>
      <Route path="/portafolio" element={<Portafolio />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/about" element={<About />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/cotizacion" element={<Cotizacion />} />
    </Routes>
  );
}
