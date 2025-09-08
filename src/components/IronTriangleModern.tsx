import { useState } from 'react';
import { Triangle, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';

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

  // SEO para Triángulo de Hierro
  useSEO({
    title: 'Triángulo de Hierro - Análisis de Proyectos | CODEDMO',
    description: 'Herramienta interactiva del Triángulo de Hierro para analizar la relación entre calidad, tiempo y costo en proyectos de desarrollo. Optimiza la gestión de tu proyecto.',
    keywords: ['triángulo hierro', 'gestión proyectos', 'calidad tiempo costo', 'análisis proyectos', 'planificación desarrollo', 'project management'],
    canonical: '/servicios/cotizacion/estimacion-rapida#triangulo',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Triángulo de Hierro - Análisis de Proyectos",
      "description": "Herramienta interactiva para analizar la relación entre calidad, tiempo y costo en proyectos de desarrollo",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GTQ"
      }
    },
    section: 'estimation-tools',
    priority: 'medium'
  });

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

  // Función para calcular ajustes automáticos basado en las reglas del triángulo de hierro
  // NOTA: Función deshabilitada - ahora los sliders funcionan independientemente
  /*
  const calculateDynamicAdjustment = (changedParam: keyof TriangleValues, newValue: number, currentValues: TriangleValues) => {
    const adjusted = { ...currentValues, [changedParam]: newValue };
    
    // REGLA 1: Mayor calidad necesita más tiempo o más costo
    if (changedParam === 'quality') {
      const qualityIncrease = newValue - currentValues.quality;
      
      if (qualityIncrease > 0) {
        // Calidad aumentó - necesita más tiempo O más costo
        const timeDeficit = Math.max(0, newValue - currentValues.time);
        const costDeficit = Math.max(0, newValue - currentValues.cost);
        
        if (timeDeficit > 0 && costDeficit > 0) {
          // Ambos están por debajo, distribuir el ajuste
          const totalDeficit = timeDeficit + costDeficit;
          const timeAdjustment = (timeDeficit / totalDeficit) * qualityIncrease * 0.7;
          const costAdjustment = (costDeficit / totalDeficit) * qualityIncrease * 0.7;
          
          adjusted.time = Math.round(Math.min(100, currentValues.time + timeAdjustment));
          adjusted.cost = Math.round(Math.min(100, currentValues.cost + costAdjustment));
        } else if (timeDeficit > costDeficit) {
          // Tiempo necesita más ajuste
          adjusted.time = Math.round(Math.min(100, currentValues.time + qualityIncrease * 0.6));
        } else {
          // Costo necesita más ajuste
          adjusted.cost = Math.round(Math.min(100, currentValues.cost + qualityIncrease * 0.6));
        }
      } else if (qualityIncrease < 0) {
        // Calidad disminuyó - permite reducir tiempo o costo
        const reduction = Math.abs(qualityIncrease) * 0.4;
        adjusted.time = Math.round(Math.max(10, currentValues.time - reduction * 0.5));
        adjusted.cost = Math.round(Math.max(10, currentValues.cost - reduction * 0.5));
      }
    }
    
    // REGLA 2: Menos tiempo necesita menos calidad o más costo
    if (changedParam === 'time') {
      const timeChange = newValue - currentValues.time;
      
      if (timeChange < 0) {
        // Tiempo disminuyó - necesita menos calidad O más costo
        const timeReduction = Math.abs(timeChange);
        
        if (currentValues.quality > currentValues.cost) {
          // Reducir calidad más que aumentar costo
          adjusted.quality = Math.round(Math.max(10, currentValues.quality - timeReduction * 0.8));
          adjusted.cost = Math.round(Math.min(100, currentValues.cost + timeReduction * 0.3));
        } else {
          // Aumentar costo más que reducir calidad
          adjusted.cost = Math.round(Math.min(100, currentValues.cost + timeReduction * 0.8));
          adjusted.quality = Math.round(Math.max(10, currentValues.quality - timeReduction * 0.3));
        }
      } else if (timeChange > 0) {
        // Tiempo aumentó - permite más calidad sin aumentar tanto el costo
        const timeIncrease = timeChange;
        adjusted.quality = Math.round(Math.min(100, currentValues.quality + timeIncrease * 0.5));
      }
    }
    
    // REGLA 3: Menos costo necesita más tiempo o menos calidad
    if (changedParam === 'cost') {
      const costChange = newValue - currentValues.cost;
      
      if (costChange < 0) {
        // Costo disminuyó - necesita más tiempo O menos calidad
        const costReduction = Math.abs(costChange);
        
        if (currentValues.quality > currentValues.time) {
          // Reducir calidad más que aumentar tiempo
          adjusted.quality = Math.round(Math.max(10, currentValues.quality - costReduction * 0.8));
          adjusted.time = Math.round(Math.min(100, currentValues.time + costReduction * 0.4));
        } else {
          // Aumentar tiempo más que reducir calidad
          adjusted.time = Math.round(Math.min(100, currentValues.time + costReduction * 0.8));
          adjusted.quality = Math.round(Math.max(10, currentValues.quality - costReduction * 0.4));
        }
      } else if (costChange > 0) {
        // Costo aumentó - permite más calidad o menos tiempo
        const costIncrease = costChange;
        if (currentValues.quality < 70) {
          adjusted.quality = Math.round(Math.min(100, currentValues.quality + costIncrease * 0.6));
        }
      }
    }
    
    return adjusted;
  };
  */

  // Función para analizar la viabilidad mejorada
  const analyzeViability = (): Analysis => {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    let isViable = true;
    let isProfitable = true;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    
    // Análisis de las reglas del triángulo de hierro
    const qualityTimeIndex = (values.quality + values.time) / 2;
    const qualityCostIndex = (values.quality + values.cost) / 2;
    const timeCostIndex = (values.time + values.cost) / 2;
    
    // REGLA 1: Mayor calidad necesita más tiempo o más costo
    if (values.quality > 70) {
      if (values.time < 50 && values.cost < 50) {
        isViable = false;
        warnings.push("Alta calidad requiere más tiempo O más presupuesto");
        recommendations.push("Aumentar tiempo a 60%+ o presupuesto a 60%+");
        riskLevel = 'high';
      } else if (values.time < 40 || values.cost < 40) {
        warnings.push("Calidad alta con recursos limitados");
        recommendations.push("Para calidad premium, considere más tiempo o presupuesto");
        riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      }
    }
    
    // REGLA 2: Menos tiempo necesita menos calidad o más costo
    if (values.time < 30) {
      if (values.quality > 60 && values.cost < 60) {
        isViable = false;
        warnings.push("Poco tiempo requiere reducir calidad O aumentar presupuesto");
        recommendations.push("Reducir calidad a 50% o aumentar presupuesto a 70%+");
        riskLevel = 'high';
      } else if (values.quality > 50) {
        warnings.push("Tiempo limitado para la calidad deseada");
        recommendations.push("Con poco tiempo, considere reducir alcance o aumentar presupuesto");
        if (riskLevel === 'low') riskLevel = 'medium';
      }
    }
    
    // REGLA 3: Menos costo necesita más tiempo o menos calidad
    if (values.cost < 30) {
      if (values.quality > 50 && values.time < 60) {
        isViable = false;
        warnings.push("Bajo presupuesto requiere más tiempo O menos calidad");
        recommendations.push("Aumentar tiempo a 70%+ o reducir calidad a 40%");
        riskLevel = 'high';
      } else if (values.quality > 40) {
        warnings.push("Presupuesto limitado para la calidad esperada");
        recommendations.push("Con presupuesto ajustado, considere más tiempo de desarrollo");
        riskLevel = riskLevel === 'high' ? 'high' : 'medium';
      }
    }
    
    // Configuraciones optimizadas
    if (qualityTimeIndex >= 60 && qualityCostIndex >= 60 && timeCostIndex >= 60) {
      recommendations.push("Configuración premium bien balanceada");
      isProfitable = true;
    } else if (qualityTimeIndex <= 40 && qualityCostIndex <= 40 && timeCostIndex <= 40) {
      recommendations.push("Configuración económica - verificar expectativas");
      if (values.quality < 25) {
        isProfitable = false;
        warnings.push("Calidad muy baja puede afectar la viabilidad comercial");
      }
    }
    
    // Casos especiales de equilibrio
    const triangleBalance = Math.abs(values.quality - values.time) + Math.abs(values.quality - values.cost) + Math.abs(values.time - values.cost);
    
    if (triangleBalance <= 30) {
      recommendations.push("Excelente equilibrio entre los tres factores");
      riskLevel = 'low';
    } else if (triangleBalance > 80) {
      warnings.push("Gran desequilibrio entre factores del proyecto");
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
    }
    
    // Análisis de rentabilidad basado en reglas
    const projectValue = (values.quality * 0.4) + (values.time * 0.3) + (values.cost * 0.3);
    if (projectValue >= 70) {
      recommendations.push("Proyecto de alto valor con excelente potencial");
    } else if (projectValue <= 35) {
      recommendations.push("Proyecto de valor limitado - revisar objetivos");
      if (projectValue <= 25) {
        isProfitable = false;
      }
    }
    
    // Cálculo simplificado y proporcional del score
    // triangleBalance ya está calculado arriba
    
    // Score base: promedio simple de los tres valores (60% del score total)
    const averageValue = (values.quality + values.time + values.cost) / 3;
    
    // Penalización por desequilibrio (40% del score total)
    // Cuanto más equilibrados estén los valores, mejor score
    const maxBalance = 200; // Máximo desequilibrio posible (100+100+0)
    const balanceScore = ((maxBalance - triangleBalance) / maxBalance) * 40;
    
    // Penalización por configuraciones no viables (solo si realmente es problemático)
    let viabilityPenalty = 0;
    if (!isViable) {
      viabilityPenalty = 15; // Penalización fija por no viabilidad
    }
    
    // Score final: base + equilibrio - penalizaciones
    const score = Math.round((averageValue * 0.6) + balanceScore - viabilityPenalty);
    
    return {
      isViable,
      isProfitable,
      riskLevel,
      recommendations,
      warnings,
      score: Math.max(0, Math.min(100, score))
    };
  };

  const handleSliderChange = (param: keyof TriangleValues, value: number) => {
    // Cambio independiente - solo actualizar el parámetro que se está moviendo
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
                className={`h-3 rounded-full transition-all duration-500 ${
                  analysis.score >= 70 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                  analysis.score >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>

          {/* Indicador de control independiente */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Repercuciones
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-300">Calidad →</span>
                <span className="text-blue-400"> Más tiempo o más costo </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-300">Tiempo →</span>
                <span className="text-yellow-400"> Menos calidad o más costo </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-300">Costo →</span>
                <span className="text-red-400"> Menos calidad o más tiempo </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">
              Cada slider se mueve independientemente. El análisis te dirá si la combinación es viable.
            </p>
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
