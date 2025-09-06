import { Mail, Calendar, Users, Cloud, Shield, Video } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Google_Workspace() {
  // SEO para Google Workspace
  useSEO({
    title: 'Google Workspace - Gmail, Drive, Meet | CODEDMO',
    description: 'Implementación y gestión de Google Workspace para empresas. Gmail profesional, Google Drive, Google Meet y herramientas colaborativas.',
    keywords: ['google workspace', 'gmail empresarial', 'google drive', 'google meet', 'herramientas colaborativas', 'productividad empresarial'],
    canonical: '/servicios/google&microsoft/workspace'
  });

  const features = [
    {
      icon: Mail,
      title: 'Gmail Profesional',
      description: 'Correo empresarial con tu dominio personalizado'
    },
    {
      icon: Cloud,
      title: 'Google Drive',
      description: 'Almacenamiento en la nube ilimitado para tu empresa'
    },
    {
      icon: Video,
      title: 'Google Meet',
      description: 'Videoconferencias profesionales sin límites'
    },
    {
      icon: Calendar,
      title: 'Google Calendar',
      description: 'Calendario compartido y gestión de reuniones'
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Documentos, hojas de cálculo y presentaciones colaborativas'
    },
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Protección avanzada y control de administrador'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Mail className="w-4 h-4 mr-2" />
          Google Workspace
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Potencia tu empresa con <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Google Workspace</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Gmail profesional, Google Drive ilimitado, Meet sin restricciones y todas las herramientas que tu equipo necesita para ser más productivo.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Planes Disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">Business Starter</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$6/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Gmail profesional personalizado</li>
              <li>30 GB de almacenamiento</li>
              <li>Google Meet (100 participantes)</li>
              <li>Soporte estándar</li>
            </ul>
          </div>
          <div className={`relative border-2 ${borders.primary} rounded-xl p-6`}>
            <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
              Recomendado
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Business Standard</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$12/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Gmail profesional personalizado</li>
              <li>2 TB de almacenamiento</li>
              <li>Google Meet (150 participantes)</li>
              <li>Grabación de reuniones</li>
              <li>Soporte mejorado</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">Business Plus</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$18/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Gmail profesional personalizado</li>
              <li>5 TB de almacenamiento</li>
              <li>Google Meet (500 participantes)</li>
              <li>Funciones de seguridad avanzadas</li>
              <li>Soporte prioritario</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
