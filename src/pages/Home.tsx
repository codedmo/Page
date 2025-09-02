import { useSEO, usePageSEO } from "@/hooks/useSEO"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/ServicesSection"
// import Quotation from "@/components/quotation"

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
        
        {/* Preload de imagen hero crítica */}
        <link 
          rel="preload" 
          href="/images/Hero.png" 
          as="image" 
          type="image/png"
        />
        
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
      {/* <div className="flex p-5 gap-3">
        <IronStone />
        <Quotation />
      </div> */}
    </>
  );
}
