import { Smartphone, Tablet, Download, CheckCircle, Code, Zap, MessageCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Mobile_Dev() {
  // SEO para Desarrollo Móvil
  useSEO({
    title: 'Desarrollo de Apps Móviles - iOS y Android | CODEDMO',
    description: 'Desarrollo de aplicaciones móviles nativas y multiplataforma para iOS y Android. Apps que tus usuarios amarán.',
    keywords: ['desarrollo móvil', 'apps ios', 'apps android', 'react native', 'flutter', 'aplicaciones móviles'],
    canonical: '/servicios/desarrollo/mobile'
  });

  const handleWhatsAppContact = (serviceName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el servicio de ${serviceName}. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'Apps nativas iOS/Android',
    'Desarrollo multiplataforma',
    'UI/UX optimizado para móvil',
    'Integración con APIs',
    'Push notifications',
    'Almacenamiento offline',
    'App Store deployment',
    'Actualizaciones OTA'
  ];

  const appTypes = [
    {
      title: 'App Nativa',
      description: 'Máximo rendimiento para iOS y Android',
      icon: Smartphone,
      features: ['Swift/Kotlin', 'Rendimiento óptimo', 'Acceso completo al hardware', 'App Store optimizado'],
      price: 'Desde Q12,000',
      time: '3-6 meses',
      platforms: ['iOS', 'Android']
    },
    {
      title: 'App Multiplataforma',
      description: 'Una app para iOS y Android',
      icon: Tablet,
      features: ['React Native/Flutter', 'Código compartido', 'Desarrollo más rápido', 'Menor costo'],
      price: 'Desde Q8,000',
      time: '2-4 meses',
      platforms: ['iOS', 'Android', 'Web']
    },
    {
      title: 'PWA',
      description: 'Progressive Web App',
      icon: Download,
      features: ['Funciona sin conexión', 'Instalable desde navegador', 'Push notifications', 'Responsive design'],
      price: 'Desde Q5,000',
      time: '1-2 meses',
      platforms: ['iOS', 'Android', 'Web', 'Desktop']
    }
  ];

  const technologies = [
    'React Native',
    'Flutter',
    'Swift (iOS)',
    'Kotlin (Android)',
    'Firebase',
    'GraphQL/REST',
    'Redux/MobX',
    'TypeScript'
  ];

  const process = [
    {
      step: '1',
      title: 'Concepto',
      description: 'Definimos la idea y funcionalidades clave'
    },
    {
      step: '2',
      title: 'Diseño UX/UI',
      description: 'Creamos wireframes y diseños atractivos'
    },
    {
      step: '3',
      title: 'Desarrollo',
      description: 'Programamos con las mejores tecnologías'
    },
    {
      step: '4',
      title: 'Testing',
      description: 'Pruebas en dispositivos reales'
    },
    {
      step: '5',
      title: 'Publicación',
      description: 'Subimos a App Store y Google Play'
    }
  ];

  const features_detailed = [
    {
      title: 'Performance',
      items: ['60 FPS fluidos', 'Tiempo de carga < 2s', 'Optimización de memoria', 'Batería eficiente']
    },
    {
      title: 'Funcionalidades',
      items: ['Push notifications', 'Geolocalización', 'Cámara/Galería', 'Biometría']
    },
    {
      title: 'Backend',
      items: ['APIs REST/GraphQL', 'Base de datos en tiempo real', 'Autenticación', 'Analytics']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Smartphone className="w-4 h-4 mr-2" />
          Desarrollo Móvil
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Apps que <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>enamoran</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos aplicaciones móviles que tus usuarios amarán usar. Experiencias intuitivas y funcionalidades potentes.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-white text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* App Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tipos de Aplicaciones</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {appTypes.map((type, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <type.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
              <p className="text-gray-400 mb-4">{type.description}</p>
              <ul className="space-y-2 mb-6">
                {type.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-4 space-y-2 mb-4">
                <div className="text-purple-400 font-bold text-lg">{type.price}</div>
                <div className="text-gray-400 text-sm">Tiempo: {type.time}</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {type.platforms.map((platform, pIndex) => (
                    <span key={pIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => handleWhatsAppContact(type.title)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Detailed */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Características Técnicas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features_detailed.map((category, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item, iIndex) => (
                  <li key={iIndex} className="flex items-center text-sm text-gray-300">
                    <Zap className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Proceso de Desarrollo</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {process.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                {step.step}
              </div>
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías Móviles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Code className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
