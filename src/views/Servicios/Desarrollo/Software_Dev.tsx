import { Monitor, Cog, Users, CheckCircle, Database, MessageCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO, useSectionSEO } from '@/hooks/useSEO';

export default function Software_Dev() {
  // SEO optimizado para la página de Desarrollo de Software
  const softwareSEOConfig = useSectionSEO('servicios-software', 'desarrollo')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...softwareSEOConfig,
    title: 'Desarrollo de Software Personalizado - Soluciones a Medida | CODEDMO',
    description: 'Desarrollo de software empresarial personalizado: sistemas ERP, CRM, aplicaciones a medida y automatización de procesos. Soluciones escalables con tecnologías modernas en Guatemala.',
    keywords: [
      'desarrollo software personalizado Guatemala',
      'software empresarial a medida',
      'sistemas ERP CRM Guatemala',
      'automatización procesos empresariales',
      'aplicaciones empresariales custom',
      'desarrollo sistemas gestión',
      'software escalable empresas',
      'soluciones tecnológicas medida',
      'programación software corporativo',
      'desarrollo aplicaciones negocio'
    ],
    canonical: 'https://codedmo.dev/servicios/desarrollo/software',
    priority: 'high',
    pageType: 'services',
    section: 'desarrollo-software',
    // FAQs específicas para desarrollo de software
    faqData: [
      {
        question: "¿Qué incluye el desarrollo de software personalizado?",
        answer: "Incluye análisis completo de requerimientos, diseño de arquitectura, desarrollo full-stack, integración con sistemas existentes, testing exhaustivo, documentación, capacitación del equipo y soporte post-lanzamiento por 3 meses."
      },
      {
        question: "¿Cuánto tiempo toma desarrollar un sistema empresarial completo?",
        answer: "CRM personalizado: 6-12 semanas, ERP empresarial: 3-8 meses, software específico: 4-16 semanas. El tiempo depende de la complejidad y las integraciones requeridas."
      },
      {
        question: "¿Pueden integrar el software con nuestros sistemas actuales?",
        answer: "Sí, desarrollamos APIs robustas y realizamos integraciones con sistemas ERP existentes, bases de datos legacy, servicios de terceros y plataformas de pago. Garantizamos compatibilidad total."
      },
      {
        question: "¿Qué tecnologías utilizan para desarrollo de software empresarial?",
        answer: "Utilizamos React/Angular/Vue.js para frontend, Node.js/Python/.NET para backend, PostgreSQL/MongoDB para bases de datos, Docker/Kubernetes para deployment y AWS/Azure para cloud."
      },
      {
        question: "¿El software desarrollado es escalable para el crecimiento de la empresa?",
        answer: "Sí, diseñamos arquitecturas escalables con microservicios, bases de datos optimizadas y cloud hosting. El software crece con tu empresa sin necesidad de reescribir desde cero."
      },
      {
        question: "¿Ofrecen mantenimiento y actualizaciones del software desarrollado?",
        answer: "Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, nuevas funcionalidades, optimizaciones de performance y soporte técnico 24/7."
      }
    ],
    // Información de empresa para datos estructurados
    businessInfo: {
      name: 'CODEDMO Solutions',
      phone: '+502-3792-3612',
      address: 'Guatemala, Guatemala',
      openingHours: ['07:00-20:00']
    },
    // Idiomas alternativos para SEO internacional
    alternateLanguages: [
      { lang: 'es', href: 'https://codedmo.dev/servicios/desarrollo/software' },
      { lang: 'es-GT', href: 'https://codedmo.dev/servicios/desarrollo/software' }
    ],
    // Breadcrumbs específicos
    breadcrumbs: [
      { name: 'Inicio', url: 'https://codedmo.dev' },
      { name: 'Servicios', url: 'https://codedmo.dev/servicios' },
      { name: 'Desarrollo', url: 'https://codedmo.dev/servicios/desarrollo' },
      { name: 'Software Personalizado', url: 'https://codedmo.dev/servicios/desarrollo/software' }
    ],
    // Datos estructurados específicos para desarrollo de software
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo de Software Personalizado',
      description: 'Servicios profesionales de desarrollo de software empresarial: sistemas ERP, CRM, aplicaciones a medida y automatización de procesos.',
      provider: {
        '@type': 'Organization',
        name: 'CODEDMO Solutions',
        alternateName: 'CODEDMO',
        url: 'https://codedmo.dev',
        logo: 'https://codedmo.dev/favicon.ico',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+502-3792-3612',
          contactType: 'customer service',
          areaServed: 'GT',
          availableLanguage: 'Spanish'
        }
      },
      serviceType: 'Custom Software Development',
      category: 'Enterprise Software Development',
      areaServed: {
        '@type': 'Country',
        name: 'Guatemala'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Soluciones de Software Empresarial',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'ERP Empresarial',
              description: 'Sistema integral de gestión empresarial con inventarios, contabilidad y recursos humanos',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                price: '10000',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'GTQ',
                  price: '10000',
                  valueAddedTaxIncluded: false
                }
              }
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'CRM Personalizado',
              description: 'Sistema de gestión de relaciones con clientes y automatización de ventas',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                price: '8000',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'GTQ',
                  price: '8000',
                  valueAddedTaxIncluded: false
                }
              }
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Software Específico',
              description: 'Desarrollo completamente personalizado según requerimientos específicos',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                description: 'Cotización personalizada según requerimientos'
              }
            }
          }
        ]
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1'
      }
    }
  });

  const handleWhatsAppContact = (serviceName: string) => {
    const phoneNumber = '+50237923612';
    const message = `Hola! Estoy interesado en el servicio de ${serviceName}. Me podrían brindar más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'Software a medida',
    'Sistemas de gestión (ERP/CRM)',
    'Aplicaciones empresariales',
    'Automatización de procesos',
    'Interfaces intuitivas',
    'Integración con sistemas existentes',
    'Soporte y mantenimiento',
    'Escalabilidad garantizada'
  ];

  const solutions = [
    {
      title: 'ERP Empresarial',
      description: 'Sistema integral de gestión empresarial',
      icon: Cog,
      features: ['Gestión de inventarios', 'Contabilidad integrada', 'Recursos humanos', 'Reportes avanzados'],
      price: 'Desde Q10,000'
    },
    {
      title: 'CRM Personalizado',
      description: 'Gestión de relaciones con clientes',
      icon: Users,
      features: ['Seguimiento de leads', 'Automatización de ventas', 'Analytics de clientes', 'Integración email'],
      price: 'Desde Q8,000'
    },
    {
      title: 'Software Específico',
      description: 'Desarrollo completamente personalizado',
      icon: Monitor,
      features: ['Análisis de requerimientos', 'Diseño UX/UI', 'Desarrollo ágil', 'Testing completo'],
      price: 'Cotización personalizada'
    }
  ];

  const technologies = [
    'React/Angular/Vue.js',
    'Node.js/Python/.NET',
    'PostgreSQL/MongoDB',
    'Docker/Kubernetes',
    'AWS/Azure/GCP',
    'Microservicios',
    'CI/CD Pipelines',
    'Testing Automatizado'
  ];

  const process = [
    {
      step: '1',
      title: 'Análisis',
      description: 'Entendemos tus necesidades y procesos actuales'
    },
    {
      step: '2',
      title: 'Diseño',
      description: 'Creamos la arquitectura y diseño del sistema'
    },
    {
      step: '3',
      title: 'Desarrollo',
      description: 'Implementamos con metodologías ágiles'
    },
    {
      step: '4',
      title: 'Testing',
      description: 'Pruebas exhaustivas de calidad'
    },
    {
      step: '5',
      title: 'Despliegue',
      description: 'Implementación y capacitación del equipo'
    }
  ];

  return (
    <>
      {/* Meta tags adicionales específicos para desarrollo de software */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación de desarrollo de software */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="DC.title" content="Desarrollo de Software Personalizado - Soluciones a Medida | CODEDMO" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="desarrollo software, ERP, CRM, sistemas empresariales, automatización" />
        <meta name="DC.description" content="Desarrollo de software empresarial personalizado y sistemas de gestión" />
        <meta name="classification" content="business" />
        <meta name="category" content="Custom Software Development" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para desarrollo de software */}
        <meta name="service.type" content="Custom Software Development" />
        <meta name="service.category" content="Enterprise Software Solutions" />
        <meta name="service.specialization" content="ERP, CRM, Business Applications" />
        <meta name="service.methodology" content="Agile Development, Scrum" />
        <meta name="service.architecture" content="Microservices, Scalable Solutions" />
        <meta name="service.integration" content="Legacy Systems, Third-party APIs" />
        <meta name="service.deployment" content="Cloud, On-premise, Hybrid" />
        <meta name="service.support" content="24/7 Technical Support, Maintenance" />
        
        {/* Meta tags para tipos de software */}
        <meta name="software.types" content="ERP, CRM, Custom Applications" />
        <meta name="software.features" content="Inventory Management, Accounting, HR, Sales Automation" />
        <meta name="software.scalability" content="Enterprise-grade, Scalable Architecture" />
        <meta name="software.security" content="Data Encryption, Access Control, Audit Trails" />
        <meta name="software.pricing" content="ERP from Q10,000, CRM from Q8,000" />
        
        {/* Meta tags para tecnologías específicas */}
        <meta name="tech.frontend" content="React, Angular, Vue.js" />
        <meta name="tech.backend" content="Node.js, Python, .NET" />
        <meta name="tech.database" content="PostgreSQL, MongoDB, SQL Server" />
        <meta name="tech.cloud" content="AWS, Azure, Google Cloud Platform" />
        <meta name="tech.containerization" content="Docker, Kubernetes" />
        <meta name="tech.methodology" content="Agile, DevOps, CI/CD" />
        
        {/* Meta tags para industrias y sectores */}
        <meta name="industry.target" content="Manufacturing, Retail, Services, Healthcare" />
        <meta name="industry.size" content="SME to Enterprise Level" />
        <meta name="industry.compliance" content="Data Protection, Industry Standards" />
        <meta name="industry.localization" content="Guatemala Business Processes" />
        
        {/* Meta tags para experiencia de usuario */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Meta tags adicionales para conversión */}
        <meta name="business.service" content="Enterprise Software Development" />
        <meta name="business.target" content="Medium to Large Businesses" />
        <meta name="business.guarantee" content="3 months post-deployment support" />
        <meta name="business.consultation" content="Free requirements analysis" />
        <meta name="business.timeline" content="3-32 weeks depending on complexity" />
        <meta name="business.methodology" content="Agile Development with Regular Updates" />
      </div>

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Monitor className="w-4 h-4 mr-2" />
          Desarrollo de Software
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Software <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>a tu medida</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos software personalizado que se adapta perfectamente a los procesos y necesidades específicas de tu empresa.
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

      {/* Solutions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Soluciones de Software</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <solution.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-gray-400 mb-4">{solution.description}</p>
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="text-purple-400 font-bold text-lg">{solution.price}</div>
              </div>
              <button 
                onClick={() => handleWhatsAppContact(solution.title)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso</h2>
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
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías que Usamos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Database className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
