import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useServiceTabSEO } from "@/hooks/useAdvancedSEO"
import { Button } from "@/components/ui/button"
import { Layout, Server, Shield, Database, Mail  } from "lucide-react"
import { themeColors, gradients, hoverColors, borders } from '../config/theme-colors'
// import type Servicios from "@/pages/Servicios"

interface ServicesSectionProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function ServicesSection({ activeTab = 'web', onTabChange }: ServicesSectionProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)
  const navigate = useNavigate()

  // SEO dinámico basado en la pestaña activa usando el hook especializado
  useServiceTabSEO(currentTab)

  const services = {
    web: {
      title: "Desarrollo Web",
      icon: Layout,
      image: "/Services/Web-Design.svg",
      description: "Aplicaciones web modernas, responsivas y optimizadas para SEO con React, Next.js y TypeScript",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimizado"],
      color: 'from-blue-600 to-cyan-600',
      route: "/servicios/desarrollo/web",
      buttonText: "Ver Desarrollo Web",
      keywords: "desarrollo web, aplicaciones web, React, Next.js, TypeScript, SEO",
      schema: {
        "@type": "Service",
        "name": "Desarrollo Web",
        "description": "Desarrollo de aplicaciones web modernas con React, Next.js y optimización SEO",
        "provider": {
          "@type": "Organization",
          "name": "CodedMo"
        }
      }
    },
    software: {
      title: "Software a Medida",
      icon: Server,
      image: "/Services/Software.svg",
      description: "Soluciones de software personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio",
      features: ["Arquitectura Escalable", "Base de Datos", "APIs REST", "Seguridad"],
      color: 'from-purple-600 to-pink-600',
      route: "/servicios/desarrollo/software",
      buttonText: "Ver Desarrollo de Software",
      keywords: "software personalizado, desarrollo a medida, APIs, bases de datos",
      schema: {
        "@type": "Service",
        "name": "Software a Medida",
        "description": "Desarrollo de software personalizado con arquitectura escalable y APIs",
        "provider": {
          "@type": "Organization",
          "name": "CodedMo"
        }
      }
    },
    hosting: {
      title: "Hosting & Cloud",
      icon: Database,
      image: "/Services/Hosting.svg",
      description: "Servicios de hosting premium confiables y seguros con SSL gratuito y soporte técnico 24/7",
      features: ["Hosting Premium", "SSL Gratuito", "Soporte 24/7", "Backups"],
      color: 'from-emerald-600 to-teal-600',
      route: "/servicios/hosting",
      buttonText: "Ver Hosting",
      keywords: "hosting web, cloud hosting, SSL, soporte técnico, backups",
      schema: {
        "@type": "Service",
        "name": "Hosting & Cloud",
        "description": "Servicios de hosting premium con SSL gratuito y soporte 24/7",
        "provider": {
          "@type": "Organization",
          "name": "CodedMo"
        }
      }
    },
    integracion: {
      title: "Integraciones & API",
      icon: Shield,
      image: "/Services/Integration.svg",
      description: "Conectamos sistemas empresariales y automatizamos procesos mediante APIs REST, GraphQL y webhooks",
      features: ["APIs REST", "GraphQL", "Webhooks", "Automatización"],
      color: 'from-orange-600 to-yellow-600',
      route: "/servicios/desarrollo/integracion&api",
      buttonText: "Ver Integraciones",
      keywords: "integraciones, APIs REST, GraphQL, webhooks, automatización",
      schema: {
        "@type": "Service",
        "name": "Integraciones & API",
        "description": "Servicios de integración de sistemas y desarrollo de APIs",
        "provider": {
          "@type": "Organization",
          "name": "CodedMo"
        }
      }
    },
    Servicios: {
      title: "Servicios de Google y Microsoft",
      icon: Mail,
      image: "/Services/Services.svg",
      description: "Implementación y configuración de servicios empresariales de Google Workspace y Microsoft 365",
      features: ["Google Workspace", "Microsoft 365", "Correos Corporativos", "Microsoft Exchange"],
      color: 'from-indigo-600 to-purple-600',
      route: "/servicios/google&microsoft",
      buttonText: "Ver Empresas de Tecnología",
      keywords: "Google Workspace, Microsoft 365, correos corporativos, Microsoft Exchange",
      schema: {
        "@type": "Service",
        "name": "Servicios Google y Microsoft",
        "description": "Implementación de Google Workspace y Microsoft 365 para empresas",
        "provider": {
          "@type": "Organization",
          "name": "CodedMo"
        }
      }
    }
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
    // El SEO se actualizará automáticamente debido al hook useServiceTabSEO
  }

  const handleNavigateToService = (route: string) => {
    navigate(route)
  }

  // Generar datos estructurados para SEO
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Servicios de Desarrollo Web - CodedMo",
      "description": "Servicios profesionales de desarrollo web, software, hosting e integraciones",
      "numberOfItems": Object.keys(services).length,
      "itemListElement": Object.entries(services).map(([, service], index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          ...service.schema,
          "url": `${window.location.origin}${service.route}`,
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "MXN"
          }
        }
      }))
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    )
  }

  return (
    <>
      {generateStructuredData()}
      <section 
        id="servicios" 
        className={`relative py-8 bg-${themeColors.neutral[900]} overflow-hidden min-h-screen md:h-screen flex items-center justify-center`}
        role="main"
        aria-labelledby="servicios-heading"
      >
        {/* Elementos de fondo diferentes al Hero */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className={`absolute top-20 right-1/4 w-64 h-64 bg-${themeColors.purple[500]}/10 rounded-full blur-2xl animate-pulse delay-300`}></div>
          <div className={`absolute bottom-32 left-1/3 w-80 h-80 bg-${themeColors.emerald[500]}/10 rounded-full blur-3xl animate-pulse delay-700`}></div>
          <div className={`absolute top-1/3 left-20 w-48 h-48 bg-${themeColors.orange[500]}/10 rounded-full blur-xl animate-ping delay-1000`}></div>
        </div>
      
        {/* Patrón de puntos */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" aria-hidden="true"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h1 id="servicios-heading" className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nuestros <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Servicios</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" role="doc-subtitle">
              Ofrecemos soluciones tecnológicas completas para hacer crecer tu negocio
            </p>
          </header>

          {/* Tabs Navigation */}
          <nav 
            className="flex flex-wrap justify-center gap-4 mb-12" 
            role="tablist" 
            aria-label="Categorías de servicios"
          >
            {Object.entries(services).map(([key, service]) => {
              const IconComponent = service.icon
              const isSelected = currentTab === key
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                    isSelected
                      ? `bg-gradient-to-r ${gradients.primary} text-white shadow-lg`
                      : `bg-black/20 border ${borders.primary} text-gray-300 ${hoverColors.primary}`
                  }`}
                  role="tab"
                  {...(isSelected ? { 'aria-selected': true } : { 'aria-selected': false })}
                  aria-controls={`panel-${key}`}
                  id={`tab-${key}`}
                  type="button"
                  title={`Ver detalles de ${service.title}`}
                >
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                  <span>{service.title}</span>
                </button>
              )
            })}
          </nav>

          {/* Active Service Content */}
          <main className="max-w-5xl mx-auto">
            {Object.entries(services).map(([key, service]) => {
              if (key !== currentTab) return null
              
              const IconComponent = service.icon
              return (
                <article 
                  key={key} 
                  className="relative group"
                  role="tabpanel"
                  id={`panel-${key}`}
                  aria-labelledby={`tab-${key}`}
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`} aria-hidden="true"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`} aria-hidden="true">
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        
                        <header>
                          <h2 
                            className="text-4xl font-bold text-white mb-4"
                            itemProp="name"
                          >
                            {service.title}
                          </h2>
                        </header>
                        
                        <p 
                          className="text-xl text-gray-200 mb-8 leading-relaxed"
                          itemProp="description"
                        >
                          {service.description}
                        </p>

                        <section aria-label="Características del servicio">
                          <h3 className="sr-only">Características incluidas</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {service.features.map((feature, index) => (
                              <div 
                                key={index} 
                                className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10"
                                itemProp="serviceOutput"
                              >
                                <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`} aria-hidden="true"></div>
                                <span className="text-sm font-medium text-gray-200">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        <Button 
                          onClick={() => handleNavigateToService(service.route)}
                          className={`bg-gradient-to-r ${service.color} hover:scale-105 transition-all duration-300 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl`}
                          aria-label={`${service.buttonText} - ${service.title}`}
                          itemProp="url"
                        >
                          {service.buttonText}
                        </Button>
                      </div>

                      <aside className="relative flex items-center justify-center" aria-label="Ilustración del servicio">
                        {service.image ? (
                          // Imagen del servicio más grande y directa
                          <img 
                            src={service.image} 
                            alt={`Ilustración de ${service.title} - ${service.description}`}
                            className="w-96 h-96 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            loading={key === 'web' ? 'eager' : 'lazy'}
                            decoding="async"
                            itemProp="image"
                            width="384"
                            height="384"
                          />
                        ) : (
                          // Fallback al ícono si no hay imagen
                          <IconComponent className={`w-48 h-48 text-transparent bg-gradient-to-r ${service.color} bg-clip-text drop-shadow-lg`} aria-label={`Ícono de ${service.title}`} />
                        )}
                        
                        {/* Efectos flotantes sutiles */}
                        <div className={`absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r ${service.color} rounded-full opacity-40 animate-bounce`} aria-hidden="true"></div>
                        <div className={`absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r ${service.color} rounded-full opacity-30 animate-bounce delay-500`} aria-hidden="true"></div>
                      </aside>
                    </div>
                  </div>
                  
                  {/* Metadata oculta para SEO */}
                  <div className="sr-only">
                    <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
                      <span itemProp="name">CodedMo</span>
                    </span>
                    <span itemProp="keywords">{service.keywords}</span>
                    <span itemProp="serviceType">Desarrollo de Software</span>
                    <span itemProp="areaServed">Guatemala</span>
                  </div>
                </article>
              )
            })}
          </main>
      </div>
    </section>
    </>
  )
}
