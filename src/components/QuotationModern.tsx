import { useState } from 'react';
import { Calculator, Settings, Download, CheckCircle, Clock, DollarSign, FileText, Plus, Minus } from 'lucide-react';
import { gradients } from '@/config/theme-colors';

interface QuotationItem {
  id: string;
  name: string;
  category: string;
  hours: number;
  complexity: string;
  description: string;
}

interface SelectedItem extends QuotationItem {
  selected: boolean;
  customHours?: number;
}

interface QuotationSettings {
  hourlyRate: number;
  hoursPerDay: number;
  taxRate: number;
  currency: string;
  companyName: string;
  projectName: string;
}

// Datos de ejemplo para la cotización
const systemElements: QuotationItem[] = [
  {
    id: '1',
    name: 'Landing Page',
    category: 'Frontend',
    hours: 20,
    complexity: 'Básico',
    description: 'Página de destino con formulario de contacto'
  },
  {
    id: '2',
    name: 'Sistema de Usuarios',
    category: 'Backend',
    hours: 40,
    complexity: 'Intermedio',
    description: 'Registro, login y gestión de usuarios'
  },
  {
    id: '3',
    name: 'API REST',
    category: 'Backend',
    hours: 30,
    complexity: 'Intermedio',
    description: 'API completa con autenticación'
  },
  {
    id: '4',
    name: 'Panel de Administración',
    category: 'Frontend',
    hours: 50,
    complexity: 'Avanzado',
    description: 'Dashboard completo con métricas'
  },
  {
    id: '5',
    name: 'Integración de Pagos',
    category: 'Backend',
    hours: 25,
    complexity: 'Intermedio',
    description: 'Stripe/PayPal integration'
  },
  {
    id: '6',
    name: 'App Móvil',
    category: 'Mobile',
    hours: 80,
    complexity: 'Avanzado',
    description: 'App nativa para iOS y Android'
  }
];

const defaultSettings: QuotationSettings = {
  hourlyRate: 50,
  hoursPerDay: 8,
  taxRate: 16,
  currency: 'USD',
  companyName: 'CODEDMO',
  projectName: 'Proyecto Web'
};

export default function QuotationModern() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    systemElements.map(item => ({ ...item, selected: false }))
  );
  
  const [settings, setSettings] = useState<QuotationSettings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);

  // Cálculos
  const selectedItemsList = selectedItems.filter(item => item.selected);
  const totalHours = selectedItemsList.reduce((sum, item) => sum + (item.customHours || item.hours), 0);
  const subtotal = totalHours * settings.hourlyRate;
  const taxAmount = subtotal * (settings.taxRate / 100);
  const total = subtotal + taxAmount;
  const estimatedDays = Math.ceil(totalHours / settings.hoursPerDay);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const handleHoursChange = (itemId: string, hours: number) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, customHours: Math.max(1, hours) }
          : item
      )
    );
  };

  const getCategoryItems = (category: string) => {
    return selectedItems.filter(item => item.category === category);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Básico':
        return 'bg-green-500/20 text-green-300';
      case 'Intermedio':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'Avanzado':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const categories = Array.from(new Set(systemElements.map(item => item.category)));

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-4`}>
          <Calculator className="w-4 h-4 mr-2" />
          Cotizador Inteligente
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Calcula el <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>costo</span> de tu proyecto
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Selecciona los elementos que necesitas para tu proyecto y obtén una cotización personalizada al instante.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de elementos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Settings Toggle */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Elementos del Proyecto</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Configuración de Cotización</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tarifa por hora ({settings.currency})
                  </label>
                  <input
                    type="number"
                    value={settings.hourlyRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500"
                    title="Tarifa por hora"
                    placeholder="Ej: 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Horas por día
                  </label>
                  <input
                    type="number"
                    value={settings.hoursPerDay}
                    onChange={(e) => setSettings(prev => ({ ...prev, hoursPerDay: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500"
                    title="Horas por día"
                    placeholder="Ej: 8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Impuesto (%)
                  </label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500"
                    title="Porcentaje de impuesto"
                    placeholder="Ej: 16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={settings.projectName}
                    onChange={(e) => setSettings(prev => ({ ...prev, projectName: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-purple-500"
                    title="Nombre del proyecto"
                    placeholder="Ej: Mi Proyecto Web"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.map(category => (
            <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                {category}
              </h3>
              <div className="space-y-3">
                {getCategoryItems(category).map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      item.selected 
                        ? 'bg-purple-500/20 border-purple-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            item.selected ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                          }`}>
                            {item.selected && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <h4 className="font-semibold text-white">{item.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getComplexityColor(item.complexity)}`}>
                            {item.complexity}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm ml-8">{item.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-purple-400 font-bold">
                          {item.customHours || item.hours}h
                        </div>
                        {item.selected && (
                          <div className="flex items-center mt-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleHoursChange(item.id, (item.customHours || item.hours) - 1)}
                              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-l text-white flex items-center justify-center"
                              title="Reducir horas"
                              aria-label="Reducir horas"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.customHours || item.hours}
                              onChange={(e) => handleHoursChange(item.id, Number(e.target.value))}
                              className="w-12 h-6 bg-white/10 text-white text-xs text-center border-0 focus:outline-none"
                              title="Horas del elemento"
                              aria-label="Horas del elemento"
                            />
                            <button
                              onClick={() => handleHoursChange(item.id, (item.customHours || item.hours) + 1)}
                              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-r text-white flex items-center justify-center"
                              title="Aumentar horas"
                              aria-label="Aumentar horas"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de cotización */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-400" />
              Resumen de Cotización
            </h3>
            
            {selectedItemsList.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Selecciona elementos para ver la cotización
              </p>
            ) : (
              <div className="space-y-4">
                {/* Items seleccionados */}
                <div className="space-y-2">
                  {selectedItemsList.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-white">{item.customHours || item.hours}h</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Total horas:</span>
                    <span className="text-white font-semibold">{totalHours}h</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="text-white">{settings.currency} ${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Impuestos ({settings.taxRate}%):</span>
                    <span className="text-white">{settings.currency} ${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-white">Total:</span>
                      <span className="text-lg font-bold text-green-400">
                        {settings.currency} ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-purple-300 font-semibold">Tiempo estimado</span>
                  </div>
                  <p className="text-white text-sm">
                    {estimatedDays} días laborales
                    <span className="text-gray-400 ml-2">
                      ({settings.hoursPerDay}h/día)
                    </span>
                  </p>
                </div>

                <button
                  className={`w-full py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
