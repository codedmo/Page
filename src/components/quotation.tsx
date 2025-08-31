"use client"

import { useState } from "react"
import { Calculator, Download, Settings, FileText, Clock } from "lucide-react"
import jsPDF from 'jspdf'
import { 
  systemElements, 
  defaultQuotationSettings, 
  companyInfo,
  type QuotationItem 
} from "@/config/quotation-config"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SelectedItem extends QuotationItem {
  selected: boolean
  customHours?: number
}

interface QuotationSettings {
  hourlyRate: number
  hoursPerDay: number
  taxRate: number
  currency: string
  companyName: string
  projectName: string
}

export default function Quotation() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    systemElements.map(item => ({ ...item, selected: false }))
  )
  
  const [settings, setSettings] = useState<QuotationSettings>(defaultQuotationSettings)

  const [showSettings, setShowSettings] = useState(false)

  // Cálculos
  const selectedItemsList = selectedItems.filter(item => item.selected)
  const totalHours = selectedItemsList.reduce((sum, item) => sum + (item.customHours || item.hours), 0)
  const subtotal = totalHours * settings.hourlyRate
  const taxAmount = subtotal * (settings.taxRate / 100)
  const total = subtotal + taxAmount
  const estimatedDays = Math.ceil(totalHours / settings.hoursPerDay)

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected }
          : item
      )
    )
  }

  const handleHoursChange = (itemId: string, hours: number) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, customHours: hours }
          : item
      )
    )
  }

  const getCategoryItems = (category: string) => {
    return selectedItems.filter(item => item.category === category)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'complex': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const categories = Array.from(new Set(systemElements.map(item => item.category)))

  const generatePDF = () => {
    // Crear documento PDF
    const doc = new jsPDF()
    
    // Fecha actual
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    let yPosition = 20
    
    // Header de la empresa
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text(companyInfo.name, 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(companyInfo.address, 20, yPosition)
    yPosition += 5
    doc.text(companyInfo.phone + " | " + companyInfo.email, 20, yPosition)
    yPosition += 5
    doc.text(companyInfo.website, 20, yPosition)
    
    // Línea separadora
    yPosition += 10
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 15
    
    // Título de cotización
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("COTIZACIÓN DE PROYECTO", 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Fecha: " + currentDate, 20, yPosition)
    doc.text("Proyecto: " + settings.projectName, 120, yPosition)
    
    yPosition += 15
    
    // Información del proyecto
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("DETALLES DEL PROYECTO", 20, yPosition)
    yPosition += 10
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Precio por hora: ${settings.currency} $${settings.hourlyRate}`, 20, yPosition)
    yPosition += 5
    doc.text(`Horas por día de trabajo: ${settings.hoursPerDay}h`, 20, yPosition)
    yPosition += 5
    doc.text(`Impuesto aplicado: ${settings.taxRate}%`, 20, yPosition)
    yPosition += 15
    
    // Elementos seleccionados
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("ELEMENTOS INCLUIDOS", 20, yPosition)
    yPosition += 10
    
    // Headers de tabla
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("Elemento", 20, yPosition)
    doc.text("Categoría", 100, yPosition)
    doc.text("Horas", 150, yPosition)
    doc.text("Costo", 170, yPosition)
    yPosition += 5
    
    // Línea de headers
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 5
    
    // Items
    doc.setFont("helvetica", "normal")
    selectedItemsList.forEach(item => {
      const itemHours = item.customHours || item.hours
      const itemCost = itemHours * settings.hourlyRate
      
      // Verificar si necesitamos nueva página
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(item.name.substring(0, 35), 20, yPosition)
      doc.text(item.category, 100, yPosition)
      doc.text(itemHours.toString() + "h", 150, yPosition)
      doc.text(settings.currency + " $" + itemCost.toLocaleString(), 170, yPosition)
      yPosition += 5
    })
    
    // Línea antes de totales
    yPosition += 5
    doc.line(120, yPosition, 190, yPosition)
    yPosition += 10
    
    // Totales
    doc.setFont("helvetica", "normal")
    doc.text("Total Horas:", 120, yPosition)
    doc.text(totalHours + "h", 170, yPosition)
    yPosition += 5
    
    doc.text("Subtotal:", 120, yPosition)
    doc.text(settings.currency + " $" + subtotal.toLocaleString(), 170, yPosition)
    yPosition += 5
    
    doc.text(`Impuestos (${settings.taxRate}%):`, 120, yPosition)
    doc.text(settings.currency + " $" + taxAmount.toLocaleString(), 170, yPosition)
    yPosition += 5
    
    // Línea antes del total
    doc.line(120, yPosition, 190, yPosition)
    yPosition += 5
    
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("TOTAL:", 120, yPosition)
    doc.text(settings.currency + " $" + total.toLocaleString(), 170, yPosition)
    yPosition += 10
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Duración estimada: " + estimatedDays + " días laborales", 120, yPosition)
    
    // Disclaimer
    yPosition += 20
    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.text("NOTA: Esta cotización es un ESTIMADO y los precios pueden variar según", 20, yPosition)
    yPosition += 4
    doc.text("los requerimientos específicos del proyecto. Válida por 30 días.", 20, yPosition)
    
    // Guardar PDF
    const fileName = `Cotizacion_${settings.projectName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="w-full mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Cotizador de Proyectos
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {settings.companyName}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Button
            onClick={generatePDF}
            disabled={selectedItemsList.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Panel de Selección */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Configuraciones rápidas */}
          {showSettings && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configuración del Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName">Nombre del Proyecto</Label>
                    <Input
                      id="projectName"
                      value={settings.projectName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, projectName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Empresa</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hourlyRate">Precio por Hora ({settings.currency})</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={settings.hourlyRate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoursPerDay">Horas por Día</Label>
                    <Input
                      id="hoursPerDay"
                      type="number"
                      value={settings.hoursPerDay}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, hoursPerDay: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxRate">Impuesto (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={settings.taxRate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Moneda</Label>
                    <Select 
                      value={settings.currency} 
                      onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="MXN">MXN ($)</SelectItem>
                        <SelectItem value="COP">COP ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Elementos por categoría */}
          {categories.map(category => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getCategoryItems(category).map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => handleItemToggle(item.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {item.name}
                          </h4>
                          <Badge className={`text-xs ${getComplexityColor(item.complexity)}`}>
                            {item.complexity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {item.customHours || item.hours}h
                            </span>
                          </div>
                          
                          {item.selected && (
                            <div className="flex items-center gap-1">
                              <Label htmlFor={`hours-${item.id}`} className="text-xs">Ajustar:</Label>
                              <Input
                                id={`hours-${item.id}`}
                                type="number"
                                value={item.customHours || item.hours}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHoursChange(item.id, Number(e.target.value))}
                                className="w-16 h-7 text-xs"
                                min="1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Panel de Resumen */}
        <div className="space-y-4">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Resumen de Cotización
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Información del proyecto */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                  {settings.projectName}
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Precio por hora:</span>
                    <span>{settings.currency} ${settings.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horas por día:</span>
                    <span>{settings.hoursPerDay}h</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Items seleccionados */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                  Elementos Seleccionados ({selectedItemsList.length})
                </h4>
                
                {selectedItemsList.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">
                    No hay elementos seleccionados
                  </p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedItemsList.map(item => (
                      <div key={item.id} className="flex justify-between items-start text-xs">
                        <span className="flex-1 pr-2">{item.name}</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {item.customHours || item.hours}h
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Cálculos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Horas:</span>
                  <span className="font-medium">{totalHours}h</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{settings.currency} ${subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Impuestos ({settings.taxRate}%):</span>
                  <span>{settings.currency} ${taxAmount.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600 dark:text-green-400">
                    {settings.currency} ${total.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Duración estimada:</span>
                  <span>{estimatedDays} días</span>
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-xs">
                  ⚠️ <strong>ESTIMADO:</strong> Los precios y tiempos son aproximados y pueden variar según los requerimientos específicos del proyecto.
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
