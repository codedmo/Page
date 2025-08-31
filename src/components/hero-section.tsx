"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Star, CheckCircle, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { useSEO, usePageSEO, useSectionSEO } from "@/hooks/useSEO"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  // SEO de la sección Hero específica
  const heroSEO = useSectionSEO('hero', 'home')
  const pageStructuredData = usePageSEO('home')
  
  useSEO({
    ...heroSEO,
    ogImage: 'https://codedmo.dev/images/Hero.png',
    structuredData: pageStructuredData,
    priority: 'high', // Hero tiene prioridad alta
    pageType: "home"
  })

  const technologies = [
    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "SQL Server", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
    { name: "C#", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Función para smooth scroll
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="inicio"
      className="relative pt-16 h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900"
    >
      {/* SEO Meta Tags - usando JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CODEDMO",
            "description": "Empresa especializada en desarrollo de software profesional, plataformas web escalables, integraciones y APIs. Soluciones tecnológicas a medida para empresas.",
            "url": "https://codedmo.com",
            "logo": "https://codedmo.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-234-567-8900",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.linkedin.com/company/codedmo",
              "https://github.com/codedmo"
            ],
            "offers": [
              {
                "@type": "Offer",
                "name": "Desarrollo de Software",
                "description": "Desarrollo de software profesional y plataformas web escalables"
              },
              {
                "@type": "Offer", 
                "name": "Integraciones y APIs",
                "description": "Desarrollo de integraciones y APIs para conectar sistemas empresariales"
              }
            ]
          })
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto h-full">
          {/* Contenido de texto */}
          <div className={`text-center lg:text-left transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge de empresa */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border border-cyan-200 dark:border-cyan-800 mb-6">
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mr-2" />
              <span className="text-sm font-semibold text-cyan-800 dark:text-cyan-300">Desarrollo de Software Profesional</span>
            </div>

            {/* Main Headline - Simplificado */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Soluciones Digitales
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                que Transforman
              </span>
            </h1>

            {/* Subtitle - Más conciso */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Desarrollamos software a medida, plataformas web escalables e integraciones que impulsan tu negocio.
            </p>

            {/* Banner marquee de tecnologías - Más prominente */}
            <div className="mb-8">
              <div className="overflow-hidden bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                <div className="flex animate-marquee space-x-8 py-4">
                  {/* Duplicamos el array para efecto continuo */}
                  {[...technologies, ...technologies].map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 whitespace-nowrap"
                    >
                      <img 
                        src={tech.src} 
                        alt={tech.name}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                      <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons - Simplificados */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6">
              <Button
                onClick={() => handleNavClick("#servicios")}
                size="lg"
                className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-bold flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                <span className="relative z-10">Ver Servicios</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Button>
              
              <Button
                onClick={() => handleNavClick("#contacto")}
                variant="outline"
                size="lg"
                className="group relative border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 px-10 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl"
              >
                <span>Contactar</span>
              </Button>
            </div>

            {/* Métricas simples */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>+50 Proyectos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>98% Satisfacción</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Imagen Hero - Simplificada */}
          <div className={`relative lg:order-last order-first transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              {/* Fondo decorativo simplificado */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl blur-lg transition-all duration-700"></div>
              
              {/* Container principal de la imagen */}
              <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-500">
                
                {/* Imagen principal */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/images/Hero.png"
                    alt="CODEDMO - Desarrollo de software profesional y soluciones digitales"
                    width={500}
                    height={350}
                    className="w-full h-auto rounded-lg"
                    loading="eager"
                  />
                </div>

                {/* Badge simple */}
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-lg px-3 py-1 shadow-md">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">En línea</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
