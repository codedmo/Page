import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import About from './pages/About';
import Politicas from './pages/Politicas';

import Servicios from './pages/Servicios/Index';
import Hosting from './pages/Servicios/Hosting';
import Cotizacion from './pages/Servicios/Cotizacion';
import Google_Microsoft from './pages/Servicios/google&microsoft';

import Desarrollo from './pages/Servicios/Desarrollo/Index';
import Api_Dev from './pages/Servicios/Desarrollo/Api_Dev';
import Web_Dev from './pages/Servicios/Desarrollo/Web_Dev';
import Software_Dev from './pages/Servicios/Desarrollo/Software_Dev';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} >
        <Route path="desarrollo" element={<Desarrollo />} >
          <Route path="web" element={<Web_Dev />} />
          <Route path="software" element={<Software_Dev />} />
          <Route path="integracion&api" element={<Api_Dev />} />
        </Route>
        <Route path="hosting" element={<Hosting />} />
        <Route path="google&microsoft" element={<Google_Microsoft />} />
      </Route>
      <Route path="/portafolio" element={<Portafolio />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/about" element={<About />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/cotizacion" element={<Cotizacion />} />
    </Routes>
  );
}
