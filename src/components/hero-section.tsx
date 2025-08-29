"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Server, Globe, Layout, Mail, Shield, Settings } from "lucide-react"
// import Image from "next/image"

export default function HeroSection() {
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
      className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Contenido de texto */}
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Seguridad.<br />Soporte.<br />Velocidad.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              En <span className="font-semibold text-blue-600 dark:text-blue-400">CODEDMO</span> Somos la solución perfecta para poner tu proyecto en línea, con respaldo técnico.
            </p>

            {/* Value Propositions */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="flex flex-col items-center lg:items-start p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hosting Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Alojamiento rápido, seguro y confiable para tu sitio</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dominios</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Paquetes completos de dominio con certificado SSL</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Plantillas & Webs</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Diseños profesionales y desarrollo personalizado</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Empresarial</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Integración Google Workspace y Microsoft Exchange</p>
              </div>
            </div>

            {/* Partners & Technologies */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left mb-4 font-medium">
                Trabajamos con las mejores tecnologías:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {/* Google Workspace */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google Workspace</span>
                </div>
                
                {/* Microsoft Exchange */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Microsoft 365</span>
                </div>
                
                {/* cPanel */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">cPanel</span>
                </div>
                
                {/* SSL Certificate */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SSL Incluido</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button
                onClick={() => handleNavClick("#servicios")}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold flex items-center"
                >
                  Ver Servicios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                onClick={() => handleNavClick("#contacto")}
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 px-8 py-3 text-lg font-semibold"
                >
                  Habla con Nosotros
                </Button>
            </div>
          </div>

          {/* Imagen Hero */}
          <div className="relative lg:order-last order-first">
            <div className="relative">
              {/* Fondo decorativo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl"></div>
              
              {/* Imagen principal */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl">
                <img
                  src="/images/Hero.png"
                  alt="CODEDMO - Desarrollo y Seguridad Web"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />
              </div>

              {/* Elementos decorativos flotantes */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              
              {/* Badge flotante */}
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">En línea</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
