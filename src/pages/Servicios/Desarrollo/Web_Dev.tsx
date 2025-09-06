import { Globe, Smartphone, Search, CheckCircle, Code, Palette, Zap } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

export default function Web_Design() {
  // SEO para Desarrollo Web
  useSEO({
    title: 'Desarrollo Web Profesional - Sitios Web Modernos | CODEDMO',
    description: 'Desarrollo de sitios web modernos, responsivos y optimizados para SEO. Experiencias web que convierten visitantes en clientes.',
    keywords: ['desarrollo web', 'sitios web', 'diseño responsivo', 'seo', 'react', 'nextjs'],
    canonical: '/servicios/desarrollo/web'
  });

  const features = [
    'Diseño responsivo',
    'Optimización SEO',
    'Velocidad de carga rápida',
    'Experiencia de usuario (UX)',
    'Integración con CMS',
    'E-commerce completo',
    'Analíticas integradas',
    'Mantenimiento incluido'
  ];

  const webTypes = [
    {
      title: 'Landing Pages',
      description: 'Páginas de alta conversión para campañas específicas',
      icon: Zap,
      features: ['Optimizada para conversión', 'A/B Testing', 'Integración con forms', 'Analytics avanzados'],
      price: 'Desde $500',
      time: '1-2 semanas'
    },
    {
      title: 'Sitios Corporativos',
      description: 'Presencia web profesional para tu empresa',
      icon: Globe,
      features: ['Diseño corporativo', 'CMS integrado', 'Blog incluido', 'Optimización SEO'],
      price: 'Desde $1,200',
      time: '2-4 semanas'
    },
    {
      title: 'E-commerce',
      description: 'Tiendas online completas y funcionales',
      icon: Smartphone,
      features: ['Carrito de compras', 'Pagos integrados', 'Gestión de inventario', 'Panel de administración'],
      price: 'Desde $2,500',
      time: '4-8 semanas'
    }
  ];

  const technologies = [
    'React/Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js/Express',
    'MongoDB/PostgreSQL',
    'Stripe/PayPal',
    'Vercel/Netlify',
    'Google Analytics'
  ];

  const seoFeatures = [
    'Meta tags optimizados',
    'Schema markup',
    'Sitemap XML',
    'URLs amigables',
    'Core Web Vitals',
    'Lighthouse 90+',
    'Indexación Google',
    'Search Console'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Code className="w-4 h-4 mr-2" />
          Desarrollo Web
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Sitios web que <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>convierten</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Desarrollamos sitios web modernos, rápidos y optimizados que generan resultados reales para tu negocio.
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

      {/* Web Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tipos de Sitios Web</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {webTypes.map((type, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <type.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
              <p className="text-gray-400 mb-4">{type.description}</p>
              <ul className="space-y-2 mb-6">
                {type.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="text-purple-400 font-bold text-lg">{type.price}</div>
                <div className="text-gray-400 text-sm">Tiempo: {type.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO & Performance */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">SEO & Performance</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Search className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Optimización SEO</h3>
            <div className="grid grid-cols-2 gap-3">
              {seoFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Zap className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Lighthouse Score</span>
                <span className="text-green-400 font-bold">90+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tiempo de carga</span>
                <span className="text-green-400 font-bold">&lt; 3s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Core Web Vitals</span>
                <span className="text-green-400 font-bold">Optimizado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mobile Friendly</span>
                <span className="text-green-400 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Tecnologías Modernas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
