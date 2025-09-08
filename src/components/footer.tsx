import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Github, Facebook, MessageCircle, Instagram, ArrowUp } from 'lucide-react'
import { themeColors, gradients } from '../config/theme-colors'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/codedmo',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61578671524932',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/codedmo.dev',
      color: 'hover:text-pink-400'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle, // Usar un ícono alternativo de 'lucide-react'
      href: 'https://wa.me/50237923612',
      color: 'hover:text-cyan-400'
    }
  ]

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Portafolio', href: '/portafolio' },
    { name: 'Sobre Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contacto' }
  ]

  const services = [
    { name: 'Desarrollo Web', href: '/servicios/desarrollo/web' },
    { name: 'Software a Medida', href: '/servicios/desarrollo/software' },
    { name: 'Hosting & Cloud', href: '/servicios/hosting' },
    { name: 'Integraciones & API', href: '/servicios/desarrollo/integracion&api' },
    { name: 'Google & Microsoft', href: '/servicios/google&microsoft' }
  ]

  const legalLinks = [
    { name: 'Política de Privacidad', href: '/politicas' },
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={`relative bg-${themeColors.neutral[900]} border-t border-white/10 overflow-hidden`}>
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-${themeColors.primary[500]}/5 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 bg-${themeColors.secondary[500]}/5 rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true"></div>

      <div className="relative z-10">
        {/* Contenido principal del footer */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Información de la empresa */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Link to="/" className="flex items-center space-x-2">
                  <img 
                    src="/codedmo-logo-white-horizontal.svg" 
                    alt="CODEDMO Logo" 
                    className="h-8 w-auto"
                  />
                  {/* <span className={`text-2xl font-bold bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}>
                    CODEDMO
                  </span> */}
                </Link>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empresa guatemalteca especializada en desarrollo de software y soluciones web innovadoras. 
                Transformamos ideas en realidades digitales.
              </p>

              {/* Información de contacto */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:info@codedmo.dev" className="hover:text-white transition-colors">
                    info@codedmo.dev
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+50237923612" className="hover:text-white transition-colors">
                    +502 3792-3612
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>Guatemala, Guatemala</span>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:bg-cyan-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Nuestros Servicios</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 group-hover:bg-teal-400 transition-colors"></span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter y legal */}
            <div>
              {/* <h3 className="text-lg font-semibold text-white mb-6">Mantente Conectado</h3>
              <p className="text-gray-300 mb-4">
                Recibe las últimas noticias sobre tecnología y nuestros servicios.
              </p> */}
              
              {/* Newsletter form */}
              {/* <div className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-1 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <button className={`px-6 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-r-lg hover:scale-105 transition-transform duration-300 font-medium`}>
                    Suscribir
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  No spam. Solo contenido valioso sobre tecnología.
                </p>
              </div> */}

              {/* Enlaces legales */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">Información Legal</h4>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Separador con gradiente */}
        <div className={`h-px bg-gradient-to-r ${gradients.primary} opacity-20`}></div>

        {/* Footer bottom */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} CODEDMO. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">
                Hecho con mucho café de Guatemala
              </span>
              
              {/* Botón scroll to top */}
              <button
                onClick={scrollToTop}
                className={`p-2 bg-gradient-to-r ${gradients.primary} text-white rounded-lg hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                aria-label="Volver arriba"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
