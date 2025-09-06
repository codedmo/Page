import { Outlet, useLocation, Link } from 'react-router-dom';
import { Calculator, MessageCircle, Clock, CheckCircle, Zap, Phone } from 'lucide-react';
import { gradients, borders } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Cotizacion() {
  const location = useLocation();

  // SEO para Cotización
  useSEO({
    title: 'Cotización de Proyectos - Presupuesto Gratuito | CODEDMO',
    description: 'Solicita una cotización gratuita para tu proyecto tecnológico. Presupuestos detallados y consulta técnica sin costo ni compromiso.',
    keywords: ['cotización gratuita', 'presupuesto desarrollo', 'consulta técnica', 'estimación proyecto', 'precio desarrollo web'],
    canonical: '/servicios/cotizacion'
  });

  const services = [
    {
      icon: Calculator,
      title: 'Cotización Detallada',
      description: 'Análisis completo y presupuesto personalizado',
      path: '/servicios/cotizacion',
      features: ['Análisis detallado', 'Presupuesto personalizado', 'Cronograma del proyecto', 'Sin costo ni compromiso'],
      isMain: true
    },
    {
      icon: MessageCircle,
      title: 'Consulta Gratuita',
      description: 'Asesoría técnica sin costo ni compromiso',
      path: '/servicios/cotizacion/consulta',
      features: ['Videollamada 30 min', 'Asesoría técnica', 'Recomendaciones', 'Plan de acción']
    },
    {
      icon: Clock,
      title: 'Estimación Rápida',
      description: 'Estimación inmediata en línea',
      path: '/servicios/cotizacion/estimacion',
      features: ['Calculadora online', 'Resultado inmediato', 'Estimación aproximada', 'Sin registro requerido']
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Totalmente Gratuito',
      description: 'Sin costo oculto ni compromisos'
    },
    {
      icon: Zap,
      title: 'Respuesta Rápida',
      description: 'Cotización en menos de 24 horas'
    },
    {
      icon: Phone,
      title: 'Asesoría Personalizada',
      description: 'Consulta directa con nuestros expertos'
    }
  ];

  // Si estamos en una subruta específica, mostrar el outlet
  if (location.pathname !== '/servicios/cotizacion') {
    return <Outlet />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Calculator className="w-4 h-4 mr-2" />
          Cotización de Proyectos
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Obtén tu cotización <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>gratuita</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Solicita una cotización detallada de tu proyecto tecnológico. Presupuestos personalizados sin costo ni compromiso.
        </p>
      </div>

      {/* Services Options */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className={`${service.isMain ? 'md:col-span-3 lg:col-span-1' : ''}`}>
              <Link
                to={service.path}
                className="group block h-full"
              >
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 ${
                  service.isMain 
                    ? `${borders.primary} border-2` 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  {service.isMain && (
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                      Recomendado
                    </div>
                  )}
                  <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Main Contact Form */}
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">¿Por qué cotizar con nosotros?</h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Solicita tu cotización</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="+502 0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de proyecto</label>
                <select 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  title="Tipo de proyecto"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="website">Sitio Web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="webapp">Aplicación Web</option>
                  <option value="mobile">App Móvil</option>
                  <option value="integration">Integración/API</option>
                  <option value="hosting">Hosting & Cloud</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Describe tu proyecto</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                placeholder="Cuéntanos sobre tu proyecto: objetivos, funcionalidades, público objetivo, etc."
              />
            </div>
            <button 
              type="submit"
              className={`w-full py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105`}
            >
              Solicitar Cotización Gratuita
            </button>
          </form>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Solicitas cotización', desc: 'Completas el formulario con los detalles' },
            { step: '02', title: 'Analizamos tu proyecto', desc: 'Revisamos y evaluamos tus necesidades' },
            { step: '03', title: 'Preparamos propuesta', desc: 'Creamos cotización detallada y cronograma' },
            { step: '04', title: 'Te enviamos respuesta', desc: 'Recibes cotización en menos de 24 horas' }
          ].map((stepItem, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
                {stepItem.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{stepItem.title}</h3>
              <p className="text-gray-400 text-sm">{stepItem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
