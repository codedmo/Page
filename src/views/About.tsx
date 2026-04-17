import { useSEO, usePageSEO } from "@/hooks/useSEO"
import AboutComponent from "@/components/About"

export default function About() {
  // SEO optimizado para la página Acerca de
  const aboutSEOConfig = usePageSEO('about')
  
  // Aplicar SEO de página completa con prioridad media
  useSEO({
    ...aboutSEOConfig,
    priority: 'medium',
    pageType: 'about',
    // FAQs específicas para la página de nosotros
    faqData: [
      {
        question: "¿Quiénes conforman el equipo de CODEDMO?",
        answer: "Somos un equipo de desarrolladores especializados en tecnologías modernas como React, Next.js, Node.js, Python y desarrollo móvil. Cada miembro aporta experiencia única en diferentes áreas del desarrollo de software."
      },
      {
        question: "¿Cuánta experiencia tiene CODEDMO en el mercado?",
        answer: "Tenemos más de 3 años transformando ideas en soluciones digitales exitosas, con más de 50 proyectos completados y un 98% de satisfacción del cliente en Guatemala y internacionalmente."
      },
      {
        question: "¿Qué nos diferencia de otras empresas de desarrollo?",
        answer: "Nos enfocamos en la calidad, comunicación constante, uso de tecnologías modernas y soporte técnico continuo. Entendemos las necesidades específicas del mercado guatemalteco y ofrecemos precios competitivos."
      },
      {
        question: "¿Dónde se encuentra ubicada CODEDMO?",
        answer: "Estamos ubicados en Guatemala, pero trabajamos con clientes tanto locales como internacionales. Ofrecemos reuniones presenciales y virtuales según las necesidades del proyecto."
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
      { lang: 'es', href: 'https://codedmo.dev/about' },
      { lang: 'es-GT', href: 'https://codedmo.dev/about' }
    ],
    // Datos estructurados específicos para la página About
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Acerca de CODEDMO',
      description: 'Conoce el equipo de expertos en desarrollo de CODEDMO y nuestra historia transformando ideas en soluciones digitales exitosas.',
      mainEntity: {
        '@type': 'Organization',
        name: 'CODEDMO Solutions',
        alternateName: 'CODEDMO',
        url: 'https://codedmo.dev',
        foundingDate: '2022',
        description: 'Empresa guatemalteca especializada en desarrollo de software, aplicaciones web y móviles con más de 3 años de experiencia.',
        numberOfEmployees: '5-10',
        slogan: 'Transformando ideas en soluciones digitales exitosas',
        knowsAbout: [
          'Desarrollo Web',
          'Aplicaciones Móviles',
          'Software Empresarial',
          'Integraciones API',
          'React Development',
          'Next.js Development',
          'Node.js Development'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de Desarrollo de Software',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Desarrollo Web',
                description: 'Desarrollo de sitios web profesionales con React y Next.js'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Aplicaciones Móviles',
                description: 'Desarrollo de aplicaciones móviles nativas e híbridas'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Software Empresarial',
                description: 'Desarrollo de software a medida para empresas'
              }
            }
          ]
        },
        areaServed: {
          '@type': 'Country',
          name: 'Guatemala'
        }
      }
    }
  })

  return (
    <>
      {/* Meta tags adicionales específicos para la página About */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación de la página About */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="DC.title" content="Acerca de CODEDMO - Equipo de Desarrollo Guatemala" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="Equipo de desarrollo, empresa tecnología, desarrolladores Guatemala" />
        <meta name="DC.description" content="Conoce el equipo de expertos en desarrollo de CODEDMO y nuestra experiencia" />
        <meta name="classification" content="business" />
        <meta name="category" content="Technology Company" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para página About */}
        <meta name="company.founded" content="2022" />
        <meta name="company.size" content="5-10" />
        <meta name="company.industry" content="Software Development" />
        <meta name="company.location" content="Guatemala" />
      </div>

      <AboutComponent />
    </>
  );
}
