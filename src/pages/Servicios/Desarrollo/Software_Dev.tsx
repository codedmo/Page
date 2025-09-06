import { Monitor, Cog, Users, CheckCircle, Database } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Software_Dev() {
  // SEO para Desarrollo de Software
  useSEO({
    title: 'Desarrollo de Software Personalizado - Soluciones a Medida | CODEDMO',
    description: 'Desarrollo de software personalizado, sistemas de gestión y aplicaciones empresariales. Soluciones tecnológicas adaptadas a tu negocio.',
    keywords: ['desarrollo software', 'aplicaciones empresariales', 'sistemas gestión', 'software personalizado', 'erp', 'crm'],
    canonical: '/servicios/desarrollo/software'
  });

  const features = [
    'Software a medida',
    'Sistemas de gestión (ERP/CRM)',
    'Aplicaciones empresariales',
    'Automatización de procesos',
    'Interfaces intuitivas',
    'Integración con sistemas existentes',
    'Soporte y mantenimiento',
    'Escalabilidad garantizada'
  ];

  const solutions = [
    {
      title: 'ERP Empresarial',
      description: 'Sistema integral de gestión empresarial',
      icon: Cog,
      features: ['Gestión de inventarios', 'Contabilidad integrada', 'Recursos humanos', 'Reportes avanzados'],
      price: 'Desde $3,000'
    },
    {
      title: 'CRM Personalizado',
      description: 'Gestión de relaciones con clientes',
      icon: Users,
      features: ['Seguimiento de leads', 'Automatización de ventas', 'Analytics de clientes', 'Integración email'],
      price: 'Desde $2,000'
    },
    {
      title: 'Software Específico',
      description: 'Desarrollo completamente personalizado',
      icon: Monitor,
      features: ['Análisis de requerimientos', 'Diseño UX/UI', 'Desarrollo ágil', 'Testing completo'],
      price: 'Cotización personalizada'
    }
  ];

  const technologies = [
    'React/Angular/Vue.js',
    'Node.js/Python/.NET',
    'PostgreSQL/MongoDB',
    'Docker/Kubernetes',
    'AWS/Azure/GCP',
    'Microservicios',
    'CI/CD Pipelines',
    'Testing Automatizado'
  ];

  const process = [
    {
      step: '1',
      title: 'Análisis',
      description: 'Entendemos tus necesidades y procesos actuales'
    },
    {
      step: '2',
      title: 'Diseño',
      description: 'Creamos la arquitectura y diseño del sistema'
    },
    {
      step: '3',
      title: 'Desarrollo',
      description: 'Implementamos con metodologías ágiles'
    },
    {
      step: '4',
      title: 'Testing',
      description: 'Pruebas exhaustivas de calidad'
    },
    {
      step: '5',
      title: 'Despliegue',
      description: 'Implementación y capacitación del equipo'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Monitor className="w-4 h-4 mr-2" />
          Desarrollo de Software
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Software <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>a tu medida</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos software personalizado que se adapta perfectamente a los procesos y necesidades específicas de tu empresa.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-white text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Solutions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Soluciones de Software</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <solution.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-gray-400 mb-4">{solution.description}</p>
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-4">
                <div className="text-purple-400 font-bold text-lg">{solution.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {process.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${gradients.primary} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                {step.step}
              </div>
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías que Usamos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Database className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
