import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  structuredData?: Record<string, unknown>
  pageType?: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion'
  section?: string
  priority?: 'high' | 'medium' | 'low'
  // Nuevas propiedades para optimización avanzada
  author?: string
  robots?: string
  locale?: string
  alternateLanguages?: { lang: string; href: string }[]
  breadcrumbs?: { name: string; url: string }[]
  faqData?: { question: string; answer: string }[]
  businessInfo?: {
    name: string
    phone: string
    address: string
    openingHours: string[]
  }
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  structuredData,
  pageType,
  section,
  priority = 'medium',
  author = 'CODEDMO Solutions',
  robots = 'index, follow',
  locale = 'es',
  alternateLanguages,
  breadcrumbs,
  faqData,
  businessInfo
}: SEOProps) => {
  useEffect(() => {
    try {
      // Limpiar SEO anterior antes de aplicar nuevo
      cleanupPreviousSEO()

      // Marcar que se aplicó SEO
      document.documentElement.setAttribute('data-seo-applied', 'true')
      document.documentElement.setAttribute('data-seo-section', section || 'unknown')
      document.documentElement.setAttribute('data-seo-page', pageType || 'unknown')
      document.documentElement.setAttribute('lang', locale)

      // Actualizar título optimizado
      if (title) {
        document.title = title
        updateMetaProperty('og:title', title)
        updateMetaName('twitter:title', title)
      }

      // Actualizar meta description optimizada
      if (description) {
        updateMetaTag('description', description)
        updateMetaProperty('og:description', description)
        updateMetaName('twitter:description', description)
      }

      // Actualizar keywords
      if (keywords && keywords.length > 0) {
        updateMetaTag('keywords', keywords.join(', '))
      }

      // Meta tags adicionales para SEO avanzado
      updateMetaTag('author', author)
      updateMetaTag('robots', robots)
      updateMetaTag('HandheldFriendly', 'True')
      updateMetaTag('MobileOptimized', '320')
      updateMetaTag('format-detection', 'telephone=no')
      updateMetaName('msapplication-TileColor', '#2563eb')
      updateMetaName('theme-color', '#2563eb')

      // Actualizar canonical
      if (canonical) {
        updateLinkTag('canonical', canonical)
        updateMetaProperty('og:url', canonical)
      }

      // Open Graph optimizado
      updateMetaProperty('og:type', pageType === 'home' ? 'website' : 'article')
      updateMetaProperty('og:site_name', 'CODEDMO')
      updateMetaProperty('og:locale', locale)
      
      if (ogImage) {
        updateMetaProperty('og:image', ogImage)
        updateMetaProperty('og:image:width', '1200')
        updateMetaProperty('og:image:height', '630')
        updateMetaProperty('og:image:type', 'image/png')
        updateMetaName('twitter:image', ogImage)
      }

      // Twitter Cards optimizado
      updateMetaName('twitter:card', 'summary_large_image')
      updateMetaName('twitter:site', '@codedmo')
      updateMetaName('twitter:creator', '@codedmo')

      // Idiomas alternativos
      if (alternateLanguages && Array.isArray(alternateLanguages)) {
        alternateLanguages.forEach(alt => {
          if (alt && alt.lang && alt.href) {
            updateHreflangTag(alt.lang, alt.href)
          }
        })
      }

      // Datos estructurados mejorados
      if (structuredData) {
        addStructuredData(structuredData, section, pageType)
      }

      // Breadcrumbs schema
      if (breadcrumbs && breadcrumbs.length > 0) {
        addBreadcrumbsSchema(breadcrumbs)
      }

      // FAQ Schema
      if (faqData && faqData.length > 0) {
        addFAQSchema(faqData)
      }

      // Business info schema
      if (businessInfo) {
        addBusinessSchema(businessInfo)
      }
    } catch (error) {
      console.warn('SEO Error:', error)
    }

    // Cleanup function mejorada
    return () => {
      if (priority === 'high') {
        try {
          cleanupPreviousSEO()
        } catch (error) {
          console.warn('SEO Cleanup Error:', error)
        }
      }
    }
  }, [title, description, keywords, canonical, ogImage, structuredData, pageType, section, priority, author, robots, locale, alternateLanguages, breadcrumbs, faqData, businessInfo])

  return null
}

// Funciones helper mejoradas para actualizar elementos del DOM
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    element.setAttribute('data-dynamic-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    element.setAttribute('data-dynamic-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateMetaName(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    element.setAttribute('data-dynamic-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    element.setAttribute('data-dynamic-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

// Función específica para manejar hreflang
function updateHreflangTag(lang: string, href: string) {
  const selector = `link[rel="alternate"][hreflang="${lang}"]`
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', lang)
    element.setAttribute('data-dynamic-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

// Función para limpiar SEO anterior
function cleanupPreviousSEO() {
  // Remover elementos dinámicos anteriores
  document.querySelectorAll('[data-dynamic-seo="true"]').forEach(el => el.remove())
  document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach(el => el.remove())
  
  // Remover específicamente enlaces hreflang anteriores
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => {
    if (el.getAttribute('data-dynamic-seo') === 'true') {
      el.remove()
    }
  })
  
  // Limpiar atributos del documento
  document.documentElement.removeAttribute('data-seo-applied')
  document.documentElement.removeAttribute('data-seo-section')
  document.documentElement.removeAttribute('data-seo-page')
}

// Función para agregar datos estructurados
function addStructuredData(data: Record<string, unknown>, section?: string, pageType?: string) {
  const contextualData = {
    ...data,
    '@id': `${window.location.href}#${section || pageType || 'main'}`,
    url: window.location.href,
    dateModified: new Date().toISOString(),
    inLanguage: 'es-GT'
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-dynamic', 'true')
  script.setAttribute('data-section', section || 'main')
  script.textContent = JSON.stringify(contextualData, null, 2)
  document.head.appendChild(script)
}

// Función para agregar schema de breadcrumbs
function addBreadcrumbsSchema(breadcrumbs: { name: string; url: string }[]) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-dynamic', 'true')
  script.setAttribute('data-schema-type', 'breadcrumbs')
  script.textContent = JSON.stringify(breadcrumbSchema, null, 2)
  document.head.appendChild(script)
}

// Función para agregar schema FAQ
function addFAQSchema(faqData: { question: string; answer: string }[]) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-dynamic', 'true')
  script.setAttribute('data-schema-type', 'faq')
  script.textContent = JSON.stringify(faqSchema, null, 2)
  document.head.appendChild(script)
}

// Función para agregar schema de empresa
function addBusinessSchema(businessInfo: { name: string; phone: string; address: string; openingHours: string[] }) {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessInfo.name,
    url: 'https://codedmo.dev',
    logo: 'https://codedmo.dev/favicon.ico',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.phone,
      contactType: 'customer service',
      areaServed: 'GT',
      availableLanguage: ['Spanish', 'English']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address,
      addressLocality: 'Guatemala',
      addressRegion: 'Guatemala',
      postalCode: '01001',
      addressCountry: 'GT'
    },
    openingHoursSpecification: businessInfo.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: hours.split('-')[0],
      closes: hours.split('-')[1]
    })),
    sameAs: [
      'https://www.linkedin.com/company/codedmo',
      'https://github.com/codedmo'
    ]
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-dynamic', 'true')
  script.setAttribute('data-schema-type', 'business')
  script.textContent = JSON.stringify(businessSchema, null, 2)
  document.head.appendChild(script)
}

// Hook optimizado para SEO de página completa
export const usePageSEO = (pageType: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion') => {
  const baseCanonical = 'https://codedmo.dev'
  
  const pageConfigs = {
    home: {
      title: 'CODEDMO | Desarrollo de Software',
      description: 'CODEDMO es tu partner ideal para desarrollo web, aplicaciones móviles, software a medida e integraciones. +50 proyectos exitosos, 98% satisfacción del cliente. Consulta gratuita.',
      keywords: [
        'desarrollo de software Guatemala',
        'desarrollo web profesional',
        'aplicaciones móviles Guatemala',
        'software a medida',
        'integraciones API',
        'CODEDMO',
        'desarrollo React',
        'desarrollo Next.js',
        'empresa tecnología Guatemala'
      ],
      canonical: baseCanonical,
      ogImage: `${baseCanonical}/images/Hero.png`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CODEDMO - Desarrollo de Software Profesional',
        description: 'Empresa líder en desarrollo de software, aplicaciones web y móviles en Guatemala',
        url: baseCanonical,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseCanonical}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        mainEntity: {
          '@type': 'Organization',
          name: 'CODEDMO Solutions',
          alternateName: 'CODEDMO',
          url: baseCanonical,
          logo: `${baseCanonical}/favicon.ico`,
          foundingDate: '2022',
          numberOfEmployees: '5-10',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '47'
          }
        }
      },
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical }
      ],
      businessInfo: {
        name: 'CODEDMO Solutions',
        phone: '+502-3792-3612',
        address: 'Guatemala, Guatemala',
        openingHours: ['07:00-20:00']
      }
    },
    services: {
      title: 'Servicios | CODEDMO',
      description: 'Servicios profesionales de desarrollo web, aplicaciones móviles, software empresarial e integraciones API. Tecnologías modernas y soporte técnico especializado.',
      keywords: [
        'servicios desarrollo web',
        'desarrollo aplicaciones móviles',
        'software empresarial',
        'integraciones API',
        'desarrollo React Guatemala',
        'desarrollo Laravel',
        'servicios tecnológicos',
        'consultoría IT Guatemala'
      ],
      canonical: `${baseCanonical}/servicios`,
      ogImage: `${baseCanonical}/images/services-hero.png`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Servicios de Desarrollo - CODEDMO',
        description: 'Servicios profesionales de desarrollo web, aplicaciones móviles y software empresarial',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Servicios de Desarrollo de Software',
          itemListElement: [
            {
              '@type': 'Service',
              name: 'Desarrollo Web',
              description: 'Aplicaciones web modernas con React, Next.js y tecnologías de vanguardia',
              provider: { '@type': 'Organization', name: 'CODEDMO' },
              serviceType: 'Web Development'
            },
            {
              '@type': 'Service',
              name: 'Desarrollo de Aplicaciones Móviles',
              description: 'Apps nativas e híbridas para iOS y Android',
              provider: { '@type': 'Organization', name: 'CODEDMO' },
              serviceType: 'Mobile Development'
            },
            {
              '@type': 'Service',
              name: 'Software a Medida',
              description: 'Soluciones empresariales personalizadas',
              provider: { '@type': 'Organization', name: 'CODEDMO' },
              serviceType: 'Custom Software'
            },
            {
              '@type': 'Service',
              name: 'Integraciones API',
              description: 'Conectamos tus sistemas y automatizamos procesos',
              provider: { '@type': 'Organization', name: 'CODEDMO' },
              serviceType: 'API Integration'
            }
          ]
        }
      },
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Servicios', url: `${baseCanonical}/servicios` }
      ]
    },
    about: {
      title: 'Nosotros | CODEDMO',
      description: 'Conoce el equipo de expertos en desarrollo de CODEDMO. Más de 3 años transformando ideas en soluciones digitales exitosas. Especialistas en tecnologías modernas.',
      keywords: [
        'equipo desarrollo CODEDMO',
        'desarrolladores Guatemala',
        'especialistas tecnología',
        'equipo software Guatemala',
        'expertos desarrollo web',
        'historia CODEDMO'
      ],
      canonical: `${baseCanonical}/about`,
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Acerca de', url: `${baseCanonical}/about` }
      ]
    },
    contact: {
      title: 'Contacto | CODEDMO',
      description: 'Contáctanos para tu próximo proyecto de desarrollo. Consulta gratuita y presupuesto personalizado. Respuesta en menos de 24 horas.',
      keywords: [
        'contacto CODEDMO',
        'consulta gratuita desarrollo',
        'presupuesto desarrollo web',
        'cotización software Guatemala',
        'contactar desarrolladores'
      ],
      canonical: `${baseCanonical}/contacto`,
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Contacto', url: `${baseCanonical}/contacto` }
      ]
    },
    portfolio: {
      title: 'Portafolio | CODEDMO',
      description: 'Descubre nuestros proyectos exitosos en desarrollo web, aplicaciones móviles y software empresarial. Casos de éxito reales con empresas guatemaltecas.',
      keywords: [
        'portafolio CODEDMO',
        'proyectos desarrollo Guatemala',
        'casos de éxito',
        'sitios web exitosos',
        'aplicaciones desarrolladas'
      ],
      canonical: `${baseCanonical}/portafolio`,
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Portafolio', url: `${baseCanonical}/portafolio` }
      ]
    },
    hosting: {
      title: 'Hosting | CODEDMO',
      description: 'Servicios de hosting confiables, seguros y optimizados para tus aplicaciones web y sitios empresariales. Soporte técnico 24/7 especializado.',
      keywords: [
        'hosting Guatemala',
        'alojamiento web profesional',
        'servidores Guatemala',
        'soporte técnico 24/7',
        'hosting optimizado',
        'hosting empresarial'
      ],
      canonical: `${baseCanonical}/hosting`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Servicios de Hosting y Alojamiento Web',
        provider: { '@type': 'Organization', name: 'CODEDMO' },
        description: 'Hosting premium con soporte técnico especializado 24/7',
        areaServed: 'Guatemala',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Planes de Hosting',
          itemListElement: [
            { '@type': 'Offer', name: 'Hosting Básico', description: 'Ideal para sitios web pequeños' },
            { '@type': 'Offer', name: 'Hosting Empresarial', description: 'Para aplicaciones web complejas' },
            { '@type': 'Offer', name: 'Hosting Premium', description: 'Máximo rendimiento y seguridad' }
          ]
        }
      },
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Hosting', url: `${baseCanonical}/hosting` }
      ]
    },
    desarrollo: {
      title: 'Software a Medida | CODEDMO',
      description: 'Desarrollo de software a medida, aplicaciones empresariales y sistemas personalizados para tu negocio. Tecnologías modernas y escalables.',
      keywords: [
        'desarrollo software a medida',
        'software empresarial Guatemala',
        'sistemas personalizados',
        'automatización empresarial',
        'desarrollo custom Guatemala'
      ],
      canonical: `${baseCanonical}/desarrollo`,
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Desarrollo', url: `${baseCanonical}/desarrollo` }
      ]
    },
    integracion: {
      title: 'Integraciones | CODEDMO',
      description: 'Integramos tus sistemas existentes, automatizamos procesos y conectamos plataformas para optimizar tu negocio. APIs robustas y escalables.',
      keywords: [
        'integración sistemas Guatemala',
        'desarrollo APIs',
        'automatización procesos',
        'conectividad sistemas',
        'integraciones empresariales'
      ],
      canonical: `${baseCanonical}/integracion`,
      breadcrumbs: [
        { name: 'Inicio', url: baseCanonical },
        { name: 'Integración', url: `${baseCanonical}/integracion` }
      ]
    }
  }

  return pageConfigs[pageType] || pageConfigs.home
}

// Hook simplificado para SEO de secciones específicas
export const useSectionSEO = (sectionType: string, parentPage?: string) => {
  const sectionData: Record<string, { title: string; description: string; keywords: string[] }> = {
    hero: {
      title: 'CODEDMO | Desarrollo de Software',
      description: 'Empresa líder en desarrollo de software, aplicaciones web y móviles. +50 proyectos exitosos, 98% satisfacción del cliente.',
      keywords: ['desarrollo de software', 'aplicaciones web', 'desarrollo móvil', 'React', 'Node.js', 'TypeScript']
    },
    'servicios-web': {
      title: 'Desarrollo Web | CODEDMO',
      description: 'Desarrollamos aplicaciones web modernas, responsivas y optimizadas con React, Next.js y las últimas tecnologías.',
      keywords: ['desarrollo web', 'React', 'Next.js', 'aplicaciones web', 'frontend', 'backend']
    },
    'servicios-movil': {
      title: 'Apps Móviles | CODEDMO',
      description: 'Creamos aplicaciones móviles nativas e híbridas para iOS y Android con React Native y Flutter.',
      keywords: ['desarrollo móvil', 'apps móviles', 'React Native', 'Flutter', 'iOS', 'Android']
    },
    'servicios-software': {
      title: 'Software a Medida | CODEDMO',
      description: 'Desarrollamos software empresarial personalizado que se adapta perfectamente a las necesidades de tu negocio.',
      keywords: ['software a medida', 'software empresarial', 'sistemas personalizados', 'automatización']
    },
    'servicios-hosting': {
      title: 'Hosting | CODEDMO',
      description: 'Servicios de hosting confiables, seguros y optimizados con soporte técnico 24/7 para tus proyectos web.',
      keywords: ['hosting', 'alojamiento web', 'servidores', 'soporte técnico', 'hosting Guatemala']
    },
    'servicios-integracion': {
      title: 'Integraciones | CODEDMO',
      description: 'Conectamos y automatizamos tus sistemas empresariales con integraciones API robustas y escalables.',
      keywords: ['integración de sistemas', 'APIs', 'automatización', 'conectividad', 'sistemas empresariales']
    }
  }

  const baseCanonical = 'https://codedmo.dev'
  const sectionPath = parentPage ? `/${parentPage}#${sectionType}` : `#${sectionType}`
  
  return {
    ...sectionData[sectionType],
    canonical: `${baseCanonical}${sectionPath}`,
    pageType: parentPage || 'home',
    section: sectionType
  }
}

// Hook de conveniencia para usar SEO completo por pestaña
export const useAdvancedPageSEO = (pageType: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion') => {
  const config = usePageSEO(pageType)
  
  useSEO({
    ...config,
    priority: 'high',
    pageType,
    author: 'CODEDMO Solutions',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    locale: 'es-GT',
    alternateLanguages: [
      { lang: 'es', href: config.canonical || 'https://codedmo.dev' },
      { lang: 'es-GT', href: config.canonical || 'https://codedmo.dev' }
    ]
  })
}

// Hook para páginas con datos de empresa
export const useBusinessPageSEO = (pageType: 'home' | 'services' | 'contact') => {
  const config = usePageSEO(pageType)
  
  useSEO({
    ...config,
    priority: 'high',
    pageType,
    businessInfo: {
      name: 'CODEDMO Solutions',
      phone: '+502-3792-3612',
      address: 'Guatemala, Guatemala',
      openingHours: ['07:00-20:00']
    },
    alternateLanguages: [
      { lang: 'es', href: config.canonical || 'https://codedmo.dev' },
      { lang: 'es-GT', href: config.canonical || 'https://codedmo.dev' }
    ]
  })
}
