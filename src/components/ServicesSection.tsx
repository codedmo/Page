import { useState } from "react"
import { useServiceTabSEO } from "@/hooks/useAdvancedSEO"
import { Button } from "@/components/ui/button"
import { Layout, Smartphone, Server, Shield, Database } from "lucide-react"

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
      color: "from-cyan-500 to-blue-500"
    },
    movil: {
      title: "Apps Móviles",
      icon: Smartphone,
      description: "Desarrollo nativo y multiplataforma iOS/Android",
      features: ["React Native", "Flutter", "iOS & Android", "UI/UX Nativo"],
      color: "from-purple-500 to-pink-500"
    },
    software: {
      title: "Software a Medida",
      icon: Server,
      description: "Soluciones personalizadas que se adaptan a tu negocio",
      features: ["Arquitectura Escalable", "Base de Datos", "APIs REST", "Seguridad"],
      color: "from-blue-500 to-purple-500"
    },
    hosting: {
      title: "Hosting & Cloud",
      icon: Database,
      description: "Servicios de hosting confiables y seguros",
      features: ["Hosting Premium", "SSL Gratuito", "Soporte 24/7", "Backups"],
      color: "from-green-500 to-emerald-500"
    },
    integracion: {
      title: "Integraciones & API",
      icon: Shield,
      description: "Conectamos sistemas y automatizamos procesos",
      features: ["APIs REST", "GraphQL", "Webhooks", "Automatización"],
      color: "from-pink-500 to-cyan-500"
    }
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
    // El SEO se actualizará automáticamente debido al hook useServiceTabSEO
  }

  return (
    <section id="servicios" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nuestros <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentTab === key
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{service.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Service Content */}
        <div className="max-w-4xl mx-auto">
          {Object.entries(services).map(([key, service]) => {
            if (key !== currentTab) return null
            
            const IconComponent = service.icon
            return (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 bg-gradient-to-r ${service.color} rounded-full`}></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className={`bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}>
                      Solicitar Cotización
                    </Button>
                  </div>

                  <div className="relative">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-20 rounded-3xl blur-xl`}></div>
                    <div className="relative bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 h-64 flex items-center justify-center">
                      <IconComponent className={`w-24 h-24 text-transparent bg-gradient-to-r ${service.color} bg-clip-text`} />
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
