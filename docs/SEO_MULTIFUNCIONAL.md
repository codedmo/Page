# Sistema SEO Multifuncional para CODEDMO

Este sistema de SEO está diseñado para manejar tanto elementos individuales como pestañas/rutas múltiples de manera eficiente y flexible.

## 📋 Estructura de Hooks

### 1. `useSEO` - Hook Base

El hook principal que aplica SEO al DOM.

```tsx
useSEO({
  title: 'Título de la página',
  description: 'Descripción SEO optimizada',
  keywords: ['palabra1', 'palabra2', 'palabra3'],
  canonical: 'https://codedmo.dev/ruta',
  ogImage: 'https://codedmo.dev/imagen.jpg',
  structuredData: { ... },
  pageType: 'home', // 'services', 'about', etc.
  section: 'hero', // identificador de sección
  priority: 'high' // 'medium', 'low'
})
```

### 2. `usePageSEO` - SEO por Página

Genera datos estructurados específicos para cada tipo de página.

```tsx
const pageData = usePageSEO('services') // 'home', 'about', 'contact', etc.
```

### 3. `useSectionSEO` - SEO por Sección

Genera SEO específico para secciones dentro de páginas.

```tsx
const sectionSEO = useSectionSEO('hero', 'home')
const serviceSEO = useSectionSEO('servicios-web', 'services')
```

### 4. `useTabSEO` - SEO para Pestañas

Maneja SEO dinámico cuando cambias entre pestañas.

```tsx
const { sectionSEO, currentTab } = useTabSEO(
  'servicios', // base section
  currentTab, // pestaña actual
  'services', // página padre
  'high' // prioridad
)
```

### 5. `useMultiContextSEO` - SEO Multi-Contexto

Para elementos que aparecen en múltiples pestañas con SEO diferente.

```tsx
const contexts = {
  web: {
    pageId: 'services',
    priority: 'high',
    customSEO: {
      title: 'Desarrollo Web | CODEDMO',
      description: 'Aplicaciones web modernas con React',
      keywords: ['desarrollo web', 'React', 'Next.js']
    }
  },
  movil: {
    pageId: 'services',
    priority: 'high',
    customSEO: {
      title: 'Apps Móviles | CODEDMO',
      description: 'Aplicaciones móviles nativas e híbridas',
      keywords: ['desarrollo móvil', 'React Native']
    }
  }
}

useMultiContextSEO('button-cta', currentTab, contexts)
```

## 🎯 Casos de Uso

### Caso 1: Hero Section (Elemento único)

```tsx
export default function HeroSection() {
  const heroSEO = useSectionSEO('hero', 'home')
  const pageData = usePageSEO('home')
  
  useSEO({
    ...heroSEO,
    structuredData: pageData,
    priority: 'high'
  })
  
  return <section>...</section>
}
```

### Caso 2: Sección con Pestañas

```tsx
export default function ServicesSection() {
  const [currentTab, setCurrentTab] = useState('web')
  
  // Hook especializado que maneja todo el SEO automáticamente
  useServiceTabSEO(currentTab)
  
  return (
    <section>
      <div className="tabs">
        {['web', 'movil', 'software'].map(tab => (
          <button key={tab} onClick={() => setCurrentTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="content">
        {/* Contenido que cambia según currentTab */}
      </div>
    </section>
  )
}
```

### Caso 3: Elemento que Aparece en Múltiples Pestañas

```tsx
export default function CTAButton({ context }: { context: string }) {
  const buttonContexts = {
    'web': {
      pageId: 'services',
      customSEO: {
        title: 'Solicita Desarrollo Web | CODEDMO',
        description: 'Obtén una cotización para tu proyecto web'
      }
    },
    'movil': {
      pageId: 'services', 
      customSEO: {
        title: 'Solicita App Móvil | CODEDMO',
        description: 'Desarrollamos tu aplicación móvil'
      }
    }
  }
  
  useMultiContextSEO('cta-button', context, buttonContexts)
  
  return <button>Solicitar Cotización</button>
}
```

### Caso 4: Páginas Dinámicas/Rutas

```tsx
export default function ProjectPage({ projectId }: { projectId: string }) {
  const params = { projectId }
  const staticSEO = {
    title: 'Proyecto {projectId} | CODEDMO',
    description: 'Detalles del proyecto {projectId} desarrollado por CODEDMO',
    keywords: ['proyecto', 'portafolio', 'desarrollo']
  }
  
  const { currentRoute, dynamicSEO } = useRouteSEO(
    '/portfolio/:projectId',
    params,
    staticSEO
  )
  
  return <div>Proyecto: {projectId}</div>
}
```

## 🚀 Beneficios del Sistema

### ✅ **Multifuncional**

- Maneja elementos individuales
- Soporta pestañas dinámicas  
- Funciona con rutas múltiples
- SEO específico por contexto

### ✅ **Automático**

- Actualización automática del DOM
- Seguimiento de cambios de pestañas
- Resolución de conflictos por prioridad
- Analytics tracking incluido

### ✅ **Optimizado para SEO**

- Títulos específicos por sección
- Descripciones contextuales
- Keywords relevantes
- Datos estructurados JSON-LD
- Open Graph optimizado
- Twitter Cards

### ✅ **Flexible**

- Configuración por prioridades
- SEO personalizado por contexto
- Combinación de múltiples hooks
- Fácil mantenimiento

## 📝 Ejemplo Completo: Página de Servicios

```tsx
// pages/ServicesPage.tsx
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('web')
  
  return (
    <div>
      <HeroSection />
      <ServicesSection activeTab={activeTab} onTabChange={setActiveTab} />
      <CTASection context={activeTab} />
      <ContactForm />
    </div>
  )
}

// components/ServicesSection.tsx
export default function ServicesSection({ activeTab, onTabChange }) {
  // SEO automático para pestañas de servicios
  useServiceTabSEO(activeTab)
  
  return (
    <section>
      <TabNavigation activeTab={activeTab} onChange={onTabChange} />
      <TabContent activeTab={activeTab} />
    </section>
  )
}

// components/CTASection.tsx  
export default function CTASection({ context }) {
  const ctaContexts = {
    web: { 
      pageId: 'services',
      customSEO: {
        title: 'Desarrollo Web Profesional - Solicita Cotización',
        description: 'Transforma tu negocio con una aplicación web moderna'
      }
    },
    movil: {
      pageId: 'services',
      customSEO: {
        title: 'Desarrollo Móvil - Solicita tu App',
        description: 'Lleva tu negocio al móvil con una app profesional'
      }
    }
  }
  
  useMultiContextSEO('cta-section', context, ctaContexts)
  
  return <section>...</section>
}
```

## 🔧 Configuración Avanzada

### Prioridades de SEO

- **high**: Hero sections, páginas principales
- **medium**: Secciones de contenido, pestañas activas  
- **low**: Elementos auxiliares, fallbacks

### Resolución de Conflictos

El sistema automáticamente resuelve conflictos usando:

1. Prioridad del hook (`high` > `medium` > `low`)
2. Orden de renderizado (último en aplicarse gana si misma prioridad)
3. Marcadores en el DOM para evitar duplicados

Esta estructura te permite tener **SEO completamente optimizado** sin importar si es un elemento individual, múltiples pestañas, o rutas dinámicas. ¡Todo funciona de manera automática y coordinada! 🎯
