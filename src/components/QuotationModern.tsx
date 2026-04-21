import { useState } from 'react';
import { Calculator, CheckCircle, Clock, DollarSign, FileText, Download, Phone, Settings, Eye, EyeOff, X, Save, Loader2 } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
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
const ADMIN_PASSWORD = '@Programacion256';
const DEFAULT_SETTINGS: AdminSettings = {
  hourlyRate: 30,
  currency: 'Q',
  hoursPerDay: 5,
  billingPercentage: 5,
  isAuthenticated: false
};

// Datos de cotización — cada ítem es específico, sin duplicados ni englobaciones
const systemElements: QuotationItem[] = [
  // ── UI/UX ──
  {
    id: '1',
    name: 'Wireframes y Prototipo Clickeable (Figma)',
    category: 'UI/UX',
    hours: 20,
    complexity: 'Media',
    description: 'Bocetos de pantallas, flujos de usuario y prototipo interactivo en Figma con hasta 15 pantallas'
  },
  {
    id: '2',
    name: 'Guía de Estilos (Tipografía, Colores y Tokens)',
    category: 'UI/UX',
    hours: 24,
    complexity: 'Media',
    description: 'Paleta de colores, escalas tipográficas, espaciados y tokens CSS/Tailwind documentados'
  },
  {
    id: '3',
    name: 'Librería de Componentes UI Reutilizables',
    category: 'UI/UX',
    hours: 26,
    complexity: 'Media',
    description: 'Botones, inputs, cards, modals y tablas como componentes codificados con variantes y props'
  },
  {
    id: '4',
    name: 'Maquetación Responsive (Mobile + Tablet + Desktop)',
    category: 'UI/UX',
    hours: 26,
    complexity: 'Baja',
    description: 'CSS Grid/Flexbox adaptado a 3 breakpoints (360 px, 768 px, 1280 px) con pruebas en dispositivos'
  },
  {
    id: '5',
    name: 'Animaciones de Scroll, Hover y Carga (CSS/JS)',
    category: 'UI/UX',
    hours: 30,
    complexity: 'Media',
    description: 'Scroll reveal, efectos hover en cards, loaders animados y transiciones entre vistas'
  },
  {
    id: '6',
    name: 'Pruebas de Usabilidad con 5 Usuarios Reales',
    category: 'UI/UX',
    hours: 14,
    complexity: 'Media',
    description: '5 sesiones grabadas con tareas definidas, métricas de éxito/error y reporte de hallazgos'
  },
  {
    id: '7',
    name: 'Ícono de App, Splash Screen y Favicon',
    category: 'UI/UX',
    hours: 10,
    complexity: 'Baja',
    description: 'Ícono adaptativo iOS/Android, pantalla de carga y favicon en tamaños 16/32/180/512 px'
  },

  // ── Frontend ──
  {
    id: '8',
    name: 'Scaffold del Proyecto (Vite/Next/Nuxt)',
    category: 'Frontend',
    hours: 15,
    complexity: 'Baja',
    description: 'Inicialización del proyecto, estructura de carpetas, aliases de importación y linter configurado'
  },
  {
    id: '9',
    name: 'Estado Global con Redux/Zustand/Pinia',
    category: 'Frontend',
    hours: 28,
    complexity: 'Media',
    description: 'Store centralizado con slices/módulos, acciones asíncronas y persistencia en localStorage'
  },
  {
    id: '10',
    name: 'Formulario de hasta 10 Campos con Validación (Zod/Yup)',
    category: 'Frontend',
    hours: 18,
    complexity: 'Baja',
    description: 'Inputs, selects, checkboxes con validación en tiempo real, mensajes de error y submit'
  },
  {
    id: '11',
    name: 'Formulario Multi-Paso (3+ Pasos) con Barra de Progreso',
    category: 'Frontend',
    hours: 20,
    complexity: 'Media',
    description: 'Wizard con navegación entre pasos, validación por paso, resumen final y envío'
  },
  {
    id: '12',
    name: 'Router con Layouts Anidados y Rutas Protegidas',
    category: 'Frontend',
    hours: 26,
    complexity: 'Baja',
    description: 'React Router/Vue Router con layouts, guards de autenticación, redirecciones y 404'
  },
  {
    id: '13',
    name: 'Lazy Loading de Rutas y Code Splitting por Chunk',
    category: 'Frontend',
    hours: 20,
    complexity: 'Media',
    description: 'Carga diferida por ruta, chunks separados, prefetch de rutas frecuentes y bundle < 200 KB inicial'
  },

  // ── Backend ──
  {
    id: '14',
    name: 'Arquitectura de Capas (MVC/Clean) en Node/Django/Laravel',
    category: 'Backend',
    hours: 16,
    complexity: 'Media',
    description: 'Separación de controllers, services y repositories con inyección de dependencias'
  },
  {
    id: '15',
    name: 'API REST (CRUD + Paginación + Filtros) con Swagger',
    category: 'Backend',
    hours: 30,
    complexity: 'Alta',
    description: 'Endpoints RESTful, paginación cursor/offset, filtros por query params y documentación OpenAPI'
  },
  {
    id: '16',
    name: 'Consumo de 1 API Externa con Retry y Cache',
    category: 'Backend',
    hours: 16,
    complexity: 'Media',
    description: 'Integración con 1 servicio externo: autenticación, reintentos exponenciales y cache de respuestas'
  },
  {
    id: '17',
    name: 'Middleware de Autenticación y Verificación de Roles',
    category: 'Backend',
    hours: 10,
    complexity: 'Media',
    description: 'Interceptor que valida token JWT, extrae el rol del usuario y bloquea rutas no autorizadas'
  },
  {
    id: '18',
    name: 'Manejo Centralizado de Errores con Logging Estructurado',
    category: 'Backend',
    hours: 4,
    complexity: 'Baja',
    description: 'Try-catch global, códigos HTTP estándar, mensajes descriptivos y logs JSON (Winston/Pino)'
  },

  // ── Database ──
  {
    id: '19',
    name: 'Diagrama Entidad-Relación (10–20 Tablas) y Normalización',
    category: 'Database',
    hours: 12,
    complexity: 'Media',
    description: 'ERD documentado con relaciones, claves foráneas, constraints y normalización hasta 3NF'
  },
  {
    id: '20',
    name: 'Migraciones Versionadas y Datos Semilla (Seeders)',
    category: 'Database',
    hours: 8,
    complexity: 'Baja',
    description: 'Scripts de migración con rollback, datos de prueba por ambiente y ejecución automatizada'
  },
  {
    id: '21',
    name: 'Índices Compuestos y Optimización de Queries (EXPLAIN)',
    category: 'Database',
    hours: 10,
    complexity: 'Media',
    description: 'Análisis de queries lentas con EXPLAIN, creación de índices y vistas materializadas'
  },
  {
    id: '22',
    name: 'Backup Diario Automático con Retención de 30 Días',
    category: 'Database',
    hours: 8,
    complexity: 'Baja',
    description: 'Cron de respaldo a S3/almacenamiento externo, rotación de archivos y restauración verificada'
  },

  // ── Users ──
  {
    id: '23',
    name: 'Registro, Edición y Desactivación de Cuenta',
    category: 'Users',
    hours: 16,
    complexity: 'Media',
    description: 'Crear cuenta con verificación, editar datos personales, desactivar y eliminar con confirmación'
  },
  {
    id: '24',
    name: 'Roles y Permisos por Recurso/Acción (RBAC)',
    category: 'Users',
    hours: 16,
    complexity: 'Media',
    description: 'Tabla de roles (admin/editor/viewer), permisos por recurso y acción, UI para asignar roles'
  },
  {
    id: '25',
    name: 'Página de Perfil con Avatar, Idioma y Notificaciones',
    category: 'Users',
    hours: 16,
    complexity: 'Baja',
    description: 'Datos personales editables, subida de foto de perfil, selector de idioma y toggles de notificación'
  },
  {
    id: '26',
    name: 'Panel Admin: Listado, Suspensión y Auditoría de Usuarios',
    category: 'Users',
    hours: 14,
    complexity: 'Media',
    description: 'Tabla paginada con filtros, acciones de suspender/restaurar, reset de contraseña y log de cambios'
  },

  // ── Auth ──
  {
    id: '27',
    name: 'Login y Registro con Email/Contraseña + Verificación por Correo',
    category: 'Auth',
    hours: 10,
    complexity: 'Media',
    description: 'Formularios de login/registro, envío de email de verificación, activación de cuenta y logout'
  },
  {
    id: '28',
    name: 'Login con Google, Facebook o Apple (OAuth 2.0)',
    category: 'Auth',
    hours: 16,
    complexity: 'Media',
    description: 'Botones de login social, flujo OAuth 2.0, enlace a cuenta existente y manejo de permisos'
  },
  {
    id: '29',
    name: 'Tokens JWT con Refresh Token Rotativo y Blacklist',
    category: 'Auth',
    hours: 14,
    complexity: 'Alta',
    description: 'Access token de 15 min, refresh token rotativo con expiración de 7 días y lista negra en DB'
  },
  {
    id: '30',
    name: 'Recuperación de Contraseña por Email (Token Temporal)',
    category: 'Auth',
    hours: 10,
    complexity: 'Media',
    description: 'Formulario de solicitud, email con enlace temporal de 1 hora, nuevo password y confirmación'
  },

  // ── Security ──
  {
    id: '31',
    name: 'Hash de Contraseñas (Bcrypt) y Cifrado AES de Campos PII',
    category: 'Security',
    hours: 10,
    complexity: 'Media',
    description: 'Bcrypt con salt rounds para passwords, AES-256 para datos sensibles (tarjetas, documentos)'
  },
  {
    id: '32',
    name: 'Sanitización de Inputs contra XSS e Inyección SQL',
    category: 'Security',
    hours: 8,
    complexity: 'Baja',
    description: 'Escape de HTML en frontend, queries parametrizadas en backend y validación de tipos con schema'
  },
  {
    id: '33',
    name: 'Rate Limiting: 100 req/min por IP con Respuesta 429',
    category: 'Security',
    hours: 5,
    complexity: 'Media',
    description: 'Throttle configurable por endpoint, respuesta 429 con header Retry-After y almacenamiento en Redis'
  },
  {
    id: '34',
    name: 'CORS Restringido, CSP y Security Headers (Helmet)',
    category: 'Security',
    hours: 5,
    complexity: 'Baja',
    description: 'Whitelist de orígenes, Content-Security-Policy, X-Frame-Options y HSTS con Helmet/headers manuales'
  },
  {
    id: '35',
    name: "Certificado SSL/TLS con Renovación Automática (Let's Encrypt)",
    category: 'Security',
    hours: 4,
    complexity: 'Baja',
    description: "HTTPS forzado, certificado Let's Encrypt, renovación por cron y cabecera Strict-Transport-Security"
  },
  {
    id: '36',
    name: 'Controles de Privacidad: Perfil Público/Privado y Descarga de Datos',
    category: 'Security',
    hours: 10,
    complexity: 'Media',
    description: 'Toggle de visibilidad de perfil, descarga de datos personales en JSON y solicitud de eliminación'
  },

  // ── Payments ──
  {
    id: '37',
    name: 'Checkout con Stripe o PayPal (Pago Único)',
    category: 'Payments',
    hours: 20,
    complexity: 'Alta',
    description: 'SDK de Stripe/PayPal, formulario de pago embebido, webhooks de confirmación y recibo por email'
  },
  {
    id: '38',
    name: 'Suscripciones Mensuales/Anuales con Cambio de Plan',
    category: 'Payments',
    hours: 20,
    complexity: 'Alta',
    description: 'Planes recurrentes, upgrade/downgrade con prorrateo, cancelación y webhooks de estado'
  },
  {
    id: '39',
    name: 'Reservas con Cobro Anticipado y Política de Reembolso',
    category: 'Payments',
    hours: 20,
    complexity: 'Alta',
    description: 'Selección de slot + cobro inmediato, cancelación con reembolso parcial/total según política'
  },

  // ── SEO ──
  {
    id: '40',
    name: 'Meta Tags, Schema.org (JSON-LD) y Sitemap XML Dinámico',
    category: 'SEO',
    hours: 6,
    complexity: 'Baja',
    description: 'Title y description por página, JSON-LD (Organization, Product, Article) y sitemap auto-generado'
  },
  {
    id: '41',
    name: 'Optimización Core Web Vitals (LCP < 2.5 s, CLS < 0.1)',
    category: 'SEO',
    hours: 18,
    complexity: 'Media',
    description: 'Auditoría Lighthouse, lazy images, font-display:swap, layout reservado y bundle optimizado'
  },
  {
    id: '42',
    name: 'Google Analytics 4 + Search Console + Eventos Personalizados',
    category: 'SEO',
    hours: 8,
    complexity: 'Baja',
    description: 'Tag de GA4, verificación en Search Console y hasta 10 eventos custom (clics CTA, scroll, form submit)'
  },
  {
    id: '43',
    name: 'Open Graph y Twitter Cards por Página/Ruta',
    category: 'SEO',
    hours: 4,
    complexity: 'Baja',
    description: 'OG image, title y description dinámicos por ruta, Twitter card type large/summary y preview social'
  },

  // ── Mobile ──
  {
    id: '44',
    name: 'App Android Nativa en Kotlin (UI + Navegación + Permisos)',
    category: 'Mobile',
    hours: 170,
    complexity: 'Alta',
    description: 'Jetpack Compose, navegación entre pantallas, solicitud de permisos y build release firmado'
  },
  {
    id: '45',
    name: 'App iOS Nativa en Swift/SwiftUI (UI + Navegación + Permisos)',
    category: 'Mobile',
    hours: 170,
    complexity: 'Alta',
    description: 'SwiftUI, NavigationStack, permisos de cámara/ubicación y build release con certificados'
  },
  {
    id: '46',
    name: 'App Híbrida React Native para iOS y Android',
    category: 'Mobile',
    hours: 110,
    complexity: 'Alta',
    description: 'Código compartido, React Navigation, permisos nativos y builds para ambas plataformas'
  },
  {
    id: '47',
    name: 'Publicación en Google Play Store (Ficha + Firma + Review)',
    category: 'Mobile',
    hours: 15,
    complexity: 'Baja',
    description: 'Ficha de la app, screenshots, clasificación de contenido, firma AAB y envío a revisión'
  },
  {
    id: '48',
    name: 'Publicación en Apple App Store (Ficha + Certificados + Review)',
    category: 'Mobile',
    hours: 15,
    complexity: 'Baja',
    description: 'App Store Connect, screenshots por dispositivo, certificados de distribución y proceso de review'
  },

  // ── Web ──
  {
    id: '49',
    name: 'Sitio Informativo de 5–8 Páginas Estáticas',
    category: 'Web',
    hours: 45,
    complexity: 'Media',
    description: 'Home, About, Servicios, Portafolio, Contacto y Políticas con contenido estático y SEO básico'
  },
  {
    id: '50',
    name: 'Landing Page de Campaña con CTA y Formulario',
    category: 'Web',
    hours: 16,
    complexity: 'Baja',
    description: 'Página única: hero, beneficios, testimonios, CTA prominente y formulario de captura de leads'
  },
  {
    id: '51',
    name: 'Formulario de Contacto (5 Campos) + reCAPTCHA + Envío a Email',
    category: 'Web',
    hours: 10,
    complexity: 'Baja',
    description: 'Nombre, email, teléfono, asunto y mensaje con validación, reCAPTCHA v3 y notificación por correo'
  },

  // ── Content ──
  {
    id: '52',
    name: 'CMS: Editor WYSIWYG, Borradores y Publicación Programada',
    category: 'Content',
    hours: 20,
    complexity: 'Media',
    description: 'Editor rich-text, estados (borrador/publicado/programado), categorías y fecha de publicación'
  },
  {
    id: '53',
    name: 'Hilo de Comentarios con Aprobación Manual y Notificación',
    category: 'Content',
    hours: 10,
    complexity: 'Baja',
    description: 'Comentarios anidados, estado pendiente/aprobado, email al autor y opción de eliminar'
  },
  {
    id: '54',
    name: 'Etiquetas y Categorías Jerárquicas con Filtrado en Listados',
    category: 'Content',
    hours: 12,
    complexity: 'Media',
    description: 'Taxonomías padre/hijo, asignación múltiple por contenido y filtros en listados públicos'
  },

  // ── Search ──
  {
    id: '55',
    name: 'Búsqueda Full-Text con Autocompletado y Resaltado',
    category: 'Search',
    hours: 16,
    complexity: 'Media',
    description: 'Índice de texto completo (PostgreSQL/Elasticsearch), sugerencias mientras escribe y highlight'
  },
  {
    id: '56',
    name: 'Sidebar de Filtros: Categoría, Rango de Precio, Fecha y Orden',
    category: 'Search',
    hours: 20,
    complexity: 'Media',
    description: 'Checkboxes de categoría, slider de precio, selector de fecha y dropdown de ordenamiento'
  },

  // ── Files & Media ──
  {
    id: '57',
    name: 'Subida de Archivos (Imágenes/PDF/Docs) hasta 10 MB a S3',
    category: 'Files & Media',
    hours: 14,
    complexity: 'Media',
    description: 'Drag & drop, validación de tipo y tamaño, barra de progreso y almacenamiento en S3 o local'
  },
  {
    id: '58',
    name: 'Recorte Interactivo, Thumbnails y Compresión WebP de Imágenes',
    category: 'Files & Media',
    hours: 24,
    complexity: 'Media',
    description: 'Crop con proporción fija, generación automática de thumbnails (150 px, 600 px) y conversión a WebP'
  },
  {
    id: '59',
    name: 'Transcodificación de Video a MP4/HLS con FFmpeg (Server)',
    category: 'Files & Media',
    hours: 16,
    complexity: 'Alta',
    description: 'Cola de transcodificación FFmpeg, resoluciones 480p/720p/1080p y streaming adaptativo HLS'
  },
  {
    id: '60',
    name: 'Reproductor de Audio con Playlist y Reproducción en Background',
    category: 'Files & Media',
    hours: 20,
    complexity: 'Media',
    description: 'Controles play/pause/skip, cola de reproducción, progreso y audio en segundo plano (móvil)'
  },

  // ── Ecommerce ──
  {
    id: '61',
    name: 'Carrito Persistente con Cantidades y Códigos de Descuento',
    category: 'Ecommerce',
    hours: 30,
    complexity: 'Media',
    description: 'Agregar/quitar items, editar cantidades, aplicar cupones, resumen con subtotal e impuestos'
  },
  {
    id: '62',
    name: 'Lista de Deseos por Usuario con Sincronización',
    category: 'Ecommerce',
    hours: 16,
    complexity: 'Baja',
    description: 'Botón de favorito por producto, listado personal y sincronización entre dispositivos logueados'
  },

  // ── Comms ──
  {
    id: '63',
    name: 'Emails Transaccionales (Bienvenida, Reset, Confirmación) con SPF/DKIM',
    category: 'Comms',
    hours: 10,
    complexity: 'Baja',
    description: 'Plantillas HTML con variables, envío vía SMTP/API (SendGrid/Resend), configuración SPF y DKIM'
  },
  {
    id: '64',
    name: 'SMS de Verificación OTP y Recordatorios (Twilio)',
    category: 'Comms',
    hours: 8,
    complexity: 'Media',
    description: 'Código OTP de 6 dígitos con expiración de 5 min, SMS de recordatorio y confirmación de entrega'
  },
  {
    id: '65',
    name: 'Chat 1-a-1 en Tiempo Real con Indicador de Lectura',
    category: 'Comms',
    hours: 22,
    complexity: 'Media',
    description: 'WebSockets, mensajes con timestamps, indicador enviado/leído y estado de presencia online'
  },
  {
    id: '66',
    name: 'Notificaciones Push: FCM (Android) y APNS (iOS)',
    category: 'Comms',
    hours: 14,
    complexity: 'Media',
    description: 'Registro de dispositivo, envío segmentado por tema/usuario y deep linking al abrir'
  },

  // ── Offline & Realtime ──
  {
    id: '67',
    name: 'Modo Offline con Service Worker y Cola de Reintentos',
    category: 'Offline & Realtime',
    hours: 25,
    complexity: 'Media',
    description: 'Cache de assets con Service Worker, cola de peticiones fallidas y sync automático al reconectar'
  },
  {
    id: '68',
    name: 'Sincronización Multi-Dispositivo con Resolución de Conflictos',
    category: 'Offline & Realtime',
    hours: 30,
    complexity: 'Alta',
    description: 'Timestamps de modificación, merge automático de cambios y UI de resolución manual de conflictos'
  },
  {
    id: '69',
    name: 'Indicador de Usuarios Conectados en Tiempo Real (WebSocket)',
    category: 'Offline & Realtime',
    hours: 8,
    complexity: 'Media',
    description: 'Heartbeat por WebSocket, conteo de usuarios online y lista de quién está conectado ahora'
  },

  // ── Device & Sensors ──
  {
    id: '70',
    name: 'Geolocalización con Permisos y Dirección Legible',
    category: 'Device & Sensors',
    hours: 14,
    complexity: 'Baja',
    description: 'Solicitud de permisos, coordenadas GPS, reverse geocoding a dirección y fallback por IP'
  },
  {
    id: '71',
    name: 'Mapa Interactivo con Pins, Clusters y Rutas (Google Maps/Mapbox)',
    category: 'Device & Sensors',
    hours: 20,
    complexity: 'Media',
    description: 'Mapa embebido, marcadores custom, agrupación por zoom y trazado de rutas entre 2 puntos'
  },
  {
    id: '72',
    name: 'Lectura de Brújula y Sensor de Orientación del Dispositivo',
    category: 'Device & Sensors',
    hours: 12,
    complexity: 'Baja',
    description: 'DeviceOrientation API, smoothing de lecturas y visualización de dirección en UI'
  },
  {
    id: '73',
    name: 'Escaneo y Generación de Códigos QR con Cámara',
    category: 'Device & Sensors',
    hours: 10,
    complexity: 'Baja',
    description: 'Lectura de QR desde cámara, decodificación de datos y generación de QR con contenido embebido'
  },
  {
    id: '74',
    name: 'Escaneo de Códigos de Barras Multi-Formato (EAN/UPC/Code128)',
    category: 'Device & Sensors',
    hours: 18,
    complexity: 'Media',
    description: 'Lectura desde cámara de formatos EAN-13, UPC-A, Code128, validación y búsqueda de producto'
  },
  {
    id: '75',
    name: 'Captura de Fotos con Permisos y Metadatos EXIF',
    category: 'Device & Sensors',
    hours: 16,
    complexity: 'Media',
    description: 'Solicitud de permiso de cámara, captura de foto, lectura de EXIF (ubicación, fecha) y subida'
  },
  {
    id: '76',
    name: 'Grabación de Video con Compresión Client-Side y Upload',
    category: 'Device & Sensors',
    hours: 22,
    complexity: 'Media',
    description: 'Permiso de cámara, grabación, compresión en el navegador/app y upload progresivo al servidor'
  },

  // ── Integrations ──
  {
    id: '77',
    name: 'Sincronización con Google Calendar u Outlook',
    category: 'Integrations',
    hours: 12,
    complexity: 'Media',
    description: 'Crear/editar eventos vía API, recordatorios y sincronización bidireccional de cambios'
  },
  {
    id: '78',
    name: 'Conexión con 1 API Externa (OAuth2 + Rate Limits)',
    category: 'Integrations',
    hours: 16,
    complexity: 'Media',
    description: 'Autenticación OAuth2/API Key, manejo de cuotas, reintentos y firma de peticiones'
  },
  {
    id: '79',
    name: 'SSO Empresarial con Okta o Azure AD (SAML/OIDC)',
    category: 'Integrations',
    hours: 26,
    complexity: 'Alta',
    description: 'Configuración de Identity Provider, mapeo de claims a roles y logout federado'
  },

  // ── Social ──
  {
    id: '80',
    name: 'Botones de Compartir (WhatsApp, Twitter, Facebook)',
    category: 'Social',
    hours: 5,
    complexity: 'Baja',
    description: 'Share intents nativos y web con URL + texto predefinido y deep links por plataforma'
  },
  {
    id: '81',
    name: 'Rating de 1–5 Estrellas con Promedio y Ordenamiento',
    category: 'Social',
    hours: 15,
    complexity: 'Baja',
    description: 'Componente de estrellas clickeables, cálculo de promedio, conteo de votos y sort por rating'
  },
  {
    id: '82',
    name: 'Encuesta In-App: NPS (0–10) con Reporte de Resultados',
    category: 'Social',
    hours: 12,
    complexity: 'Baja',
    description: 'Pregunta emergente con escala 0–10, campo de comentario opcional y dashboard de resultados'
  },

  // ── Business & Productivity ──
  {
    id: '83',
    name: 'Reservas con Calendario de Disponibilidad y Recordatorio',
    category: 'Business & Productivity',
    hours: 16,
    complexity: 'Media',
    description: 'Slots por hora, bloqueo al reservar, cancelación con política y recordatorio por email 24 h antes'
  },
  {
    id: '84',
    name: 'Lista de Tareas con Drag & Drop, Prioridades y Fechas Límite',
    category: 'Business & Productivity',
    hours: 18,
    complexity: 'Baja',
    description: 'CRUD de tareas, arrastrar para reordenar, prioridad (alta/media/baja), fecha límite y check de completado'
  },

  // ── Internationalization & Accessibility ──
  {
    id: '85',
    name: 'Internacionalización (2+ Idiomas) con Formatos de Fecha y Moneda',
    category: 'Internationalization & Accessibility',
    hours: 28,
    complexity: 'Media',
    description: 'Archivos JSON de traducción, selector de idioma, formateo de fechas/moneda por locale'
  },
  {
    id: '86',
    name: 'Accesibilidad WCAG 2.1 AA (Teclado, ARIA, Contraste 4.5:1)',
    category: 'Internationalization & Accessibility',
    hours: 18,
    complexity: 'Media',
    description: 'Navegación completa por teclado, roles ARIA, ratio de contraste 4.5:1 y prueba con lector de pantalla'
  },

  // ── Admin & Moderation ──
  {
    id: '87',
    name: 'Panel de Feature Flags y Parámetros del Sistema',
    category: 'Admin & Moderation',
    hours: 20,
    complexity: 'Baja',
    description: 'Toggles on/off por funcionalidad, parámetros editables (límites, textos) y persistencia en DB'
  },
  {
    id: '88',
    name: 'Cola de Moderación: Reportes, Aprobar/Rechazar y Métricas',
    category: 'Admin & Moderation',
    hours: 16,
    complexity: 'Media',
    description: 'Listado de contenido reportado, acciones aprobar/rechazar/banear, historial y métricas de respuesta'
  },

  // ── Analytics & Quality ──
  {
    id: '89',
    name: 'Dashboard de KPIs con Gráficas y Descarga CSV',
    category: 'Analytics & Quality',
    hours: 28,
    complexity: 'Media',
    description: 'Métricas clave en cards, gráficas de líneas/barras (Chart.js/Recharts), filtro de fecha y export CSV'
  },
  {
    id: '90',
    name: 'Monitoreo de Errores con Sentry y Alertas por Slack/Email',
    category: 'Analytics & Quality',
    hours: 6,
    complexity: 'Baja',
    description: 'SDK de Sentry integrado, agrupación de errores, stack traces y notificación por Slack o email'
  },

  // ── R&D ──
  {
    id: '91',
    name: 'Overlay de Realidad Aumentada (ARKit/ARCore/WebAR)',
    category: 'R&D',
    hours: 60,
    complexity: 'Alta',
    description: 'Detección de superficie plana, colocación de objeto 3D, rotación/escalado y captura de pantalla'
  },
  {
    id: '92',
    name: 'Generación de Imágenes con IA (DALL-E/Stable Diffusion API)',
    category: 'R&D',
    hours: 15,
    complexity: 'Alta',
    description: 'Campo de prompt, selección de estilo, llamada a API, vista previa y guardado en galería'
  },

  // ── Data ──
  {
    id: '93',
    name: 'Descarga de Listados en CSV y JSON con Selección de Columnas',
    category: 'Data',
    hours: 8,
    complexity: 'Baja',
    description: 'Botón de exportar, checkboxes de columnas, encoding UTF-8 y descarga inmediata'
  },
  {
    id: '94',
    name: 'Importación desde CSV/Excel con Mapeo, Preview y Errores por Fila',
    category: 'Data',
    hours: 12,
    complexity: 'Media',
    description: 'Subida de archivo, mapeo de columnas a campos, vista previa de 10 filas, errores detallados y confirmación'
  },

  // ── Ops & Infra ──
  {
    id: '95',
    name: 'Workers en Background con Redis/Bull (Emails, Procesamientos)',
    category: 'Ops & Infra',
    hours: 10,
    complexity: 'Media',
    description: 'Cola de trabajos con Redis/Bull, reintentos configurables, prioridad y dashboard de estado'
  },
  {
    id: '96',
    name: 'Cache con Redis: TTL Configurable e Invalidación Selectiva',
    category: 'Ops & Infra',
    hours: 8,
    complexity: 'Media',
    description: 'Cacheo de queries frecuentes y sesiones, TTL por tipo de dato y flush por clave/patrón'
  },
  {
    id: '97',
    name: 'Pipeline CI/CD en GitHub Actions (Build + Test + Deploy)',
    category: 'Ops & Infra',
    hours: 8,
    complexity: 'Media',
    description: 'Workflow en push a main: instalar deps, lint, tests, build y deploy automático a staging/producción'
  },
  {
    id: '98',
    name: 'Tests Unitarios (Jest) + E2E (Cypress/Playwright) al 60 %',
    category: 'Ops & Infra',
    hours: 22,
    complexity: 'Media',
    description: 'Tests unitarios de funciones críticas, tests E2E de flujos principales y reporte de cobertura mínima 60 %'
  },

  // ── Compliance & Legal ──
  {
    id: '99',
    name: 'Páginas de Políticas de Privacidad y Términos de Uso',
    category: 'Compliance & Legal',
    hours: 6,
    complexity: 'Baja',
    description: 'Contenido legal redactado, enlaces en footer, fecha de última actualización y aceptación en registro'
  },
  {
    id: '100',
    name: 'Banner de Cookies con Categorías (Necesarias/Analíticas/Marketing)',
    category: 'Compliance & Legal',
    hours: 6,
    complexity: 'Baja',
    description: 'Aviso emergente, toggles por categoría, botón aceptar/rechazar y log de consentimiento en DB'
  },
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
  const [showQuotationSummary, setShowQuotationSummary] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // SEO para Cotizador Moderno
  useSEO({
    title: 'Cotizador de Proyectos - Presupuesto Instantáneo | CODEDMO',
    description: 'Cotizador interactivo para proyectos de desarrollo web y software. Genera presupuestos detallados y exporta cotizaciones en PDF profesional.',
    keywords: ['cotizador proyectos', 'presupuesto desarrollo', 'calculadora costos web', 'estimación software', 'cotización pdf'],
    canonical: 'https://codedmo.dev/servicios/cotizacion/estimacion#cotizador',
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

  // Función para generar el resumen de cotización
  const generateQuotationSummary = () => {
    const summary = {
      fecha: new Date().toLocaleDateString('es-GT'),
      cotizacionId: `COD-${Date.now().toString().slice(-6)}`,
      cliente: 'Proyecto Personalizado',
      elementos: selectedItemsList.map(item => ({
        nombre: item.name,
        categoria: item.category,
        horas: item.hours,
        complejidad: item.complexity,
        descripcion: item.description,
        costo: item.hours * adminSettings.hourlyRate
      })),
      resumen: {
        totalElementos: selectedItemsList.length,
        totalHoras: totalHours,
        diasLaborales: estimatedDays,
        subtotal: subtotalPrice,
        iva: billingAmount,
        total: totalPrice
      },
      configuracion: {
        tarifaPorHora: adminSettings.hourlyRate,
        moneda: adminSettings.currency,
        porcentajeIVA: adminSettings.billingPercentage,
        horasPorDia: adminSettings.hoursPerDay
      },
      categorias: categories.map(category => {
        const items = selectedItemsList.filter(item => item.category === category);
        const hours = items.reduce((sum, item) => sum + item.hours, 0);
        const cost = hours * adminSettings.hourlyRate;
        return {
          categoria: category,
          elementos: items.length,
          horas: hours,
          costo: cost
        };
      }).filter(cat => cat.elementos > 0)
    };
    
    return summary;
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Obtener la plantilla PDF
      const templateUrl = '/PDF/Cotizacion.pdf';
      const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
      
      // Cargar el documento PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Cargar fuentes para texto normal y negrita
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Obtener la página 8 (índice 7, ya que las páginas empiezan en 0)
      const pages = pdfDoc.getPages();
      if (pages.length < 8) {
        console.error('El PDF no tiene suficientes páginas');
        return;
      }
      
      const textColor = rgb(1, 1, 1); // Color blanco
      const fontSize = 14;
      const lineHeight = 16;
      const elementsPerPage = 16; // Máximo de elementos por página
      
      // Generar el resumen de datos
      const quotationData = generateQuotationSummary();
      
      // Calcular cuántas páginas necesitamos
      const totalElements = quotationData.elementos.length;
      const totalPages = Math.ceil(totalElements / elementsPerPage);
      
      console.log(`PDF original: ${pages.length} páginas`);
      console.log(`Elementos totales: ${totalElements}`);
      console.log(`Páginas necesarias: ${totalPages}`);
      console.log(`Elementos por página: ${elementsPerPage}`);
      
      // PRIMERO: Crear todas las páginas duplicadas necesarias ANTES de llenar cualquier dato
      const allPages: PDFPage[] = [pages[7]]; // Empezar con la página 8 original
      
      if (totalPages > 1) {
        console.log(`Creando ${totalPages - 1} páginas duplicadas...`);
        
        for (let i = 1; i < totalPages; i++) {
          const insertIndex = 7 + i; // 8, 9, 10...
          console.log(`Duplicando página 8 vacía en posición ${insertIndex}`);
          
          // Copiar la página 8 ORIGINAL (sin datos) y insertarla
          const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [7]);
          pdfDoc.insertPage(insertIndex, copiedPage);
          allPages.push(copiedPage);
        }
      }
      
      console.log(`Total de páginas preparadas: ${allPages.length}`);
      

      // Función para agregar el "Costo por Hora" en cada página
      const addCostPerHour = (page: PDFPage, height: number) => {
        const yPos = height - 142.5;
        page.drawText(`Costo por Hora: `, {
          x: 75,
          y: yPos,
          size: fontSize + 8,
          color: textColor,
          font: regularFont,
        });
        
        // Texto en negrita para el valor
        page.drawText(`${quotationData.configuracion.tarifaPorHora}`, {
          x: 250, // Posición específica para el valor en negrita
          y: yPos,
          size: fontSize + 8,
          color: textColor,
          font: boldFont,
        });
      };
      
      // Función para agregar elementos a una página
      const addElementsToPage = (page: PDFPage, elements: typeof quotationData.elementos, startIndex: number, pageHeight: number) => {
        let yPosition = pageHeight - 142.5 - (lineHeight * 6.5);
        
        elements.forEach((elemento, index) => {
          const globalIndex = startIndex + index;
          
          // Número del elemento en negrita
          page.drawText(`${globalIndex + 1}.`, {
            x: 90,
            y: yPosition,
            size: fontSize,
            color: textColor,
            font: regularFont,
          });
          
          // Categoría en negrita
          page.drawText(`${elemento.categoria}`, {
            x: 140,
            y: yPosition,
            size: fontSize,
            color: textColor,
            font: boldFont,
          });
          
          // Guion separador
          // page.drawText(` - `, {
          //   x: 370,
          //   y: yPosition,
          //   size: fontSize,
          //   color: textColor,
          //   font: regularFont,
          // });
          
          // Nombre del elemento en negrita
          page.drawText(`${elemento.nombre}:`, {
            x: 500,
            y: yPosition,
            size: fontSize,
            color: textColor,
            font: regularFont,
          });
          
          // Descripción en texto normal
          // page.drawText(` ${elemento.descripcion}`, {
          //   x: 400,
          //   y: yPosition,
          //   size: fontSize,
          //   color: textColor,
          //   font: regularFont,
          // });
          
          // Costo en negrita
          page.drawText(`${adminSettings.currency}${elemento.costo.toLocaleString()}`, {
            x: 1050,
            y: yPosition,
            size: fontSize,
            color: textColor,
            font: regularFont,
          });
          
          // Horas en negrita
          page.drawText(`${elemento.horas}h`, {
            x: 1300,
            y: yPosition,
            size: fontSize,
            color: textColor,
            font: regularFont,
          });
          
          yPosition -= lineHeight * 1.51;
        });
      };
      
      // Función para agregar el resumen final con detalle de IVA (solo en la última página)
      const addSummary = (page: PDFPage) => {
        let yPosition = 172;
        
        // Título "RESUMEN:" en negrita
        page.drawText('RESUMEN:', {
          x: 80,
          y: yPosition,
          size: fontSize + 2,
          color: textColor,
          font: boldFont,
        });
        
        yPosition -= lineHeight + 8;
        
        // "Total elementos:" en texto normal, número en negrita
        page.drawText(`Total elementos: `, {
          x: 90,
          y: yPosition,
          size: fontSize,
          color: textColor,
          font: regularFont,
        });
        
        page.drawText(`${quotationData.resumen.totalElementos}`, {
          x: 220,
          y: yPosition,
          size: fontSize,
          color: textColor,
          font: boldFont,
        });
        
        // Detalle financiero en una línea: Total sin IVA: Q... | IVA: Q... | Total: Q...
        const subtotalText = `Total sin IVA: ${adminSettings.currency}${quotationData.resumen.subtotal.toLocaleString()}`;
        const ivaText = `IVA: ${adminSettings.currency}${quotationData.resumen.iva.toLocaleString()}`;
        const totalText = `Total: ${adminSettings.currency}${quotationData.resumen.total.toLocaleString()}`;
        
        // Línea completa del resumen financiero
        page.drawText(`${subtotalText} | ${ivaText} | ${totalText}`, {
          x: 750,
          y: yPosition,
          size: fontSize + 1,
          color: textColor,
          font: boldFont,
        });
        
        // Horas y días en negrita
        page.drawText(`${quotationData.resumen.totalHoras}h/${quotationData.resumen.diasLaborales}d`, {
          x: 1270,
          y: yPosition,
          size: fontSize + 4,
          color: textColor,
          font: boldFont,
        });
      };
      
      // SEGUNDO: Ahora llenar todas las páginas con datos
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        console.log(`Llenando página ${pageIndex + 1} de ${totalPages}`);
        
        // Usar la página correspondiente del array pre-creado
        const currentPage = allPages[pageIndex];
        const pageHeight = currentPage.getSize().height;
        
        // Agregar "Costo por Hora" en cada página
        addCostPerHour(currentPage, pageHeight);
        
        // Calcular qué elementos van en esta página
        const startIndex = pageIndex * elementsPerPage;
        const endIndex = Math.min(startIndex + elementsPerPage, totalElements);
        const pageElements = quotationData.elementos.slice(startIndex, endIndex);
        
        console.log(`Página ${pageIndex + 1}: elementos ${startIndex + 1} al ${endIndex}`);
        
        // Agregar elementos a la página
        addElementsToPage(currentPage, pageElements, startIndex, pageHeight);
        
        // Agregar resumen solo en la última página
        if (pageIndex === totalPages - 1) {
          console.log(`Agregando resumen en la última página (${pageIndex + 1})`);
          addSummary(currentPage);
        }
      }
      
      // Serializar y descargar el PDF
      const pdfBytes = await pdfDoc.save();
      
      // Crear blob y descargar
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Cotizacion-CODEDMO-${quotationData.cotizacionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('PDF generado con datos:', quotationData);
      console.log(`Páginas creadas: ${totalPages}, Elementos totales: ${totalElements}`);
      console.log(`PDF original tenía ${pages.length} páginas`);
      console.log(`PDF final tiene ${pdfDoc.getPageCount()} páginas`);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Verifica que la plantilla existe en /public/PDF/Cotizacion.pdf');
    } finally {
      setIsGeneratingPDF(false);
    }
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
    <div className="max-w-7xl mx-auto p-2 sm:p-4">
      {/* Header - más compacto y responsivo */}
      <div className="text-center mb-4 sm:mb-6">
        <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-xs sm:text-sm font-medium mb-3`}>
          <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Cotizador Inteligente
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Calcula el <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>costo</span> de tu proyecto
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm px-4">
          Selecciona los elementos que necesitas y obtén una cotización personalizada al instante.
        </p>
        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="whitespace-nowrap">Tarifa: {adminSettings.currency}{adminSettings.hourlyRate}/h + {adminSettings.billingPercentage}% IVA</span>
          </div>
          
          {/* Botón de administración */}
          <button
            onClick={() => setShowAdminPanel(true)}
            className="inline-flex items-center px-2 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full text-gray-400 hover:text-gray-300 text-xs transition-colors"
            title="Panel de Administración"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Panel lateral de filtros - mejorado responsivo */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 lg:sticky lg:top-20">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-purple-400" />
              Categorías
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-0 lg:max-h-[700px] lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-track-white/10 lg:scrollbar-thumb-purple-500/50 hover:lg:scrollbar-thumb-purple-500/70 lg:pr-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="block truncate">Todas</span>
                <span className="text-xs opacity-75 block sm:inline lg:block">({systemElements.length})</span>
              </button>
              {categories.map(category => {
                const count = systemElements.filter(item => item.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-start sm:items-center lg:items-start xl:items-center">
                      <span className="truncate text-xs">{category}</span>
                      <span className="text-xs opacity-75">({count})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lista de elementos - mejorada responsividad */}
        <div className="lg:col-span-3 space-y-3 order-1 lg:order-2">
          {getFilteredCategories().map(category => (
            <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center flex-wrap">
                <FileText className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                <span className="flex-1 min-w-0 truncate">{category}</span>
                <span className="ml-2 text-xs text-gray-400 flex-shrink-0">
                  ({getCategoryItems(category).length} elementos)
                </span>
              </h3>
              <div className="space-y-2">
                {getCategoryItems(category).map(item => (
                  <div
                    key={item.id}
                    className={`p-2 sm:p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                      item.selected 
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                          item.selected ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                        }`}>
                          {item.selected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                          <p className="text-gray-400 text-xs truncate mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getComplexityColor(item.complexity)}`}>
                          {item.complexity}
                        </span>
                        <div className="text-right">
                          <div className="text-purple-400 font-bold text-sm">{adminSettings.currency}{(item.hours * adminSettings.hourlyRate).toLocaleString()}</div>
                          <div className="text-gray-400 text-xs flex items-center justify-end">
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

        {/* Resumen de cotización - sidebar responsivo con detalle de IVA */}
        <div className="lg:col-span-2 space-y-4 order-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 lg:sticky lg:top-20 z-20">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
              Cotización
            </h3>
            
            {selectedItemsList.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  Selecciona elementos para ver la cotización
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Items seleccionados - más compacto y responsivo */}
                <div className="max-h-32 sm:max-h-40 overflow-y-auto space-y-1 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500/70">
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
                  
                  {/* Detalle del IVA */}
                  <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total sin IVA:</span>
                      <span className="text-white font-medium">{adminSettings.currency}{subtotalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IVA ({adminSettings.billingPercentage}%):</span>
                      <span className="text-white font-medium">{adminSettings.currency}{billingAmount.toLocaleString()}</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-green-300">TOTAL:</span>
                      <span className="text-green-400">{adminSettings.currency}{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className={`bg-gradient-to-r ${gradients.primary} bg-opacity-20 rounded-lg p-3 border border-purple-500/30`}>
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm">Tiempo estimado</span>
                  </div>
                  <p className="text-white text-sm">
                    {estimatedDays} días laborales
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const summary = generateQuotationSummary();
                      console.log('📋 RESUMEN DE COTIZACIÓN:', summary);
                      setShowQuotationSummary(!showQuotationSummary);
                    }}
                    disabled={selectedItemsList.length === 0}
                    className={`w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showQuotationSummary ? 'Ocultar' : 'Ver'} Resumen
                  </button>

                  <button
                    onClick={generatePDF}
                    disabled={selectedItemsList.length === 0 || isGeneratingPDF}
                    className={`w-full py-2 sm:py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm`}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generando PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Descargar PDF
                      </>
                    )}
                  </button>
                </div>
                
              </div>
            )}

            {/* Panel de resumen detallado */}
            {showQuotationSummary && selectedItemsList.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600 mt-4">
                <h4 className="text-white font-bold text-sm mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-400" />
                  Resumen Detallado de Cotización
                </h4>
                
                <div className="space-y-3 text-xs">
                  {/* Información básica */}
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                    <h5 className="text-blue-300 font-semibold mb-2">📄 Información del Documento</h5>
                    <div className="space-y-1 text-blue-200">
                      <p>• Fecha: {new Date().toLocaleDateString('es-GT')}</p>
                      <p>• Cotización #: COD-{Date.now().toString().slice(-6)}</p>
                      <p>• Cliente: Proyecto Personalizado</p>
                    </div>
                  </div>

                  {/* Elementos por categoría */}
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                    <h5 className="text-purple-300 font-semibold mb-2">📋 Elementos por Categoría</h5>
                    <div className="space-y-2">
                      {categories.map(category => {
                        const items = selectedItemsList.filter(item => item.category === category);
                        if (items.length === 0) return null;
                        const hours = items.reduce((sum, item) => sum + item.hours, 0);
                        const cost = hours * adminSettings.hourlyRate;
                        return (
                          <div key={category} className="bg-white/5 rounded p-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-purple-200 font-medium">{category}</span>
                              <span className="text-purple-400">{items.length} elementos | {hours}h | {adminSettings.currency}{cost.toLocaleString()}</span>
                            </div>
                            <div className="space-y-1 pl-2">
                              {items.map(item => (
                                <div key={item.id} className="flex justify-between text-gray-300">
                                  <span className="flex-1 truncate">{item.name}</span>
                                  <span className="ml-2">{item.hours}h</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Resumen financiero con detalle de IVA */}
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                    <h5 className="text-green-300 font-semibold mb-2">💰 Resumen Financiero</h5>
                    <div className="space-y-1 text-green-200">
                      <div className="flex justify-between">
                        <span>Total sin IVA ({totalHours}h × {adminSettings.currency}{adminSettings.hourlyRate}):</span>
                        <span className="font-medium">{adminSettings.currency}{subtotalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA ({adminSettings.billingPercentage}%):</span>
                        <span className="font-medium">{adminSettings.currency}{billingAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-green-500/30 pt-1 text-green-100 font-bold">
                        <span>TOTAL:</span>
                        <span>{adminSettings.currency}{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-center pt-1 text-green-300">
                        ⏱️ Tiempo estimado: {estimatedDays} días laborales
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-xs">
                      💡 Este resumen se incluirá en la página 8 del PDF de cotización
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Disclaimer importante - más compacto y responsivo */}
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

      {/* Modal del Panel de Administración - mejorado responsivo */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
                <span className="hidden sm:inline">Panel de Administración</span>
                <span className="sm:hidden">Admin</span>
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
              /* Panel de Login - responsivo */
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
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-sm sm:text-base"
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
                  className={`w-full py-2 sm:py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base`}
                >
                  Acceder
                </button>
              </div>
            ) : (
              /* Panel de Configuración - responsivo */
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="admin-hourly-rate" className="block text-sm font-medium text-gray-300 mb-2">
                      Tarifa por Hora
                    </label>
                    <input
                      id="admin-hourly-rate"
                      type="number"
                      value={adminSettings.hourlyRate}
                      onChange={(e) => handleSettingsChange('hourlyRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-sm sm:text-base"
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
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-sm sm:text-base"
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
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-sm sm:text-base"
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
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-sm sm:text-base"
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

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setShowAdminPanel(false)}
                    className="flex-1 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors text-sm sm:text-base"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pantalla de carga para generación de PDF */}
      {isGeneratingPDF && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 text-center max-w-sm mx-4">
            <div className="mb-6">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Generando PDF
            </h3>
            <p className="text-gray-300 text-sm">
              Por favor espera mientras se genera tu cotización en PDF...
            </p>
            <div className="mt-4 bg-purple-500/20 rounded-lg p-3">
              <p className="text-purple-300 text-xs">
                Este proceso puede tomar unos segundos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
