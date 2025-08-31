// Ejemplo de uso del componente IronTriangle

import IronTriangle from '@/components/Iron-stone'

export default function TriangleDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calculadora del Triángulo de Hierro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubre cómo los factores de calidad, tiempo y costo se equilibran en tu proyecto
          </p>
        </div>
        
        <IronTriangle />
        
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Calidad</h3>
              <p>Representa el nivel de perfección, robustez y características del software. Mayor calidad requiere más tiempo o presupuesto.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Tiempo</h3>
              <p>El plazo de entrega del proyecto. Reducir el tiempo generalmente requiere más recursos o compromete la calidad.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💰 Costo</h3>
              <p>El presupuesto disponible para el proyecto. Menor presupuesto típicamente significa más tiempo o menor calidad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
