import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Code, 
  Server, 
  Calculator, 
  Cloud, 
  Smartphone, 
  Globe, 
  Database, 
  ChevronRight, 
  ChevronDown,
  Menu,
  X,
  Zap,
  Monitor
} from 'lucide-react';
import { themeColors, gradients, borders } from '@/config/theme-colors';
import { useSEO, usePageSEO } from '@/hooks/useSEO';

interface ServiceItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  description?: string;
  subItems?: ServiceItem[];
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ServiceItem[];
}

export default function Servicios() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('desarrollo');
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // SEO optimizado para la página de servicios
  const serviciosSEOConfig = usePageSEO('services');
  
  // Aplicar SEO de página completa
  useSEO({
    ...serviciosSEOConfig,
    priority: 'high',
    pageType: 'services',
    faqData: [
      {
        question: "¿Qué servicios de desarrollo de software ofrece CODEDMO?",
        answer: "Ofrecemos desarrollo web con React y Next.js, desarrollo de software a medida, aplicaciones móviles, APIs e integraciones, y desarrollo de e-commerce. Todos nuestros proyectos incluyen diseño responsivo y optimización SEO."
      },
      {
        question: "¿Incluyen servicios de hosting y dominio?",
        answer: "Sí, ofrecemos servicios completos de hosting profesional, registro de dominios, certificados SSL, copias de seguridad automáticas y soporte técnico 24/7."
      },
      {
        question: "¿Realizan integraciones con Google y Microsoft?",
        answer: "Especializamos en integraciones con Google Workspace, Microsoft 365, Google Analytics, Microsoft Azure, y otras herramientas empresariales para optimizar la productividad de tu negocio."
      },
      {
        question: "¿Ofrecen cotizaciones personalizadas?",
        answer: "Sí, todas nuestras cotizaciones son personalizadas según las necesidades específicas de cada proyecto. Ofrecemos consultas gratuitas para evaluar tu proyecto."
      }
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Servicios de Desarrollo de Software - CODEDMO',
      description: 'Servicios completos de desarrollo web, software, hosting e integraciones empresariales en Guatemala',
      provider: {
        '@type': 'Organization',
        name: 'CODEDMO Solutions'
      }
    }
  });

  // Effect para activar animaciones
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Configuración de servicios
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'desarrollo',
      name: 'Desarrollo',
      icon: Code,
      items: [
        {
          id: 'web',
          name: 'Desarrollo Web',
          icon: Globe,
          path: '/servicios/desarrollo/web',
          description: 'Sitios web modernos con React y Next.js'
        },
        {
          id: 'software',
          name: 'Software a Medida',
          icon: Monitor,
          path: '/servicios/desarrollo/software',
          description: 'Aplicaciones empresariales personalizadas'
        },
        {
          id: 'movil',
          name: 'Apps Móviles',
          icon: Smartphone,
          path: '/servicios/desarrollo/movil',
          description: 'Aplicaciones iOS y Android nativas'
        },
        {
          id: 'api',
          name: 'APIs e Integraciones',
          icon: Database,
          path: '/servicios/desarrollo/api',
          description: 'Conectamos sistemas y plataformas'
        }
      ]
    },
    {
      id: 'hosting',
      name: 'Hosting & Cloud',
      icon: Server,
      items: [
        {
          id: 'hosting-web',
          name: 'Hosting Profesional',
          icon: Cloud,
          path: '/servicios/hosting',
          description: 'Hosting seguro y optimizado'
        }
      ]
    },
    {
      id: 'google-microsoft',
      name: 'Google & Microsoft',
      icon: Zap,
      items: [
        {
          id: 'integraciones',
          name: 'Integraciones Empresariales',
          icon: Zap,
          path: '/servicios/google&microsoft',
          description: 'Google Workspace y Microsoft 365'
        }
      ]
    },
    {
      id: 'cotizacion',
      name: 'Cotización',
      icon: Calculator,
      items: [
        {
          id: 'cotizar',
          name: 'Solicitar Cotización',
          icon: Calculator,
          path: '/servicios/cotizacion',
          description: 'Cotización personalizada gratuita'
        }
      ]
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Meta tags adicionales específicos para servicios */}
      <div className="hidden">
        <meta name="DC.title" content="Servicios de Desarrollo de Software - CODEDMO" />
        <meta name="DC.subject" content="desarrollo web, software, hosting, integraciones" />
        <meta name="DC.type" content="Text.Service" />
        <meta name="classification" content="business" />
        <meta name="category" content="Technology Services" />
      </div>

      <div className={`min-h-screen bg-gradient-to-br ${gradients.backgroundMain} pt-16`}>
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-${themeColors.secondary[500]}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
          <div className={`absolute top-3/4 right-1/3 w-64 h-64 bg-${themeColors.accent[500]}/5 rounded-full blur-2xl animate-ping`}></div>
        </div>

        {/* Patrón de grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true"></div>

        <div className="relative z-10 flex min-h-screen">
          {/* Panel lateral izquierdo */}
          <aside className={`
            fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-auto
            w-80 lg:w-80 xl:w-96 bg-black/20 backdrop-blur-xl 
            border-r ${borders.primary} transform lg:transform-none
            transition-transform duration-300 ease-in-out z-40
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto scrollbar-thin scrollbar-thumb-${themeColors.primary[500]}/30
          `}>
            <div className="p-6">
              {/* Header del panel */}
              <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Nuestros <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Servicios</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Soluciones tecnológicas completas para tu empresa
                </p>
                <div className={`h-1 w-16 bg-gradient-to-r ${gradients.primary} rounded-full mt-3`}></div>
              </div>

              {/* Navegación de servicios */}
              <nav className="space-y-2">
                {serviceCategories.map((category, categoryIndex) => {
                  const CategoryIcon = category.icon;
                  const isExpanded = expandedCategory === category.id;
                  const hasSubItems = category.items.length > 1;

                  return (
                    <div 
                      key={category.id}
                      className={`transition-all duration-1000 delay-${(categoryIndex + 1) * 100} ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    >
                      {/* Categoría principal */}
                      <div
                        className={`
                          flex items-center justify-between p-3 rounded-xl cursor-pointer
                          transition-all duration-300 group relative overflow-hidden
                          ${isExpanded 
                            ? `bg-gradient-to-r ${gradients.primary} text-white shadow-lg shadow-${themeColors.primary[500]}/25` 
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                          }
                        `}
                        onClick={() => hasSubItems ? handleCategoryToggle(category.id) : null}
                      >
                        {/* Efecto de brillo */}
                        {isExpanded && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} rounded-xl blur opacity-50 -z-10`}></div>
                        )}
                        
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className={`
                            p-2 rounded-lg transition-all duration-300
                            ${isExpanded 
                              ? 'bg-white/20' 
                              : `bg-${themeColors.primary[500]}/20 group-hover:bg-${themeColors.primary[500]}/30`
                            }
                          `}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        
                        {hasSubItems && (
                          <div className="relative z-10">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                            ) : (
                              <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Subelementos */}
                      {hasSubItems && (
                        <div className={`
                          mt-2 ml-4 space-y-1 overflow-hidden transition-all duration-500
                          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                          {category.items.map((item) => {
                            const ItemIcon = item.icon;
                            const isActive = isActiveRoute(item.path);
                            
                            return (
                              <Link
                                key={item.id}
                                to={item.path}
                                className={`
                                  block p-3 rounded-lg transition-all duration-300
                                  border border-transparent hover:border-${themeColors.primary[500]}/30
                                  ${isActive 
                                    ? `bg-${themeColors.primary[500]}/20 border-${themeColors.primary[500]}/50 text-white` 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                  }
                                `}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="flex items-center space-x-3">
                                  <ItemIcon className={`w-4 h-4 ${isActive ? `text-${themeColors.primary[400]}` : ''}`} />
                                  <div>
                                    <div className="font-medium text-sm">{item.name}</div>
                                    {item.description && (
                                      <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}

                      {/* Elemento único (sin subelementos) */}
                      {!hasSubItems && category.items.length === 1 && (
                        <Link
                          to={category.items[0].path}
                          className={`
                            block p-3 rounded-lg transition-all duration-300 mt-2
                            border border-transparent hover:border-${themeColors.primary[500]}/30
                            ${isActiveRoute(category.items[0].path)
                              ? `bg-${themeColors.primary[500]}/20 border-${themeColors.primary[500]}/50 text-white` 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
                          `}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="text-sm">{category.items[0].description}</div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Overlay para móviles */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Contenido principal */}
          <main className="flex-1 lg:ml-0">
            {/* Botón toggle para móviles */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                fixed top-20 left-4 z-50 lg:hidden
                p-3 bg-black/20 backdrop-blur-sm rounded-xl
                border ${borders.primary} text-white
                hover:bg-black/30 transition-all duration-300
              `}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Contenido dinámico */}
            <div className="p-6 lg:p-8">
              {location.pathname === '/servicios' ? (
                // Página de inicio de servicios
                <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      Soluciones <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Tecnológicas</span> Completas
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      Desde desarrollo web y software hasta hosting e integraciones empresariales. 
                      Todo lo que necesitas para digitalizar y hacer crecer tu negocio.
                    </p>
                    <div className={`h-1 w-24 bg-gradient-to-r ${gradients.primary} rounded-full mx-auto mt-6`}></div>
                  </div>

                  {/* Grid de servicios destacados */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {serviceCategories.map((category, index) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className={`
                            relative group cursor-pointer transition-all duration-500 delay-${index * 100}
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                          `}
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          {/* Efecto glow */}
                          <div className={`absolute -inset-1 bg-gradient-to-r ${gradients.primary} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}></div>
                          
                          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                            <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-xl flex items-center justify-center mb-4`}>
                              <CategoryIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">
                              {category.items.length} servicio{category.items.length > 1 ? 's' : ''} disponible{category.items.length > 1 ? 's' : ''}
                            </p>
                            <div className="text-gray-300 text-sm">
                              {category.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex items-center space-x-2 mb-1">
                                  <div className={`w-1 h-1 bg-${themeColors.primary[400]} rounded-full`}></div>
                                  <span>{item.name}</span>
                                </div>
                              ))}
                              {category.items.length > 2 && (
                                <div className="text-gray-500 text-xs mt-2">
                                  +{category.items.length - 2} más...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Section */}
                  <div className={`text-center transition-all duration-1000 delay-600 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}>
                    <div className={`max-w-2xl mx-auto bg-gradient-to-r from-${themeColors.primary[500]}/10 to-${themeColors.secondary[500]}/10 rounded-3xl p-8 border border-${themeColors.primary[500]}/30 backdrop-blur-sm`}>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        ¿No estás seguro qué servicio necesitas?
                      </h3>
                      <p className="text-gray-300 mb-6">
                        Solicita una <strong>consulta gratuita</strong> y te ayudaremos a encontrar 
                        la solución perfecta para tu proyecto.
                      </p>
                      <Link 
                        to="/servicios/cotizacion" 
                        className={`
                          inline-flex items-center px-8 py-3 bg-gradient-to-r ${gradients.primary} 
                          text-white font-semibold rounded-lg transition-all duration-300
                          hover:shadow-lg hover:shadow-${themeColors.primary[500]}/25 hover:scale-105
                        `}
                      >
                        <Calculator className="w-5 h-5 mr-2" />
                        Solicitar Cotización Gratuita
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // Contenido de rutas anidadas
                <Outlet />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
