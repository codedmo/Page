# Sistema de Colores Centralizado

Este proyecto utiliza un sistema de colores centralizado para facilitar el mantenimiento y cambios de esquema de colores.

## Ubicación
El archivo de configuración se encuentra en: `src/config/theme-colors.ts`

## Características

### 🎨 Paleta de Colores
- **Primary**: Azul (blue-50 a blue-900)
- **Secondary**: Cian (cyan-50 a cyan-900)  
- **Accent**: Teal (teal-50 a teal-900)
- **Success**: Verde para estados exitosos
- **Warning**: Naranja para advertencias
- **Neutral**: Gris/Slate para elementos neutros

### 🌈 Gradientes Predefinidos
```typescript
// Gradientes principales
gradients.primary              // from-blue-700 to-blue-600
gradients.primaryLight         // from-blue-600 to-cyan-600
gradients.primaryToSecondary   // from-blue-400 to-cyan-400

// Gradientes de fondo
gradients.backgroundMain       // from-slate-900 via-blue-900 to-slate-900
gradients.backgroundGlow       // from-blue-500/20 to-cyan-500/20

// Gradientes de texto
gradients.textPrimary          // from-blue-400 to-cyan-400
gradients.textSecondary        // from-white via-blue-200 to-cyan-200
```

### 🔧 Utilidades
```typescript
// Colores de hover
hoverColors.primary            // hover:bg-blue-500/10
hoverColors.primaryButton      // hover:shadow-lg hover:shadow-blue-500/25

// Bordes
borders.primary                // border-blue-500/30
borders.primaryStrong          // border-blue-500/50
borders.neutral                // border-blue-500/20
```

## Uso en Componentes

### Importación
```typescript
import { themeColors, gradients, hoverColors, borders } from '../config/theme-colors';
```

### Ejemplos de Uso

#### 1. Colores Directos
```tsx
<div className={`bg-${themeColors.primary[500]}`}>
  Elemento con color primario
</div>
```

#### 2. Gradientes
```tsx
<div className={`bg-gradient-to-r ${gradients.primary}`}>
  Botón con gradiente primario
</div>
```

#### 3. Estados de Hover
```tsx
<button className={`${hoverColors.primary} ${borders.primary}`}>
  Botón interactivo
</button>
```

#### 4. Combinaciones Complejas
```tsx
<section className={`bg-gradient-to-br ${gradients.backgroundMain}`}>
  <div className={`bg-${themeColors.primary[500]}/10`}>
    <h1 className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>
      Título con gradiente
    </h1>
  </div>
</section>
```

## Cambiar Esquema de Colores

Para cambiar todo el esquema de colores del sitio:

1. **Edita `src/config/theme-colors.ts`**
2. **Cambia los valores de la paleta principal:**
   ```typescript
   primary: {
     50: 'purple-50',    // Cambiar de blue-50 a purple-50
     100: 'purple-100',  // etc...
     // ...
   }
   ```
3. **Los cambios se aplicarán automáticamente** a todos los componentes que usen el sistema

## Ventajas

✅ **Mantenimiento Centralizado**: Un solo archivo para todo el esquema de colores  
✅ **Consistencia**: Garantiza el uso coherente de colores en toda la aplicación  
✅ **Fácil Cambio de Tema**: Cambiar colores primarios afecta todo el sitio  
✅ **Type Safety**: TypeScript asegura que solo se usen colores válidos  
✅ **Reutilización**: Gradientes y utilidades predefinidas para uso común  
✅ **Escalabilidad**: Fácil agregar nuevos colores o variantes  

## Componentes que Usan el Sistema

- ✅ `hero-section.tsx` - Completamente migrado
- 📝 Otros componentes se pueden migrar gradualmente

## Recomendaciones

1. **Usa siempre el sistema** para nuevos componentes
2. **Migra componentes existentes** gradualmente
3. **Define nuevos gradientes** en el archivo de configuración antes de usarlos
4. **Mantén la consistencia** usando los colores predefinidos
