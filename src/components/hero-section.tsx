import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { themeColors, gradients, hoverColors, borders } from '../config/theme-colors';

interface CubeColors {
  [key: string]: number;
}

interface CubePieceProps {
  color: string;
  faceKey: string;
  index: number;
}

const CubePiece = ({ color, faceKey, index }: CubePieceProps) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case '#FFFFFF': return 'cube-piece-white';
      case '#FFF600': return 'cube-piece-yellow';
      case '#18C10B': return 'cube-piece-green';
      case '#1800FF': return 'cube-piece-blue';
      case '#FF8400': return 'cube-piece-orange';
      case '#FF0000': return 'cube-piece-red';
      default: return 'cube-piece-white';
    }
  };

  return (
    <div
      className={`cube-piece ${getColorClass(color)}`}
      data-face={faceKey}
      data-index={index}
    />
  );
};

export default function HeroSection() {
  const [isSolved, setIsSolved] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100); // Se activa después de 100px de scroll
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Colores del cubo de Rubik
  const colors = {
    '#FFFFFF': 9,   // Blanco
    '#FFF600': 9,   // Amarillo
    '#18C10B': 9,   // Verde
    '#1800FF': 9,   // Azul
    '#FF8400': 9,   // Naranja
    '#FF0000': 9    // Rojo
  };

  const faces = ["front", "back", "left", "right", "top", "bottom"];
  const faceColors = {
    front: '#FFFFFF',   // Blanco
    back: '#FFF600',    // Amarillo
    left: '#18C10B',    // Verde
    right: '#1800FF',   // Azul
    top: '#FF8400',     // Naranja
    bottom: '#FF0000'   // Rojo
  };

  // Función para obtener color aleatorio (cubo desarmado)
  const getRandomColor = (availableColors: CubeColors) => {
    const availableKeys = Object.keys(availableColors).filter(color => availableColors[color] > 0);
    if (availableKeys.length === 0) return '#FFFFFF';
    
    const randomColor = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    availableColors[randomColor]--;
    return randomColor;
  };

  // Generar colores para cada cara
  const generateFaceColors = (face: string, solved: boolean) => {
    const cubeColors = [];
    
    if (solved) {
      // Cubo resuelto - todos los cubitos de la misma cara tienen el mismo color
      const color = faceColors[face as keyof typeof faceColors];
      for (let i = 0; i < 9; i++) {
        cubeColors.push(color);
      }
    } else {
      // Cubo desarmado - colores aleatorios
      const tempColors = { ...colors };
      for (let i = 0; i < 9; i++) {
        cubeColors.push(getRandomColor(tempColors));
      }
    }
    
    return cubeColors;
  };

  return (
    <>
      <section className={`relative min-h-screen md:h-screen lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(95vh-4rem)] bg-gradient-to-br ${gradients.backgroundMain} overflow-hidden pt-16`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-${themeColors.secondary[500]}/5 rounded-full blur-2xl animate-ping`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-4 md:py-6 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-10rem)]">
          
          {/* Left Content - Aparece segundo en móviles */}
          <div className="lg:w-1/2 text-white space-y-4 lg:space-y-6 lg:pr-12 order-2 lg:order-1">
            
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primaryLight}/20 rounded-full border ${borders.primary} backdrop-blur-sm`}>
              <span className={`text-sm font-medium bg-gradient-to-r ${gradients.primaryToSecondary} bg-clip-text text-transparent`}>
                🚀 Desarrollo Web Profesional & Innovación
              </span>
            </div>

            {/* Main Heading - Optimizado para SEO */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className={`bg-gradient-to-r ${gradients.textSecondary} bg-clip-text text-transparent animate-pulse`}>
                  Desarrollo Web
                </span>
                <br />
                <span className="text-white">
                  & Software
                </span>
                <br />
                <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>
                  Profesional
                </span>
              </h1>
              
              <div className={`w-24 h-1 bg-gradient-to-r ${gradients.primary} rounded-full animate-pulse`}></div>
            </div>

            {/* Subtitle - Optimizado para palabras clave */}
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
              <span className={`font-semibold ${themeColors.text['emphasis']}`}>Empresa de desarrollo web</span> especializada en 
              <span className={`font-semibold ${themeColors.text['emphasis']}`}> diseño web responsivo</span> y 
              <span className={`font-semibold ${themeColors.text['emphasis']}`}> soluciones de software a medida</span> para empresas.
            </p>

            {/* Features - Optimizadas para SEO */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 bg-${themeColors.success[400]} rounded-full animate-pulse`}></div>
                <span className="text-gray-300 text-sm">Desarrollo Web Personalizado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 bg-${themeColors.primary[400]} rounded-full animate-pulse delay-300`}></div>
                <span className="text-gray-300 text-sm">Apps Móviles & React</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 bg-${themeColors.secondary[400]} rounded-full animate-pulse delay-700`}></div>
                <span className="text-gray-300 text-sm">SEO & Posicionamiento</span>
              </div>
            </div>

            {/* CTA Buttons - Optimizados para SEO */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link 
                to="/cotizacion"
                className={`px-6 py-3 bg-gradient-to-r ${gradients.primary} rounded-lg font-semibold text-white transform hover:scale-105 transition-all duration-300 ${hoverColors.primaryButton} relative overflow-hidden group inline-block text-center`}
              >
                <span className="relative z-10">Solicitar Cotización Web</span>
                <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.primaryButtonHover} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </Link>
              
              <Link 
                to="/servicios"
                className={`px-6 py-3 border ${borders.primaryStrong} rounded-lg font-semibold text-white ${hoverColors.primary} transition-all duration-300 backdrop-blur-sm inline-block text-center`}
              >
                Ver Servicios
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Rubik's Cube - Aparece primero en móviles */}
          <div className={`mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 mb-4 lg:mb-0 transition-opacity duration-700 ${
            isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <div className="relative">
              
              {/* Floating elements around the cube - responsive - Hidden when scrolled */}
              {!isScrolled && (
                <>
                  <div className={`absolute -top-6 -left-6 md:-top-8 md:-left-8 w-3 h-3 md:w-4 md:h-4 bg-${themeColors.primary[500]} rounded-full animate-bounce`}></div>
                  <div className={`absolute -top-3 -right-8 md:-top-4 md:-right-12 w-2 h-2 md:w-3 md:h-3 bg-${themeColors.primary[500]} rounded-full animate-bounce delay-300`}></div>
                  <div className={`absolute -bottom-6 -left-8 md:-bottom-8 md:-left-12 w-3 h-3 md:w-5 md:h-5 bg-${themeColors.secondary[500]} rounded-full animate-bounce delay-700`}></div>
                  <div className={`absolute -bottom-3 -right-6 md:-bottom-4 md:-right-8 w-3 h-3 md:w-4 md:h-4 bg-${themeColors.accent[500]} rounded-full animate-bounce delay-1000`}></div>
                </>
              )}
              
              {/* Code snippets floating - Optimizados para SEO */}
              {!isScrolled && (
                <>
                  <div className={`hidden sm:block absolute -top-16 -right-4 bg-black/30 backdrop-blur-sm border border-${themeColors.success[500]}/30 rounded-lg p-2 animate-float`}>
                    <code className={`text-${themeColors.success[400]} text-xs font-mono`}>{'<WebDesign />'}</code>
                  </div>
                  
                  <div className={`hidden sm:block absolute -bottom-16 -left-8 bg-black/30 backdrop-blur-sm border border-${themeColors.primary[500]}/30 rounded-lg p-2 animate-float delay-500`}>
                    <code className={`text-${themeColors.primary[400]} text-xs font-mono`}>{'SEO.optimize()'}</code>
                  </div>
                </>
              )}

              {/* Status indicator - responsive - Hidden when scrolled */}
              {!isScrolled && (
                <div className="absolute -top-16 sm:-top-20 md:-top-24 left-1/2 transform -translate-x-1/2">
                  <div className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 ${
                    isSolved 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    {isSolved ? '✓ Resuelto' : '⚡ Procesando...'}
                  </div>
                </div>
              )}

              {/* Click me indicator - Hidden when scrolled */}
              {!isScrolled && (
                <div className="absolute -bottom-8 sm:-bottom-12 md:-bottom-24 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 text-xs sm:text-sm text-white font-medium animate-bounce">
                    <span className="mr-1">👆</span> ¡Presióname!
                  </div>
                </div>
              )}

              {/* Main cube container - responsive padding */}
              <div className={`relative transition-all duration-500 ${
                isScrolled 
                  ? 'p-4' 
                  : 'p-12 sm:p-16 md:p-18 lg:p-20 xl:p-24'
              }`}>
                {!isScrolled && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients.backgroundGlow} rounded-full blur-2xl md:blur-3xl animate-pulse`}></div>
                )}

                {/* 3D Rubik's Cube */}
                <div 
                  className={`relative z-10 rubik-cube-container cursor-pointer transition-transform duration-300 touch-manipulation ${
                    isScrolled 
                      ? 'hover:scale-110' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setIsSolved(!isSolved)}
                  title={isSolved ? "Click para desarmar el cubo" : "Click para resolver el cubo"}
                >
                  <div className={`rubik-cube animate-cube-rotate ${isSolved ? 'solved' : 'scrambled'}`}>
                    {faces.map((face) => (
                      <div key={face} className={`face ${face}`}>
                        {generateFaceColors(face, isSolved).map((color, index) => (
                          <CubePiece
                            key={`${face}-${index}`}
                            color={color}
                            faceKey={face}
                            index={index}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rotating border effect - responsive - Hidden when scrolled */}
                {!isScrolled && (
                  <>
                    <div className={`absolute inset-0 rounded-full border border-transparent md:border-2 bg-gradient-to-r ${gradients.border} animate-spin-slow opacity-40 md:opacity-50`}></div>
                    <div className={`absolute inset-4 rounded-full border-2 border-transparent bg-gradient-to-l ${gradients.borderReverse} animate-spin-reverse opacity-30`}></div>
                  </>
                )}
              </div>

              {/* Skill badges around the cube - Optimizadas para SEO */}
              {!isScrolled && (
                <>
                  <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`bg-gradient-to-r ${gradients.primary} text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium animate-float shadow-lg shadow-${themeColors.primary[500]}/25`}>
                      React & Next.js
                    </div>
                  </div>
                  
                  <div className="absolute right-2 sm:right-4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className={`bg-gradient-to-r ${gradients.primaryLight} text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium animate-float delay-300 shadow-lg shadow-${themeColors.primary[500]}/25`}>
                      WordPress & PHP
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className={`bg-gradient-to-r from-${themeColors.secondary[600]} to-${themeColors.accent[600]} text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium animate-float delay-700 shadow-lg shadow-${themeColors.secondary[500]}/25`}>
                      SEO & Analytics
                    </div>
                  </div>
                  
                  <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`bg-gradient-to-r from-${themeColors.accent[600]} to-${themeColors.primary[600]} text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium animate-float delay-1000 shadow-lg shadow-${themeColors.accent[500]}/25`}>
                      E-commerce
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Fixed Cube when scrolled */}
    {isScrolled && (
      <div className="fixed top-25 right-10 z-50 transition-all duration-700 ease-in-out">
        <div className="w-10 h-10 md:w-5 md:h-5 bg-black/20 backdrop-blur-sm rounded-lg border border-blue-500/30 flex items-center justify-center">
          <div 
            className="relative cursor-pointer"
            onClick={() => setIsSolved(!isSolved)}
            title={isSolved ? "Click para desarmar el cubo" : "Click para resolver el cubo"}
          >
            <div className={`rubik-cube animate-cube-rotate ${isSolved ? 'solved' : 'scrambled'} scale-25`}>
              {faces.map((face) => (
                <div key={face} className={`face ${face}`}>
                  {generateFaceColors(face, isSolved).map((color, index) => (
                    <CubePiece
                      key={`${face}-${index}`}
                      color={color}
                      faceKey={face}
                      index={index}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
{/* 
    <section className="min-h-screen bg-slate-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Nuestros Servicios</h2>
          <p className="text-xl text-gray-300 mb-16">
            ¡Haz scroll hacia arriba para ver el cubo moverse a la esquina superior derecha!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Desarrollo Web</h3>
              <p className="text-gray-300">Aplicaciones web modernas y responsivas</p>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Apps Móviles</h3>
              <p className="text-gray-300">Desarrollo nativo y multiplataforma</p>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-teal-400">Consultoría</h3>
              <p className="text-gray-300">Asesoría tecnológica especializada</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="min-h-screen bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-8">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Experiencia Comprobada</h3>
              <p className="text-gray-300 mb-6">
                Más de 5 años desarrollando soluciones tecnológicas innovadoras para empresas de todos los tamaños.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
                  <span>Código limpio y escalable</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded-full mr-3"></div>
                  <span>Tecnologías de vanguardia</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-8">
                <h4 className="text-xl font-semibold mb-4">Tecnologías que Dominamos</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>React.js</div>
                  <div>TypeScript</div>
                  <div>Node.js</div>
                  <div>Python</div>
                  <div>Next.js</div>
                  <div>Tailwind CSS</div>
                  <div>MongoDB</div>
                  <div>PostgreSQL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    </>
  );
}