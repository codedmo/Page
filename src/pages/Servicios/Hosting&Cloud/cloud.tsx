import { Cloud, Server, Database, Globe, CheckCircle, Shield, Zap, MessageCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function CloudServices() {
  // SEO para Servicios Cloud
  useSEO({
    title: 'Servicios Cloud - Infraestructura en la Nube | CODEDMO',
    description: 'Servicios de cloud computing para empresas. AWS, Azure y Google Cloud. Migración, administración y optimización de costos.',
    keywords: ['servicios cloud', 'aws', 'azure', 'google cloud', 'migración cloud', 'devops'],
    canonical: '/servicios/hosting&cloud/cloud'
  });

  const handleWhatsAppContact = (serviceName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el servicio de ${serviceName}. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'Migración a la nube',
    'Administración 24/7',
    'Optimización de costos',
    'Backup automático',
    'Escalabilidad automática',
    'Monitoreo en tiempo real',
    'Seguridad avanzada',
    'Soporte técnico experto'
  ];

  const cloudProviders = [
    {
      name: 'Amazon AWS',
      description: 'La plataforma cloud más completa del mundo',
      icon: Server,
      services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront', 'EKS'],
      benefits: ['99.99% uptime', 'Global infrastructure', 'Pay as you use', 'Enterprise ready']
    },
    {
      name: 'Microsoft Azure',
      description: 'Integración perfecta con Microsoft',
      icon: Database,
      services: ['Virtual Machines', 'SQL Database', 'App Service', 'Functions', 'CDN', 'AKS'],
      benefits: ['Active Directory', 'Hybrid cloud', 'Enterprise tools', 'Compliance']
    },
    {
      name: 'Google Cloud',
      description: 'Potencia de Google para tu empresa',
      icon: Globe,
      services: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Cloud Functions', 'GKE', 'Firebase'],
      benefits: ['AI/ML services', 'Global network', 'Sustainable', 'Developer friendly']
    }
  ];

  const services = [
    {
      title: 'Migración Cloud',
      description: 'Trasladamos tu infraestructura a la nube de forma segura',
      price: 'Desde $1,500',
      features: ['Análisis de infraestructura', 'Plan de migración', 'Ejecución supervisada', 'Optimización post-migración']
    },
    {
      title: 'Administración Cloud',
      description: 'Gestionamos tu infraestructura cloud 24/7',
      price: 'Desde $500/mes',
      features: ['Monitoreo 24/7', 'Actualizaciones automáticas', 'Backup programado', 'Optimización de costos']
    },
    {
      title: 'DevOps & CI/CD',
      description: 'Automatizamos tus procesos de desarrollo y despliegue',
      price: 'Desde $800',
      features: ['Pipelines automatizados', 'Docker/Kubernetes', 'Infrastructure as Code', 'Monitoring avanzado']
    }
  ];

  const benefits = [
    {
      title: 'Reducción de Costos',
      description: 'Optimizamos recursos para reducir hasta 40% tus costos de infraestructura',
      icon: Zap
    },
    {
      title: 'Escalabilidad',
      description: 'Tu infraestructura crece automáticamente según la demanda',
      icon: Server
    },
    {
      title: 'Seguridad',
      description: 'Implementamos las mejores prácticas de seguridad cloud',
      icon: Shield
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Cloud className="w-4 h-4 mr-2" />
          Servicios Cloud
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Lleva tu empresa <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>a la nube</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Te ayudamos a migrar, administrar y optimizar tu infraestructura en los principales proveedores cloud del mundo.
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

      {/* Cloud Providers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Proveedores Cloud</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cloudProviders.map((provider, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <provider.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{provider.name}</h3>
              <p className="text-gray-400 mb-4">{provider.description}</p>
              
              <h4 className="text-white font-semibold mb-2">Servicios:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {provider.services.map((service, sIndex) => (
                  <span key={sIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
              
              <h4 className="text-white font-semibold mb-2">Beneficios:</h4>
              <ul className="space-y-1">
                {provider.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="text-purple-400 font-bold text-lg mb-4">{service.price}</div>
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

      {/* Benefits */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Por qué migrar a la nube?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <benefit.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
