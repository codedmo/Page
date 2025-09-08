import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Componentes que se cargan inmediatamente (críticos)
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Lazy loading para componentes secundarios
const Portafolio = lazy(() => import('./pages/Portafolio'));
const Contacto = lazy(() => import('./pages/Contacto'));
const About = lazy(() => import('./pages/About'));
const Politicas = lazy(() => import('./pages/Politicas'));

const Servicios = lazy(() => import('./pages/Servicios/Index'));

// Hosting & Cloud
const Hosting_Cloud = lazy(() => import('./pages/Servicios/Hosting&Cloud/Index'));
const HostingPage = lazy(() => import('./pages/Servicios/Hosting&Cloud/hostingProfesional'));
const Cloud = lazy(() => import('./pages/Servicios/Hosting&Cloud/cloud'));
const Dominios = lazy(() => import('./pages/Servicios/Hosting&Cloud/dominios'));

// Cotización
const Cotizacion = lazy(() => import('./pages/Servicios/Cotizacion/Index'));
const Consulta_Gratuita = lazy(() => import('./pages/Servicios/Cotizacion/Consulta_Gratuita'));
const Estimacion_Rapida = lazy(() => import('./pages/Servicios/Cotizacion/Estimacion_Rapida'));

// Google & Microsoft
const Google_Microsoft = lazy(() => import('./pages/Servicios/Google&Microsoft/Index'));
const Google_Workspace = lazy(() => import('./pages/Servicios/Google&Microsoft/Google_Workspace'));
const Microsoft_365 = lazy(() => import('./pages/Servicios/Google&Microsoft/Microsoft_365'));

// Desarrollo
const Desarrollo = lazy(() => import('./pages/Servicios/Desarrollo/Index'));
const Web_Dev = lazy(() => import('./pages/Servicios/Desarrollo/Web_Dev'));
const Software_Dev = lazy(() => import('./pages/Servicios/Desarrollo/Software_Dev'));
const Mobile_Dev = lazy(() => import('./pages/Servicios/Desarrollo/Mobile_Dev'));
const Api_Dev = lazy(() => import('./pages/Servicios/Desarrollo/Api_Dev'));

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/80">Cargando...</p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}
