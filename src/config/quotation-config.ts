// Configuración de elementos del sistema para cotización
// Puedes modificar este archivo para agregar, quitar o editar elementos

export interface QuotationItem {
  id: string
  name: string
  description: string
  category: string
  hours: number
  complexity: 'basic' | 'medium' | 'complex'
  dependencies?: string[]
}

export const systemElements: QuotationItem[] = [
  // ========== FRONTEND ==========
  {
    id: "fe_landing",
    name: "Página de Inicio/Landing",
    description: "Diseño y desarrollo de página principal con hero section, features y call-to-action",
    category: "Frontend",
    hours: 16,
    complexity: "medium"
  },
  {
    id: "fe_auth",
    name: "Sistema de Autenticación",
    description: "Login, registro, recuperación de contraseña con validaciones",
    category: "Frontend",
    hours: 24,
    complexity: "medium"
  },
  {
    id: "fe_dashboard",
    name: "Dashboard Administrativo",
    description: "Panel de control con métricas, gráficos y gestión de contenido",
    category: "Frontend",
    hours: 40,
    complexity: "complex"
  },
  {
    id: "fe_responsive",
    name: "Diseño Responsivo Completo",
    description: "Adaptación para móviles, tablets y desktop con breakpoints optimizados",
    category: "Frontend",
    hours: 20,
    complexity: "medium"
  },
  {
    id: "fe_forms",
    name: "Formularios Avanzados",
    description: "Formularios complejos con validaciones, campos dinámicos y file uploads",
    category: "Frontend",
    hours: 28,
    complexity: "medium"
  },
  {
    id: "fe_search",
    name: "Sistema de Búsqueda",
    description: "Búsqueda avanzada con filtros, paginación y resultados en tiempo real",
    category: "Frontend",
    hours: 32,
    complexity: "complex"
  },

  // ========== BACKEND ==========
  {
    id: "be_api_auth",
    name: "API de Autenticación",
    description: "Endpoints para login, registro, JWT tokens y middleware de seguridad",
    category: "Backend",
    hours: 32,
    complexity: "complex"
  },
  {
    id: "be_database",
    name: "Diseño de Base de Datos",
    description: "Modelado de entidades, relaciones, migraciones y seeders",
    category: "Backend",
    hours: 24,
    complexity: "medium"
  },
  {
    id: "be_crud_users",
    name: "CRUD de Usuarios",
    description: "Gestión completa de usuarios con roles y permisos",
    category: "Backend",
    hours: 28,
    complexity: "medium"
  },
  {
    id: "be_file_upload",
    name: "Sistema de Subida de Archivos",
    description: "Upload de imágenes/documentos con validación y almacenamiento en cloud",
    category: "Backend",
    hours: 20,
    complexity: "medium"
  },
  {
    id: "be_api_rest",
    name: "API REST Completa",
    description: "Endpoints RESTful con documentación OpenAPI/Swagger",
    category: "Backend",
    hours: 36,
    complexity: "complex"
  },
  {
    id: "be_notifications",
    name: "Sistema de Notificaciones",
    description: "Notificaciones en tiempo real con WebSockets o Server-Sent Events",
    category: "Backend",
    hours: 24,
    complexity: "complex"
  },

  // ========== INTEGRACIONES ==========
  {
    id: "int_payment",
    name: "Integración de Pagos",
    description: "Stripe/PayPal para procesamiento de pagos online con webhooks",
    category: "Integraciones",
    hours: 36,
    complexity: "complex"
  },
  {
    id: "int_email",
    name: "Sistema de Emails",
    description: "Templates y envío automatizado de notificaciones por email",
    category: "Integraciones",
    hours: 16,
    complexity: "basic"
  },
  {
    id: "int_analytics",
    name: "Analytics y Métricas",
    description: "Google Analytics, tracking de eventos y reportes personalizados",
    category: "Integraciones",
    hours: 12,
    complexity: "basic"
  },
  {
    id: "int_social_login",
    name: "Login con Redes Sociales",
    description: "Autenticación con Google, Facebook, GitHub usando OAuth2",
    category: "Integraciones",
    hours: 20,
    complexity: "medium"
  },
  {
    id: "int_maps",
    name: "Integración con Mapas",
    description: "Google Maps o Mapbox para geolocalización y mapas interactivos",
    category: "Integraciones",
    hours: 24,
    complexity: "medium"
  },
  {
    id: "int_sms",
    name: "Notificaciones SMS",
    description: "Integración con Twilio o similar para envío de SMS",
    category: "Integraciones",
    hours: 16,
    complexity: "medium"
  },

  // ========== DEVOPS Y DESPLIEGUE ==========
  {
    id: "dev_deployment",
    name: "Configuración de Deployment",
    description: "CI/CD pipeline, contenedores Docker y deploy en AWS/Azure/GCP",
    category: "DevOps",
    hours: 32,
    complexity: "complex"
  },
  {
    id: "dev_monitoring",
    name: "Monitoreo y Logs",
    description: "Configuración de logs, alertas y monitoreo de performance",
    category: "DevOps",
    hours: 20,
    complexity: "medium"
  },
  {
    id: "dev_security",
    name: "Configuración de Seguridad",
    description: "SSL, CORS, rate limiting, security headers y auditorías",
    category: "DevOps",
    hours: 24,
    complexity: "complex"
  },
  {
    id: "dev_backup",
    name: "Sistema de Backups",
    description: "Backups automatizados de base de datos y archivos",
    category: "DevOps",
    hours: 16,
    complexity: "medium"
  },

  // ========== TESTING Y QA ==========
  {
    id: "qa_unit_tests",
    name: "Tests Unitarios",
    description: "Cobertura de testing para funciones críticas del sistema",
    category: "Testing",
    hours: 32,
    complexity: "medium"
  },
  {
    id: "qa_e2e_tests",
    name: "Tests End-to-End",
    description: "Automatización de flujos completos de usuario con Cypress/Playwright",
    category: "Testing",
    hours: 28,
    complexity: "complex"
  },
  {
    id: "qa_performance",
    name: "Tests de Performance",
    description: "Pruebas de carga, stress testing y optimización de performance",
    category: "Testing",
    hours: 24,
    complexity: "complex"
  },
  {
    id: "qa_manual",
    name: "Testing Manual",
    description: "Pruebas manuales exhaustivas y documentación de casos de prueba",
    category: "Testing",
    hours: 20,
    complexity: "basic"
  },

  // ========== MÓVIL ==========
  {
    id: "mobile_pwa",
    name: "Progressive Web App",
    description: "Convertir aplicación web en PWA con funcionamiento offline",
    category: "Móvil",
    hours: 28,
    complexity: "medium"
  },
  {
    id: "mobile_react_native",
    name: "App React Native",
    description: "Desarrollo de aplicación móvil nativa con React Native",
    category: "Móvil",
    hours: 80,
    complexity: "complex"
  },
  {
    id: "mobile_responsive_advanced",
    name: "Optimización Móvil Avanzada",
    description: "Touch gestures, orientación de pantalla, performance móvil",
    category: "Móvil",
    hours: 24,
    complexity: "medium"
  },

  // ========== ADMINISTRACIÓN ==========
  {
    id: "admin_cms",
    name: "CMS Personalizado",
    description: "Sistema de gestión de contenido con editor WYSIWYG",
    category: "Administración",
    hours: 48,
    complexity: "complex"
  },
  {
    id: "admin_reports",
    name: "Sistema de Reportes",
    description: "Generación de reportes en PDF/Excel con gráficos y métricas",
    category: "Administración",
    hours: 36,
    complexity: "complex"
  },
  {
    id: "admin_roles",
    name: "Sistema de Roles Avanzado",
    description: "Gestión granular de permisos y roles de usuario",
    category: "Administración",
    hours: 32,
    complexity: "complex"
  },
  {
    id: "admin_audit",
    name: "Log de Auditoría",
    description: "Registro de todas las acciones de usuarios para auditoría",
    category: "Administración",
    hours: 20,
    complexity: "medium"
  }
]

// Configuración por defecto del cotizador
export const defaultQuotationSettings = {
  hourlyRate: 50,
  hoursPerDay: 8,
  taxRate: 16,
  currency: "USD",
  companyName: "CODEDMO Digital Solutions",
  projectName: "Proyecto de Desarrollo"
}

// Información de la empresa para PDF
export const companyInfo = {
  name: "CODEDMO Digital Solutions",
  address: "123 Tech Street, Digital City, DC 12345",
  phone: "+1 (555) 123-4567",
  email: "contacto@codedmo.com",
  website: "www.codedmo.com",
  logo: "/public/codedmo-logo-white-horizontal.svg" // Ruta al logo de la empresa
}
