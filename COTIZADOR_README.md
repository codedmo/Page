# 📋 Cotizador de Proyectos - Documentación

## 🚀 Características Principales

El componente **Quotation** es un cotizador completo con las siguientes funcionalidades:

### ✅ **Funcionalidades Implementadas:**

1. **📊 Gestión de Elementos del Sistema**
   - Catálogo extenso de elementos predefinidos (Frontend, Backend, DevOps, etc.)
   - Categorización automática por tipo de trabajo
   - Niveles de complejidad (Básico, Medio, Complejo)
   - Horas estimadas para cada elemento

2. **⚙️ Configuración Flexible**
   - Precio por hora ajustable
   - Horas de trabajo por día configurables
   - Impuestos personalizables
   - Múltiples monedas (USD, EUR, MXN, COP)
   - Información de empresa editable

3. **🧮 Cálculos Automáticos**
   - Suma total de horas seleccionadas
   - Cálculo de subtotal (horas × precio/hora)
   - Aplicación automática de impuestos
   - Estimación de días de trabajo
   - Total final con impuestos incluidos

4. **📄 Generación de PDF**
   - PDF profesional con plantilla de empresa
   - Información detallada del proyecto
   - Tabla de elementos seleccionados
   - Totales y estimaciones
   - Disclaimer legal automático

5. **💰 Ajustes Personalizados**
   - Modificación de horas por elemento
   - Selección/deselección fácil de items
   - Vista previa en tiempo real
   - Interfaz intuitiva con shadcn/ui

## 🛠️ Uso del Componente

### Importar y Usar

```tsx
import Quotation from "@/components/quotation"

function App() {
  return <Quotation />
}
```

### Personalizar Elementos

Edita el archivo `src/config/quotation-config.ts` para:

- Agregar nuevos elementos del sistema
- Modificar precios por defecto
- Cambiar información de la empresa
- Ajustar categorías

## 📁 Estructura de Archivos

``` bash
src/
├── components/
│   └── quotation.tsx          # Componente principal
├── config/
│   └── quotation-config.ts    # Configuración de elementos
└── pages/
    └── Home.tsx              # Ejemplo de uso
```

## 🎯 Casos de Uso

### 1. **Agencias Digitales**

- Cotización de sitios web completos
- Estimación de aplicaciones web
- Proyectos de e-commerce

### 2. **Freelancers**

- Presupuestos rápidos y profesionales
- Diferentes tipos de proyectos
- Seguimiento de estimaciones

### 3. **Consultoras IT**

- Proyectos enterprise
- Integraciones complejas
- Auditorías y migraciones

## ⚠️ **Notas Importantes**

1. **ESTIMADO:** Todos los precios son aproximados y pueden variar
2. **PDF:** Se genera automáticamente con información de la empresa
3. **Configuración:** Personalizable desde el archivo de configuración
4. **Responsive:** Funciona en desktop, tablet y móvil

## 🔧 Personalización Avanzada

### Modificar Elementos del Sistema

```typescript
// En quotation-config.ts
export const systemElements: QuotationItem[] = [
  {
    id: "custom_feature",
    name: "Mi Funcionalidad Personalizada",
    description: "Descripción detallada",
    category: "Custom",
    hours: 24,
    complexity: "medium"
  }
]
```

### Cambiar Información de Empresa

```typescript
export const companyInfo = {
  name: "Tu Empresa",
  address: "Tu Dirección",
  phone: "Tu Teléfono",
  email: "tu@email.com",
  website: "www.tuempresa.com"
}
```

## 📈 Próximas Mejoras Sugeridas

- [ ] Plantillas de PDF personalizables
- [ ] Exportación a Excel
- [ ] Envío automático por email
- [ ] Historial de cotizaciones
- [ ] Integración con CRM
- [ ] Templates de proyectos predefinidos
- [ ] Calculadora de descuentos
- [ ] Multi-idioma

---

## 🎉 Listo para Usar

El cotizador está completamente funcional y listo para usar en tu aplicación. Solo importa el componente y personaliza la configuración según tus necesidades.
