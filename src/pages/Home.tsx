import { useSEO, usePageSEO } from "@/hooks/useSEO"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/ServicesSection"
import About from "@/components/About"
import Contact from "@/components/contact"

export default function Home() {
  // SEO optimizado para la página completa HOME
  const homeSEOConfig = usePageSEO('home')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...homeSEOConfig,
    priority: 'high',
    pageType: 'home',
    // FAQs comunes para la página de inicio
    faqData: [
      {
        question: "¿Qué servicios de desarrollo ofrece CODEDMO?",
        answer: "Ofrecemos desarrollo web con React y Next.js, aplicaciones móviles para iOS y Android, software empresarial a medida, integraciones API y servicios de hosting profesional."
      },
      {
        question: "¿Cuánto tiempo toma desarrollar una aplicación web?",
        answer: "El tiempo varía según la complejidad del proyecto. Una web básica puede tomar 2-4 semanas, mientras que aplicaciones complejas pueden requerir 2-6 meses. Ofrecemos una consulta gratuita para evaluar tu proyecto."
      },
      {
        question: "¿Ofrecen soporte técnico después del desarrollo?",
        answer: "Sí, ofrecemos soporte técnico 24/7, mantenimiento, actualizaciones y hosting para todos nuestros proyectos. Nuestro compromiso es a largo plazo."
      },
      {
        question: "¿Trabajan con empresas en Guatemala?",
        answer: "Sí, somos una empresa guatemalteca que trabaja principalmente con empresas locales, aunque también atendemos clientes internacionales. Entendemos las necesidades del mercado guatemalteco."
      }
    ],
    // Información de empresa para datos estructurados
    businessInfo: {
      name: 'CODEDMO Solutions',
      phone: '+502-3792-3612',
      address: 'Guatemala, Guatemala',
      openingHours: ['07:00-20:00']
    },
    // Idiomas alternativos para SEO internacional
    alternateLanguages: [
      { lang: 'es', href: 'https://codedmo.dev' },
      { lang: 'es-GT', href: 'https://codedmo.dev' }
    ]
  })

  return (
    <>
      {/* Meta tags adicionales específicos para la página de inicio */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="ICBM" content="14.6349, -90.5069" />
        <meta name="DC.title" content="CODEDMO - Desarrollo de Software Guatemala" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="Desarrollo de software, aplicaciones web, desarrollo móvil" />
        <meta name="DC.description" content="Empresa guatemalteca especializada en desarrollo de software profesional" />
        <meta name="classification" content="business" />
        <meta name="category" content="Technology" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </div>

      <HeroSection />
      <ServicesSection />
      <About />

      {/* Sección de Contacto con fondo */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-ping"></div>
        </div>

        {/* Patrón de grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative z-10">
          <Contact />
        </div>
      </section>
    </>
  );
}
