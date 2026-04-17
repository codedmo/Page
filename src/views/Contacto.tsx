import Contact from "@/components/contact"
import { Mail, Phone, MapPin, Clock, Github, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { gradients } from '@/config/theme-colors'
import { useSEO, usePageSEO } from "@/hooks/useSEO"
import { useState, useEffect } from 'react'

export default function Contacto() {
  // Estado para controlar las animaciones
  const [isVisible, setIsVisible] = useState(false);

  // Hook para activar animaciones al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // SEO optimizado para la página de contacto
  const contactSEOConfig = usePageSEO('contact')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...contactSEOConfig,
    priority: 'high',
    pageType: 'contact',
    // FAQs comunes para la página de contacto
    faqData: [
      {
        question: "¿Cómo puedo contactar a CODEDMO para mi proyecto?",
        answer: "Puedes contactarnos por correo electrónico a info@codedmo.dev, llamarnos al +502 3792-3612, o usar el formulario de contacto en esta página. Respondemos dentro de 24 horas."
      },
      {
        question: "¿Cuál es el horario de atención al cliente?",
        answer: "Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM (hora de Guatemala). Para emergencias técnicas ofrecemos soporte 24/7."
      },
      {
        question: "¿Ofrecen consultas gratuitas?",
        answer: "Sí, ofrecemos una consulta inicial gratuita para evaluar tu proyecto y brindarte una cotización personalizada sin compromiso."
      },
      {
        question: "¿Atienden proyectos fuera de Guatemala?",
        answer: "Sí, trabajamos con clientes en toda Centroamérica y Estados Unidos. Ofrecemos reuniones virtuales y comunicación constante durante el desarrollo."
      },
      {
        question: "¿Qué información necesitan para hacer una cotización?",
        answer: "Necesitamos conocer el tipo de proyecto, funcionalidades requeridas, plazos deseados y presupuesto estimado. Con esta información podemos hacer una propuesta detallada."
      }
    ],
    // Información de empresa para datos estructurados
    businessInfo: {
      name: 'CODEDMO Solutions',
      phone: '+502-3792-3612',
      address: 'Guatemala, Guatemala',
      openingHours: ['08:00-18:00']
    },
    // Idiomas alternativos para SEO internacional
    alternateLanguages: [
      { lang: 'es', href: 'https://codedmo.dev/contacto' },
      { lang: 'es-GT', href: 'https://codedmo.dev/contacto' }
    ],
    // Robots optimizado para página de contacto
    robots: 'index, follow, max-snippet:-1, max-image-preview:large',
    // Autor y locale específicos
    author: 'CODEDMO Solutions',
    locale: 'es-GT'
  })

  return (
    <>
      {/* Meta tags adicionales específicos para la página de contacto */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Meta tags adicionales para mejor indexación de contacto */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="ICBM" content="14.6349, -90.5069" />
        <meta name="DC.title" content="Contacto - CODEDMO Solutions Guatemala" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="Contacto, consultoría tecnológica, desarrollo de software" />
        <meta name="DC.description" content="Contacta con CODEDMO para tu proyecto de desarrollo de software en Guatemala" />
        <meta name="classification" content="business" />
        <meta name="category" content="Contact" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para contacto */}
        <meta name="contact:phone_number" content="+502-3792-3612" />
        <meta name="contact:email" content="info@codedmo.dev" />
        <meta name="contact:country_name" content="Guatemala" />
        <meta name="contact:region" content="Guatemala" />
        <meta name="business:contact_data:street_address" content="Guatemala" />
        <meta name="business:contact_data:locality" content="Guatemala" />
        <meta name="business:contact_data:country_name" content="Guatemala" />
        <meta name="business:contact_data:phone_number" content="+502-3792-3612" />
        <meta name="business:contact_data:email" content="info@codedmo.dev" />
      </div>

      <section className={`relative py-20 bg-gradient-to-br ${gradients.backgroundMain} overflow-hidden`}>      
      {/* Vintage minimal overlay usando colores del tema (sutileza, sin ruido pesado) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.04)_0%,transparent_20%),radial-gradient(circle_at_90%_90%,rgba(6,182,212,0.03)_0%,transparent_25%)]`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.02),transparent)]"></div>
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),transparent_50%)] opacity-20 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <header className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">Contacto</h1>
            <p className="text-sm text-white/90 max-w-2xl mx-auto">Cuéntanos sobre tu proyecto y te responderemos pronto. Preferimos mensajes claros y precisos.</p>

            {/* Vintage divider */}
            <div className="mt-6 flex items-center justify-center">
              <span className="inline-block w-24 h-px bg-white/20 mr-3"></span>
              <span className="text-xs text-white/60 uppercase tracking-wider">Hablemos</span>
              <span className="inline-block w-24 h-px bg-white/20 ml-3"></span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left column - información de contacto (más pequeña) */}
            <aside className={`md:col-span-1 bg-gradient-to-br from-black/20 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className={`text-lg font-semibold text-white mb-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Información</h2>
              <p className={`text-sm text-white/80 mb-6 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Teléfono, correo y dirección. Horario laboral: Lun - Vie.</p>

              <ul className="space-y-4 text-white/90">
                <li className={`flex items-start space-x-3 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <Mail className="w-5 h-5 text-white/90 mt-1" />
                  <a href="mailto:info@codedmo.dev" className="hover:underline">info@codedmo.dev</a>
                </li>

                <li className={`flex items-start space-x-3 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <Phone className="w-5 h-5 text-white/90 mt-1" />
                  <a href="tel:+50237923612" className="hover:underline">+502 3792-3612</a>
                </li>

                <li className={`flex items-start space-x-3 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <MessageCircle className="w-5 h-5 text-white/90 mt-1" />
                  <a href="https://wa.me/+50237923612" className="hover:underline">WhatsApp</a>
                </li>

                <li className={`flex items-start space-x-3 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <MapPin className="w-5 h-5 text-white/90 mt-1" />
                  <span>Guatemala, Guatemala</span>
                </li>

                <li className={`flex items-start space-x-3 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <Clock className="w-5 h-5 text-white/90 mt-1" />
                  <span>Lun - Vie: 08:00 - 18:00</span>
                </li>
              </ul>

              <div className="mt-6">
                <h3 className={`text-sm font-medium text-white mb-3 transition-all duration-700 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Síguenos</h3>
                <div className="flex items-center space-x-3">
                  <a 
                    href="https://github.com/codedmo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="GitHub - codedmo" 
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  >
                    <Github className="w-5 h-5 text-white/90" />
                  </a>
                  <a 
                    href="https://github.com/codedmo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Facebook - codedmo" 
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  >
                    <Facebook className="w-5 h-5 text-white/90" />
                  </a>
                  <a 
                    href="https://github.com/codedmo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Instagram - codedmo" 
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  >
                    <Instagram className="w-5 h-5 text-white/90" />
                  </a>
                  <a 
                    href="https://github.com/codedmo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="WhatsApp - codedmo" 
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  >
                    <MessageCircle className="w-5 h-5 text-white/90" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a 
                  href="mailto:info@codedmo.dev" 
                  className={`inline-block px-4 py-2 rounded-full text-white bg-gradient-to-r ${gradients.primary} hover:scale-105 transition-all duration-700 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                  Enviar email
                </a>
              </div>

              {/* Pape</svg>r corner accent */}
              <div className="absolute -bottom-6 left-6 w-20 h-12 rotate-[-12deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent)] blur-sm opacity-40 pointer-events-none"></div>
            </aside>

            {/* Right column - formulario (más grande) */}
            <main className={`md:col-span-2 bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="prose prose-invert max-w-none text-white/90">
                <Contact />
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}