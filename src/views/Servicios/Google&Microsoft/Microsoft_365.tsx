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
    canonical: 'https://codedmo.dev/servicios/google&microsoft/microsoft365'
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
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
          Office, Teams, OneDrive y seguridad empresarial configurados según usuarios, colaboración interna y nivel de protección que necesita tu operación.
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

      {/* Plans */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Planes y alcance disponibles</h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-10">
          Definimos la combinación correcta según colaboración, administración, seguridad y requerimientos de cumplimiento.
        </p>

        <div className="overflow-x-auto relative">
          <table className="w-full text-sm relative">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-white font-semibold">Comparativa</th>
                <th className="text-center py-3 px-4 text-white font-semibold">
                  <div className="flex items-center justify-center">
                    Basic
                    <TooltipInfo planKey="basic" planData={planDetails.basic} />
                  </div>
                </th>
                <th className="text-center py-3 px-4 text-white font-semibold">
                  <div className="flex items-center justify-center">
                    Standard
                    <TooltipInfo planKey="standard" planData={planDetails.standard} />
                  </div>
                </th>
                <th className="text-center py-3 px-4 text-white font-semibold">
                  <div className="flex items-center justify-center">
                    Premium
                    <TooltipInfo planKey="premium" planData={planDetails.premium} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Suite incluida</td>
                <td className="text-center py-3 px-4">Outlook, Teams y OneDrive</td>
                <td className="text-center py-3 px-4">Todo Basic + Office de escritorio</td>
                <td className="text-center py-3 px-4">Todo Standard + Microsoft Defender</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Almacenamiento</td>
                <td className="text-center py-3 px-4">1 TB por usuario</td>
                <td className="text-center py-3 px-4">1 TB por usuario</td>
                <td className="text-center py-3 px-4">1 TB por usuario</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Colaboración</td>
                <td className="text-center py-3 px-4">Teams para reuniones básicas</td>
                <td className="text-center py-3 px-4">Teams avanzado + webinars</td>
                <td className="text-center py-3 px-4">Teams avanzado + gestión de dispositivos</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Seguridad</td>
                <td className="text-center py-3 px-4">Protección estándar</td>
                <td className="text-center py-3 px-4">Administración ampliada</td>
                <td className="text-center py-3 px-4">Protección contra amenazas + Intune</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Soporte</td>
                <td className="text-center py-3 px-4">Estándar</td>
                <td className="text-center py-3 px-4">Prioritario</td>
                <td className="text-center py-3 px-4">24/7</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Implementación</td>
                <td className="text-center py-3 px-4" colSpan={3}>Cotización y configuración según usuarios, compliance e integraciones</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => handleWhatsAppContact('Business Basic')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Basic</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Standard')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Standard</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Premium')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Premium</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Configuramos, migramos y administramos Microsoft 365 según la estructura y controles que necesita tu empresa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
