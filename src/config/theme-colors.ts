// Configuración centralizada de colores del tema
// Permite fácil mantenimiento y cambios de esquema de colores

export const themeColors = {
  // Color principal del tema
  primary: {
    50: 'blue-50',
    100: 'blue-100',
    200: 'blue-200',
    300: 'blue-300',
    400: 'blue-400',
    500: 'blue-500',
    600: 'blue-600',
    700: 'blue-700',
    800: 'blue-800',
    900: 'blue-900',
  },
  
  // Color secundario (cyan para gradientes)
  secondary: {
    50: 'cyan-50',
    100: 'cyan-100',
    200: 'cyan-200',
    300: 'cyan-300',
    400: 'cyan-400',
    500: 'cyan-500',
    600: 'cyan-600',
    700: 'cyan-700',
    800: 'cyan-800',
    900: 'cyan-900',
  },
  
  // Color terciario (teal para acentos)
  accent: {
    50: 'teal-50',
    100: 'teal-100',
    200: 'teal-200',
    300: 'teal-300',
    400: 'teal-400',
    500: 'teal-500',
    600: 'teal-600',
    700: 'teal-700',
    800: 'teal-800',
    900: 'teal-900',
  },
  
  // Colores adicionales para variedad visual
  purple: {
    400: 'purple-400',
    500: 'purple-500',
    600: 'purple-600',
    700: 'purple-700',
  },
  
  emerald: {
    400: 'emerald-400',
    500: 'emerald-500',
    600: 'emerald-600',
    700: 'emerald-700',
  },
  
  orange: {
    400: 'orange-400',
    500: 'orange-500',
    600: 'orange-600',
    700: 'orange-700',
  },
  
  pink: {
    400: 'pink-400',
    500: 'pink-500',
    600: 'pink-600',
    700: 'pink-700',
  },
  
  // Colores de estado
  success: {
    400: 'green-400',
    500: 'green-500',
  },
  
  warning: {
    400: 'orange-400',
    500: 'orange-500',
  },
  
  // Colores neutros
  neutral: {
    50: 'slate-50',
    100: 'slate-100',
    200: 'slate-200',
    300: 'slate-300',
    400: 'slate-400',
    500: 'slate-500',
    600: 'slate-600',
    700: 'slate-700',
    800: 'slate-800',
    900: 'slate-900',
  },
  
  // Colores de texto
  text: {
    primary: 'text-white',
    emphasis: 'text-blue-500',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
  }
} as const;

// Gradientes predefinidos para fácil uso
export const gradients = {
  // Gradientes principales
  primary: `from-${themeColors.primary[700]} to-${themeColors.primary[600]}`,
  primaryLight: `from-${themeColors.primary[600]} to-${themeColors.secondary[600]}`,
  primaryToSecondary: `from-${themeColors.primary[400]} to-${themeColors.secondary[400]}`,
  
  // Gradientes de fondo
  backgroundMain: `from-${themeColors.neutral[900]} via-${themeColors.primary[900]} to-${themeColors.neutral[900]}`,
  backgroundGlow: `from-${themeColors.primary[500]}/20 to-${themeColors.secondary[500]}/20`,
  
  // Gradientes de texto
  textPrimary: `from-${themeColors.primary[400]} to-${themeColors.secondary[400]}`,
  textSecondary: `from-white via-${themeColors.primary[200]} to-${themeColors.secondary[200]}`,
  
  // Gradientes de elementos decorativos
  border: `from-${themeColors.primary[500]} via-${themeColors.secondary[500]} to-${themeColors.accent[500]}`,
  borderReverse: `from-${themeColors.accent[500]} via-${themeColors.secondary[500]} to-${themeColors.primary[500]}`,

} as const;

// Utilidades para generar clases con opacidad
export const withOpacity = (color: string, opacity: number) => `${color}/${opacity}`;

// Utilidades para generar clases de hover
export const hoverColors = {
  primary: `hover:bg-${themeColors.primary[500]}/10`,
  primaryButton: `hover:shadow-lg hover:shadow-${themeColors.primary[500]}/25`,
  primaryButtonHover: `from-${themeColors.primary[800]} to-${themeColors.primary[700]}`,
} as const;

// Bordes con el esquema de colores
export const borders = {
  primary: `border-${themeColors.primary[500]}/30`,
  primaryStrong: `border-${themeColors.primary[500]}/50`,
  secondary: `border-${themeColors.secondary[500]}/30`,
  neutral: `border-${themeColors.primary[500]}/20`,
} as const;
