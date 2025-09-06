import { Outlet, useLocation, Link } from 'react-router-dom';
import { Zap, Mail, Monitor, Database, Users, Shield } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Google_Microsoft() {
  const location = useLocation();

  // SEO para Google & Microsoft
  useSEO({
    title: 'Google Workspace & Microsoft 365 - Integración Empresarial | CODEDMO',
    description: 'Servicios de Google Workspace y Microsoft 365. Implementación, migración e integraciones empresariales para aumentar la productividad.',
    keywords: ['google workspace', 'microsoft 365', 'office 365', 'integraciones empresariales', 'productividad'],
    canonical: '/servicios/google&microsoft'
  });

  const services = [
    {
      icon: Mail,
      title: 'Google Workspace',
      description: 'Gmail, Drive, Meet y herramientas colaborativas',
      path: '/servicios/google&microsoft/workspace',
      features: ['Gmail profesional', 'Google Drive ilimitado', 'Google Meet', 'Documentos colaborativos']
    },
    {
      icon: Monitor,
      title: 'Microsoft 365',
      description: 'Office, Teams y productividad empresarial',
      path: '/servicios/google&microsoft/microsoft365',
      features: ['Office completo', 'Microsoft Teams', 'OneDrive', 'SharePoint']
    }
  ];

  const integrations = [
    {
      icon: Database,
      title: 'APIs Personalizadas',
      description: 'Conectamos tus sistemas con Google y Microsoft'
    },
    {
      icon: Users,
      title: 'Migración de Datos',
      description: 'Transferencia segura desde otros sistemas'
    },
    {
      icon: Shield,
      title: 'Seguridad y Cumplimiento',
      description: 'Configuración de políticas y permisos'
    },
    {
      icon: Zap,
      title: 'Automatización',
      description: 'Workflows y procesos automatizados'
    }
  ];

  // Si estamos en una subruta, mostrar el outlet
  if (location.pathname !== '/servicios/google&microsoft') {
    return <Outlet />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Zap className="w-4 h-4 mr-2" />
          Google & Microsoft
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Potencia tu empresa con <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Google y Microsoft</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Implementación, migración e integración de Google Workspace y Microsoft 365 para maximizar la productividad de tu equipo.
        </p>
      </div>

      {/* Main Services */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={index}
              to={service.path}
              className="group block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                <div className={`w-16 h-16 bg-gradient-to-r ${gradients.primary} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Integration Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios de Integración</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{integration.title}</h3>
                <p className="text-gray-400 text-sm">{integration.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
              1
            </div>
            <h3 className="font-bold text-white mb-2">Análisis</h3>
            <p className="text-gray-400 text-sm">Evaluamos tu infraestructura actual</p>
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
              2
            </div>
            <h3 className="font-bold text-white mb-2">Planificación</h3>
            <p className="text-gray-400 text-sm">Diseñamos la estrategia de migración</p>
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
              3
            </div>
            <h3 className="font-bold text-white mb-2">Implementación</h3>
            <p className="text-gray-400 text-sm">Ejecutamos la migración sin interrupciones</p>
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
              4
            </div>
            <h3 className="font-bold text-white mb-2">Capacitación</h3>
            <p className="text-gray-400 text-sm">Entrenamos a tu equipo en las nuevas herramientas</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className={`max-w-2xl mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border ${borders.primary} backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Listo para modernizar tu empresa?
          </h3>
          <p className="text-gray-300 mb-6">
            Agenda una consulta gratuita y descubre cómo Google Workspace o Microsoft 365 pueden transformar tu productividad.
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
