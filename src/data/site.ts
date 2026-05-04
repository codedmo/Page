export interface NavItem {
  href: string;
  label: string;
}

export interface ContactSocialLink {
  href: string;
  label: string;
  shortLabel: string;
}

export interface ServiceLink {
  href: string;
  label: string;
  description: string;
}

export interface ServiceCategory {
  href: string;
  label: string;
  description: string;
  accent: string;
  items: ServiceLink[];
}

export interface PortfolioProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  link: string;
  featured?: boolean;
  demo?: boolean;
}

export const navigation: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/portafolio', label: 'Portafolio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export const contactInfo = {
  email: 'info@codedmo.dev',
  legalEmail: 'legal@codedmo.dev',
  phoneDisplay: '+502 3792-3612',
  phoneHref: 'tel:+50237923612',
  whatsappHref:
    'https://wa.me/50237923612?text=Hola%20CODEDMO%2C%20quiero%20hablar%20sobre%20mi%20proyecto.',
  whatsappLabel: 'Chatear por WhatsApp',
  facebookHref: 'https://www.facebook.com/profile.php?id=61578671524932',
  instagramHref: 'https://www.instagram.com/codedmo.dev',
  location: 'Guatemala, Guatemala',
  legalLocation: 'Ciudad de Guatemala, Guatemala',
} as const;

export const contactSocialLinks: ContactSocialLink[] = [
  {
    href: contactInfo.facebookHref,
    label: 'Facebook CODEDMO',
    shortLabel: 'Facebook',
  },
  {
    href: contactInfo.instagramHref,
    label: 'Instagram @codedmo.dev',
    shortLabel: 'Instagram',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    href: '/servicios/desarrollo',
    label: 'Desarrollo',
    description: 'Web, software a medida, apps móviles y APIs.',
    accent: 'from-blue-500 to-cyan-500',
    items: [
      {
        href: '/servicios/desarrollo/web',
        label: 'Desarrollo Web',
        description: 'Sitios y aplicaciones modernas optimizadas para SEO.',
      },
      {
        href: '/servicios/desarrollo/software',
        label: 'Software a Medida',
        description: 'Sistemas empresariales y automatización.',
      },
      {
        href: '/servicios/desarrollo/movil',
        label: 'Apps Móviles',
        description: 'Experiencias iOS y Android con foco en conversión.',
      },
      {
        href: '/servicios/desarrollo/api',
        label: 'APIs e Integraciones',
        description: 'Conecta procesos, ERPs y plataformas externas.',
      },
    ],
  },
  {
    href: '/servicios/hosting&cloud',
    label: 'Hosting & Cloud',
    description: 'Infraestructura segura, soporte y despliegue confiable.',
    accent: 'from-emerald-500 to-teal-500',
    items: [
      {
        href: '/servicios/hosting&cloud/hosting',
        label: 'Hosting Profesional',
        description: 'Alojamiento con SSL, backup y soporte continuo.',
      },
    ],
  },
  {
    href: '/servicios/google&microsoft',
    label: 'Google & Microsoft',
    description: 'Workspace, Microsoft 365 e integraciones empresariales.',
    accent: 'from-indigo-500 to-violet-500',
    items: [
      {
        href: '/servicios/google&microsoft/workspace',
        label: 'Google Workspace',
        description: 'Correo, colaboración y administración centralizada.',
      },
      {
        href: '/servicios/google&microsoft/microsoft365',
        label: 'Microsoft 365',
        description: 'Office, Teams, OneDrive y productividad empresarial.',
      },
    ],
  },
  {
    href: '/servicios/cotizacion',
    label: 'Cotización',
    description: 'Consulta gratuita y herramientas de estimación.',
    accent: 'from-fuchsia-500 to-pink-500',
    items: [
      {
        href: '/servicios/cotizacion/consulta',
        label: 'Consulta Gratuita',
        description: 'Revisión técnica y plan de acción.',
      },
      {
        href: '/servicios/cotizacion/estimacion',
        label: 'Estimación Rápida',
        description: 'Cotizador y triángulo de hierro.',
      },
    ],
  },
];

export const featuredServices: ServiceLink[] = [
  serviceCategories[0].items[0],
  serviceCategories[0].items[1],
  serviceCategories[1].items[0],
  serviceCategories[2].items[0],
  serviceCategories[2].items[1],
  serviceCategories[3].items[1],
];

export const footerLegalLinks: NavItem[] = [
  { href: '/politicas', label: 'Políticas' },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title      : 'Tienda de Ropa Online',
    description: 'E-commerce moderno con experiencia de compra clara, catálogo optimizado y flujo de conversión enfocado en ventas.',
    image      : '/images/previews/ropa-preview.jpg',
    tags       : ['React', 'Next.js', 'Tailwind CSS', 'E-commerce'],
    type       : 'E-commerce',
    link       : 'https://ropa.codedmo.dev',
    featured   : true,
    demo       : true,
  },
  {
    title      : 'Portal de Negocios',
    description: 'Sitio promocional empresarial diseñado para captación de leads, claridad comercial y posicionamiento orgánico.',
    image      : '/images/previews/negocio-preview.jpg',
    tags       : ['Next.js', 'Business', 'SEO'],
    type       : 'Business',
    link       : 'https://negocio.codedmo.dev',
    featured   : false,
    demo       : true,
  },
  {
    title      : 'Bento Portfolio',
    description: 'Portafolio personal con estructura bento, jerarquía visual limpia y alto impacto en desktop y móvil.',
    image      : '/images/previews/bento-preview.jpg',
    tags       : ['React', 'Portfolio', 'Bento'],
    type       : 'Portfolio',
    link       : 'https://bento.codedmo.dev',
    demo       : true,
  },
  {
    title      : 'Zapatos Online',
    description: 'Tienda digital orientada a catálogo, filtros, descubrimiento de producto y checkout simplificado.',
    image      : '/images/previews/zapatos-preview.jpg',
    tags       : ['React', 'E-commerce', 'Fashion'],
    type       : 'E-commerce',
    link       : 'https://zapatos.codedmo.dev',
    demo       : true,
  },
  {
    title      : 'Mudanzas CG',
    description: 'Empresa Guatemalteca dedicada a las Mudanzas en Guatemala, El Salvador y Honduras. Optimización SEO y enlace con Google Ads para generación de leads.',
    image      : '/images/previews/MudanzasCG-preview.png',
    tags       : ['Next.js', 'PyMes', 'Mudanzas'],
    type       : 'PyMes',
    link       : 'https://mudanzascg.com',
    demo       : false
  ,
  },
  {
    title      : 'Global Paper Source',
    description: 'Empresa Guatemalteca dedicada a la fabricación y distribución de papel higiénico y servilletas personalizadas para terceros y marcas propias así como mantenimiento de maquinaria relacionada.',
    image      : '/images/previews/GPS-preview.png',
    tags       : ['Astro', 'PyMes', 'Industria Papelera'],
    type       : 'PyMes',
    link       : 'https://globalpapersource.com',
    demo       : false,
    featured   : true 
  ,
  },
];
