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
    canonical: '/servicios/google&microsoft/workspace'
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
          Gmail profesional, Google Drive ilimitado, Meet sin restricciones y todas las herramientas que tu equipo necesita. Paquetes diseñados para empresas guatemaltecas con precios accesibles.
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
              <p className="text-3xl font-bold text-purple-400 mb-2">Q500</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 5 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Gmail profesional personalizado</li>
                <li>30 GB por usuario</li>
                <li>Google Meet (100 participantes)</li>
                <li>Google Drive compartido</li>
                <li>Soporte básico</li>
              </ul>
            </div>
            <div className={`relative border-2 ${borders.primary} rounded-xl p-6 bg-white/5`}>
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                Recomendado
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Paquete Estándar</h4>
              <p className="text-3xl font-bold text-purple-400 mb-2">Q1,300</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 10 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Gmail profesional personalizado</li>
                <li>2 TB por usuario</li>
                <li>Google Meet (150 participantes)</li>
                <li>Grabación de reuniones</li>
                <li>Google Drive colaborativo</li>
                <li>Soporte prioritario</li>
              </ul>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Paquete Premium</h4>
              <p className="text-3xl font-bold text-purple-400 mb-2">Q3,000</p>
              <p className="text-sm text-gray-400 mb-4">Hasta 15 usuarios</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Gmail profesional personalizado</li>
                <li>5 TB por usuario</li>
                <li>Google Meet (500 participantes)</li>
                <li>Funciones de seguridad avanzadas</li>
                <li>Google Vault (archivo)</li>
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
              <h4 className="text-lg font-bold text-white mb-2">Business Starter</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q85</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Gmail profesional</li>
                <li>30 GB de almacenamiento</li>
                <li>Google Meet (100 participantes)</li>
                <li>Documentos, Hojas, Presentaciones</li>
                <li>Soporte estándar</li>
              </ul>
            </div>
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-2">Business Standard</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q120</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Todo de Business Starter</li>
                <li>2 TB de almacenamiento</li>
                <li>Google Meet (150 participantes)</li>
                <li>Grabación de reuniones</li>
                <li>Soporte mejorado</li>
              </ul>
            </div>
            <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-2">Business Plus</h4>
              <p className="text-2xl font-bold text-blue-400 mb-2">Q180</p>
              <p className="text-sm text-gray-400 mb-4">por usuario/mes</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>Todo de Business Standard</li>
                <li>5 TB de almacenamiento</li>
                <li>Google Meet (500 participantes)</li>
                <li>Seguridad avanzada</li>
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
                  <td className="py-3 px-4">1-5 usuarios</td>
                  <td className="text-center py-3 px-4">Q400/mes</td>
                  <td className="text-center py-3 px-4">Q750/mes</td>
                  <td className="text-center py-3 px-4">Q1,150/mes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">6-10 usuarios</td>
                  <td className="text-center py-3 px-4">Q700/mes</td>
                  <td className="text-center py-3 px-4">Q1,300/mes</td>
                  <td className="text-center py-3 px-4">Q2,100/mes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">11-15 usuarios</td>
                  <td className="text-center py-3 px-4">Q1,000/mes</td>
                  <td className="text-center py-3 px-4">Q1,900/mes</td>
                  <td className="text-center py-3 px-4">Q3,000/mes</td>
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
