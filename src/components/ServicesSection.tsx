import { useState } from "react"
import { useServiceTabSEO } from "@/hooks/useAdvancedSEO"
import { Button } from "@/components/ui/button"
import { Layout, Server, Shield, Database } from "lucide-react"
import { themeColors, gradients, hoverColors, borders } from '../config/theme-colors'

interface ServicesSectionProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function ServicesSection({ activeTab = 'web', onTabChange }: ServicesSectionProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  // SEO dinámico basado en la pestaña activa usando el hook especializado
  useServiceTabSEO(currentTab)

  const services = {
    web: {
      title: "Desarrollo Web",
      icon: Layout,
      description: "Aplicaciones web modernas, responsivas y optimizadas para SEO",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimizado"],
      color: gradients.service1,
      glowColor: themeColors.primary[500]
    },
    software: {
      title: "Software a Medida",
      icon: Server,
      description: "Soluciones personalizadas que se adaptan a tu negocio",
      features: ["Arquitectura Escalable", "Base de Datos", "APIs REST", "Seguridad"],
      color: gradients.service2,
      glowColor: themeColors.emerald[500]
    },
    hosting: {
      title: "Hosting & Cloud",
      icon: Database,
      description: "Servicios de hosting confiables y seguros",
      features: ["Hosting Premium", "SSL Gratuito", "Soporte 24/7", "Backups"],
      color: gradients.service4,
      glowColor: themeColors.orange[500]
    },
    integracion: {
      title: "Integraciones & API",
      icon: Shield,
      description: "Conectamos sistemas y automatizamos procesos",
      features: ["APIs REST", "GraphQL", "Webhooks", "Automatización"],
      color: gradients.service5,
      glowColor: themeColors.pink[500]
    }
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
    // El SEO se actualizará automáticamente debido al hook useServiceTabSEO
  }

  return (
    <section id="servicios" className={`relative py-20 bg-${themeColors.neutral[900]} overflow-hidden`}>
      {/* Elementos de fondo diferentes al Hero */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 right-1/4 w-64 h-64 bg-${themeColors.purple[500]}/10 rounded-full blur-2xl animate-pulse delay-300`}></div>
        <div className={`absolute bottom-32 left-1/3 w-80 h-80 bg-${themeColors.emerald[500]}/10 rounded-full blur-3xl animate-pulse delay-700`}></div>
        <div className={`absolute top-1/3 left-20 w-48 h-48 bg-${themeColors.orange[500]}/10 rounded-full blur-xl animate-ping delay-1000`}></div>
      </div>

      {/* Patrón de puntos en lugar de líneas */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Nuestros <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Servicios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas completas para hacer crecer tu negocio
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(services).map(([key, service]) => {
            const IconComponent = service.icon
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                  currentTab === key
                    ? `bg-gradient-to-r ${gradients.primary} text-white shadow-lg`
                    : `bg-black/20 border ${borders.primary} text-gray-300 ${hoverColors.primary}`
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{service.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Service Content */}
        <div className="max-w-5xl mx-auto">
          {Object.entries(services).map(([key, service]) => {
            if (key !== currentTab) return null
            
            const IconComponent = service.icon
            return (
              <div key={key} className="relative group">
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
                
                {/* Main card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-4xl font-bold text-white mb-4">
                        {service.title}
                      </h3>
                      
                      <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
                            <span className="text-sm font-medium text-gray-200">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className={`bg-gradient-to-r ${service.color} hover:scale-105 transition-all duration-300 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl`}>
                        Solicitar Cotización
                      </Button>
                    </div>

                    <div className="relative">
                      {/* Animated background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-10 rounded-3xl animate-pulse`}></div>
                      
                      {/* Icon container */}
                      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 h-80 flex items-center justify-center border border-white/20 group-hover:border-white/30 transition-all duration-300">
                        <div className="relative">
                          <IconComponent className={`w-32 h-32 text-transparent bg-gradient-to-r ${service.color} bg-clip-text drop-shadow-lg`} />
                          {/* Floating icons effect */}
                          <div className={`absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r ${service.color} rounded-full opacity-60 animate-bounce`}></div>
                          <div className={`absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r ${service.color} rounded-full opacity-40 animate-bounce delay-300`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
