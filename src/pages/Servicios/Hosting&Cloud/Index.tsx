import { Outlet, useLocation, Link } from 'react-router-dom';
import { Server, Cloud, Globe, Shield, Zap, CheckCircle } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Hosting_Cloud() {
  const location = useLocation();

  // SEO para Hosting & Cloud
  useSEO({
    title: 'Hosting & Cloud - Servicios de Alojamiento Web | CODEDMO',
    description: 'Servicios de hosting profesional, cloud computing y registro de dominios. Hosting seguro, rápido y confiable con SSL incluido.',
    keywords: ['hosting guatemala', 'hosting profesional', 'cloud computing', 'registro dominios', 'ssl certificado'],
    canonical: '/servicios/hosting&cloud'
  });

  const services = [
    {
      icon: Cloud,
      title: 'Hosting Profesional',
      description: 'Hosting seguro y rápido con SSL incluido',
      path: '/servicios/hosting&cloud/hosting',
      features: ['SSL Gratis', 'Backup Diario', 'Soporte 24/7', 'cPanel incluido']
    },
    {
      icon: Server,
      title: 'Servicios Cloud',
      description: 'Infraestructura escalable en la nube',
      path: '/servicios/hosting&cloud/cloud',
      features: ['Escalabilidad', 'Alta disponibilidad', 'Monitoreo 24/7', 'Backup automático']
    },
    {
      icon: Globe,
      title: 'Registro de Dominios',
      description: 'Registro y gestión de dominios web',
      path: '/servicios/hosting&cloud/dominios',
      features: ['Gestión DNS', 'Protección privacidad', 'Renovación automática', 'Soporte técnico']
    }
  ];

  // Si estamos en una subruta, mostrar el outlet
  if (location.pathname !== '/servicios/hosting&cloud') {
    return <Outlet />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Server className="w-4 h-4 mr-2" />
          Hosting & Cloud
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Hosting profesional y <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>servicios cloud</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Alojamiento web seguro, rápido y confiable. Desde hosting compartido hasta soluciones cloud empresariales.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={index}
              to={service.path}
              className="group block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Por qué elegir nuestros servicios?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Seguridad</h3>
            <p className="text-gray-400 text-sm">SSL gratuito y protección avanzada</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Velocidad</h3>
            <p className="text-gray-400 text-sm">Servidores optimizados y CDN</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Confiabilidad</h3>
            <p className="text-gray-400 text-sm">99.9% de tiempo de actividad garantizado</p>
          </div>
          <div className="text-center">
            <Server className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Soporte</h3>
            <p className="text-gray-400 text-sm">Soporte técnico 24/7 en español</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className={`max-w-2xl mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border ${borders.primary} backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Necesitas ayuda para elegir?
          </h3>
          <p className="text-gray-300 mb-6">
            Nuestros expertos te ayudan a encontrar la solución de hosting perfecta para tu proyecto.
          </p>
          <Link 
            to="/servicios/cotizacion" 
            className={`
              inline-flex items-center px-8 py-3 bg-gradient-to-r ${gradients.primary} 
              text-white font-semibold rounded-lg transition-all duration-300
              hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105
            `}
          >
            Consulta Gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}
