import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Code, Layers, ArrowUp, Eye, Star } from 'lucide-react';
import { themeColors, gradients } from '@/config/theme-colors';
import { useSEO, usePageSEO } from "@/hooks/useSEO";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  link: string;
  status?: string;
  featured?: boolean;
  demo?: boolean;
}

export default function Portafolio() {
  // SEO optimizado para la página de portafolio
  const portafolioSEOConfig = usePageSEO('portfolio')
  
  // Aplicar SEO de página completa con prioridad alta
  useSEO({
    ...portafolioSEOConfig,
    priority: 'high',
    pageType: 'portfolio',
    // FAQs específicas para la página de portafolio
    faqData: [
      {
        question: "¿Qué tipo de proyectos muestra el portafolio de CODEDMO?",
        answer: "Nuestro portafolio incluye proyectos de e-commerce, portales de negocios, portfolios personales y tiendas online. Cada proyecto está desarrollado con tecnologías modernas como React, Next.js y Tailwind CSS."
      },
      {
        question: "¿Los proyectos del portafolio son demos o proyectos reales?",
        answer: "Mostramos una combinación de proyectos reales para clientes y demos de plantillas personalizables. Los demos están marcados claramente y pueden adaptarse a cualquier modelo de negocio."
      },
      {
        question: "¿Puedo ver el código de los proyectos mostrados?",
        answer: "Los proyectos de clientes mantienen confidencialidad del código fuente. Para demos públicos, algunos repositorios están disponibles en GitHub. Contáctanos para más información sobre implementaciones específicas."
      },
      {
        question: "¿Pueden crear un proyecto similar a los del portafolio?",
        answer: "Absolutamente. Cualquier proyecto de nuestro portafolio puede servir como referencia para desarrollos personalizados. Ofrecemos consultas gratuitas para adaptar diseños a tus necesidades específicas."
      },
      {
        question: "¿Qué tecnologías utilizan en sus proyectos?",
        answer: "Principalmente usamos React, Next.js, TypeScript, Tailwind CSS, Node.js, y bases de datos modernas. Todas nuestras soluciones son responsivas, optimizadas para SEO y seguimos las mejores prácticas de desarrollo."
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
      { lang: 'es', href: 'https://codedmo.dev/portafolio' },
      { lang: 'es-GT', href: 'https://codedmo.dev/portafolio' }
    ],
    // Datos estructurados específicos para portafolio
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Portafolio de Proyectos - CODEDMO',
      description: 'Explora nuestro portafolio de proyectos web, e-commerce y aplicaciones desarrolladas con tecnologías modernas.',
      mainEntity: {
        '@type': 'ItemList',
        name: 'Proyectos de Desarrollo Web',
        description: 'Colección de proyectos destacados de desarrollo web y aplicaciones',
        numberOfItems: 4,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'WebSite',
              name: 'Tienda de Ropa Online',
              description: 'E-commerce moderno para tienda de ropa',
              url: 'https://ropa.codedmo.dev',
              category: 'E-commerce'
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'WebSite',
              name: 'Portal de Negocios',
              description: 'Portal promocional para negocios',
              url: 'https://negocio.codedmo.dev',
              category: 'Business'
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'WebSite',
              name: 'Bento Portfolio',
              description: 'Portafolio personal con diseño bento',
              url: 'https://bento.codedmo.dev',
              category: 'Portfolio'
            }
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'WebSite',
              name: 'Zapatos Online',
              description: 'Tienda online especializada en calzado',
              url: 'https://zapatos.codedmo.dev',
              category: 'E-commerce'
            }
          }
        ]
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://codedmo.dev'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Portafolio',
            item: 'https://codedmo.dev/portafolio'
          }
        ]
      }
    }
  })

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects: Project[] = [
    {
      title: "Tienda de Ropa Online | E-commerce React",
      description: "E-commerce moderno desarrollado con React y Next.js para tienda de ropa. Incluye catálogo de productos, carrito de compras, sistema de pagos y diseño responsivo optimizado para conversiones.",
      image: "/images/previews/ropa-preview.jpg",
      tags: ["React", "Next.js", "Tailwind CSS", "E-commerce", "Fashion"],
      type: "E-commerce",
      link: "https://ropa.codedmo.dev",
      featured: true,
      demo: false
    },
    {
      title: "Portal de Negocios | Marketing Digital",
      description: "Portal empresarial profesional diseñado para maximizar conversiones y generar leads. Desarrollado con Next.js, optimizado para SEO y diseñado con enfoque en marketing digital y captación de clientes.",
      image: "/images/previews/negocio-preview.jpg",
      tags: ["Next.js", "Business", "Services", "SEO"],
      type: "Business",
      link: "https://negocio.codedmo.dev",
      featured: true,
      demo: true
    },
    {
      title: "Bento Portfolio | Diseño Minimalista",
      description: "Portafolio personal con diseño tipo bento grid moderno y minimalista. Totalmente responsive, desarrollado con React y optimizado para mostrar proyectos de forma elegante y profesional.",
      image: "/images/previews/bento-preview.jpg",
      tags: ["React", "Portfolio", "Bento", "Design"],
      type: "Portfolio",
      link: "https://bento.codedmo.dev",
      demo: true
    },
    {
      title: "Zapatos Online | Tienda Digital",
      description: "Tienda online especializada en calzado con experiencia de usuario optimizada. Incluye filtros avanzados, comparador de productos, wishlist y checkout simplificado para mejorar las ventas online.",
      image: "/images/previews/zapatos-preview.jpg",
      tags: ["React", "E-commerce", "Shoes", "Fashion"],
      type: "E-commerce",
      link: "https://zapatos.codedmo.dev",
      demo: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los Proyectos', icon: Layers },
    { id: 'E-commerce', name: 'Tiendas Online', icon: Globe },
    { id: 'Business', name: 'Portales Empresariales', icon: Code },
    { id: 'Portfolio', name: 'Portafolios Web', icon: Eye }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === selectedFilter);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Meta tags adicionales específicos para la página de portafolio */}
      <div className="hidden">
        {/* Preconnect a dominios externos para mejorar performance */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Meta tags adicionales para mejor indexación del portafolio */}
        <meta name="geo.region" content="GT" />
        <meta name="geo.placename" content="Guatemala" />
        <meta name="DC.title" content="Portafolio de Proyectos Web - CODEDMO Guatemala" />
        <meta name="DC.creator" content="CODEDMO Solutions" />
        <meta name="DC.subject" content="portafolio web, proyectos desarrollo, e-commerce, portfolio diseño" />
        <meta name="DC.description" content="Explora nuestro portafolio de proyectos web y aplicaciones desarrolladas con React, Next.js y tecnologías modernas" />
        <meta name="classification" content="portfolio" />
        <meta name="category" content="Web Development Portfolio" />
        <meta name="coverage" content="Guatemala" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Meta tags específicos para portafolio */}
        <meta name="portfolio.type" content="web development" />
        <meta name="portfolio.technologies" content="React, Next.js, TypeScript, Tailwind CSS" />
        <meta name="portfolio.categories" content="E-commerce, Business, Portfolio, Web Apps" />
        <meta name="portfolio.company" content="CODEDMO Solutions" />
        <meta name="portfolio.location" content="Guatemala" />
        <meta name="work.examples" content="e-commerce, business portals, personal portfolios, online stores" />
        <meta name="development.frameworks" content="React, Next.js, Node.js" />
        <meta name="design.approach" content="responsive, modern, SEO-optimized" />
      </div>

      <section className={`relative min-h-screen bg-${themeColors.neutral[900]} overflow-hidden py-20`}>
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-${themeColors.secondary[500]}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-3/4 right-1/3 w-64 h-64 bg-${themeColors.accent[500]}/5 rounded-full blur-2xl animate-ping`}></div>
      </div>

      {/* Patrón de grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:30px_30px]" aria-hidden="true"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header principal */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primaryLight}/20 rounded-full border border-${themeColors.primary[500]}/30 backdrop-blur-sm mb-6`}>
            <Code className={`w-4 h-4 text-${themeColors.primary[400]} mr-2`} />
            <span className={`${themeColors.text['secondary']} text-sm font-medium`}>Desarrollo Web Guatemala | Proyectos React & Next.js</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Portafolio de{" "}
            <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>
              Desarrollo Web
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Explora nuestros <strong>proyectos de desarrollo web en Guatemala</strong> con <strong>React, Next.js y TypeScript</strong>. 
            Desde <em>e-commerce responsivos</em> hasta <em>portales empresariales modernos</em>, cada proyecto refleja nuestra expertise en tecnologías de vanguardia.
          </p>

          {/* Anuncio destacado mejorado */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className={`relative bg-gradient-to-r from-${themeColors.primary[500]}/10 to-${themeColors.secondary[500]}/10 border border-${themeColors.primary[500]}/30 rounded-2xl p-6 backdrop-blur-sm`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              <div className="relative flex items-center justify-center mb-3">
                {/* <span className="text-3xl mr-3 animate-bounce">�</span> */}
                <h3 className="text-lg font-bold text-white">
                  plantillas y diseños 100% responsivas
                </h3>
              </div>
              <p className="text-gray-300">
                <span className={`font-semibold text-${themeColors.secondary[400]}`}>
                  Creamos el mejor diseño para tu negocio.
                </span>{" "}
                Escoge la que más te guste o solicita un diseño completamente personalizado.
              </p>
            </div>
          </div>

          <div className={`w-24 h-1 bg-gradient-to-r ${gradients.primary} rounded-full mx-auto animate-pulse`}></div>
        </div>

        {/* Filtros */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedFilter === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`
                  relative group px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${gradients.primary} text-white shadow-lg shadow-${themeColors.primary[500]}/25` 
                    : `bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10`
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </div>
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} rounded-xl blur opacity-50 -z-10`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700 delay-${index * 100}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className={`
                relative overflow-hidden group cursor-pointer
                bg-white/5 backdrop-blur-sm border border-white/10
                hover:border-${themeColors.primary[500]}/50 transition-all duration-500
                hover:shadow-2xl hover:shadow-${themeColors.primary[500]}/10
                ${project.featured ? 'ring-2 ring-' + themeColors.secondary[500] + '/30' : ''}
                flex flex-col h-full
              `}>
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`flex items-center px-3 py-1 bg-gradient-to-r ${gradients.primary} rounded-full text-white text-xs font-medium`}>
                      <Star className="w-3 h-3 mr-1" />
                      Destacado
                    </div>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <div 
                    className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    {/* Imagen del proyecto o placeholder */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Si la imagen no carga, mostrar placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                      onLoad={(e) => {
                        // Si la imagen carga correctamente, ocultar placeholder
                        const target = e.target as HTMLImageElement;
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'none';
                        }
                      }}
                    />
                    
                    {/* Placeholder (se muestra solo si la imagen falla) */}
                    <div className="absolute inset-0 flex items-center justify-center text-center" style={{ display: 'none' }}>
                      <div>
                        <Globe className={`w-16 h-16 text-${themeColors.primary[400]} mx-auto mb-2 opacity-50`} />
                        <p className="text-gray-400 text-sm">Vista previa del proyecto</p>
                      </div>
                    </div>
                    
                    {/* Overlay con efecto hover */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-${themeColors.primary[900]}/80 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex items-center justify-center
                    `}>
                      <ExternalLink className="w-8 h-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>

                  {project.type && (
                    <div className="absolute top-4 right-4">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium 
                        bg-${themeColors.neutral[900]}/90 text-white 
                        backdrop-blur-md border border-white/20
                        shadow-lg
                      `}>
                        {project.type}
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-${themeColors.primary[300]} transition-colors duration-300`}>
                    {project.title}
                    {project.demo && (
                      <span className="text-xs font-normal text-gray-400 ml-2">(Demo)</span>
                    )}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`
                          px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300
                          bg-${themeColors.primary[500]}/15 text-white 
                          border border-${themeColors.primary[500]}/30
                          hover:bg-${themeColors.primary[500]}/25 hover:border-${themeColors.primary[500]}/50
                          shadow-sm
                        `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button
                      size="sm"
                      className={`
                        w-full bg-gradient-to-r ${gradients.primary} 
                        hover:shadow-lg hover:shadow-${themeColors.primary[500]}/25
                        hover:scale-105 transition-all duration-300
                        text-white font-medium
                      `}
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Proyecto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`max-w-3xl mx-auto bg-gradient-to-r from-${themeColors.primary[500]}/10 to-${themeColors.secondary[500]}/10 rounded-3xl p-8 border border-${themeColors.primary[500]}/30 backdrop-blur-sm`}>
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Necesitas Desarrollo Web Profesional en Guatemala?
            </h3>
            <p className="text-gray-300 mb-6">
              <strong>Solicita tu cotización gratuita</strong> para tu proyecto de <em>desarrollo web, e-commerce o aplicación empresarial</em>. 
              Especialistas en <strong>React, Next.js y diseño responsivo</strong> con más de 50 proyectos exitosos en Guatemala.
            </p>
            <Button 
              size="lg"
              className={`
                bg-gradient-to-r ${gradients.primary} 
                hover:shadow-lg hover:shadow-${themeColors.primary[500]}/25
                hover:scale-105 transition-all duration-300
                text-white font-medium px-8 py-3
              `}
              onClick={() => window.location.href = '/contacto'}
            >
              Solicitar Cotización Gratuita
            </Button>
          </div>
        </div>

        {/* Botón scroll to top */}
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 p-3 
            bg-gradient-to-r ${gradients.primary} 
            text-white rounded-full shadow-lg 
            hover:shadow-xl hover:scale-110 
            transition-all duration-300
            opacity-80 hover:opacity-100
            z-50
          `}
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </section>
    </>
  );
}
