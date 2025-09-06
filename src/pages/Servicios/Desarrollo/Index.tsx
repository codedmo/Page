import { Outlet, useLocation, Link } from 'react-router-dom';
import { Code, Globe, Monitor, Smartphone, Database, CheckCircle } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Desarrollo() {
  const location = useLocation();

  // SEO para Desarrollo
  useSEO({
    title: 'Desarrollo de Software - Web, Móvil, APIs | CODEDMO',
    description: 'Servicios de desarrollo de software personalizado. Desarrollo web con React, aplicaciones móviles, APIs e integraciones empresariales.',
    keywords: ['desarrollo web', 'desarrollo software', 'aplicaciones móviles', 'desarrollo react', 'apis desarrollo'],
    canonical: '/servicios/desarrollo'
  });

  const services = [
    {
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos con React y Next.js',
      path: '/servicios/desarrollo/web',
      features: ['React/Next.js', 'Diseño responsivo', 'SEO optimizado', 'E-commerce']
    },
    {
      icon: Monitor,
      title: 'Software a Medida',
      description: 'Aplicaciones empresariales personalizadas',
      path: '/servicios/desarrollo/software',
      features: ['Soluciones personalizadas', 'Escalabilidad', 'Integración sistemas', 'Soporte continuo']
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Aplicaciones iOS y Android nativas',
      path: '/servicios/desarrollo/movil',
      features: ['iOS & Android', 'Diseño nativo', 'Push notifications', 'Offline support']
    },
    {
      icon: Database,
      title: 'APIs e Integraciones',
      description: 'Conectamos sistemas y plataformas',
      path: '/servicios/desarrollo/api',
      features: ['REST APIs', 'GraphQL', 'Microservicios', 'Documentación completa']
    }
  ];

  // Si estamos en una subruta, mostrar el outlet
  if (location.pathname !== '/servicios/desarrollo') {
    return <Outlet />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Code className="w-4 h-4 mr-2" />
          Desarrollo de Software
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Soluciones de software <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>a tu medida</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desde sitios web modernos hasta aplicaciones empresariales complejas. Desarrollamos la tecnología que tu negocio necesita.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
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

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías que utilizamos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL'].map((tech, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold text-sm">{tech}</span>
              </div>
              <p className="text-gray-400 text-xs">{tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso de Desarrollo</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Análisis', desc: 'Entendemos tus necesidades' },
            { step: '02', title: 'Diseño', desc: 'Creamos la arquitectura' },
            { step: '03', title: 'Desarrollo', desc: 'Construimos la solución' },
            { step: '04', title: 'Testing', desc: 'Probamos exhaustivamente' },
            { step: '05', title: 'Despliegue', desc: 'Lanzamos tu producto' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-sm mb-4`}>
                {item.step}
              </div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className={`max-w-2xl mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border ${borders.primary} backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h3>
          <p className="text-gray-300 mb-6">
            Conversemos sobre tu idea y te ayudamos a convertirla en realidad con la mejor tecnología.
          </p>
          <Link 
            to="/servicios/cotizacion" 
            className={`
              inline-flex items-center px-8 py-3 bg-gradient-to-r ${gradients.primary} 
              text-white font-semibold rounded-lg transition-all duration-300
              hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105
            `}
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </div>
  );
}
