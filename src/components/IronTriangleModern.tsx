import { useState } from 'react';
import { Triangle, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { gradients } from '@/config/theme-colors';

interface TriangleValues {
  quality: number;
  time: number;
  cost: number;
}

interface Analysis {
  isViable: boolean;
  isProfitable: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  warnings: string[];
  score: number;
}

export default function IronTriangleModern() {
  const [values, setValues] = useState<TriangleValues>({
    quality: 50,
    time: 50,
    cost: 50
  });

  const [selectedPreset, setSelectedPreset] = useState("custom");
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Configuraciones predefinidas
  const presetConfigurations = {
    custom: { quality: 50, time: 50, cost: 50 },
    premium: { quality: 85, time: 80, cost: 85 },
    express: { quality: 30, time: 20, cost: 40 },
    economico: { quality: 40, time: 65, cost: 30 },
    equilibrado: { quality: 65, time: 70, cost: 60 },
    presion: { quality: 75, time: 40, cost: 80 },
    mvp: { quality: 25, time: 71, cost: 25 }
  };

  // Función para analizar la viabilidad
  const analyzeViability = (): Analysis => {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    let isViable = true;
    let isProfitable = true;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    
    // Análisis de coherencia
    const qualityTimeGap = Math.abs(values.quality - values.time);
    const qualityCostGap = Math.abs(values.quality - values.cost);
    const timeCostGap = Math.abs(values.time - values.cost);
    
    // Configuraciones problemáticas
    if (values.quality >= 80 && values.time <= 30) {
      isViable = false;
      warnings.push("Alta calidad con poco tiempo es técnicamente imposible");
      recommendations.push("Aumentar tiempo a mínimo 60% o reducir calidad a 50%");
      riskLevel = 'high';
    }
    
    if (values.quality >= 70 && values.cost <= 25) {
      isProfitable = false;
      warnings.push("Alta calidad con presupuesto muy bajo no es rentable");
      recommendations.push("Incrementar presupuesto para mantener la calidad");
    }
    
    if (values.time <= 20 && values.cost <= 30) {
      warnings.push("Tiempo y presupuesto extremadamente limitados");
      riskLevel = 'high';
    }
    
    // Análisis de gaps grandes entre factores
    if (qualityTimeGap > 50) {
      warnings.push("Gran desbalance entre calidad y tiempo");
      if (riskLevel === 'low') riskLevel = 'medium';
    }
    
    if (qualityCostGap > 45) {
      warnings.push("Desbalance significativo entre calidad y costo");
      if (riskLevel === 'low') riskLevel = 'medium';
    }
    
    // Configuraciones óptimas
    if (qualityTimeGap <= 20 && qualityCostGap <= 20 && timeCostGap <= 20) {
      recommendations.push("Configuración bien balanceada");
    }
    
    // Análisis de rentabilidad
    const avgValue = (values.quality + values.time + values.cost) / 3;
    if (avgValue >= 70) {
      recommendations.push("Proyecto premium con alta inversión");
    } else if (avgValue <= 30) {
      recommendations.push("Proyecto económico, verificar viabilidad");
    }
    
    // Cálculo de score
    const balance = 100 - Math.max(qualityTimeGap, qualityCostGap, timeCostGap);
    const viabilityScore = isViable ? 25 : 0;
    const profitabilityScore = isProfitable ? 25 : 0;
    const riskScore = riskLevel === 'low' ? 25 : riskLevel === 'medium' ? 15 : 5;
    const score = Math.round((balance + viabilityScore + profitabilityScore + riskScore) / 4);
    
    return {
      isViable,
      isProfitable,
      riskLevel,
      recommendations,
      warnings,
      score
    };
  };

  const handleSliderChange = (param: keyof TriangleValues, value: number) => {
    setValues({ ...values, [param]: value });
    setSelectedPreset("custom");
  };

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    if (preset !== 'custom' && preset in presetConfigurations) {
      setValues(presetConfigurations[preset as keyof typeof presetConfigurations]);
    }
  };

  // Funciones para obtener descripciones según los valores
  const getQualityDescription = (value: number) => {
    if (value >= 80) return "Premium - Calidad excepcional";
    if (value >= 60) return "Profesional - Alta calidad";
    if (value >= 40) return "Estándar - Calidad aceptable";
    if (value >= 20) return "Básico - Calidad mínima";
    return "Prototipo - Concepto inicial";
  };

  const getTimeDescription = (value: number) => {
    if (value >= 80) return "Extenso - Desarrollo completo";
    if (value >= 60) return "Adecuado - Tiempo suficiente";
    if (value >= 40) return "Ajustado - Tiempo limitado";
    if (value >= 20) return "Urgente - Muy poco tiempo";
    return "Express - Desarrollo ultra rápido";
  };

  const getCostDescription = (value: number) => {
    if (value >= 80) return "Premium - Inversión alta";
    if (value >= 60) return "Profesional - Presupuesto adecuado";
    if (value >= 40) return "Moderado - Presupuesto ajustado";
    if (value >= 20) return "Económico - Presupuesto limitado";
    return "Básico - Inversión mínima";
  };

  // Función para obtener colores según el valor
  const getColorByValue = (value: number) => {
    if (value >= 70) return "text-green-400";
    if (value >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const analysis = analyzeViability();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-4`}>
          <Triangle className="w-4 h-4 mr-2" />
          Triángulo de Hierro
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Encuentra el <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>equilibrio perfecto</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Balancea calidad, tiempo y costo para tomar decisiones informadas sobre tu proyecto.
        </p>
      </div>

      {/* Configuraciones predefinidas */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Configuraciones Predefinidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.keys(presetConfigurations).map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetChange(preset)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 capitalize ${
                selectedPreset === preset
                  ? `bg-gradient-to-r ${gradients.primary} text-white`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controles */}
        <div className="space-y-6">
          {/* Calidad */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Calidad</h3>
              <span className={`text-2xl font-bold ${getColorByValue(values.quality)}`}>
                {values.quality}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values.quality}
              onChange={(e) => handleSliderChange('quality', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              title="Ajustar calidad"
              aria-label="Control de calidad"
            />
            <p className="text-gray-400 text-sm mt-2">{getQualityDescription(values.quality)}</p>
          </div>

          {/* Tiempo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Tiempo</h3>
              <span className={`text-2xl font-bold ${getColorByValue(values.time)}`}>
                {values.time}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values.time}
              onChange={(e) => handleSliderChange('time', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              title="Ajustar tiempo"
              aria-label="Control de tiempo"
            />
            <p className="text-gray-400 text-sm mt-2">{getTimeDescription(values.time)}</p>
          </div>

          {/* Costo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Costo</h3>
              <span className={`text-2xl font-bold ${getColorByValue(values.cost)}`}>
                {values.cost}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values.cost}
              onChange={(e) => handleSliderChange('cost', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              title="Ajustar costo"
              aria-label="Control de costo"
            />
            <p className="text-gray-400 text-sm mt-2">{getCostDescription(values.cost)}</p>
          </div>
        </div>

        {/* Análisis */}
        <div className="space-y-6">
          {/* Score general */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Score del Proyecto</h3>
              <span className={`text-3xl font-bold ${getColorByValue(analysis.score)}`}>
                {analysis.score}/100
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${gradients.primary} transition-all duration-500`}
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>

          {/* Estado del proyecto */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Estado del Proyecto</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Viabilidad:</span>
                <div className="flex items-center">
                  {analysis.isViable ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  )}
                  <span className={analysis.isViable ? 'text-green-400' : 'text-red-400'}>
                    {analysis.isViable ? 'Viable' : 'No viable'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Rentabilidad:</span>
                <div className="flex items-center">
                  {analysis.isProfitable ? (
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                  )}
                  <span className={analysis.isProfitable ? 'text-green-400' : 'text-red-400'}>
                    {analysis.isProfitable ? 'Rentable' : 'No rentable'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Nivel de riesgo:</span>
                <span className={`capitalize ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel === 'low' ? 'Bajo' : analysis.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                </span>
              </div>
            </div>
          </div>

          {/* Análisis detallado */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Análisis Detallado</h3>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
                title="Ver análisis detallado"
                aria-label="Ver análisis detallado"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            
            {showAnalysis && (
              <div className="space-y-4">
                {analysis.warnings.length > 0 && (
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Advertencias
                    </h4>
                    <ul className="space-y-1">
                      {analysis.warnings.map((warning, index) => (
                        <li key={index} className="text-red-300 text-sm">• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </h4>
                    <ul className="space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-green-300 text-sm">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
