import { Server, Shield, Zap, CheckCircle } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function HostingProfesional() {
  // SEO para Hosting Profesional
  useSEO({
    title: 'Hosting Profesional - Alojamiento Web Seguro | CODEDMO',
    description: 'Hosting profesional con SSL gratuito, backup diario y soporte 24/7. Alojamiento web rápido y seguro para tu sitio web o aplicación.',
    keywords: ['hosting profesional', 'alojamiento web', 'ssl gratuito', 'backup diario', 'soporte 24/7'],
    canonical: '/servicios/hosting&cloud/hosting'
  });

  const features = [
    'SSL Gratuito incluido',
    'Backup diario automático',
    'Panel cPanel incluido',
    'Soporte técnico 24/7',
    'Garantía de uptime 99.9%',
    'Antivirus y protección DDoS',
    'Ancho de banda ilimitado',
    'Bases de datos MySQL ilimitadas'
  ];

  const plans = [
    {
      name: 'Básico',
      price: '$5/mes',
      storage: '10 GB SSD',
      domains: '1 dominio',
      emails: '10 cuentas email',
      features: ['SSL Gratuito', 'Backup diario', 'cPanel', 'Soporte 24/7']
    },
    {
      name: 'Profesional',
      price: '$12/mes',
      storage: '50 GB SSD',
      domains: '5 dominios',
      emails: '50 cuentas email',
      features: ['Todo lo del plan Básico', 'CDN incluido', 'Certificado premium', 'Migración gratuita'],
      recommended: true
    },
    {
      name: 'Empresarial',
      price: '$25/mes',
      storage: '100 GB SSD',
      domains: 'Dominios ilimitados',
      emails: 'Cuentas email ilimitadas',
      features: ['Todo lo del plan Profesional', 'IP dedicada', 'Servidor privado virtual', 'Soporte prioritario']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Server className="w-4 h-4 mr-2" />
          Hosting Profesional
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Hosting profesional <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>seguro y confiable</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Alojamiento web de alta calidad con SSL gratuito, backup diario automático y soporte técnico 24/7 en español.
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

      {/* Pricing Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Planes de Hosting</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
              plan.recommended ? 'border-purple-500 border-2' : 'border-white/10'
            }`}>
              {plan.recommended && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${gradients.primary} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                  Recomendado
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-purple-400 mb-4">{plan.price}</div>
                <div className="space-y-2 text-gray-300">
                  <div>{plan.storage}</div>
                  <div>{plan.domains}</div>
                  <div>{plan.emails}</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25`}>
                Contratar Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Por qué elegir nuestro hosting?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Máxima Seguridad</h3>
            <p className="text-gray-400">SSL gratuito, protección DDoS y antivirus avanzado para mantener tu sitio seguro.</p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Velocidad Superior</h3>
            <p className="text-gray-400">Servidores SSD de alta velocidad y CDN global para máximo rendimiento.</p>
          </div>
          <div className="text-center">
            <Server className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Soporte Experto</h3>
            <p className="text-gray-400">Soporte técnico 24/7 en español con técnicos especializados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
