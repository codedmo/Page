import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import About from './pages/About';
import Politicas from './pages/Politicas';
import NotFound from './pages/NotFound'; 

import Servicios from './pages/Servicios/Index';

import Hosting_Cloud from './pages/Servicios/Hosting&Cloud/Index';
import HostingPage from './pages/Servicios/Hosting&Cloud/hostingProfesional';
import Cloud from './pages/Servicios/Hosting&Cloud/cloud';
import Dominios from './pages/Servicios/Hosting&Cloud/dominios';

import Cotizacion from './pages/Servicios/Cotizacion/Index';
import Consulta_Gratuita from './pages/Servicios/Cotizacion/Consulta_Gratuita';
import Estimacion_Rapida from './pages/Servicios/Cotizacion/Estimacion_Rapida';

import Google_Microsoft from './pages/Servicios/Google&Microsoft/Index';
import Google_Workspace from './pages/Servicios/Google&Microsoft/Google_Workspace';
import Microsoft_365 from './pages/Servicios/Google&Microsoft/Microsoft_365';

import Desarrollo from './pages/Servicios/Desarrollo/Index';
import Web_Dev from './pages/Servicios/Desarrollo/Web_Dev';
import Software_Dev from './pages/Servicios/Desarrollo/Software_Dev';
import Mobile_Dev from './pages/Servicios/Desarrollo/Mobile_Dev';
import Api_Dev from './pages/Servicios/Desarrollo/Api_Dev';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} >
        <Route path="desarrollo" element={<Desarrollo />} >
          <Route path="web" element={<Web_Dev />} />
          <Route path="software" element={<Software_Dev />} />
          <Route path="movil" element={<Mobile_Dev />} />
          <Route path="api" element={<Api_Dev />} />
        </Route>
        <Route path="hosting&cloud" element={<Hosting_Cloud />} >
          <Route path="hosting" element={<HostingPage />} />
          <Route path="cloud" element={<Cloud />} />
          <Route path="dominios" element={<Dominios />} />
        </Route>
        <Route path="google&microsoft" element={<Google_Microsoft />} >
          <Route path="workspace" element={<Google_Workspace />} />
          <Route path="microsoft365" element={<Microsoft_365 />} />
        </Route>
        <Route path="cotizacion" element={<Cotizacion />} >
          <Route path="consulta" element={<Consulta_Gratuita />} />
          <Route path="estimacion" element={<Estimacion_Rapida />} />
        </Route>
      </Route>
      <Route path="/portafolio" element={<Portafolio />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/about" element={<About />} />
      <Route path="/politicas" element={<Politicas />} />

      {/* Ruta comodín para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
