import { Globe, Search, Shield, CheckCircle, Clock, Star } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Dominios() {
  // SEO para Dominios
  useSEO({
    title: 'Registro de Dominios - Tu Identidad Online | CODEDMO',
    description: 'Registro de dominios .com, .net, .org y más. Precios competitivos, renovación automática y DNS gratuito.',
    keywords: ['registro dominios', 'dominios baratos', 'com net org', 'dns gratuito', 'whois privacy'],
    canonical: '/servicios/hosting&cloud/dominios'
  });

  const features = [
    'Registro inmediato',
    'DNS management gratuito',
    'Whois privacy incluido',
    'Renovación automática',
    'Email forwarding',
    'Subdominios ilimitados',
    'Soporte técnico 24/7',
    'Panel de control fácil'
  ];

  const domainExtensions = [
    { extension: '.com', price: '$12.99/año', description: 'El más popular para empresas' },
    { extension: '.net', price: '$14.99/año', description: 'Ideal para tecnología' },
    { extension: '.org', price: '$13.99/año', description: 'Perfecto para organizaciones' },
    { extension: '.info', price: '$11.99/año', description: 'Para sitios informativos' },
    { extension: '.biz', price: '$15.99/año', description: 'Enfocado en negocios' },
    { extension: '.mx', price: '$35.99/año', description: 'Dominio mexicano' },
    { extension: '.co', price: '$29.99/año', description: 'Alternativa moderna al .com' },
    { extension: '.io', price: '$59.99/año', description: 'Popular entre startups tech' }
  ];

  const services = [
    {
      title: 'Registro de Dominio',
      description: 'Registra tu dominio ideal en segundos',
      icon: Globe,
      features: ['Búsqueda instantánea', 'Registro automático', 'Certificado SSL incluido', 'DNS configurado']
    },
    {
      title: 'Transferencia de Dominio',
      description: 'Transfiere tu dominio existente',
      icon: Shield,
      features: ['Proceso simplificado', 'Sin downtime', 'Extensión gratuita 1 año', 'Soporte completo']
    },
    {
      title: 'Gestión DNS',
      description: 'Control total de tu dominio',
      icon: Search,
      features: ['Panel intuitivo', 'Registros A, CNAME, MX', 'Subdominios ilimitados', 'Cambios instantáneos']
    }
  ];

  const additionalServices = [
    'Whois Privacy Protection',
    'Domain Lock Security',
    'Email Forwarding',
    'Subdomain Management',
    'DNS Zone Editor',
    'Domain Parking',
    'Bulk Domain Registration',
    'Domain Monitoring'
  ];

  const domainTips = [
    {
      title: 'Elige el nombre correcto',
      description: 'Corto, memorable y relacionado con tu marca',
      icon: Star
    },
    {
      title: 'Registra variaciones',
      description: 'Protege tu marca registrando .com, .net, .org',
      icon: Shield
    },
    {
      title: 'Renueva a tiempo',
      description: 'Activa la renovación automática',
      icon: Clock
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Globe className="w-4 h-4 mr-2" />
          Registro de Dominios
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Tu <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>identidad digital</span> empieza aquí
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Registra el dominio perfecto para tu proyecto. Precios competitivos y todas las herramientas que necesitas.
        </p>
      </div>

      {/* Domain Search */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Busca tu dominio ideal</h2>
        <div className="flex max-w-md mx-auto">
          <input
            type="text"
            placeholder="Escribe tu dominio..."
            className="flex-1 px-4 py-3 bg-white/10 text-white rounded-l-lg border border-white/20 focus:outline-none focus:border-purple-500"
          />
          <button className={`px-6 py-3 bg-gradient-to-r ${gradients.primary} text-white rounded-r-lg font-semibold hover:shadow-lg transition-all duration-300`}>
            Buscar
          </button>
        </div>
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

      {/* Domain Extensions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Extensiones Disponibles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domainExtensions.map((domain, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">{domain.extension}</div>
              <div className="text-lg font-semibold text-white mb-2">{domain.price}</div>
              <div className="text-sm text-gray-400">{domain.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios de Dominio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <service.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Consejos para tu Dominio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {domainTips.map((tip, index) => (
            <div key={index} className="text-center">
              <tip.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios Adicionales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalServices.map((service, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Shield className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
