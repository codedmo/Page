import { Monitor, Users, Shield, Cloud, Video, FileText } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Microsoft_365() {
  // SEO para Microsoft 365
  useSEO({
    title: 'Microsoft 365 - Office, Teams, OneDrive | CODEDMO',
    description: 'Implementación de Microsoft 365 para empresas. Office completo, Teams, OneDrive y herramientas de productividad empresarial.',
    keywords: ['microsoft 365', 'office 365', 'microsoft teams', 'onedrive', 'outlook', 'productividad empresarial'],
    canonical: '/servicios/google&microsoft/microsoft365'
  });

  const features = [
    {
      icon: FileText,
      title: 'Office Completo',
      description: 'Word, Excel, PowerPoint y Access en la nube y escritorio'
    },
    {
      icon: Video,
      title: 'Microsoft Teams',
      description: 'Comunicación, videoconferencias y colaboración en equipo'
    },
    {
      icon: Cloud,
      title: 'OneDrive',
      description: 'Almacenamiento en la nube seguro y sincronizado'
    },
    {
      icon: Monitor,
      title: 'Outlook',
      description: 'Correo profesional con calendario y contactos integrados'
    },
    {
      icon: Users,
      title: 'SharePoint',
      description: 'Sitios de equipo y gestión de documentos'
    },
    {
      icon: Shield,
      title: 'Seguridad Avanzada',
      description: 'Protección contra amenazas y cumplimiento normativo'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Monitor className="w-4 h-4 mr-2" />
          Microsoft 365
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Impulsa tu productividad con <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Microsoft 365</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          La suite completa de Office, Teams para comunicación, OneDrive para almacenamiento y todas las herramientas empresariales que necesitas.
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
            <h3 className="text-lg font-bold text-white mb-2">Business Basic</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$6/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Outlook, Teams, OneDrive</li>
              <li>1 TB de almacenamiento</li>
              <li>Office web y móvil</li>
              <li>Teams básico</li>
            </ul>
          </div>
          <div className={`relative border-2 ${borders.primary} rounded-xl p-6`}>
            <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
              Recomendado
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Business Standard</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$12.50/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Office completo (escritorio)</li>
              <li>1 TB de almacenamiento</li>
              <li>Teams con funciones avanzadas</li>
              <li>SharePoint y Exchange</li>
              <li>Webinars en Teams</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">Business Premium</h3>
            <p className="text-2xl font-bold text-purple-400 mb-4">$22/usuario/mes</p>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Todo de Business Standard</li>
              <li>Seguridad avanzada</li>
              <li>Protección contra amenazas</li>
              <li>Gestión de dispositivos</li>
              <li>Análisis avanzado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
