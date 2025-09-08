import { useState } from 'react';
import { Calculator, CheckCircle, Clock, DollarSign, FileText, Download, Phone } from 'lucide-react';
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

// Tarifa por hora fija
const HOURLY_RATE = 35; // Q35 por hora

// Datos expandidos para la cotización con componentes técnicos específicos
const systemElements: QuotationItem[] = [
  // UI/UX Components
  {
    id: '1',
    name: 'Diseño UI/UX',
    category: 'UI/UX',
    hours: 24,
    complexity: 'Intermedio',
    description: 'Wireframes, mockups y prototipo interactivo'
  },
  {
    id: '2',
    name: 'Sistema de Componentes',
    category: 'UI/UX',
    hours: 20, // Q875
    complexity: 'Intermedio',
    description: 'Design System con componentes reutilizables'
  },
  {
    id: '3',
    name: 'Responsive Design',
    category: 'UI/UX',
    hours: 20, // Q700
    complexity: 'Básico',
    description: 'Adaptación móvil, tablet y desktop'
  },
  {
    id: '4',
    name: 'Animaciones y Transiciones',
    category: 'UI/UX',
    hours: 3, // Q1050
    complexity: 'Avanzado',
    description: 'Micro-interacciones y animaciones CSS/JS'
  },
  {
    id: '5',
    name: 'Testing de Usabilidad',
    category: 'UI/UX',
    hours: 18, // Q630
    complexity: 'Intermedio',
    description: 'Pruebas de usuario y optimización UX'
  },
  
  // Frontend Development
  {
    id: '6',
    name: 'Estructuración Frontend',
    category: 'Frontend',
    hours: 35, // Q1225
    complexity: 'Intermedio',
    description: 'Arquitectura de carpetas y componentes React/Vue'
  },
  {
    id: '7',
    name: 'State Management',
    category: 'Frontend',
    hours: 28, // Q980
    complexity: 'Avanzado',
    description: 'Redux, Zustand o Context API'
  },
  {
    id: '8',
    name: 'Formularios Avanzados',
    category: 'Frontend',
    hours: 22, // Q770
    complexity: 'Intermedio',
    description: 'Validaciones, campos dinámicos y file uploads'
  },
  {
    id: '9',
    name: 'Routing y Navegación',
    category: 'Frontend',
    hours: 15, // Q525
    complexity: 'Básico',
    description: 'React Router o Vue Router con guards'
  },
  {
    id: '10',
    name: 'Optimización Performance',
    category: 'Frontend',
    hours: 25, // Q875
    complexity: 'Avanzado',
    description: 'Lazy loading, code splitting, bundle optimization'
  },

  // Backend Architecture
  {
    id: '11',
    name: 'Arquitectura MVC',
    category: 'Backend',
    hours: 30, // Q1050
    complexity: 'Intermedio',
    description: 'Estructura Model-View-Controller'
  },
  {
    id: '12',
    name: 'Creación de API REST',
    category: 'Backend',
    hours: 45, // Q1575
    complexity: 'Avanzado',
    description: 'Endpoints RESTful con documentación OpenAPI'
  },
  {
    id: '13',
    name: 'Integración de APIs',
    category: 'Backend',
    hours: 25, // Q875
    complexity: 'Intermedio',
    description: 'Consumo de APIs externas y webhooks'
  },
  {
    id: '14',
    name: 'Middleware y Guards',
    category: 'Backend',
    hours: 20, // Q700
    complexity: 'Intermedio',
    description: 'Interceptores, validaciones y protección de rutas'
  },
  {
    id: '15',
    name: 'Manejo de Errores',
    category: 'Backend',
    hours: 18, // Q630
    complexity: 'Básico',
    description: 'Try-catch, logs y respuestas de error estándar'
  },

  // Database Design
  {
    id: '16',
    name: 'Diseño de Base de Datos',
    category: 'Database',
    hours: 35, // Q1225
    complexity: 'Avanzado',
    description: 'ERD, normalización y optimización'
  },
  {
    id: '17',
    name: 'Estructuración de DB',
    category: 'Database',
    hours: 25, // Q875
    complexity: 'Intermedio',
    description: 'Tablas, relaciones y constraints'
  },
  {
    id: '18',
    name: 'Migrations y Seeds',
    category: 'Database',
    hours: 20, // Q700
    complexity: 'Intermedio',
    description: 'Versionado de DB y datos de prueba'
  },
  {
    id: '19',
    name: 'Índices y Optimización',
    category: 'Database',
    hours: 22, // Q770
    complexity: 'Avanzado',
    description: 'Performance queries y indexación'
  },
  {
    id: '20',
    name: 'Backup y Recuperación',
    category: 'Database',
    hours: 15, // Q525
    complexity: 'Intermedio',
    description: 'Estrategias de respaldo automatizado'
  },

  // User Management
  {
    id: '21',
    name: 'CRUD de Usuarios',
    category: 'Users',
    hours: 30, // Q1050
    complexity: 'Intermedio',
    description: 'Crear, leer, actualizar y eliminar usuarios'
  },
  {
    id: '22',
    name: 'Sistema de Roles',
    category: 'Users',
    hours: 35, // Q1225
    complexity: 'Avanzado',
    description: 'RBAC con permisos granulares'
  },
  {
    id: '23',
    name: 'Autenticación JWT',
    category: 'Users',
    hours: 25, // Q875
    complexity: 'Avanzado',
    description: 'JSON Web Tokens con refresh tokens'
  },
  {
    id: '24',
    name: 'Perfil de Usuario',
    category: 'Users',
    hours: 20, // Q700
    complexity: 'Básico',
    description: 'Gestión de perfil y configuraciones'
  },
  {
    id: '25',
    name: 'Recuperación de Contraseña',
    category: 'Users',
    hours: 18, // Q630
    complexity: 'Intermedio',
    description: 'Reset password con email verification'
  },

  // Security & Payments
  {
    id: '26',
    name: 'Encriptación de Datos',
    category: 'Security',
    hours: 22, // Q770
    complexity: 'Avanzado',
    description: 'Bcrypt, hashing y datos sensibles'
  },
  {
    id: '27',
    name: 'Pasarela de Pago',
    category: 'Security',
    hours: 40, // Q1400
    complexity: 'Avanzado',
    description: 'Stripe/PayPal integration con webhooks'
  },
  {
    id: '28',
    name: 'Validación de Datos',
    category: 'Security',
    hours: 15, // Q525
    complexity: 'Básico',
    description: 'Sanitización y validación de inputs'
  },
  {
    id: '29',
    name: 'Rate Limiting',
    category: 'Security',
    hours: 12, // Q420
    complexity: 'Intermedio',
    description: 'Protección contra ataques DDoS'
  },
  {
    id: '30',
    name: 'CORS y Headers',
    category: 'Security',
    hours: 10, // Q350
    complexity: 'Básico',
    description: 'Configuración de seguridad HTTP'
  },

  // SEO & Optimization
  {
    id: '31',
    name: 'SEO On-Page',
    category: 'SEO',
    hours: 25, // Q875
    complexity: 'Intermedio',
    description: 'Meta tags, schema markup y sitemap'
  },
  {
    id: '32',
    name: 'Core Web Vitals',
    category: 'SEO',
    hours: 20, // Q700
    complexity: 'Avanzado',
    description: 'Optimización LCP, FID y CLS'
  },
  {
    id: '33',
    name: 'Analytics Integration',
    category: 'SEO',
    hours: 15, // Q525
    complexity: 'Básico',
    description: 'Google Analytics y Search Console'
  },
  {
    id: '34',
    name: 'Open Graph & Twitter Cards',
    category: 'SEO',
    hours: 12, // Q420
    complexity: 'Básico',
    description: 'Metadatos para redes sociales'
  },

  // Mobile Development
  {
    id: '35',
    name: 'App Android Nativa',
    category: 'Mobile',
    hours: 120, // Q4200
    complexity: 'Avanzado',
    description: 'Desarrollo en Kotlin/Java'
  },
  {
    id: '36',
    name: 'App iOS Nativa',
    category: 'Mobile',
    hours: 120, // Q4200
    complexity: 'Avanzado',
    description: 'Desarrollo en Swift/SwiftUI'
  },
  {
    id: '37',
    name: 'React Native App',
    category: 'Mobile',
    hours: 80, // Q2800
    complexity: 'Intermedio',
    description: 'App híbrida multiplataforma'
  },
  {
    id: '38',
    name: 'Push Notifications',
    category: 'Mobile',
    hours: 25, // Q875
    complexity: 'Avanzado',
    description: 'FCM/APNS integration'
  },
  {
    id: '39',
    name: 'Integración Play Store',
    category: 'Mobile',
    hours: 18, // Q630
    complexity: 'Intermedio',
    description: 'Publicación y configuración en Google Play'
  },
  {
    id: '40',
    name: 'Integración App Store',
    category: 'Mobile',
    hours: 20, // Q700
    complexity: 'Intermedio',
    description: 'Publicación y review en Apple App Store'
  }
];

export default function QuotationModern() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    systemElements.map(item => ({ ...item, selected: false }))
  );

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

  // Cálculos simplificados
  const selectedItemsList = selectedItems.filter(item => item.selected);
  const totalPrice = selectedItemsList.reduce((sum, item) => sum + (item.hours * HOURLY_RATE), 0);
  const totalHours = selectedItemsList.reduce((sum, item) => sum + item.hours, 0);
  const estimatedDays = Math.ceil(totalHours / 8); // 8 horas por día fijo

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
      danger: [239, 68, 68]
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
      { label: 'Inversión Total', value: `Q${totalPrice.toLocaleString()}`, color: colors.success }
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
      const cost = hours * HOURLY_RATE;
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
          if (item.complexity === 'Intermedio') complexityColor = colors.warning;
          if (item.complexity === 'Avanzado') complexityColor = colors.danger;
          
          doc.setFillColor(complexityColor[0], complexityColor[1], complexityColor[2]);
          doc.rect(90, yPos - 1, 25, 8, 'F');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text(item.complexity, 92, yPos + 4);
          
          doc.setFontSize(9);
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          doc.text(`${item.hours}h`, 145, yPos + 3);
          
          doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
          doc.text(`Q${(item.hours * HOURLY_RATE).toLocaleString()}`, 165, yPos + 3);
          
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
    doc.rect(20, yPos, 170, 40, 'F');
    
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('RESUMEN FINAL', 105, yPos + 15, { align: 'center' });
    
    doc.setFontSize(24);
    doc.text(`TOTAL: Q${totalPrice.toLocaleString()}`, 105, yPos + 30, { align: 'center' });
    
    yPos += 60;
    
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Básico':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermedio':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Avanzado':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const categories = Array.from(new Set(systemElements.map(item => item.category)));

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-4`}>
          <Calculator className="w-4 h-4 mr-2" />
          Cotizador Inteligente
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Calcula el <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>costo</span> de tu proyecto
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Selecciona los elementos que necesitas y obtén una cotización personalizada al instante.
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
          <DollarSign className="w-4 h-4 mr-1" />
          Tarifa: Q35/hora
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Lista de elementos - más compacta */}
        <div className="lg:col-span-3 space-y-4">
          {categories.map(category => (
            <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                {category}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {getCategoryItems(category).map(item => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                      item.selected 
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            item.selected ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                          }`}>
                            {item.selected && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getComplexityColor(item.complexity)}`}>
                            {item.complexity}
                          </span>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold text-sm">Q{(item.hours * HOURLY_RATE).toLocaleString()}</div>
                            <div className="text-gray-400 text-xs">{item.hours}h</div>
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
        <div className="space-y-4">
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
              <div className="space-y-4">
                {/* Items seleccionados - compacto */}
                <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500/70">
                  {selectedItemsList.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm bg-white/5 rounded-lg p-2">
                      <div>
                        <span className="text-white font-medium">{item.name}</span>
                        <div className="text-gray-400 text-xs">{item.hours}h</div>
                      </div>
                      <span className="text-purple-400 font-bold">Q{(item.hours * HOURLY_RATE).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total horas:</span>
                    <span className="text-white font-semibold">{totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-white">Total:</span>
                    <span className="text-lg font-bold text-green-400">
                      Q{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className={`bg-gradient-to-r ${gradients.primary} bg-opacity-20 rounded-lg p-3 border border-purple-500/30`}>
                  <div className="flex items-center mb-2">
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
                  className={`w-full py-3 bg-gradient-to-r ${gradients.primary} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </button>
                
              </div>
            )}
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30 sticky z-10 mt-4">
              <h4 className="text-yellow-300 font-semibold text-sm mb-2 flex items-center">
                ⚠️ Estimado de Proyecto
              </h4>
              <p className="text-yellow-200/80 text-xs leading-relaxed">
                Este es un <strong>estimado aproximado</strong> de un proyecto promedio. 
                El costo final puede ser <strong>menor o mayor</strong> dependiendo de la complejidad específica. 
                Para una cotización precisa, contáctanos.
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400 text-xs mb-2">
                ¿Necesitas algo personalizado?
              </p>
              <button 
                onClick={handlePhoneContact}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors flex items-center justify-center mx-auto"
              >
                <Phone className="w-4 h-4 mr-1" />
                Llamar: +502 3792-3612
              </button>
            </div>
          </div>

          {/* Disclaimer importante */}
        </div>
      </div>
    </div>
  );
}
