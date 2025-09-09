import { useState } from 'react';
import { Calculator, CheckCircle, Clock, DollarSign, FileText, Download, Phone, Settings, Eye, EyeOff, X, Save } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import jsPDF from 'jspdf';
import { useSEO } from '@/hooks/useSEO';

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
}

interface AdminSettings {
  hourlyRate: number;
  currency: string;
  hoursPerDay: number;
  billingPercentage: number;
  isAuthenticated: boolean;
}

// Configuración de administración temporal
const ADMIN_PASSWORD = 'CODEDMO2025';
const DEFAULT_SETTINGS: AdminSettings = {
  hourlyRate: 25,
  currency: 'Q',
  hoursPerDay: 5,
  billingPercentage: 5,
  isAuthenticated: false
};

// Datos expandidos para la cotización con componentes técnicos específicos
const systemElements: QuotationItem[] = [
  {
    id: '1',
    name: 'Diseño UI/UX',
    category: 'UI/UX',
    hours: 20,
    complexity: 'Media',
    description: 'Wireframes, mockups y prototipo interactivo'
  },
  {
    id: '2',
    name: 'Sistema de Componentes',
    category: 'UI/UX',
    hours: 25,
    complexity: 'Media',
    description: 'Design System con componentes reutilizables'
  },
  {
    id: '3',
    name: 'Responsive Design',
    category: 'UI/UX',
    hours: 20,
    complexity: 'Baja',
    description: 'Adaptación móvil, tablet y desktop'
  },
  {
    id: '4',
    name: 'Animaciones y Transiciones',
    category: 'UI/UX',
    hours: 25,
    complexity: 'Media',
    description: 'Micro-interacciones y animaciones CSS/JS'
  },
  {
    id: '5',
    name: 'Testing de Usabilidad',
    category: 'UI/UX',
    hours: 10,
    complexity: 'Media',
    description: 'Pruebas de usuario y optimización UX'
  },
  {
    id: '89',
    name: 'Ícono/Branding de la App',
    category: 'UI/UX',
    hours: 8,
    complexity: 'Baja',
    description: 'Ícono, splash y adaptativos por plataforma'
  },

  {
    id: '6',
    name: 'Estructuración Frontend',
    category: 'Frontend',
    hours: 10,
    complexity: 'Baja',
    description: 'Arquitectura de carpetas y componentes React/Vue'
  },
  {
    id: '7',
    name: 'State Management',
    category: 'Frontend',
    hours: 25,
    complexity: 'Media',
    description: 'Redux, Zustand o Context API'
  },
  {
    id: '8',
    name: 'Formularios Avanzados',
    category: 'Frontend',
    hours: 25,
    complexity: 'Media',
    description: 'Validaciones, campos dinámicos y file uploads'
  },
  {
    id: '9',
    name: 'Routing y Navegación',
    category: 'Frontend',
    hours: 25,
    complexity: 'Baja',
    description: 'React Router o Vue Router con guards'
  },
  {
    id: '10',
    name: 'Optimización Performance',
    category: 'Frontend',
    hours: 20,
    complexity: 'Media',
    description: 'Lazy loading, code splitting, bundle optimization'
  },

  {
    id: '11',
    name: 'Arquitectura MVC',
    category: 'Backend',
    hours: 25,
    complexity: 'Media',
    description: 'Estructura Model-View-Controller'
  },
  {
    id: '12',
    name: 'Creación de API REST',
    category: 'Backend',
    hours: 35,
    complexity: 'Alta',
    description: 'Endpoints RESTful con documentación OpenAPI'
  },
  {
    id: '13',
    name: 'Integración de APIs',
    category: 'Backend',
    hours: 20,
    complexity: 'Media',
    description: 'Consumo de APIs externas y webhooks'
  },
  {
    id: '14',
    name: 'Middleware y Guards',
    category: 'Backend',
    hours: 15,
    complexity: 'Media',
    description: 'Interceptores, validaciones y protección de rutas'
  },
  {
    id: '15',
    name: 'Manejo de Errores',
    category: 'Backend',
    hours: 15,
    complexity: 'Baja',
    description: 'Try-catch, logs y respuestas de error estándar'
  },

  {
    id: '16',
    name: 'Diseño de Base de Datos',
    category: 'Database',
    hours: 10,
    complexity: 'Media',
    description: 'ERD, normalización y optimización'
  },
  {
    id: '17',
    name: 'Estructuración de DB',
    category: 'Database',
    hours: 15,
    complexity: 'Baja',
    description: 'Tablas, relaciones y constraints'
  },
  {
    id: '18',
    name: 'Migrations y Seeds',
    category: 'Database',
    hours: 15,
    complexity: 'Baja',
    description: 'Versionado de DB y datos de prueba'
  },
  {
    id: '19',
    name: 'Índices y Optimización',
    category: 'Database',
    hours: 20,
    complexity: 'Media',
    description: 'Performance queries y indexación'
  },
  {
    id: '20',
    name: 'Backup y Recuperación',
    category: 'Database',
    hours: 15,
    complexity: 'Baja',
    description: 'Estrategias de respaldo automatizado'
  },

  {
    id: '21',
    name: 'CRUD de Usuarios',
    category: 'Users',
    hours: 20,
    complexity: 'Media',
    description: 'Crear, leer, actualizar y eliminar usuarios'
  },
  {
    id: '22',
    name: 'Sistema de Roles',
    category: 'Users',
    hours: 25,
    complexity: 'Media',
    description: 'RBAC con permisos granulares'
  },
  {
    id: '24',
    name: 'Perfiles de Usuario',
    category: 'Users',
    hours: 15,
    complexity: 'Baja',
    description: 'Gestión de perfil y configuraciones'
  },
  {
    id: '43',
    name: 'Administración de Usuarios (Backoffice)',
    category: 'Users',
    hours: 22,
    complexity: 'Media',
    description: 'Alta/baja, suspensión, restablecer contraseñas, auditoría'
  },

  {
    id: '41',
    name: 'Acceso con Email/Password',
    category: 'Auth',
    hours: 16,
    complexity: 'Media',
    description: 'Registro, login, verificación por correo y cierre de sesión'
  },
  {
    id: '42',
    name: 'Acceso con Redes Sociales (OAuth)',
    category: 'Auth',
    hours: 20,
    complexity: 'Media',
    description: 'Google, Facebook, Apple, GitHub con enlace a cuentas'
  },
  {
    id: '23',
    name: 'Autenticación JWT',
    category: 'Auth',
    hours: 25,
    complexity: 'Alta',
    description: 'JSON Web Tokens con refresh tokens'
  },
  {
    id: '25',
    name: 'Recuperación de Contraseña',
    category: 'Auth',
    hours: 20,
    complexity: 'Media',
    description: 'Reset password con email verification'
  },

  {
    id: '26',
    name: 'Encriptación de Datos',
    category: 'Security',
    hours: 20,
    complexity: 'Media',
    description: 'Bcrypt, hashing y datos sensibles'
  },
  {
    id: '28',
    name: 'Validación de Datos',
    category: 'Security',
    hours: 15,
    complexity: 'Baja',
    description: 'Sanitización y validación de inputs'
  },
  {
    id: '29',
    name: 'Rate Limiting',
    category: 'Security',
    hours: 15,
    complexity: 'Media',
    description: 'Protección contra ataques DDoS'
  },
  {
    id: '30',
    name: 'CORS y Headers',
    category: 'Security',
    hours: 10,
    complexity: 'Baja',
    description: 'Configuración de seguridad HTTP'
  },
  {
    id: '55',
    name: 'Certificados de Seguridad (SSL/TLS)',
    category: 'Security',
    hours: 8,
    complexity: 'Baja',
    description: 'HTTPS, renovación automática y HSTS'
  },
  {
    id: '56',
    name: 'Configuraciones de Privacidad',
    category: 'Security',
    hours: 14,
    complexity: 'Media',
    description: 'Controles de visibilidad, consentimientos y data export'
  },
  {
    id: '57',
    name: 'Moderación de Actividad (Seguridad)',
    category: 'Security',
    hours: 18,
    complexity: 'Media',
    description: 'Reportes, bloqueo de usuarios y filtros de contenido'
  },

  {
    id: '27',
    name: 'Pasarela de Pago',
    category: 'Payments',
    hours: 25,
    complexity: 'Alta',
    description: 'Stripe/PayPal integration con webhooks'
  },
  {
    id: '53',
    name: 'Pagos en la App',
    category: 'Payments',
    hours: 20,
    complexity: 'Media',
    description: 'Checkout con pasarela y conciliación básica'
  },
  {
    id: '54',
    name: 'Suscripciones/Recurrentes',
    category: 'Payments',
    hours: 24,
    complexity: 'Alta',
    description: 'Planes, renovación, prorrateos y webhooks de estado'
  },
  {
    id: '97',
    name: 'Reservas con Pagos',
    category: 'Payments',
    hours: 26,
    complexity: 'Alta',
    description: 'Reserva de slots con cobro y reembolso'
  },

  {
    id: '31',
    name: 'SEO On-Page',
    category: 'SEO',
    hours: 15,
    complexity: 'Baja',
    description: 'Meta tags, schema markup y sitemap'
  },
  {
    id: '32',
    name: 'Core Web Vitals',
    category: 'SEO',
    hours: 15,
    complexity: 'Media',
    description: 'Optimización LCP, FID y CLS'
  },
  {
    id: '33',
    name: 'Analytics Integration',
    category: 'SEO',
    hours: 10,
    complexity: 'Baja',
    description: 'Google Analytics y Search Console'
  },
  {
    id: '34',
    name: 'Open Graph & Twitter Cards',
    category: 'SEO',
    hours: 10,
    complexity: 'Baja',
    description: 'Metadatos para redes sociales'
  },
  {
    id: '87',
    name: 'Soporte Open Graph',
    category: 'SEO',
    hours: 8,
    complexity: 'Baja',
    description: 'OG tags por tipo de contenido'
  },

  {
    id: '35',
    name: 'App Android Nativa',
    category: 'Mobile',
    hours: 120,
    complexity: 'Alta',
    description: 'Desarrollo en Kotlin/Java'
  },
  {
    id: '36',
    name: 'App iOS Nativa',
    category: 'Mobile',
    hours: 120,
    complexity: 'Alta',
    description: 'Desarrollo en Swift/SwiftUI'
  },
  {
    id: '37',
    name: 'React Native App (Híbrida)',
    category: 'Mobile',
    hours: 80,
    complexity: 'Alta',
    description: 'App híbrida multiplataforma'
  },
  {
    id: '39',
    name: 'Integración Play Store',
    category: 'Mobile',
    hours: 15,
    complexity: 'Baja',
    description: 'Publicación y configuración en Google Play'
  },
  {
    id: '40',
    name: 'Integración App Store',
    category: 'Mobile',
    hours: 15,
    complexity: 'Baja',
    description: 'Publicación y review en Apple App Store'
  },

  {
    id: '44',
    name: 'Sitio Web 5–8 páginas',
    category: 'Web',
    hours: 35,
    complexity: 'Media',
    description: 'Home, About, Servicios, Portafolio, Blog, Contacto, Políticas'
  },
  {
    id: '107',
    name: 'Páginas de Campaña/Landing',
    category: 'Web',
    hours: 14,
    complexity: 'Baja',
    description: 'Landing para campañas con conversión y A/B testing básico'
  },
  {
    id: '108',
    name: 'Formulario de Contacto + Captcha',
    category: 'Web',
    hours: 10,
    complexity: 'Baja',
    description: 'Formulario, validación, reCAPTCHA y envío a email/CRM'
  },

  {
    id: '45',
    name: 'Sistema para Administrar Contenido (CMS)',
    category: 'Content',
    hours: 28,
    complexity: 'Media',
    description: 'CRUD de posts, páginas, categorías y publicación programada'
  },
  {
    id: '46',
    name: 'Soporte para Comentarios',
    category: 'Content',
    hours: 14,
    complexity: 'Baja',
    description: 'Comentarios con moderación y notificaciones'
  },
  {
    id: '47',
    name: 'Clasificación por TAGS',
    category: 'Content',
    hours: 20,
    complexity: 'Media',
    description: 'Etiquetado de contenido y filtrado por taxonomías'
  },

  {
    id: '48',
    name: 'Texto libre de búsqueda (Full-Text)',
    category: 'Search',
    hours: 18,
    complexity: 'Media',
    description: 'Búsqueda con índices, sugerencias y resaltado'
  },
  {
    id: '101',
    name: 'Búsqueda por Filtros/Facetas',
    category: 'Search',
    hours: 16,
    complexity: 'Media',
    description: 'Facetas por categoría, precio, fecha y ordenamiento'
  },

  {
    id: '49',
    name: 'Carga de Archivos',
    category: 'Files & Media',
    hours: 20,
    complexity: 'Media',
    description: 'Subida segura, tamaños máximos, virus scan y previews'
  },
  {
    id: '50',
    name: 'Edición Básica de Imágenes',
    category: 'Files & Media',
    hours: 24,
    complexity: 'Media',
    description: 'Crop, resize, compresión, thumbnails, conversión de formato'
  },
  {
    id: '51',
    name: 'Procesamiento de Video/Audio (server-side)',
    category: 'Files & Media',
    hours: 28,
    complexity: 'Alta',
    description: 'Transcodificación, metadatos y streaming adaptativo básico'
  },
  {
    id: '85',
    name: 'Música y Audio',
    category: 'Files & Media',
    hours: 16,
    complexity: 'Media',
    description: 'Reproductor, playlists y control en background'
  },

  {
    id: '52',
    name: 'Carrito de Compras',
    category: 'Ecommerce',
    hours: 35,
    complexity: 'Media',
    description: 'Carrito persistente, cupones y cálculo de totales'
  },
  {
    id: '102',
    name: 'Wishlist/Favoritos',
    category: 'Ecommerce',
    hours: 15,
    complexity: 'Baja',
    description: 'Listas de deseos por usuario y sincronización'
  },

  {
    id: '59',
    name: 'Envío de Correos',
    category: 'Comms',
    hours: 15,
    complexity: 'Baja',
    description: 'Plantillas transaccionales y reputación (SPF/DKIM/DMARC)'
  },
  {
    id: '60',
    name: 'Integración SMS',
    category: 'Comms',
    hours: 14,
    complexity: 'Media',
    description: 'OTP, recordatorios y webhooks de entrega'
  },
  {
    id: '61',
    name: 'Chat en Tiempo Real',
    category: 'Comms',
    hours: 30,
    complexity: 'Media',
    description: 'Canales, presencia y lectura/entrega'
  },
  {
    id: '38',
    name: 'Notificaciones Push',
    category: 'Comms',
    hours: 25,
    complexity: 'Media',
    description: 'FCM/APNS integration'
  },
  {
    id: '88',
    name: 'Plantillas de Email',
    category: 'Comms',
    hours: 15,
    complexity: 'Baja',
    description: 'Motores de plantillas y variables'
  },

  {
    id: '62',
    name: 'Funcionalidad Offline',
    category: 'Offline & Realtime',
    hours: 18,
    complexity: 'Media',
    description: 'Cache, cola local y reintentos (PWA/SQLite móvil)'
  },
  {
    id: '63',
    name: 'Sincronización Multi-Dispositivo',
    category: 'Offline & Realtime',
    hours: 30,
    complexity: 'Media',
    description: 'Conflictos, merges y timestamping'
  },
  {
    id: '64',
    name: 'Usuarios Concurrentes en Tiempo Real',
    category: 'Offline & Realtime',
    hours: 16,
    complexity: 'Media',
    description: 'WS/Webhooks para conteo de presencia'
  },

  {
    id: '65',
    name: 'Geo-Localización',
    category: 'Device & Sensors',
    hours: 14,
    complexity: 'Baja',
    description: 'Permisos, precisión y reverse-geocoding'
  },
  {
    id: '66',
    name: 'Mapas',
    category: 'Device & Sensors',
    hours: 15,
    complexity: 'Media',
    description: 'Map SDK, marcadores, rutas y clustering básico'
  },
  {
    id: '67',
    name: 'Brújula / Sensor de Orientación',
    category: 'Device & Sensors',
    hours: 10,
    complexity: 'Baja',
    description: 'Lectura de sensores y smoothing'
  },
  {
    id: '68',
    name: 'Códigos QR',
    category: 'Device & Sensors',
    hours: 8,
    complexity: 'Baja',
    description: 'Generación y escaneo en móvil'
  },
  {
    id: '69',
    name: 'Códigos de Barra',
    category: 'Device & Sensors',
    hours: 14,
    complexity: 'Media',
    description: 'Escaneo multi-formato y validación'
  },
  {
    id: '70',
    name: 'Cámara y Fotografías',
    category: 'Device & Sensors',
    hours: 16,
    complexity: 'Media',
    description: 'Captura, permisos y metadatos EXIF'
  },
  {
    id: '71',
    name: 'Cámara y Video',
    category: 'Device & Sensors',
    hours: 18,
    complexity: 'Media',
    description: 'Grabación, compresión y subida'
  },

  {
    id: '72',
    name: 'Integración Calendario',
    category: 'Integrations',
    hours: 16,
    complexity: 'Media',
    description: 'Eventos, recordatorios y permisos'
  },
  {
    id: '73',
    name: 'Integración con Terceros (API)',
    category: 'Integrations',
    hours: 20,
    complexity: 'Media',
    description: 'OAuth2, rate limits y firma de peticiones'
  },
  {
    id: '106',
    name: 'SSO Enterprise (SAML/OIDC)',
    category: 'Integrations',
    hours: 25,
    complexity: 'Alta',
    description: 'Integración con proveedores SSO (Okta, Azure AD, ADFS)'
  },

  {
    id: '74',
    name: 'Compartir en Redes Sociales',
    category: 'Social',
    hours: 8,
    complexity: 'Baja',
    description: 'Share intents y deep-links'
  },
  {
    id: '76',
    name: 'Sistema de Calificaciones',
    category: 'Social',
    hours: 12,
    complexity: 'Baja',
    description: 'Estrellas, ‘likes’ y ranking'
  },
  {
    id: '77',
    name: 'Sistema de Retroalimentación',
    category: 'Social',
    hours: 10,
    complexity: 'Baja',
    description: 'NPS, encuestas y formularios in-app'
  },

  {
    id: '78',
    name: 'Reservas/Booking',
    category: 'Business & Productivity',
    hours: 22,
    complexity: 'Media',
    description: 'Slots, disponibilidad, cancelaciones y recordatorios'
  },
  {
    id: '79',
    name: 'Listas de Tareas',
    category: 'Business & Productivity',
    hours: 10,
    complexity: 'Baja',
    description: 'CRUD, recordatorios y prioridades'
  },

  {
    id: '80',
    name: 'Múltiples Lenguajes (i18n)',
    category: 'Internationalization & Accessibility',
    hours: 25,
    complexity: 'Media',
    description: 'Traducciones, fechas/moneda y RTL'
  },
  {
    id: '81',
    name: 'Accesibilidad (a11y)',
    category: 'Internationalization & Accessibility',
    hours: 14,
    complexity: 'Media',
    description: 'Teclado, ARIA, contraste y lectores de pantalla'
  },

  {
    id: '82',
    name: 'Panel de Configuración',
    category: 'Admin & Moderation',
    hours: 12,
    complexity: 'Baja',
    description: 'Flags, parámetros del sistema y toggles'
  },
  {
    id: '90',
    name: 'Capacidad de Moderar Actividad',
    category: 'Admin & Moderation',
    hours: 16,
    complexity: 'Media',
    description: 'Herramientas de revisión, baneo y auditoría'
  },
  {
    id: '99',
    name: 'Panel de Moderación Avanzado',
    category: 'Admin & Moderation',
    hours: 22,
    complexity: 'Alta',
    description: 'Cola de revisión, reglas y métricas'
  },

  {
    id: '83',
    name: 'Reportes de Estadísticas',
    category: 'Analytics & Quality',
    hours: 18,
    complexity: 'Media',
    description: 'Dashboards, exportables y KPIs'
  },
  {
    id: '58',
    name: 'Reporte de Errores',
    category: 'Analytics & Quality',
    hours: 10,
    complexity: 'Baja',
    description: 'Sentry/LogRocket, alertas y trazabilidad'
  },

  {
    id: '84',
    name: 'Realidad Aumentada Básica',
    category: 'R&D',
    hours: 32,
    complexity: 'Alta',
    description: 'ARKit/ARCore o WebAR para overlays simples'
  },
  {
    id: '103',
    name: 'Generación de Imágenes con IA',
    category: 'R&D',
    hours: 24,
    complexity: 'Alta',
    description: 'Prompts, estilos y post-procesado automático'
  },

  {
    id: '100',
    name: 'Exportación de Datos (CSV/JSON)',
    category: 'Data',
    hours: 10,
    complexity: 'Baja',
    description: 'Descarga de listados y backups manuales'
  },
  {
    id: '105',
    name: 'Importación de Datos (CSV/Excel)',
    category: 'Data',
    hours: 20,
    complexity: 'Media',
    description: 'Validación, mapeo de columnas y vista previa'
  },

  {
    id: '91',
    name: 'Cola de Trabajos/Background Jobs',
    category: 'Ops & Infra',
    hours: 16,
    complexity: 'Media',
    description: 'Workers para emails, pagos y procesamientos'
  },
  {
    id: '92',
    name: 'Cache de Aplicación',
    category: 'Ops & Infra',
    hours: 12,
    complexity: 'Media',
    description: 'Cacheo en memoria/Redis y políticas de expiración'
  },
  {
    id: '94',
    name: 'CI/CD Básico',
    category: 'Ops & Infra',
    hours: 12,
    complexity: 'Media',
    description: 'Builds automatizados, tests y despliegue'
  },
  {
    id: '95',
    name: 'Testing E2E/Unitario',
    category: 'Ops & Infra',
    hours: 20,
    complexity: 'Media',
    description: 'Cobertura mínima y pruebas de flujo crítico'
  },

  {
    id: '96',
    name: 'Políticas y Términos',
    category: 'Compliance & Legal',
    hours: 8,
    complexity: 'Baja',
    description: 'Privacidad, Términos y manejo de cookies'
  },
  {
    id: '104',
    name: 'Gestión de Consentimiento de Cookies',
    category: 'Compliance & Legal',
    hours: 8,
    complexity: 'Baja',
    description: 'Banner, preferencias granulares y log de consentimientos'
  }
];

export default function QuotationModern() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    systemElements.map(item => ({ ...item, selected: false }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Estados para el panel de administración
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempHours, setTempHours] = useState<number>(0);

  // SEO para Cotizador Moderno
  useSEO({
    title: 'Cotizador de Proyectos - Presupuesto Instantáneo | CODEDMO',
    description: 'Cotizador interactivo para proyectos de desarrollo web y software. Genera presupuestos detallados y exporta cotizaciones en PDF profesional.',
    keywords: ['cotizador proyectos', 'presupuesto desarrollo', 'calculadora costos web', 'estimación software', 'cotización pdf'],
    canonical: '/servicios/cotizacion/estimacion-rapida#cotizador',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Cotizador de Proyectos CODEDMO",
      "description": "Herramienta de cotización interactiva para proyectos de desarrollo de software",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GTQ"
      }
    },
    section: 'quotation-tools',
    priority: 'high'
  });

  // Cálculos con configuración dinámica
  const selectedItemsList = selectedItems.filter(item => item.selected);
  const subtotalPrice = selectedItemsList.reduce((sum, item) => sum + (item.hours * adminSettings.hourlyRate), 0);
  const billingAmount = subtotalPrice * (adminSettings.billingPercentage / 100);
  const totalPrice = subtotalPrice + billingAmount;
  const totalHours = selectedItemsList.reduce((sum, item) => sum + item.hours, 0);
  const estimatedDays = Math.ceil(totalHours / adminSettings.hoursPerDay);

  // Funciones de administración
  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminSettings(prev => ({ ...prev, isAuthenticated: true }));
      setAdminPassword('');
      alert('¡Acceso concedido! Ahora puedes modificar la configuración.');
    } else {
      alert('Contraseña incorrecta');
      setAdminPassword('');
    }
  };

  const handleAdminLogout = () => {
    setAdminSettings(DEFAULT_SETTINGS);
    setShowAdminPanel(false);
    setEditingItemId(null);
  };

  const handleSettingsChange = (key: keyof AdminSettings, value: number | string) => {
    setAdminSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleItemHoursChange = (itemId: string, newHours: number) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, hours: Math.max(1, newHours) }
          : item
      )
    );
    setEditingItemId(null);
  };

  const startEditingHours = (itemId: string, currentHours: number) => {
    setEditingItemId(itemId);
    setTempHours(currentHours);
  };

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const handlePhoneContact = () => {
    window.open('tel:+50237923612', '_self');
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Colores modernos y tecnológicos
    const colors = {
      primary: [99, 102, 241], // Índigo
      secondary: [139, 92, 246], // Violet
      accent: [59, 130, 246], // Blue
      techBlue: [20, 184, 166], // Teal
      darkBg: [15, 23, 42], // Dark slate
      cardBg: [30, 41, 59], // Slate
      lightBg: [248, 250, 252], // Light gray
      text: [51, 65, 85], // Dark text
      lightText: [148, 163, 184], // Light text
      success: [34, 197, 94],
      warning: [245, 158, 11],
      danger: [239, 68, 68],
      purple: [180, 50, 160]
    };

    // ========== PÁGINA 1: PORTADA ==========
    // Fondo degradado moderno
    doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Elementos geométricos decorativos
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.circle(200, 30, 20, 'F');
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.circle(15, 280, 15, 'F');
    doc.setFillColor(colors.techBlue[0], colors.techBlue[1], colors.techBlue[2]);
    doc.rect(180, 250, 30, 30, 'F');
    
    // Logo y marca principal
    doc.setFontSize(36);
    doc.setTextColor(255, 255, 255);
    doc.text('CODEDMO', 105, 80, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(colors.techBlue[0], colors.techBlue[1], colors.techBlue[2]);
    doc.text('DESARROLLO DE SOFTWARE PROFESIONAL', 105, 95, { align: 'center' });
    
    // Título principal
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('COTIZACIÓN', 105, 130, { align: 'center' });
    doc.text('TÉCNICA', 105, 145, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text('Estimado de Proyecto de Desarrollo', 105, 165, { align: 'center' });
    
    // Información del documento
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(40, 190, 130, 60, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(colors.techBlue[0], colors.techBlue[1], colors.techBlue[2]);
    doc.text('INFORMACIÓN DEL DOCUMENTO', 105, 205, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-GT')}`, 50, 220);
    doc.text(`Cotización #: COD-${Date.now().toString().slice(-6)}`, 50, 230);
    doc.text(`Cliente: Proyecto Personalizado`, 50, 240);
    
    // Footer de portada
    doc.setFontSize(10);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text('Tel: +502 3792-3612 | Email: info@codedmo.com', 105, 280, { align: 'center' });

    // ========== PÁGINA 2: RESUMEN EJECUTIVO ==========
    doc.addPage();
    
    // Header de página interna
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.rect(0, 0, 210, 25, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text('CODEDMO - Cotización Técnica', 20, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text(`Página 2 | ${new Date().toLocaleDateString('es-GT')}`, 150, 15);
    
    let yPos = 40;
    
    // Título de sección
    doc.setFontSize(20);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('RESUMEN EJECUTIVO', 20, yPos);
    yPos += 20;
    
    // Métricas principales en cards
    const metrics = [
      { label: 'Total de Elementos', value: selectedItemsList.length.toString(), color: colors.primary },
      { label: 'Horas Totales', value: `${totalHours}h`, color: colors.secondary },
      { label: 'Días Laborales', value: `${estimatedDays} días`, color: colors.techBlue },
      { label: 'Costo', value: `${adminSettings.currency}${subtotalPrice.toLocaleString()}`, color: colors.warning },
      { label: `IVA (${adminSettings.billingPercentage}%)`, value: `${adminSettings.currency}${billingAmount.toLocaleString()}`, color: colors.purple },
      { label: 'Total', value: `${adminSettings.currency}${totalPrice.toLocaleString()}`, color: colors.success }
    ];
    
    metrics.forEach((metric, index) => {
      const xPos = 20 + (index % 2) * 90;
      const yOffset = Math.floor(index / 2) * 40;
      
      doc.setFillColor(metric.color[0], metric.color[1], metric.color[2]);
      doc.rect(xPos, yPos + yOffset, 80, 30, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(metric.label, xPos + 5, yPos + yOffset + 10);
      
      doc.setFontSize(16);
      doc.text(metric.value, xPos + 5, yPos + yOffset + 23);
    });
    
    yPos += 100;
    
    // Distribución por categorías
    doc.setFontSize(16);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text('DISTRIBUCIÓN POR CATEGORÍAS', 20, yPos);
    yPos += 15;
    
    const categoryStats = categories.map(category => {
      const items = selectedItemsList.filter(item => item.category === category);
      const hours = items.reduce((sum, item) => sum + item.hours, 0);
      const cost = hours * adminSettings.hourlyRate;
      return { category, items: items.length, hours, cost };
    }).filter(stat => stat.items > 0);
    
    categoryStats.forEach(stat => {
      doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
      doc.rect(20, yPos - 3, 170, 12, 'F');
      
      doc.setFontSize(11);
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.text(stat.category, 25, yPos + 4);
      doc.text(`${stat.items} elementos`, 80, yPos + 4);
      doc.text(`${stat.hours}h`, 120, yPos + 4);
      doc.text(`Q${stat.cost.toLocaleString()}`, 150, yPos + 4);
      
      yPos += 15;
    });

    // ========== PÁGINA 3: DETALLE TÉCNICO ==========
    doc.addPage();
    
    // Header
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.rect(0, 0, 210, 25, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text('CODEDMO - Cotización Técnica', 20, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text(`Página 3 | ${new Date().toLocaleDateString('es-GT')}`, 150, 15);
    
    yPos = 40;
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('DETALLE TÉCNICO', 20, yPos);
    yPos += 25;
    
    if (selectedItemsList.length > 0) {
      // Header de tabla moderna
      doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
      doc.rect(20, yPos - 5, 170, 15, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text('ELEMENTO', 25, yPos + 5);
      doc.text('COMPLEJIDAD', 90, yPos + 5);
      doc.text('HORAS', 140, yPos + 5);
      doc.text('COSTO', 165, yPos + 5);
      
      yPos += 20;
      
      // Detalles por categoría
      categories.forEach(category => {
        const categoryItems = selectedItemsList.filter(item => item.category === category);
        if (categoryItems.length === 0) return;
        
        // Header de categoría
        doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.rect(20, yPos - 3, 170, 12, 'F');
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text(category, 25, yPos + 4);
        yPos += 15;
        
        // Items
        categoryItems.forEach((item, index) => {
          if (yPos > 270) {
            doc.addPage();
            
            // Header en nueva página
            doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
            doc.rect(0, 0, 210, 25, 'F');
            
            doc.setFontSize(14);
            doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
            doc.text('CODEDMO - Cotización Técnica', 20, 15);
            
            doc.setFontSize(10);
            doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
            doc.text(`Continuación | ${new Date().toLocaleDateString('es-GT')}`, 150, 15);
            
            yPos = 40;
          }
          
          // Fondo alternado
          if (index % 2 === 0) {
            doc.setFillColor(249, 250, 251);
            doc.rect(20, yPos - 2, 170, 10, 'F');
          }
          
          doc.setFontSize(9);
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          const itemName = item.name.length > 35 ? item.name.substring(0, 32) + '...' : item.name;
          doc.text(itemName, 25, yPos + 3);
          
          // Badge de complejidad
          let complexityColor = colors.success;
          if (item.complexity === 'Media') complexityColor = colors.warning;
          if (item.complexity === 'Alta') complexityColor = colors.danger;
          
          doc.setFillColor(complexityColor[0], complexityColor[1], complexityColor[2]);
          doc.rect(90, yPos - 1, 25, 8, 'F');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text(item.complexity, 92, yPos + 4);
          
          doc.setFontSize(9);
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          doc.text(`${item.hours}h`, 145, yPos + 3);
          
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          doc.text(`${adminSettings.currency}${(item.hours * adminSettings.hourlyRate).toLocaleString()}`, 165, yPos + 3);
          
          yPos += 12;
        });
        yPos += 8;
      });
    }

    // ========== PÁGINA 4: TÉRMINOS Y CONDICIONES ==========
    doc.addPage();
    
    // Header
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.rect(0, 0, 210, 25, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text('CODEDMO - Cotización Técnica', 20, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text(`Página 4 | ${new Date().toLocaleDateString('es-GT')}`, 150, 15);
    
    yPos = 40;
    
    // Resumen final
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(20, yPos, 170, 60, 'F');
    
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('RESUMEN FINAL', 105, yPos + 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Costo: ${adminSettings.currency}${subtotalPrice.toLocaleString()}`, 105, yPos + 30, { align: 'center' });
    doc.text(`IVA (${adminSettings.billingPercentage}%): ${adminSettings.currency}${billingAmount.toLocaleString()}`, 105, yPos + 40, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text(`TOTAL: ${adminSettings.currency}${totalPrice.toLocaleString()}`, 105, yPos + 55, { align: 'center' });
    
    yPos += 80;
    
    // Términos importantes
    doc.setFontSize(16);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text('TÉRMINOS Y CONDICIONES', 20, yPos);
    yPos += 20;
    
    const terms = [
      'Este es un estimado aproximado basado en especificaciones generales.',
      'El costo final puede variar según la complejidad específica del proyecto.',
      'Se requiere reunión técnica para afinar detalles y requerimientos.',
      'Tiempo de desarrollo estimado: ' + estimatedDays + ' días laborales.',
      'Incluye pruebas básicas y documentación técnica.',
      'No incluye hosting, dominio o servicios externos adicionales.'
    ];
    
    terms.forEach(term => {
      doc.setFontSize(10);
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.text('• ' + term, 25, yPos);
      yPos += 8;
    });
    
    yPos += 20;
    
    // Contacto destacado
    doc.setFillColor(colors.darkBg[0], colors.darkBg[1], colors.darkBg[2]);
    doc.rect(20, yPos, 170, 30, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(colors.techBlue[0], colors.techBlue[1], colors.techBlue[2]);
    doc.text('CONTACTO DIRECTO', 105, yPos + 12, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('Tel: +502 3792-3612 | Email: info@codedmo.com', 105, yPos + 22, { align: 'center' });
    
    // Footer final
    doc.setFontSize(8);
    doc.setTextColor(colors.lightText[0], colors.lightText[1], colors.lightText[2]);
    doc.text('CODEDMO - Soluciones Tecnológicas Innovadoras', 105, 285, { align: 'center' });
    doc.text(`Documento generado: ${new Date().toLocaleString('es-GT')}`, 105, 292, { align: 'center' });
    
    // Descargar
    doc.save(`Cotizacion-Tecnica-CODEDMO-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getCategoryItems = (category: string) => {
    return selectedItems.filter(item => item.category === category);
  };

  const getFilteredCategories = () => {
    if (selectedCategory === 'all') {
      return categories;
    }
    return categories.filter(category => category === selectedCategory);
  };

  // const getFilteredItems = () => {
  //   if (selectedCategory === 'all') {
  //     return selectedItems;
  //   }
  //   return selectedItems.filter(item => item.category === selectedCategory);
  // };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Baja':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Media':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Alta':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const categories = Array.from(new Set(systemElements.map(item => item.category)));

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header - más compacto */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-3`}>
          <Calculator className="w-4 h-4 mr-2" />
          Cotizador Inteligente
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Calcula el <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>costo</span> de tu proyecto
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm">
          Selecciona los elementos que necesitas y obtén una cotización personalizada al instante.
        </p>
        <div className="mt-3 inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
          <DollarSign className="w-4 h-4 mr-1" />
          Tarifa: {adminSettings.currency}{adminSettings.hourlyRate}/hora + {adminSettings.billingPercentage}% IVA
        </div>
        
        {/* Botón de administración */}
        <div className="mt-3">
          <button
            onClick={() => setShowAdminPanel(true)}
            className="inline-flex items-center px-2 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full text-gray-400 hover:text-gray-300 text-xs transition-colors"
            title="Panel de Administración"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-6 gap-4">
        {/* Panel lateral de filtros */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 sticky top-20">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-purple-400" />
              Categorías
            </h3>
            <div className="max-h-[700px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500/70 pr-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Todas ({systemElements.length})
              </button>
              {categories.map(category => {
                const count = systemElements.filter(item => item.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{category}</span>
                      <span className="text-xs opacity-75">({count})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lista de elementos - más compacta */}
        <div className="lg:col-span-3 space-y-3">
          {getFilteredCategories().map(category => (
            <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <h3 className="text-base font-bold text-white mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-400" />
                {category}
                <span className="ml-2 text-xs text-gray-400">
                  ({getCategoryItems(category).length} elementos)
                </span>
              </h3>
              <div className="grid md:grid-cols-1 gap-2">
                {getCategoryItems(category).map(item => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                      item.selected 
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          item.selected ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                        }`}>
                          {item.selected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                          <p className="text-gray-400 text-xs truncate">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getComplexityColor(item.complexity)}`}>
                          {item.complexity}
                        </span>
                        <div className="text-right">
                          <div className="text-purple-400 font-bold text-sm">{adminSettings.currency}{(item.hours * adminSettings.hourlyRate).toLocaleString()}</div>
                          <div className="text-gray-400 text-xs flex items-center">
                            {adminSettings.isAuthenticated && editingItemId === item.id ? (
                              <div className="flex items-center space-x-1">
                                <input
                                  type="number"
                                  value={tempHours}
                                  onChange={(e) => setTempHours(Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-12 px-1 text-xs bg-gray-700 text-white border border-gray-600 rounded"
                                  min="1"
                                  title="Editar horas"
                                  placeholder="Horas"
                                />
                                <button
                                  onClick={() => handleItemHoursChange(item.id, tempHours)}
                                  className="text-green-400 hover:text-green-300"
                                  title="Guardar cambios"
                                >
                                  <Save className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => setEditingItemId(null)}
                                  className="text-red-400 hover:text-red-300"
                                  title="Cancelar"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <span
                                onClick={() => adminSettings.isAuthenticated && startEditingHours(item.id, item.hours)}
                                className={adminSettings.isAuthenticated ? "cursor-pointer hover:text-white" : ""}
                              >
                                {item.hours}h
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de cotización - sidebar compacto */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 sticky top-20 z-20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-400" />
              Cotización
            </h3>
            
            {selectedItemsList.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  Selecciona elementos para ver la cotización
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Items seleccionados - más compacto */}
                <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500/70">
                  {selectedItemsList.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs bg-white/5 rounded-lg p-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-medium block truncate">{item.name}</span>
                        <div className="text-gray-400 text-xs">{item.hours}h</div>
                      </div>
                      <span className="text-purple-400 font-bold text-xs ml-2">{adminSettings.currency}{(item.hours * adminSettings.hourlyRate).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/20 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total horas:</span>
                    <span className="text-white font-semibold">{totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-white">Total:</span>
                    <span className="text-lg font-bold text-green-400">
                      {adminSettings.currency}{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className={`bg-gradient-to-r ${gradients.primary} bg-opacity-20 rounded-lg p-2 border border-purple-500/30`}>
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm">Tiempo estimado</span>
                  </div>
                  <p className="text-white text-sm">
                    {estimatedDays} días laborales
                  </p>
                </div>

                <button
                  onClick={generatePDF}
                  disabled={selectedItemsList.length === 0}
                  className={`w-full py-2 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </button>
                
              </div>
            )}
            
            {/* Disclaimer importante - más compacto */}
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-500/30 mt-3">
              <h4 className="text-yellow-300 font-semibold text-xs mb-1 flex items-center">
                ⚠️ Estimado de Proyecto
              </h4>
              <p className="text-yellow-200/80 text-xs leading-relaxed">
                Este es un <strong>estimado aproximado</strong>. El costo final puede variar según la complejidad específica.
              </p>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-gray-400 text-xs mb-1">
                ¿Necesitas algo personalizado?
              </p>
              <button 
                onClick={handlePhoneContact}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors flex items-center justify-center mx-auto"
              >
                <Phone className="w-4 h-4 mr-1" />
                +502 3792-3612
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal del Panel de Administración */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" />
                Panel de Administración
              </h3>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-white"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!adminSettings.isAuthenticated ? (
              /* Panel de Login */
              <div className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña de Administrador
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="Ingresa la contraseña"
                      onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAdminLogin}
                  className={`w-full py-2 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25`}
                >
                  Acceder
                </button>
              </div>
            ) : (
              /* Panel de Configuración */
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="admin-hourly-rate" className="block text-sm font-medium text-gray-300 mb-2">
                      Tarifa por Hora
                    </label>
                    <input
                      id="admin-hourly-rate"
                      type="number"
                      value={adminSettings.hourlyRate}
                      onChange={(e) => handleSettingsChange('hourlyRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                      min="0"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-currency" className="block text-sm font-medium text-gray-300 mb-2">
                      Moneda
                    </label>
                    <select
                      id="admin-currency"
                      value={adminSettings.currency}
                      onChange={(e) => handleSettingsChange('currency', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Q">Q (Quetzal)</option>
                      <option value="$">$ (Dólar)</option>
                      <option value="€">€ (Euro)</option>
                      <option value="£">£ (Libra)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="admin-hours-per-day" className="block text-sm font-medium text-gray-300 mb-2">
                    Horas Trabajadas por Día
                  </label>
                  <input
                    id="admin-hours-per-day"
                    type="number"
                    value={adminSettings.hoursPerDay}
                    onChange={(e) => handleSettingsChange('hoursPerDay', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                    min="1"
                    max="24"
                  />
                </div>

                <div>
                  <label htmlFor="admin-billing-percentage" className="block text-sm font-medium text-gray-300 mb-2">
                    IVA (%)
                  </label>
                  <input
                    id="admin-billing-percentage"
                    type="number"
                    value={adminSettings.billingPercentage}
                    onChange={(e) => handleSettingsChange('billingPercentage', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                  <p className="text-purple-300 text-sm">
                    ✨ <strong>Modo Administrador Activo</strong><br />
                    • Haz clic en las horas de cualquier elemento para editarlas<br />
                    • El IVA se aplica automáticamente al costo<br />
                    • Los cambios se aplican instantáneamente
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAdminPanel(false)}
                    className="flex-1 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
