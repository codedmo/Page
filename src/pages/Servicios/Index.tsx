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
  Monitor,
  Clock
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
  const [isAtTop, setIsAtTop] = useState(true);
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

  // Effect para controlar el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Effect para detectar si estamos en el top de la página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop < 100); // Consideramos "top" si estamos a menos de 100px
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar posición inicial

    return () => window.removeEventListener('scroll', handleScroll);
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
          path: '/servicios/hosting&cloud/hosting',
          description: 'Hosting seguro, rápido y confiable con SSL'
        },
        {
          id: 'hosting-cloud',
          name: 'Servicios Cloud',
          icon: Server,
          path: '/servicios/hosting&cloud/cloud',
          description: 'Infraestructura escalable en la nube'
        },
        {
          id: 'hosting-dominio',
          name: 'Registro de Dominios',
          icon: Globe,
          path: '/servicios/hosting&cloud/dominios',
          description: 'Registro y gestión de dominios web'
        }
      ]
    },
    {
      id: 'google-microsoft',
      name: 'Google & Microsoft',
      icon: Zap,
      items: [
        {
          id: 'google-workspace',
          name: 'Google Workspace',
          icon: Zap,
          path: '/servicios/google&microsoft/workspace',
          description: 'Gmail, Drive, Meet y herramientas colaborativas'
        },
        {
          id: 'microsoft-365',
          name: 'Microsoft 365',
          icon: Monitor,
          path: '/servicios/google&microsoft/microsoft365',
          description: 'Office, Teams y productividad empresarial'
        },
        {
          id: 'integraciones',
          name: 'Integraciones Personalizadas',
          icon: Database,
          path: '/servicios/google&microsoft',
          description: 'Conecta tus sistemas con Google y Microsoft'
        }
      ]
    },
    {
      id: 'cotizacion',
      name: 'Cotización',
      icon: Calculator,
      items: [
        {
          id: 'cotizar-proyecto',
          name: 'Cotización de Proyecto',
          icon: Calculator,
          path: '/servicios/cotizacion',
          description: 'Cotización detallada y personalizada gratuita'
        },
        {
          id: 'consulta-gratis',
          name: 'Consulta Gratuita',
          icon: Zap,
          path: '/servicios/cotizacion/consulta',
          description: 'Asesoría técnica sin costo ni compromiso'
        },
        {
          id: 'estimacion-rapida',
          name: 'Estimación Rápida',
          icon: Clock,
          path: '/servicios/cotizacion/estimacion',
          description: 'Estimación inmediata en línea'
        }
      ]
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleMenuToggle = () => {
    // Solo permitir abrir el menú si estamos cerca del top de la página
    if (!isMenuOpen && !isAtTop) {
      // Opcional: scroll automático al top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // O simplemente no abrir el menú
      return;
    }
    setIsMenuOpen(!isMenuOpen);
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
          <div className={`absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-${themeColors.secondary[500]}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
          <div className={`absolute top-3/4 right-1/3 w-48 h-48 md:w-64 md:h-64 bg-${themeColors.accent[500]}/5 rounded-full blur-2xl animate-ping`}></div>
        </div>

        {/* Patrón de grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" aria-hidden="true"></div>

        <div className="relative z-10 flex min-h-full lg:h-full">
          {/* Panel lateral izquierdo */}
          <aside className={`
            fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-full
            w-72 sm:w-80 lg:w-72 xl:w-80 2xl:w-96 
            bg-black/85 backdrop-blur-2xl backdrop-saturate-150
            border-r ${borders.primary} transform lg:transform-none
            transition-transform duration-300 ease-in-out 
            z-[99999] lg:z-10
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            shadow-2xl shadow-black/60
          `}
          style={{
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
          }}>
            <div className="p-4 sm:p-6">
              {/* Header del panel */}
              <div className={`mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Nuestros <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Servicios</span>
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Soluciones tecnológicas completas para tu empresa
                </p>
                <div className={`h-1 w-12 sm:w-16 bg-gradient-to-r ${gradients.primary} rounded-full mt-3`}></div>
              </div>

              {/* Navegación de servicios */}
              <nav className="space-y-2">
                {serviceCategories.map((category, categoryIndex) => {
                  const CategoryIcon = category.icon;
                  const isExpanded = expandedCategory === category.id;

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
                          flex items-center justify-between p-2 sm:p-3 rounded-xl cursor-pointer
                          transition-all duration-300 group relative overflow-hidden
                          ${isExpanded 
                            ? `bg-gradient-to-r ${gradients.primary} text-white shadow-lg shadow-${themeColors.primary[500]}/25` 
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                          }
                        `}
                        onClick={() => handleCategoryToggle(category.id)}
                      >
                        {/* Efecto de brillo */}
                        {isExpanded && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} rounded-xl blur opacity-50 -z-10`}></div>
                        )}
                        
                        <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                          <div className={`
                            p-1.5 sm:p-2 rounded-lg transition-all duration-300
                            ${isExpanded 
                              ? 'bg-white/20' 
                              : `bg-${themeColors.primary[500]}/20 group-hover:bg-${themeColors.primary[500]}/30`
                            }
                          `}>
                            <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="font-medium text-sm sm:text-base">{category.name}</span>
                        </div>
                        
                        <div className="relative z-10">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                          )}
                        </div>
                      </div>

                      {/* Subelementos */}
                      <div className={`
                        mt-2 ml-2 sm:ml-4 space-y-1 overflow-hidden transition-all duration-500
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
                                block p-2 sm:p-3 rounded-lg transition-all duration-300
                                border border-transparent hover:border-${themeColors.primary[500]}/30
                                ${isActive 
                                  ? `bg-${themeColors.primary[500]}/20 border-${themeColors.primary[500]}/50 text-white` 
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
                              `}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <ItemIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${isActive ? `text-${themeColors.primary[400]}` : ''}`} />
                                <div>
                                  <div className="font-medium text-xs sm:text-sm">{item.name}</div>
                                  {item.description && (
                                    <div className="text-xs text-gray-500 mt-1 hidden sm:block">{item.description}</div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Overlay para móviles con blur completo de fondo */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 z-[99998] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{
                backdropFilter: 'blur(8px) saturate(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(120%)',
                background: 'rgba(0, 0, 0, 0.7)'
              }}
            />
          )}

          {/* Contenido principal */}
          <main className="flex-1 lg:ml-0 min-w-0 relative z-0">
            {/* Botón toggle para móviles */}
            <button
              onClick={handleMenuToggle}
              className={`
                fixed top-20 left-4 z-[100000] lg:hidden
                p-2 sm:p-3 rounded-xl
                border-2 ${borders.primary} text-white
                transition-all duration-300
                shadow-2xl
                ${isAtTop 
                  ? 'bg-gray-900 hover:bg-black border-purple-500' 
                  : 'bg-red-700 hover:bg-red-800 border-red-400'
                }
              `}
              aria-label="Toggle menu"
              title={!isAtTop ? 'Desplázate al inicio para abrir el menú' : 'Toggle menu'}
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : (
                <>
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  {!isAtTop && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </button>

            {/* Contenido dinámico */}
            <div className="p-4 sm:p-6 lg:p-8">
              {location.pathname === '/servicios' ? (
                // Página de inicio de servicios
                <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                      Soluciones <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>Tecnológicas</span> Completas
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                      Desde desarrollo web y software hasta hosting e integraciones empresariales. 
                      Todo lo que necesitas para digitalizar y hacer crecer tu negocio.
                    </p>
                    <div className={`h-1 w-16 sm:w-24 bg-gradient-to-r ${gradients.primary} rounded-full mx-auto mt-4 sm:mt-6`}></div>
                  </div>

                  {/* Grid de servicios destacados */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {serviceCategories.map((category, index) => {
                      const CategoryIcon = category.icon;
                      // Determinar la URL principal de cada categoría
                      const getCategoryMainUrl = (categoryId: string) => {
                        switch (categoryId) {
                          case 'desarrollo':
                            return '/servicios/desarrollo';
                          case 'hosting':
                            return '/servicios/hosting&cloud';
                          case 'google-microsoft':
                            return '/servicios/google&microsoft';
                          case 'cotizacion':
                            return '/servicios/cotizacion';
                          default:
                            return '/servicios';
                        }
                      };

                      return (
                        <Link
                          key={category.id}
                          to={getCategoryMainUrl(category.id)}
                          className={`
                            relative group cursor-pointer transition-all duration-500 delay-${index * 100}
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            block
                          `}
                        >
                          {/* Efecto glow */}
                          <div className={`absolute -inset-1 bg-gradient-to-r ${gradients.primary} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}></div>
                          
                          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${gradients.primary} rounded-xl flex items-center justify-center mb-3 sm:mb-4`}>
                              <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{category.name}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                              {category.items.length} servicio{category.items.length > 1 ? 's' : ''} disponible{category.items.length > 1 ? 's' : ''}
                            </p>
                            <div className="text-gray-300 text-xs sm:text-sm">
                              {category.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex items-center space-x-2 mb-1">
                                  <div className={`w-1 h-1 bg-${themeColors.primary[400]} rounded-full`}></div>
                                  <span className="truncate">{item.name}</span>
                                </div>
                              ))}
                              {category.items.length > 2 && (
                                <div className="text-gray-500 text-xs mt-2">
                                  +{category.items.length - 2} más...
                                </div>
                              )}
                            </div>
                            
                            {/* Indicador de navegación */}
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                              <span className="text-xs text-gray-400">Ver todos los servicios</span>
                              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                        </Link>
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
