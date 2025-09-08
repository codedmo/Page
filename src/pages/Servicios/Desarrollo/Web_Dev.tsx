import { Globe, Smartphone, Search, CheckCircle, Code, Palette, Zap, MessageCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO, useSectionSEO } from '@/hooks/useSEO';

export default function Web_Design() {
  // SEO optimizado para la página de Desarrollo Web
  const webDevSEOConfig = useSectionSEO('servicios-web', 'desarrollo')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...webDevSEOConfig,
    title: 'Desarrollo Web | CODEDMO',
    description: 'Desarrollo web profesional con React, Next.js y TypeScript. Sitios web modernos, responsivos, optimizados para SEO y de alta conversión. Landing pages, e-commerce y sitios corporativos.',
    keywords: [
      'desarrollo web profesional Guatemala',
      'sitios web modernos React',
      'desarrollo Next.js TypeScript',
      'páginas web responsivas',
      'desarrollo e-commerce Guatemala',
      'landing pages alta conversión',
      'sitios web corporativos',
      'optimización SEO web',
      'desarrollo frontend backend',
      'aplicaciones web Guatemala'
    ],
    canonical: 'https://codedmo.dev/servicios/desarrollo/web',
    priority: 'high',
    pageType: 'services',
    section: 'desarrollo-web',
    // FAQs específicas para desarrollo web
    faqData: [
      {
        question: "¿Qué incluye el servicio de desarrollo web profesional?",
        answer: "Incluye diseño responsivo, desarrollo con React/Next.js, optimización SEO, integración de CMS, analytics, testing exhaustivo, documentación y soporte post-lanzamiento por 3 meses."
      },
      {
        question: "¿Cuánto tiempo toma desarrollar un sitio web completo?",
        answer: "Landing pages: 1-2 semanas, sitios corporativos: 2-4 semanas, e-commerce: 4-8 semanas. El tiempo exacto depende de las funcionalidades específicas requeridas."
      },
      {
        question: "¿Los sitios web son responsivos y optimizados para móviles?",
        answer: "Sí, todos nuestros sitios web son 100% responsivos, optimizados para móviles y tablets. Seguimos las mejores prácticas de Mobile-First Design y Core Web Vitals."
      },
      {
        question: "¿Qué tecnologías modernas utilizan para desarrollo web?",
        answer: "Utilizamos React, Next.js, TypeScript, Tailwind CSS, Node.js, bases de datos modernas como PostgreSQL, y servicios cloud como Vercel para hosting optimizado."
      },
      {
        question: "¿Incluyen optimización SEO en el desarrollo web?",
        answer: "Sí, incluimos optimización SEO completa: meta tags optimizados, schema markup, sitemap XML, URLs amigables, Core Web Vitals y configuración de Google Analytics."
      },
      {
        question: "¿Qué diferencia sus sitios web de otros desarrolladores?",
        answer: "Nos enfocamos en performance (Lighthouse 90+), conversión, UX/UI moderno, código limpio y escalable, SEO avanzado y soporte técnico continuo. Cada sitio está optimizado para resultados."
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
      { lang: 'es', href: 'https://codedmo.dev/servicios/desarrollo/web' },
      { lang: 'es-GT', href: 'https://codedmo.dev/servicios/desarrollo/web' }
    ],
    // Breadcrumbs específicos
    breadcrumbs: [
      { name: 'Inicio', url: 'https://codedmo.dev' },
      { name: 'Servicios', url: 'https://codedmo.dev/servicios' },
      { name: 'Desarrollo', url: 'https://codedmo.dev/servicios/desarrollo' },
      { name: 'Desarrollo Web', url: 'https://codedmo.dev/servicios/desarrollo/web' }
    ],
    // Datos estructurados específicos para desarrollo web
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo Web Profesional',
      description: 'Servicios profesionales de desarrollo web con React, Next.js y tecnologías modernas. Sitios web responsivos, optimizados y de alta conversión.',
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
      serviceType: 'Web Development',
      category: 'Technology Services',
      areaServed: {
        '@type': 'Country',
        name: 'Guatemala'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Desarrollo Web',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Landing Pages',
              description: 'Páginas de alta conversión optimizadas para campañas específicas',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                price: '1000',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'GTQ',
                  price: '1000',
                  valueAddedTaxIncluded: false
                }
              }
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sitios Corporativos',
              description: 'Presencia web profesional para empresas',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                price: '2000',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'GTQ',
                  price: '2000',
                  valueAddedTaxIncluded: false
                }
              }
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-commerce',
              description: 'Tiendas online completas y funcionales',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'GTQ',
                price: '3500',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'GTQ',
                  price: '3500',
                  valueAddedTaxIncluded: false
                }
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
    'Diseño responsivo',
    'Optimización SEO',
    'Velocidad de carga rápida',
    'Experiencia de usuario (UX)',
    'Integración con CMS',
    'E-commerce completo',
    'Analíticas integradas',
    'Mantenimiento incluido'
  ];

  const webTypes = [
    {
      title: 'Landing Pages',
      description: 'Páginas de alta conversión para campañas específicas',
      icon: Zap,
      features: ['Optimizada para conversión', 'A/B Testing', 'Integración con forms', 'Analytics avanzados'],
      price: 'Desde Q1000',
      time: '1-2 semanas'
    },
    {
      title: 'Sitios Corporativos',
      description: 'Presencia web profesional para tu empresa',
      icon: Globe,
      features: ['Diseño corporativo', 'CMS integrado', 'Blog incluido', 'Optimización SEO'],
      price: 'Desde Q2000',
      time: '2-4 semanas'
    },
    {
      title: 'E-commerce',
      description: 'Tiendas online completas y funcionales',
      icon: Smartphone,
      features: ['Carrito de compras', 'Pagos integrados', 'Gestión de inventario', 'Panel de administración'],
      price: 'Desde Q3500',
      time: '4-8 semanas'
    }
  ];

  const technologies = [
    'React/Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js/Express',
    'MongoDB/PostgreSQL',
    'Stripe/PayPal',
    'Vercel/Netlify',
    'Google Analytics'
  ];

  const seoFeatures = [
    'Meta tags optimizados',
    'Schema markup',
    'Sitemap XML',
    'URLs amigables',
    'Core Web Vitals',
    'Lighthouse 90+',
    'Indexación Google',
    'Search Console'
  ];

  return (
    <>
      {/* Meta tags adicionales específicos para desarrollo web */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación de desarrollo web */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="DC.title" content="Desarrollo Web Profesional - Sitios Web Modernos | CODEDMO" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="desarrollo web, sitios web modernos, React, Next.js, e-commerce" />
        <meta name="DC.description" content="Servicios profesionales de desarrollo web con tecnologías modernas" />
        <meta name="classification" content="business" />
        <meta name="category" content="Web Development Services" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para desarrollo web */}
        <meta name="service.type" content="Web Development" />
        <meta name="service.category" content="Frontend & Backend Development" />
        <meta name="service.specialization" content="React, Next.js, TypeScript" />
        <meta name="service.deliverables" content="Landing Pages, Corporate Sites, E-commerce" />
        <meta name="service.performance" content="Lighthouse 90+, Core Web Vitals Optimized" />
        <meta name="service.seo" content="SEO Optimized, Schema Markup, Fast Loading" />
        <meta name="service.responsive" content="Mobile First, Responsive Design" />
        <meta name="service.pricing" content="From Q1000, Competitive Rates" />
        
        {/* Meta tags para tecnologías específicas */}
        <meta name="tech.frontend" content="React, Next.js, TypeScript, Tailwind CSS" />
        <meta name="tech.backend" content="Node.js, Express, PostgreSQL, MongoDB" />
        <meta name="tech.deployment" content="Vercel, Netlify, Cloud Hosting" />
        <meta name="tech.payment" content="Stripe, PayPal Integration" />
        <meta name="tech.analytics" content="Google Analytics, Search Console" />
        
        {/* Meta tags para tipos de sitios web */}
        <meta name="website.types" content="Landing Pages, Corporate, E-commerce" />
        <meta name="website.features" content="CMS, Blog, Shopping Cart, Analytics" />
        <meta name="website.optimization" content="SEO, Performance, Conversion" />
        <meta name="website.timeline" content="1-8 weeks depending on complexity" />
        
        {/* Meta tags para experiencia de usuario */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Meta tags adicionales para conversión */}
        <meta name="business.service" content="Professional Web Development" />
        <meta name="business.target" content="Small to Large Businesses" />
        <meta name="business.guarantee" content="3 months post-launch support" />
        <meta name="business.consultation" content="Free initial consultation" />
      </div>

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Code className="w-4 h-4 mr-2" />
          Desarrollo Web
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Sitios web que <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>convierten</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos sitios web modernos, rápidos y optimizados que generan resultados reales para tu negocio.
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

      {/* Web Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tipos de Sitios Web</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {webTypes.map((type, index) => (
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

      {/* SEO & Performance */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">SEO & Performance</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Search className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Optimización SEO</h3>
            <div className="grid grid-cols-2 gap-3">
              {seoFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Zap className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Lighthouse Score</span>
                <span className="text-green-400 font-bold">90+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tiempo de carga</span>
                <span className="text-green-400 font-bold">&lt; 3s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Core Web Vitals</span>
                <span className="text-green-400 font-bold">Optimizado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mobile Friendly</span>
                <span className="text-green-400 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías Modernas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
