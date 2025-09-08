import { Code, Database, Shield, CheckCircle, Globe, Server, MessageCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Api_Dev() {
  // SEO para Desarrollo de APIs
  useSEO({
    title: 'Desarrollo de APIs e Integraciones - Soluciones Backend | CODEDMO',
    description: 'Desarrollo de APIs REST, GraphQL y microservicios. Integraciones personalizadas para conectar tus sistemas y aplicaciones.',
    keywords: ['desarrollo apis', 'microservicios', 'integraciones', 'rest api', 'graphql', 'backend'],
    canonical: '/servicios/desarrollo/api'
  });

  const handleWhatsAppContact = (serviceName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el servicio de ${serviceName}. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'APIs REST y GraphQL',
    'Microservicios escalables',
    'Integraciones de terceros',
    'Documentación automática',
    'Autenticación JWT/OAuth',
    'Rate limiting y caching',
    'Monitoreo en tiempo real',
    'Arquitectura cloud-native'
  ];

  const services = [
    {
      title: 'API REST',
      description: 'APIs RESTful completas con documentación automática',
      icon: Globe,
      features: ['Swagger/OpenAPI', 'Versionado', 'CORS configurado', 'Rate limiting']
    },
    {
      title: 'GraphQL',
      description: 'APIs GraphQL eficientes para aplicaciones modernas',
      icon: Database,
      features: ['Schema personalizado', 'Resolvers optimizados', 'Subscriptions', 'Federation']
    },
    {
      title: 'Microservicios',
      description: 'Arquitectura de microservicios escalable y resiliente',
      icon: Server,
      features: ['Service mesh', 'Load balancing', 'Circuit breakers', 'Observabilidad']
    }
  ];

  const integrations = [
    'Stripe/PayPal (Pagos)',
    'Twilio (SMS/WhatsApp)',
    'SendGrid (Email)',
    'AWS/Azure/GCP',
    'MongoDB/PostgreSQL',
    'Redis/Elasticsearch',
    'Docker/Kubernetes',
    'CI/CD Pipelines'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Code className="w-4 h-4 mr-2" />
          Desarrollo de APIs
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          APIs e <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>integraciones robustas</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos APIs escalables y microservicios que conectan tus sistemas de manera eficiente y segura.
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

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios de Desarrollo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <service.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleWhatsAppContact(service.title)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Integraciones Disponibles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Shield className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{integration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
