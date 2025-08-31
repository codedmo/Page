import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  structuredData?: Record<string, unknown>
  pageType?: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion'
  section?: string // Para identificar secciones específicas dentro de una página
  priority?: 'high' | 'medium' | 'low' // Para manejar conflictos de SEO
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
  priority = 'medium'
}: SEOProps) => {
  useEffect(() => {
    // Solo aplicar SEO si es alta prioridad o no hay conflicto
    const shouldApplySEO = priority === 'high' || !document.querySelector('[data-seo-applied="true"]')
    
    if (!shouldApplySEO) return

    // Marcar que se aplicó SEO
    document.documentElement.setAttribute('data-seo-applied', 'true')
    document.documentElement.setAttribute('data-seo-section', section || 'unknown')
    document.documentElement.setAttribute('data-seo-page', pageType || 'unknown')

    // Actualizar título con contexto
    if (title) {
      const contextualTitle = section ? `${title} - ${section}` : title
      document.title = contextualTitle
    }

    // Actualizar meta description
    if (description) {
      updateMetaTag('description', description)
    }

    // Actualizar keywords
    if (keywords && keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '))
    }

    // Actualizar canonical
    if (canonical) {
      updateLinkTag('canonical', canonical)
    }

    // Actualizar Open Graph
    if (title) {
      updateMetaProperty('og:title', title)
    }
    if (description) {
      updateMetaProperty('og:description', description)
    }
    if (canonical) {
      updateMetaProperty('og:url', canonical)
    }
    if (ogImage) {
      updateMetaProperty('og:image', ogImage)
    }

    // Actualizar Twitter Cards
    if (title) {
      updateMetaName('twitter:title', title)
    }
    if (description) {
      updateMetaName('twitter:description', description)
    }
    if (ogImage) {
      updateMetaName('twitter:image', ogImage)
    }

    // Agregar datos estructurados con contexto
    if (structuredData) {
      const contextualData = {
        ...structuredData,
        name: section ? `${structuredData.name} - ${section}` : structuredData.name,
        '@id': `${window.location.href}#${section || pageType || 'main'}`
      }
      
      const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]')
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-dynamic', 'true')
      script.setAttribute('data-section', section || 'main')
      script.textContent = JSON.stringify(contextualData)
      document.head.appendChild(script)
    }

    // Cleanup function
    return () => {
      if (priority === 'high') {
        document.documentElement.removeAttribute('data-seo-applied')
      }
    }
  }, [title, description, keywords, canonical, ogImage, structuredData, pageType, section, priority])

  return null
}

// Funciones helper para actualizar elementos del DOM
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateMetaName(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

// Hook para generar datos estructurados específicos para páginas
export const usePageSEO = (pageType: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion') => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '',
    description: '',
    url: window.location.href,
    isPartOf: {
      '@type': 'WebSite',
      name: 'CODEDMO',
      url: 'https://codedmo.dev'
    },
    about: {
      '@type': 'Organization',
      name: 'CODEDMO',
      description: 'Empresa líder en desarrollo de software y soluciones digitales'
    }
  }

  const pageData = {
    home: {
      ...baseData,
      name: 'Inicio - CODEDMO | Desarrollo de Software Profesional',
      description: 'CODEDMO es tu partner ideal para desarrollo web, aplicaciones móviles, software a medida e integraciones. Más de 50 proyectos exitosos.',
      mainEntity: {
        '@type': 'Service',
        name: 'Desarrollo de Software',
        provider: {
          '@type': 'Organization',
          name: 'CODEDMO'
        }
      }
    },
    services: {
      ...baseData,
      name: 'Servicios - Desarrollo Web y Software | CODEDMO',
      description: 'Servicios profesionales de desarrollo web, aplicaciones móviles, software empresarial e integraciones API.',
      mainEntity: {
        '@type': 'ItemList',
        name: 'Servicios de Desarrollo',
        itemListElement: [
          { '@type': 'Service', name: 'Desarrollo Web', description: 'Aplicaciones web modernas con React y Next.js' },
          { '@type': 'Service', name: 'Desarrollo Móvil', description: 'Apps nativas e híbridas para iOS y Android' },
          { '@type': 'Service', name: 'Software a Medida', description: 'Soluciones empresariales personalizadas' },
          { '@type': 'Service', name: 'Integraciones API', description: 'Conectamos tus sistemas y automatizamos procesos' }
        ]
      }
    },
    about: {
      ...baseData,
      name: 'Acerca de Nosotros - CODEDMO',
      description: 'Conoce el equipo de expertos en desarrollo de CODEDMO. Más de 3 años transformando ideas en soluciones digitales exitosas.'
    },
    contact: {
      ...baseData,
      name: 'Contacto - CODEDMO',
      description: 'Contáctanos para tu próximo proyecto de desarrollo. Consulta gratuita y presupuesto personalizado.'
    },
    portfolio: {
      ...baseData,
      name: 'Portafolio - Proyectos de CODEDMO',
      description: 'Descubre nuestros proyectos exitosos en desarrollo web, aplicaciones móviles y software empresarial.'
    },
    hosting: {
      ...baseData,
      name: 'Hosting y Alojamiento Web - CODEDMO',
      description: 'Servicios de hosting confiables, seguros y optimizados para tus aplicaciones web y sitios empresariales.',
      mainEntity: {
        '@type': 'Service',
        name: 'Alojamiento Web',
        provider: { '@type': 'Organization', name: 'CODEDMO' },
        description: 'Hosting premium con soporte 24/7'
      }
    },
    desarrollo: {
      ...baseData,
      name: 'Desarrollo de Software Personalizado - CODEDMO',
      description: 'Desarrollo de software a medida, aplicaciones empresariales y sistemas personalizados para tu negocio.',
      mainEntity: {
        '@type': 'Service',
        name: 'Desarrollo de Software',
        provider: { '@type': 'Organization', name: 'CODEDMO' },
        description: 'Software empresarial y aplicaciones a medida'
      }
    },
    integracion: {
      ...baseData,
      name: 'Integración de Sistemas y APIs - CODEDMO',
      description: 'Integramos tus sistemas existentes, automatizamos procesos y conectamos plataformas para optimizar tu negocio.',
      mainEntity: {
        '@type': 'Service',
        name: 'Integración de Sistemas',
        provider: { '@type': 'Organization', name: 'CODEDMO' },
        description: 'APIs, integraciones y automatización de procesos'
      }
    }
  }

  return pageData[pageType] || pageData.home
}

// Hook para SEO de secciones específicas
export const useSectionSEO = (sectionType: string, parentPage?: string) => {
  const sectionData: Record<string, { title: string; description: string; keywords: string[] }> = {
    hero: {
      title: 'CODEDMO - Desarrollo de Software Profesional | Inicio',
      description: 'Empresa líder en desarrollo de software, aplicaciones web y móviles. +50 proyectos exitosos, 98% satisfacción del cliente.',
      keywords: ['desarrollo de software', 'aplicaciones web', 'desarrollo móvil', 'React', 'Node.js', 'TypeScript']
    },
    'servicios-web': {
      title: 'Desarrollo Web Profesional | CODEDMO',
      description: 'Desarrollamos aplicaciones web modernas, responsivas y optimizadas con React, Next.js y las últimas tecnologías.',
      keywords: ['desarrollo web', 'React', 'Next.js', 'aplicaciones web', 'frontend', 'backend']
    },
    'servicios-movil': {
      title: 'Desarrollo de Apps Móviles | CODEDMO',
      description: 'Creamos aplicaciones móviles nativas e híbridas para iOS y Android con React Native y Flutter.',
      keywords: ['desarrollo móvil', 'apps móviles', 'React Native', 'Flutter', 'iOS', 'Android']
    },
    'servicios-software': {
      title: 'Software a Medida | CODEDMO',
      description: 'Desarrollamos software empresarial personalizado que se adapta perfectamente a las necesidades de tu negocio.',
      keywords: ['software a medida', 'software empresarial', 'sistemas personalizados', 'automatización']
    },
    'servicios-hosting': {
      title: 'Hosting y Alojamiento Web | CODEDMO',
      description: 'Servicios de hosting confiables, seguros y optimizados con soporte técnico 24/7 para tus proyectos web.',
      keywords: ['hosting', 'alojamiento web', 'servidores', 'soporte técnico', 'hosting Guatemala']
    },
    'servicios-integracion': {
      title: 'Integración de Sistemas y APIs | CODEDMO',
      description: 'Conectamos y automatizamos tus sistemas empresariales con integraciones API robustas y escalables.',
      keywords: ['integración de sistemas', 'APIs', 'automatización', 'conectividad', 'sistemas empresariales']
    },
    'about-team': {
      title: 'Nuestro Equipo - CODEDMO',
      description: 'Conoce a los desarrolladores y especialistas que hacen posible las soluciones tecnológicas de CODEDMO.',
      keywords: ['equipo desarrollo', 'desarrolladores Guatemala', 'especialistas tecnología', 'equipo CODEDMO']
    },
    'portfolio-web': {
      title: 'Portafolio Web - CODEDMO',
      description: 'Explora nuestros proyectos de desarrollo web más exitosos y las soluciones que hemos creado para nuestros clientes.',
      keywords: ['portafolio web', 'proyectos desarrollo', 'casos de éxito', 'sitios web']
    },
    'contact-form': {
      title: 'Contacta con CODEDMO - Consulta Gratuita',
      description: 'Solicita una consulta gratuita para tu proyecto de desarrollo. Te ayudamos a transformar tus ideas en realidad.',
      keywords: ['contacto CODEDMO', 'consulta gratuita', 'presupuesto desarrollo', 'cotización']
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
