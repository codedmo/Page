import { FileText, Video, Cloud, Monitor, Users, Shield, Info, MessageCircle } from 'lucide-react';
import { gradients} from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';
import { useState } from 'react';

export default function Microsoft_365() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // SEO para Microsoft 365
  useSEO({
    title: 'Microsoft 365 - Office, Teams, OneDrive | CODEDMO',
    description: 'Implementación de Microsoft 365 para empresas. Office completo, Teams, OneDrive y herramientas de productividad empresarial.',
    keywords: ['microsoft 365', 'office 365', 'microsoft teams', 'onedrive', 'outlook', 'productividad empresarial'],
    canonical: '/servicios/google&microsoft/microsoft365'
  });

  const handleWhatsAppContact = (planName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el plan ${planName} de Microsoft 365. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const planDetails = {
    basic: {
      title: "Business Basic",
      features: [
        "Outlook, Teams y OneDrive",
        "1 TB de almacenamiento por usuario",
        "Office web y aplicaciones móviles",
        "Teams para reuniones básicas",
        "SharePoint para colaboración",
        "Soporte estándar"
      ]
    },
    standard: {
      title: "Business Standard",
      features: [
        "Todo lo de Business Basic",
        "Office completo para escritorio",
        "Teams con funciones avanzadas",
        "Exchange Online completo",
        "Webinars en Teams",
        "Soporte prioritario"
      ]
    },
    premium: {
      title: "Business Premium",
      features: [
        "Todo lo de Business Standard",
        "Seguridad avanzada Microsoft Defender",
        "Protección contra amenazas",
        "Gestión de dispositivos Intune",
        "Azure Information Protection",
        "Soporte 24/7"
      ]
    }
  };

  const TooltipInfo = ({ planKey, planData }: { planKey: string, planData: { title: string, features: string[] } }) => (
    <div className="relative inline-block">
      <button
        title={`Ver detalles de ${planData.title}`}
        className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        onMouseEnter={() => setActiveTooltip(planKey)}
        onMouseLeave={() => setActiveTooltip(null)}
      >
        <Info className="w-4 h-4 text-gray-400 hover:text-white" />
      </button>
      {activeTooltip === planKey && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div 
            className="absolute bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl pointer-events-auto"
            style={{
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              maxWidth: '90vw'
            }}
          >
            <h4 className="text-white font-semibold mb-2">{planData.title}</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              {planData.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveTooltip(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
          La suite completa de Office, Teams para comunicación, OneDrive para almacenamiento y todas las herramientas empresariales. Paquetes diseñados para empresas guatemaltecas con precios accesibles.
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
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Planes y Paquetes Disponibles</h2>
        
        {/* Paquetes por Empresa */}
        {/* <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Paquetes por Empresa</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Paquete Básico</h4>
              <p className="text-3xl font-bold text-purple-400 mb-2">Q600</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 5 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Outlook, Teams, OneDrive</li>
                <li>1 TB por usuario</li>
                <li>Office web y móvil</li>
                <li>Teams básico</li>
                <li>Soporte básico</li>
              </ul>
            </div>
            <div className={`relative border-2 ${borders.primary} rounded-xl p-6 bg-white/5`}>
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                Recomendado
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Paquete Estándar</h4>
              <p className="text-3xl font-bold text-purple-400 mb-2">Q900</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 10 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Office completo (escritorio)</li>
                <li>1 TB por usuario</li>
                <li>Teams con funciones avanzadas</li>
                <li>SharePoint y Exchange</li>
                <li>Webinars en Teams</li>
                <li>Soporte prioritario</li>
              </ul>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Paquete Premium</h4>
              <p className="text-3xl font-bold text-purple-400 mb-2">Q1,400</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 15 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Todo de Paquete Estándar</li>
                <li>Seguridad avanzada</li>
                <li>Protección contra amenazas</li>
                <li>Gestión de dispositivos</li>
                <li>Análisis avanzado</li>
                <li>Soporte 24/7</li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Planes Individuales */}
        {/* <div className="border-t border-white/10 pt-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Planes por Usuario Individual</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-2">Business Basic</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q95</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Outlook, Teams, OneDrive</li>
                <li>1 TB de almacenamiento</li>
                <li>Office web y móvil</li>
                <li>Teams básico</li>
                <li>Soporte estándar</li>
              </ul>
            </div>
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-2">Business Standard</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q135</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Office completo (escritorio)</li>
                <li>1 TB de almacenamiento</li>
                <li>Teams con funciones avanzadas</li>
                <li>SharePoint y Exchange</li>
                <li>Webinars en Teams</li>
                <li>Soporte mejorado</li>
              </ul>
            </div>
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-2">Business Premium</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q220</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Todo de Business Standard</li>
                <li>Seguridad avanzada</li>
                <li>Protección contra amenazas</li>
                <li>Gestión de dispositivos</li>
                <li>Análisis avanzado</li>
                <li>Soporte 24/7</li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Tabla de Comparación */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Comparación de Precios</h3>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm relative">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Usuarios</th>
                  <th className="text-center py-3 px-4 text-white font-semibold">
                    <div className="flex items-center justify-center">
                      Plan 1
                      <TooltipInfo planKey="basic" planData={planDetails.basic} />
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-white font-semibold">
                    <div className="flex items-center justify-center">
                      Plan 2
                      <TooltipInfo planKey="standard" planData={planDetails.standard} />
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-white font-semibold">
                    <div className="flex items-center justify-center">
                      Estándar
                      <TooltipInfo planKey="premium" planData={planDetails.premium} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">1-5 usuarios</td>
                  <td className="text-center py-3 px-4">Q250/mes</td>
                  <td className="text-center py-3 px-4">Q450/mes</td>
                  <td className="text-center py-3 px-4">Q700/mes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">6-10 usuarios</td>
                  <td className="text-center py-3 px-4">Q450/mes</td>
                  <td className="text-center py-3 px-4">Q800/mes</td>
                  <td className="text-center py-3 px-4">Q1,200/mes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">11-15 usuarios</td>
                  <td className="text-center py-3 px-4">Q650/mes</td>
                  <td className="text-center py-3 px-4">Q1,150/mes</td>
                  <td className="text-center py-3 px-4">Q1,800/mes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">16+ usuarios</td>
                  <td className="text-center py-3 px-4" colSpan={3}>Consultar precio personalizado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          {/* WhatsApp Contact Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => handleWhatsAppContact('Business Basic')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Plan 1</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Standard')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Plan 2</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Premium')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Estándar</span>
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              * Precios mensuales en quetzales guatemaltecos. Los paquetes incluyen configuración inicial gratuita.
            </p>
            <p className="text-gray-300 text-sm">
              ¿Necesitas una configuración especial? Contáctanos para un plan a medida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
