// import { Link } from 'react-router-dom';
import { themeColors, gradients, borders } from '../config/theme-colors';
import { Target, Eye, Users, Zap, Shield } from 'lucide-react';
// import { Award, Code, Globe } from 'lucide-react';

export default function About() {

  const sections = {
    mision: {
      title: "Nuestra Misión",
      icon: Target,
      content: "Empoderar a las empresas Guatemaltecas mediante soluciones tecnológicas innovadoras y accesibles. Nos comprometemos a transformar ideas en realidades digitales que impulsen el crecimiento y la competitividad de nuestros clientes en el mercado global.",
      // color: 'from-blue-600 to-cyan-600',
      // highlights: [
      //   "Transformación digital empresarial",
      //   "Soluciones tecnológicas innovadoras",
      //   "Accesibilidad para todas las empresas",
      //   "Competitividad global"
      // ]
    },
    vision: {
      title: "Nuestra Visión",
      icon: Eye,
      content: "Ser empresa líder en desarrollo de software en Guatemala, reconocida por nuestra excelencia técnica, innovación constante y compromiso con el éxito de nuestros clientes. Aspiramos a ser el socio tecnológico de confianza que impulse la transformación digital del país.",
      // color: 'from-purple-600 to-pink-600',
      // highlights: [
      //   "Liderazgo en desarrollo de software",
      //   "Excelencia técnica reconocida",
      //   "Innovación constante",
      //   "Transformación digital nacional"
      // ]
    },
    valores: {
      title: "Nuestros Valores",
      icon: Users,
      content: "Los valores que nos definen y guían cada proyecto que emprendemos. Son la base de nuestra cultura empresarial y la garantía de calidad que ofrecemos a nuestros clientes.",
      // color: 'from-emerald-600 to-teal-600',
      // highlights: [
      //   "Innovación y creatividad",
      //   "Calidad y excelencia",
      //   "Transparencia y honestidad",
      //   "Compromiso con el cliente"
      // ]
    }
  };

  // const companyStats = [
  //   {
  //     icon: Code,
  //     number: "50+",
  //     label: "Proyectos Completados",
  //     color: themeColors.primary[500]
  //   },
  //   {
  //     icon: Users,
  //     number: "30+",
  //     label: "Clientes Satisfechos",
  //     color: themeColors.secondary[500]
  //   },
  //   {
  //     icon: Award,
  //     number: "5+",
  //     label: "Años de Experiencia",
  //     color: themeColors.accent[500]
  //   },
  //   {
  //     icon: Globe,
  //     number: "100%",
  //     label: "Proyectos Entregados",
  //     color: themeColors.emerald[500]
  //   }
  // ];

  const teamValues = [
    {
      icon: Zap,
      title: "Excelencia",
      description: "El desarrollo de software de alta calidad es nuestra prioridad",
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Garantizamos la seguridad y estabilidad de todas nuestras aplicaciones",
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: "Colaboración",
      description: "Trabajamos en estrecha colaboración con nuestros clientes en cada paso del proceso",
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Los resultados medibles y el éxito del cliente son el núcleo de nuestro enfoque",
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className={`relative min-h-screen bg-${themeColors.neutral[900]} overflow-hidden py-20`}>
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 bg-${themeColors.primary[500]}/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-${themeColors.secondary[500]}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 right-1/3 w-64 h-64 bg-${themeColors.accent[500]}/5 rounded-full blur-2xl animate-ping`}></div>
      </div>

      {/* Patrón de grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header principal */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primaryLight}/20 rounded-full border ${borders.primary} backdrop-blur-sm mb-6`}>
            <span className={`text-sm font-medium bg-gradient-to-r ${gradients.primaryToSecondary} bg-clip-text text-transparent`}>
              🏢 Conoce a CODEDMO
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            <span className={`bg-gradient-to-r ${gradients.textSecondary} bg-clip-text text-transparent`}>
              Acerca de
            </span>
            <br />
            <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>
              Nosotros
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos una empresa Guatemalteca especializada en desarrollo de software y soluciones web, 
            comprometida con la innovación y la excelencia tecnológica.
          </p>
          
          <div className={`w-24 h-1 bg-gradient-to-r ${gradients.primary} rounded-full mx-auto mt-6 animate-pulse`}></div>
        </div>

        {/* Estadísticas de la empresa */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {companyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r from-${stat.color} to-${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                  <IconComponent className={`w-8 h-8 text-${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Layout Bento para Misión, Visión y Valores */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 auto-rows-fr">
            
            {/* Misión - Sección grande */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-slate-300" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  {sections.mision.title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-200 leading-relaxed">
                {sections.mision.content}
              </p>
            </div>

            {/* Visión - Sección vertical */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {sections.vision.title}
                </h2>
              </div>
              
              <p className="text-gray-200 leading-relaxed">
                {sections.vision.content}
              </p>
            </div>

            {/* Valores - Sección ancho completo */}
            <div className="lg:col-span-3">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-slate-300" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  {sections.valores.title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-200 leading-relaxed">
                {sections.valores.content}
              </p>
            </div>

          </div>
        </div>

        {/* Valores del equipo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Lo que nos <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>define</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Glow effect más sutil */}
                  <div className="absolute -inset-1 bg-slate-600/20 rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-1000"></div>
                  
                  <div className="relative bg-white/8 backdrop-blur-md rounded-2xl p-6 border border-slate-600/25 text-center h-full hover:bg-white/12 transition-all duration-300">
                    {/* Icono con gradiente sutil */}
                    <div className="w-14 h-14 bg-slate-700/40 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md border border-slate-600/20 group-hover:bg-slate-700/60 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-slate-200 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{value.description}</p>
                    
                    {/* Pequeño acento decorativo */}
                    <div className="w-8 h-0.5 bg-slate-600 mx-auto mt-4 rounded-full group-hover:bg-slate-400 transition-colors duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>trabajar juntos</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a las empresas que han transformado su presencia digital con CodedMo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className={`px-8 py-4 bg-gradient-to-r ${gradients.primary} rounded-lg font-semibold text-white transform hover:scale-105 transition-all duration-300 ${hoverColors.primaryButton} relative overflow-hidden group inline-block text-center`}
            >
              <span className="relative z-10">Iniciar Proyecto</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.primaryButtonHover} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </Link>
            
            <Link 
              to="/portafolio"
              className={`px-8 py-4 border ${borders.primaryStrong} rounded-lg font-semibold text-white ${hoverColors.primary} transition-all duration-300 backdrop-blur-sm inline-block text-center`}
            >
              Ver Portafolio
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
}
