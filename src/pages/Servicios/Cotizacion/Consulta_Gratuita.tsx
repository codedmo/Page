import { MessageCircle, Calendar, CheckCircle, Phone, Clock } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

export default function Consulta_Gratuita() {
  // SEO para Consulta Gratuita
  useSEO({
    title: 'Consulta Gratuita - Asesoría Técnica Sin Costo | CODEDMO',
    description: 'Solicita una consulta gratuita con nuestros expertos. Asesoría técnica sin costo ni compromiso para tu proyecto tecnológico.',
    keywords: ['consulta gratuita', 'asesoría técnica', 'consulta sin costo', 'evaluación proyecto', 'asesoramiento tecnológico'],
    canonical: '/servicios/cotizacion/consulta'
  });

  const benefits = [
    {
      icon: MessageCircle,
      title: 'Análisis Detallado',
      description: 'Revisamos tu proyecto y necesidades específicas'
    },
    {
      icon: CheckCircle,
      title: 'Recomendaciones',
      description: 'Te sugerimos las mejores soluciones tecnológicas'
    },
    {
      icon: Calendar,
      title: 'Plan de Acción',
      description: 'Diseñamos una hoja de ruta para tu proyecto'
    },
    {
      icon: Clock,
      title: 'Sin Compromiso',
      description: 'Consulta completamente gratuita y sin obligaciones'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Solicita tu consulta',
      description: 'Completa el formulario con los detalles de tu proyecto'
    },
    {
      step: '02',
      title: 'Agendamos reunión',
      description: 'Coordinamos una videollamada en el horario que prefieras'
    },
    {
      step: '03',
      title: 'Análisis conjunto',
      description: 'Revisamos tus necesidades y objetivos del proyecto'
    },
    {
      step: '04',
      title: 'Recibe propuesta',
      description: 'Te entregamos recomendaciones y plan de implementación'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Consulta Gratuita
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Asesoría técnica <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>sin costo</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Hablemos de tu proyecto. Nuestros expertos te ayudarán a encontrar la mejor solución tecnológica para tus necesidades.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">¿Qué incluye tu consulta?</h2>
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
          <h3 className="text-xl font-bold text-white mb-6">Solicita tu consulta</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre completo</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                placeholder="+502 0000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Describe tu proyecto</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                placeholder="Cuéntanos sobre tu proyecto o necesidad tecnológica..."
              />
            </div>
            <button 
              type="submit"
              className={`w-full py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105`}
            >
              Solicitar Consulta Gratuita
            </button>
          </form>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((stepItem, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full text-white font-bold text-lg mb-4`}>
                {stepItem.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{stepItem.title}</h3>
              <p className="text-gray-400 text-sm">{stepItem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">¿Prefieres hablar directamente?</h3>
        <p className="text-gray-300 mb-6">Llámanos o envíanos un WhatsApp para agendar tu consulta inmediatamente</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contacto"
            className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25`}
          >
            <Phone className="w-5 h-5 mr-2" />
            Contactar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
