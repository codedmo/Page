# CodedMo Routes - Empresa de Desarrollo de Software

## 🚀 Tecnologías Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Estilos**: Tailwind CSS
- **Animaciones**: CSS 3D y animaciones personalizadas
- **Cubo 3D**: Implementación CSS pura del Cubo de Rubik

## 🎨 Sistema de Colores Centralizado

Este proyecto implementa un sistema de colores centralizado que permite:

- ✅ **Mantenimiento fácil** de esquemas de colores
- ✅ **Cambios globales** con un solo archivo
- ✅ **Consistencia visual** en toda la aplicación
- ✅ **Type Safety** con TypeScript

### Configuración de Colores
📍 **Archivo**: `src/config/theme-colors.ts`

```typescript
// Colores principales: Azul, Cian, Teal
import { themeColors, gradients, hoverColors, borders } from '../config/theme-colors';
```

**[📖 Ver documentación completa del sistema de colores](./docs/SISTEMA_COLORES.md)**

## 🧩 Características Principales

### Hero Section Interactivo
- **Cubo de Rubik 3D** completamente funcional en CSS
- **Animaciones fluidas** y rotación continua
- **Interactividad**: Click para resolver/desarmar el cubo
- **Responsive Design** optimizado para móviles
- **Esquema de colores azul** moderno y profesional

### Efectos Visuales
- Gradientes dinámicos
- Elementos flotantes animados
- Bordes rotativos
- Partículas de fondo
- Código flotante animado

## 📱 Características Responsive

- ✅ **Mobile-first design**
- ✅ **Breakpoints adaptativos** (480px, 768px, 1024px)
- ✅ **Cubo escalable** según dispositivo
- ✅ **Elementos ocultos/visibles** por tamaño de pantalla
- ✅ **Touch-friendly** para dispositivos móviles

## 🛠️ Desarrollo

### Instalación
```bash
npm install
```

### Servidor de Desarrollo
```bash
npm run dev
```

### Build para Producción
```bash
npm run build
```

### Preview de Producción
```bash
npm run preview
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
