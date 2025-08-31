import { useEffect, useState } from 'react'
import { useSEO, useSectionSEO } from './useSEO'

// Hook simplificado para manejar SEO en componentes con pestañas/tabs
export const useTabSEO = (
  baseSection: string,
  currentTab: string,
  parentPage?: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion',
  priority: 'high' | 'medium' | 'low' = 'medium'
) => {
  const [previousTab, setPreviousTab] = useState<string | null>(null)

  // Construir el identificador de sección completo
  const fullSectionId = `${baseSection}-${currentTab}`
  
  // Obtener SEO específico para esta combinación de sección + tab
  const sectionSEO = useSectionSEO(fullSectionId, parentPage)
  
  // Aplicar SEO siempre (cumple con reglas de hooks)
  useSEO({
    ...sectionSEO,
    priority,
    section: fullSectionId,
    pageType: parentPage
  })

  // Tracking de cambios de pestaña
  useEffect(() => {
    if (currentTab !== previousTab) {
      setPreviousTab(currentTab)
      
      // Analytics tracking opcional
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tab_change', {
          section: baseSection,
          tab: currentTab,
          page: parentPage || 'unknown'
        })
      }
    }
  }, [currentTab, previousTab, baseSection, parentPage])

  return {
    sectionSEO,
    currentTab,
    fullSectionId
  }
}

// Hook para elementos que aparecen en múltiples pestañas
export const useMultiContextSEO = (
  elementId: string,
  currentContext: string,
  contexts: Record<string, {
    pageId?: 'home' | 'services' | 'about' | 'contact' | 'portfolio' | 'hosting' | 'desarrollo' | 'integracion'
    priority?: 'high' | 'medium' | 'low'
    customSEO?: {
      title?: string
      description?: string
      keywords?: string[]
    }
  }>
) => {
  // Obtener contexto activo
  const activeContext = contexts[currentContext]
  
  // Construir SEO base siempre (cumple con reglas de hooks)
  const baseSectionId = `${elementId}-${currentContext}`
  const baseSEO = useSectionSEO(baseSectionId, activeContext?.pageId)
  
  // Combinar con SEO personalizado si existe
  const finalSEO = activeContext?.customSEO ? {
    ...baseSEO,
    ...activeContext.customSEO,
    keywords: [
      ...(baseSEO.keywords || []),
      ...(activeContext.customSEO.keywords || [])
    ]
  } : baseSEO

  // Aplicar SEO siempre
  useSEO({
    ...finalSEO,
    priority: activeContext?.priority || 'medium',
    section: baseSectionId,
    pageType: activeContext?.pageId
  })

  return {
    activeSEO: finalSEO,
    activeContext,
    elementId,
    currentContext
  }
}

// Ejemplo de uso para un componente con pestañas
export const useServiceTabSEO = (currentService: string) => {
  const serviceContexts = {
    web: {
      pageId: 'services' as const,
      priority: 'high' as const,
      customSEO: {
        title: 'Desarrollo Web Profesional | CODEDMO',
        description: 'Desarrollamos aplicaciones web modernas con React, Next.js y las mejores prácticas de desarrollo.',
        keywords: ['desarrollo web', 'React', 'Next.js', 'aplicaciones web']
      }
    },
    movil: {
      pageId: 'services' as const,
      priority: 'high' as const,
      customSEO: {
        title: 'Desarrollo de Apps Móviles | CODEDMO',
        description: 'Creamos aplicaciones móviles nativas e híbridas para iOS y Android.',
        keywords: ['desarrollo móvil', 'apps móviles', 'React Native', 'Flutter']
      }
    },
    software: {
      pageId: 'services' as const,
      priority: 'high' as const,
      customSEO: {
        title: 'Software a Medida | CODEDMO',
        description: 'Desarrollamos software empresarial personalizado para tu negocio.',
        keywords: ['software a medida', 'software empresarial', 'sistemas personalizados']
      }
    },
    hosting: {
      pageId: 'hosting' as const,
      priority: 'medium' as const,
      customSEO: {
        title: 'Hosting y Alojamiento Web | CODEDMO',
        description: 'Servicios de hosting confiables con soporte técnico 24/7.',
        keywords: ['hosting', 'alojamiento web', 'servidores', 'hosting Guatemala']
      }
    },
    integracion: {
      pageId: 'integracion' as const,
      priority: 'medium' as const,
      customSEO: {
        title: 'Integración de Sistemas | CODEDMO',
        description: 'Conectamos y automatizamos tus sistemas empresariales.',
        keywords: ['integración de sistemas', 'APIs', 'automatización']
      }
    }
  }

  return useMultiContextSEO('servicios', currentService, serviceContexts)
}

// Declarar tipos para Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, string | number>) => void
  }
}

export default {
  useTabSEO,
  useMultiContextSEO,
  useServiceTabSEO
}
