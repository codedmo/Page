import { Mail, Calendar, Users, Cloud, Shield, Video, Info, MessageCircle } from 'lucide-react';
import { gradients} from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';
import { useState } from 'react';

export default function Google_Workspace() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // SEO para Google Workspace
  useSEO({
    title: 'Google Workspace - Gmail, Drive, Meet | CODEDMO',
    description: 'Implementación y gestión de Google Workspace para empresas. Gmail profesional, Google Drive, Google Meet y herramientas colaborativas.',
    keywords: ['google workspace', 'gmail empresarial', 'google drive', 'google meet', 'herramientas colaborativas', 'productividad empresarial'],
    canonical: 'https://codedmo.dev/servicios/google&microsoft/workspace'
  });

  const handleWhatsAppContact = (planName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el plan ${planName} de Google Workspace. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const planDetails = {
    starter: {
      title: "Business Starter",
      features: [
        "Gmail profesional personalizado",
        "30 GB de almacenamiento por usuario",
        "Google Meet hasta 100 participantes",
        "Documentos, Hojas y Presentaciones",
        "Calendarios compartidos",
        "Soporte estándar"
      ]
    },
    standard: {
      title: "Business Standard", 
      features: [
        "Todo lo de Business Starter",
        "2 TB de almacenamiento por usuario",
        "Google Meet hasta 150 participantes",
        "Grabación de reuniones",
        "Páginas de reserva de citas",
        "Soporte prioritario"
      ]
    },
    plus: {
      title: "Business Plus",
      features: [
        "Todo lo de Business Standard",
        "5 TB de almacenamiento por usuario", 
        "Google Meet hasta 500 participantes",
        "Funciones de seguridad avanzadas",
        "Google Vault para archivo",
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
                  <span className="text-green-400 mr-2">•</span>
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
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
          Gmail profesional, Google Drive, Meet y herramientas colaborativas configuradas según la operación, seguridad y tamaño de tu equipo.
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
          Elegimos el plan adecuado según usuarios, almacenamiento, seguridad y nivel de acompañamiento que necesita tu empresa.
        </p>

        <div className="overflow-x-auto relative">
          <table className="w-full text-sm relative">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-white font-semibold">Comparativa</th>
                <th className="text-center py-3 px-4 text-white font-semibold">
                  <div className="flex items-center justify-center">
                    Starter
                    <TooltipInfo planKey="starter" planData={planDetails.starter} />
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
                    Plus
                    <TooltipInfo planKey="plus" planData={planDetails.plus} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Almacenamiento</td>
                <td className="text-center py-3 px-4">30 GB por usuario</td>
                <td className="text-center py-3 px-4">2 TB por usuario</td>
                <td className="text-center py-3 px-4">5 TB por usuario</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Videollamadas</td>
                <td className="text-center py-3 px-4">Meet hasta 100 participantes</td>
                <td className="text-center py-3 px-4">Meet hasta 150 participantes + grabación</td>
                <td className="text-center py-3 px-4">Meet hasta 500 participantes</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Colaboración</td>
                <td className="text-center py-3 px-4">Docs, Sheets, Slides y calendarios compartidos</td>
                <td className="text-center py-3 px-4">Todo Starter + páginas de reserva</td>
                <td className="text-center py-3 px-4">Todo Standard + Google Vault</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4">Soporte</td>
                <td className="text-center py-3 px-4">Estándar</td>
                <td className="text-center py-3 px-4">Prioritario</td>
                <td className="text-center py-3 px-4">24/7</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Implementación</td>
                <td className="text-center py-3 px-4" colSpan={3}>Cotización y despliegue según usuarios, dominios y necesidades de seguridad</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => handleWhatsAppContact('Business Starter')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Starter</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Standard')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Standard</span>
            </button>
            <button 
              onClick={() => handleWhatsAppContact('Business Plus')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Business Plus</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Configuramos, migramos y administramos Google Workspace según la estructura real de tu equipo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
