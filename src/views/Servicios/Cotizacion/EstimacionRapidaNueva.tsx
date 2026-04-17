import { useState } from 'react';
import { Calculator, BarChart3, Clock, DollarSign } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';
import QuotationModern from '@/components/QuotationModern';
import IronTriangleModern from '@/components/IronTriangleModern';

export default function EstimacionRapida() {
  // SEO para Estimación Rápida
  useSEO({
    title: 'Estimación Rápida - Calculadora de Proyectos | CODEDMO',
    description: 'Herramientas de estimación rápida para proyectos web. Cotizador inteligente y análisis del triángulo de hierro.',
    keywords: ['estimación proyectos', 'cotizador web', 'calculadora desarrollo', 'triángulo hierro', 'planificación proyectos'],
    canonical: '/servicios/cotizacion/estimacion-rapida'
  });

  const [activeTab, setActiveTab] = useState<'quotation' | 'triangle'>('quotation');

  const tabs = [
    {
      id: 'quotation' as const,
      name: 'Cotizador',
      icon: Calculator,
      description: 'Calcula el costo de tu proyecto'
    },
    {
      id: 'triangle' as const,
      name: 'Triángulo de Hierro',
      icon: BarChart3,
      description: 'Analiza calidad, tiempo y costo'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients.backgroundGlow} opacity-10`}></div>
        <div className="relative px-6 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Estimación Rápida
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Herramientas inteligentes para planificar y cotizar tu proyecto de desarrollo web
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-purple-500 bg-gradient-to-r from-purple-500/10 to-pink-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`p-3 rounded-lg ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gray-800'
                }`}>
                  <tab.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">{tab.name}</h3>
                  <p className="text-gray-400">{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'quotation' && <QuotationModern />}
          {activeTab === 'triangle' && <IronTriangleModern />}
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por qué usar nuestras herramientas?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Desarrolladas con años de experiencia en proyectos reales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Estimaciones Precisas</h3>
              <p className="text-gray-400">
                Calcula costos basados en elementos reales de desarrollo con nuestra experiencia de años.
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Análisis Inteligente</h3>
              <p className="text-gray-400">
                Evalúa la viabilidad de tu proyecto y recibe recomendaciones para optimizar recursos.
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Transparencia Total</h3>
              <p className="text-gray-400">
                Sin sorpresas. Conoce exactamente qué incluye cada elemento y su costo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
