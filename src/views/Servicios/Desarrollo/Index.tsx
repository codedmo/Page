import { Outlet, useLocation, Link } from 'react-router-dom';
import { Code, Globe, Monitor, Smartphone, Database, CheckCircle } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO, usePageSEO } from '@/hooks/useSEO';

export default function Desarrollo() {
  const location = useLocation();

  // SEO optimizado para la página de Desarrollo
  const desarrolloSEOConfig = usePageSEO('desarrollo')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...desarrolloSEOConfig,
    priority: 'high',
    pageType: 'desarrollo',
    // FAQs específicas para servicios de desarrollo
    faqData: [
      {
        question: "¿Qué tecnologías utilizan para el desarrollo de software?",
        answer: "Utilizamos tecnologías modernas como React, Next.js, TypeScript, Node.js, Python y bases de datos como PostgreSQL. Seleccionamos la mejor tecnología según las necesidades específicas de cada proyecto."
      },
      {
        question: "¿Cuánto tiempo toma desarrollar una aplicación web completa?",
        answer: "El tiempo varía según la complejidad. Una aplicación web básica puede tomar 3-6 semanas, mientras que sistemas empresariales complejos pueden requerir 3-6 meses. Realizamos una evaluación inicial gratuita para estimar tiempos precisos."
      },
      {
        question: "¿Desarrollan tanto aplicaciones web como móviles?",
        answer: "Sí, ofrecemos desarrollo completo: aplicaciones web con React/Next.js, aplicaciones móviles nativas para iOS y Android, software empresarial a medida, y APIs para integrar sistemas."
      },
      {
        question: "¿Qué incluye el desarrollo de software a medida?",
        answer: "Incluye análisis de requerimientos, diseño de arquitectura, desarrollo frontend y backend, base de datos, testing exhaustivo, documentación, capacitación y soporte post-lanzamiento por 3 meses."
      },
      {
        question: "¿Ofrecen mantenimiento después del desarrollo?",
        answer: "Sí, ofrecemos planes de mantenimiento y soporte técnico continuo. Incluye actualizaciones de seguridad, mejoras de rendimiento, nuevas funcionalidades y soporte técnico 24/7."
      },
      {
        question: "¿Pueden integrar el software con sistemas existentes?",
        answer: "Absolutamente. Desarrollamos APIs robustas y realizamos integraciones con sistemas ERP, CRM, bases de datos existentes y servicios de terceros como plataformas de pago y servicios web."
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
      { lang: 'es', href: 'https://codedmo.dev/servicios/desarrollo' },
      { lang: 'es-GT', href: 'https://codedmo.dev/servicios/desarrollo' }
    ],
    // Breadcrumbs actualizados
    breadcrumbs: [
      { name: 'Inicio', url: 'https://codedmo.dev' },
      { name: 'Servicios', url: 'https://codedmo.dev/servicios' },
      { name: 'Desarrollo', url: 'https://codedmo.dev/servicios/desarrollo' }
    ],
    // Datos estructurados específicos para servicios de desarrollo
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Servicios de Desarrollo de Software',
      description: 'Desarrollo profesional de aplicaciones web, móviles, software empresarial y APIs con tecnologías modernas.',
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
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GT',
          addressRegion: 'Guatemala',
          addressLocality: 'Guatemala'
        }
      },
      serviceType: 'Software Development',
      areaServed: {
        '@type': 'Country',
        name: 'Guatemala'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Desarrollo',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo Web',
              description: 'Aplicaciones web modernas con React, Next.js y tecnologías de vanguardia'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo de Aplicaciones Móviles',
              description: 'Apps nativas e híbridas para iOS y Android'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Software a Medida',
              description: 'Soluciones empresariales personalizadas y escalables'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'APIs e Integraciones',
              description: 'Desarrollo de APIs robustas y integración con sistemas existentes'
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

  const services = [
    {
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos con React y Next.js',
      path: '/servicios/desarrollo/web',
      features: ['React/Next.js', 'Diseño responsivo', 'SEO optimizado', 'E-commerce']
    },
    {
      icon: Monitor,
      title: 'Software a Medida',
      description: 'Aplicaciones empresariales personalizadas',
      path: '/servicios/desarrollo/software',
      features: ['Soluciones personalizadas', 'Escalabilidad', 'Integración sistemas', 'Soporte continuo']
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Aplicaciones iOS y Android nativas',
      path: '/servicios/desarrollo/movil',
      features: ['iOS & Android', 'Diseño nativo', 'Push notifications', 'Offline support']
    },
    {
      icon: Database,
      title: 'APIs e Integraciones',
      description: 'Conectamos sistemas y plataformas',
      path: '/servicios/desarrollo/api',
      features: ['REST APIs', 'GraphQL', 'Microservicios', 'Documentación completa']
    }
  ];

  // Si estamos en una subruta, mostrar el outlet
  if (location.pathname !== '/servicios/desarrollo') {
    return <Outlet />;
  }

  return (
    <>
      {/* Meta tags adicionales específicos para la página de desarrollo */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación de servicios de desarrollo */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="DC.title" content="Servicios de Desarrollo de Software - CODEDMO Guatemala" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="desarrollo software, aplicaciones web, desarrollo móvil, APIs" />
        <meta name="DC.description" content="Servicios profesionales de desarrollo de software con tecnologías modernas" />
        <meta name="classification" content="business" />
        <meta name="category" content="Software Development Services" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para servicios de desarrollo */}
        <meta name="service.type" content="Software Development" />
        <meta name="service.category" content="Technology Services" />
        <meta name="service.provider" content="CODEDMO Solutions" />
        <meta name="service.location" content="Guatemala" />
        <meta name="service.languages" content="Spanish" />
        <meta name="service.technologies" content="React, Next.js, TypeScript, Node.js, Python" />
        <meta name="service.platforms" content="Web, Mobile, API" />
        <meta name="service.industries" content="All Industries" />
        
        {/* Meta tags para experiencia de usuario */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </div>

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Code className="w-4 h-4 mr-2" />
          Desarrollo de Software
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Soluciones de software <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>a tu medida</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desde sitios web modernos hasta aplicaciones empresariales complejas. Desarrollamos la tecnología que tu negocio necesita.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={index}
              to={service.path}
              className="group block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
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
            </Link>
          );
        })}
      </div>

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías que utilizamos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['Next.js', 'Vite', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL'].map((tech, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold text-sm">{tech}</span>
              </div>
              <p className="text-gray-400 text-xs">{tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso de Desarrollo</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Análisis', desc: 'Entendemos tus necesidades' },
            { step: '02', title: 'Diseño', desc: 'Creamos la arquitectura' },
            { step: '03', title: 'Desarrollo', desc: 'Construimos la solución' },
            { step: '04', title: 'Testing', desc: 'Probamos exhaustivamente' },
            { step: '05', title: 'Despliegue', desc: 'Lanzamos tu producto' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-sm mb-4`}>
                {item.step}
              </div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className={`max-w-2xl mx-auto bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border ${borders.primary} backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h3>
          <p className="text-gray-300 mb-6">
            Conversemos sobre tu idea y te ayudamos a convertirla en realidad con la mejor tecnología.
          </p>
          <Link 
            to="/servicios/cotizacion" 
            className={`
              inline-flex items-center px-8 py-3 bg-gradient-to-r ${gradients.primary} 
              text-white font-semibold rounded-lg transition-all duration-300
              hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105
            `}
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
