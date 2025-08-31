"use client"

import { useState } from "react"
import { Clock, DollarSign, Star, Info, Zap, TrendingUp, TrendingDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

interface TriangleValues {
  quality: number
  time: number
  cost: number
}

export default function IronTriangle() {
  const [values, setValues] = useState<TriangleValues>({
    quality: 50,
    time: 50,
    cost: 50
  })

  const [showInfo, setShowInfo] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("custom")

  // Función para analizar la viabilidad de la configuración actual
  const analyzeViability = (): {
    isViable: boolean
    isProfitable: boolean
    riskLevel: 'low' | 'medium' | 'high'
    recommendations: string[]
    warnings: string[]
  } => {
    const warnings: string[] = []
    const recommendations: string[] = []
    
    // Análisis de coherencia
    const qualityTimeGap = Math.abs(values.quality - values.time)
    const qualityCostGap = Math.abs(values.quality - values.cost)
    const timeCostGap = Math.abs(values.time - values.cost)
    
    // Análisis de viabilidad
    let isViable = true
    let isProfitable = true
    let riskLevel: 'low' | 'medium' | 'high' = 'low'
    
    // Configuraciones problemáticas
    if (values.quality >= 80 && values.time <= 30) {
      isViable = false
      warnings.push("Alta calidad con poco tiempo es técnicamente imposible")
      recommendations.push("Aumentar tiempo a mínimo 60% o reducir calidad a 50%")
      riskLevel = 'high'
    }
    
    if (values.quality >= 70 && values.cost <= 25) {
      isProfitable = false
      warnings.push("Alta calidad con presupuesto muy bajo no es rentable")
      recommendations.push("Aumentar presupuesto o ajustar expectativas de calidad")
      riskLevel = 'high'
    }
    
    if (values.time <= 20 && values.cost <= 30) {
      isViable = false
      warnings.push("Tiempo y presupuesto extremadamente limitados")
      recommendations.push("Esta configuración comprometerá gravemente la calidad del proyecto")
      riskLevel = 'high'
    }
    
    // Análisis de gaps grandes entre factores
    if (qualityTimeGap > 50) {
      warnings.push("Gran desequilibrio entre calidad y tiempo")
      if (values.quality > values.time) {
        recommendations.push("Considere más tiempo para lograr la calidad deseada")
      } else {
        recommendations.push("Con tanto tiempo disponible, podría aumentar la calidad")
      }
      riskLevel = riskLevel === 'high' ? 'high' : 'medium'
    }
    
    if (qualityCostGap > 45) {
      warnings.push("Desproporción entre calidad y presupuesto")
      if (values.quality > values.cost) {
        recommendations.push("Presupuesto insuficiente para la calidad esperada")
      } else {
        recommendations.push("Presupuesto permite mayor calidad de la configurada")
      }
      riskLevel = riskLevel === 'high' ? 'high' : 'medium'
    }
    
    // Configuraciones óptimas
    if (qualityTimeGap <= 20 && qualityCostGap <= 20 && timeCostGap <= 20) {
      recommendations.push("Configuración equilibrada y realista")
      riskLevel = 'low'
    }
    
    // Análisis de rentabilidad
    const avgValue = (values.quality + values.time + values.cost) / 3
    if (avgValue >= 70) {
      recommendations.push("Proyecto premium con excelente potencial de resultado")
    } else if (avgValue <= 30) {
      isProfitable = false
      warnings.push("Configuración muy básica con limitado valor comercial")
      recommendations.push("Considere aumentar al menos uno de los factores para mayor viabilidad")
    }
    
    // Recomendaciones específicas por tipo de proyecto
    if (values.quality >= 80 && values.time >= 70 && values.cost >= 70) {
      recommendations.push("Ideal para proyectos enterprise o de alta complejidad")
    } else if (values.time <= 40 && values.cost <= 40) {
      recommendations.push("Adecuado para prototipos o MVPs, no para productos finales")
    } else if (values.quality <= 40) {
      recommendations.push("Solo recomendable para pruebas de concepto o demos")
    }
    
    return {
      isViable,
      isProfitable,
      riskLevel,
      recommendations,
      warnings
    }
  }

  const handleSliderChange = (param: keyof TriangleValues, value: number) => {
    setValues({ ...values, [param]: value })
    // Cambiar automáticamente a "Personalizado" cuando se mueva cualquier slider
    setSelectedPreset("custom")
  }

  // Configuraciones predefinidas
  const presetConfigurations = {
    custom: { quality: 50, time: 50, cost: 50 },
    premium: { quality: 85, time: 80, cost: 85 },
    express: { quality: 30, time: 20, cost: 40 },
    economico: { quality: 40, time: 65, cost: 30 },
    equilibrado: { quality: 65, time: 70, cost: 60 },
    presion: { quality: 75, time: 40, cost: 80 },
    mvp: { quality: 25, time: 71, cost: 25 }
  }

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)
    if (preset !== 'custom') {
      setValues(presetConfigurations[preset as keyof typeof presetConfigurations])
    }
  }

  // Funciones para obtener descripciones según los valores
  const getQualityDescription = (value: number) => {
    if (value >= 80) return "Premium - Máxima calidad y robustez"
    if (value >= 60) return "Profesional - Alta calidad estándar"
    if (value >= 40) return "Estándar - Calidad aceptable"
    if (value >= 20) return "Básico - Funcionalidad mínima"
    return "Prototipo - Concepto inicial"
  }

  const getTimeDescription = (value: number) => {
    if (value >= 80) return "Extendido - Desarrollo completo y detallado"
    if (value >= 60) return "Estándar - Tiempo de desarrollo normal"
    if (value >= 40) return "Acelerado - Desarrollo ágil"
    if (value >= 20) return "Rápido - Entrega prioritaria"
    return "Express - Desarrollo ultra rápido"
  }

  const getCostDescription = (value: number) => {
    if (value >= 80) return "Premium - Inversión completa"
    if (value >= 60) return "Profesional - Presupuesto estándar"
    if (value >= 40) return "Equilibrado - Costo moderado"
    if (value >= 20) return "Económico - Presupuesto ajustado"
    return "Básico - Inversión mínima"
  }

  // Función para obtener colores según el valor
  const getColorByValue = (value: number) => {
    if (value >= 70) return "text-green-600 dark:text-green-400"
    if (value >= 40) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="w-full mx-auto p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Header - Compacto */}
      <div className="text-center mb-3">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Triángulo de Hierro
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 w-6 h-6 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Mostrar información sobre el triángulo de hierro"
            aria-label="Mostrar información"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>
        
        {showInfo && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-xs text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-800 mb-2">
            <p className="font-semibold mb-1">¿Qué es el Triángulo de Hierro?</p>
            <p className="mb-1">Herramienta para evaluar la viabilidad de proyectos. Ajusta cada factor independientemente.</p>
          </div>
        )}

      </div>

      {/* Configuraciones Predefinidas - Centrado y compacto */}
      <div className="flex justify-center mb-3">
        <div className="flex flex-col items-center">
          <label className="text-xs font-medium text-gray-900 dark:text-white mb-1">
            Configuraciones:
          </label>
          <Select onValueChange={handlePresetChange} value={selectedPreset}>
            <SelectTrigger className="w-auto min-w-[180px] h-8 text-xs">
              <SelectValue placeholder="🎛️ Personalizado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">🎛️ Personalizado</SelectItem>
              <SelectItem value="premium">🏆 Premium</SelectItem>
              <SelectItem value="express">⚡ Express</SelectItem>
              <SelectItem value="economico">💰 Económico</SelectItem>
              <SelectItem value="equilibrado">⚖️ Equilibrado</SelectItem>
              <SelectItem value="presion">🚨 Bajo Presión</SelectItem>
              <SelectItem value="mvp">🐌 MVP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Controles Interactivos - Compactos */}
      <div className="grid md:grid-cols-3 gap-3 mb-3">
        {/* Control de Calidad */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className={`w-3 h-3 ${getColorByValue(values.quality)}`} />
              <h3 className="font-bold text-gray-900 dark:text-white text-xs">Calidad</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant={values.quality >= 70 ? "default" : values.quality >= 40 ? "secondary" : "destructive"} className="text-xs px-1 py-0">
                {Math.round(values.quality)}%
              </Badge>
              {values.quality >= 70 ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : values.quality <= 30 ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : null}
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="quality-slider" className="sr-only">Control de calidad del proyecto</label>
            <Slider
              value={[values.quality]}
              onValueChange={(value: number[]) => handleSliderChange('quality', value[0])}
              max={100}
              step={1}
              className="w-full h-2"
            />
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
            {getQualityDescription(values.quality)}
          </p>
        </div>

        {/* Control de Tiempo */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className={`w-3 h-3 ${getColorByValue(100 - values.time)}`} />
              <h3 className="font-bold text-gray-900 dark:text-white text-xs">Tiempo</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant={values.time <= 30 ? "default" : values.time <= 70 ? "secondary" : "destructive"} className="text-xs px-1 py-0">
                {Math.round(values.time)}%
              </Badge>
              {values.time <= 30 ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : values.time >= 70 ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : null}
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="time-slider" className="sr-only">Control de tiempo del proyecto</label>
            <Slider
              value={[values.time]}
              onValueChange={(value: number[]) => handleSliderChange('time', value[0])}
              max={100}
              step={1}
              className="w-full h-2"
            />
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
            {getTimeDescription(values.time)}
          </p>
        </div>

        {/* Control de Costo */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <DollarSign className={`w-3 h-3 ${getColorByValue(values.cost)}`} />
              <h3 className="font-bold text-gray-900 dark:text-white text-xs">Costo</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant={values.cost >= 70 ? "destructive" : values.cost >= 40 ? "secondary" : "default"} className="text-xs px-1 py-0">
                {Math.round(values.cost)}%
              </Badge>
              {values.cost >= 70 ? (
                <TrendingUp className="w-3 h-3 text-red-500" />
              ) : values.cost <= 30 ? (
                <TrendingDown className="w-3 h-3 text-green-500" />
              ) : null}
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="cost-slider" className="sr-only">Control de costo del proyecto</label>
            <Slider
              value={[values.cost]}
              onValueChange={(value: number[]) => handleSliderChange('cost', value[0])}
              max={100}
              step={1}
              className="w-full h-2"
            />
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
            {getCostDescription(values.cost)}
          </p>
        </div>
      </div>

      {/* Análisis de Viabilidad y Rentabilidad - Compacto */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sm">
            <Zap className="w-3 h-3 mr-1 text-blue-500" />
            Análisis de Viabilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
        
        {(() => {
          const analysis = analyzeViability()
          
          return (
            <div className="space-y-3">
              {/* Indicadores de Estado - Compactos */}
              <div className="grid md:grid-cols-3 gap-2">
                <div className={`p-2 rounded-lg border ${analysis.isViable 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">Viabilidad</span>
                    <span className={`text-sm ${analysis.isViable ? 'text-green-500' : 'text-red-500'}`}>
                      {analysis.isViable ? '✅' : '❌'}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-tight ${analysis.isViable 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                  }`}>
                    {analysis.isViable ? 'Factible' : 'Problemática'}
                  </p>
                </div>

                <div className={`p-2 rounded-lg border ${analysis.isProfitable 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">Rentabilidad</span>
                    <span className={`text-sm ${analysis.isProfitable ? 'text-blue-500' : 'text-orange-500'}`}>
                      {analysis.isProfitable ? '💰' : '⚠️'}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-tight ${analysis.isProfitable 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-orange-700 dark:text-orange-300'
                  }`}>
                    {analysis.isProfitable ? 'Rentable' : 'Cuestionable'}
                  </p>
                </div>

                <div className={`p-2 rounded-lg border ${
                  analysis.riskLevel === 'low' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : analysis.riskLevel === 'medium'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">Riesgo</span>
                    <span className={`text-sm ${
                      analysis.riskLevel === 'low' ? 'text-green-500' 
                      : analysis.riskLevel === 'medium' ? 'text-yellow-500' 
                      : 'text-red-500'
                    }`}>
                      {analysis.riskLevel === 'low' ? '🟢' : analysis.riskLevel === 'medium' ? '🟡' : '🔴'}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-tight ${
                    analysis.riskLevel === 'low' ? 'text-green-700 dark:text-green-300'
                    : analysis.riskLevel === 'medium' ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-red-700 dark:text-red-300'
                  }`}>
                    {analysis.riskLevel === 'low' ? 'Bajo' : analysis.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                  </p>
                </div>
              </div>

              {/* Advertencias y Recomendaciones - Compactas */}
              <div className="grid md:grid-cols-2 gap-2">
                {/* Advertencias */}
                {analysis.warnings.length > 0 && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTitle className="flex items-center text-xs">
                      <span className="mr-1">⚠️</span>
                      Advertencias
                    </AlertTitle>
                    <AlertDescription>
                      <ul className="space-y-1 mt-1">
                        {analysis.warnings.slice(0, 1).map((warning, index) => (
                          <li key={index} className="text-xs flex items-start leading-tight">
                            <span className="mr-1 mt-0.5">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Recomendaciones */}
                {analysis.recommendations.length > 0 && (
                  <Alert className="py-2">
                    <AlertTitle className="flex items-center text-xs">
                      <span className="mr-1">💡</span>
                      Recomendaciones
                    </AlertTitle>
                    <AlertDescription>
                      <ul className="space-y-1 mt-1">
                        {analysis.recommendations.slice(0, 1).map((recommendation, index) => (
                          <li key={index} className="text-xs flex items-start leading-tight">
                            <span className="mr-1 mt-0.5">•</span>
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Configuración Actual - Ultra compacta */}
              <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-2">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs">Configuración Actual:</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <span className="text-gray-600 dark:text-gray-400">Calidad</span>
                    <div className={`font-semibold ${getColorByValue(values.quality)}`}>
                      {Math.round(values.quality)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 dark:text-gray-400">Tiempo</span>
                    <div className={`font-semibold ${getColorByValue(100 - values.time)}`}>
                      {Math.round(values.time)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 dark:text-gray-400">Costo</span>
                    <div className={`font-semibold ${getColorByValue(100 - values.cost)}`}>
                      {Math.round(values.cost)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
        </CardContent>
      </Card>
    </div>
  )
}
