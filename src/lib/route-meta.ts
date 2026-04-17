const SITE_URL = 'https://codedmo.dev';

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export interface RouteInfo {
  path: string;
  meta: RouteMeta;
}

const defaultKeywords = [
  'desarrollo web Guatemala',
  'desarrollo de software',
  'aplicaciones web',
  'hosting profesional',
  'integraciones empresariales',
  'CODEDMO',
];

const withCanonical = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

export const APP_ROUTES: RouteInfo[] = [
  {
    path: '/',
    meta: {
      title: 'Inicio | CODEDMO',
      description: 'Desarrollo web, software a medida, aplicaciones móviles, hosting e integraciones para empresas en Guatemala.',
      canonical: withCanonical('/'),
      keywords: defaultKeywords,
      ogImage: '/images/Hero.png',
    },
  },
  {
    path: '/servicios',
    meta: {
      title: 'Servicios | CODEDMO',
      description: 'Servicios de desarrollo web, software empresarial, hosting, cloud, Google Workspace, Microsoft 365 y cotización de proyectos.',
      canonical: withCanonical('/servicios'),
      keywords: [...defaultKeywords, 'servicios tecnológicos', 'desarrollo web profesional'],
    },
  },
  {
    path: '/servicios/desarrollo',
    meta: {
      title: 'Desarrollo de Software | CODEDMO',
      description: 'Desarrollo web, apps móviles, software a medida e integraciones API con tecnologías modernas.',
      canonical: withCanonical('/servicios/desarrollo'),
      keywords: [...defaultKeywords, 'desarrollo de software', 'desarrollo web', 'desarrollo móvil', 'API'],
    },
  },
  {
    path: '/servicios/desarrollo/web',
    meta: {
      title: 'Desarrollo Web | CODEDMO',
      description: 'Construimos sitios y aplicaciones web modernas, rápidas y optimizadas para conversión y SEO.',
      canonical: withCanonical('/servicios/desarrollo/web'),
      keywords: [...defaultKeywords, 'desarrollo web', 'sitios web modernos', 'React', 'Next.js'],
    },
  },
  {
    path: '/servicios/desarrollo/software',
    meta: {
      title: 'Software a Medida | CODEDMO',
      description: 'Soluciones empresariales personalizadas para automatizar procesos y escalar operaciones.',
      canonical: withCanonical('/servicios/desarrollo/software'),
      keywords: [...defaultKeywords, 'software a medida', 'software empresarial', 'sistemas personalizados'],
    },
  },
  {
    path: '/servicios/desarrollo/movil',
    meta: {
      title: 'Apps Móviles | CODEDMO',
      description: 'Aplicaciones móviles para iOS y Android diseñadas para experiencia, rendimiento y crecimiento.',
      canonical: withCanonical('/servicios/desarrollo/movil'),
      keywords: [...defaultKeywords, 'desarrollo móvil', 'apps iOS', 'apps Android'],
    },
  },
  {
    path: '/servicios/desarrollo/api',
    meta: {
      title: 'APIs e Integraciones | CODEDMO',
      description: 'Integramos plataformas, automatizamos procesos y construimos APIs robustas para tu negocio.',
      canonical: withCanonical('/servicios/desarrollo/api'),
      keywords: [...defaultKeywords, 'integraciones API', 'automatización', 'conectividad de sistemas'],
    },
  },
  {
    path: '/servicios/hosting&cloud',
    meta: {
      title: 'Hosting y Cloud | CODEDMO',
      description: 'Infraestructura, hosting administrado y servicios cloud para proyectos web y software empresarial.',
      canonical: withCanonical('/servicios/hosting&cloud'),
      keywords: [...defaultKeywords, 'hosting', 'cloud', 'infraestructura'],
    },
  },
  {
    path: '/servicios/hosting&cloud/hosting',
    meta: {
      title: 'Hosting Profesional | CODEDMO',
      description: 'Hosting seguro, rápido y administrado con soporte para sitios, tiendas y aplicaciones.',
      canonical: withCanonical('/servicios/hosting&cloud/hosting'),
      keywords: [...defaultKeywords, 'hosting profesional', 'alojamiento web', 'SSL'],
    },
  },
  {
    path: '/servicios/hosting&cloud/cloud',
    meta: {
      title: 'Servicios Cloud | CODEDMO',
      description: 'Servicios cloud para despliegue, escalabilidad y operación confiable de tus plataformas.',
      canonical: withCanonical('/servicios/hosting&cloud/cloud'),
      keywords: [...defaultKeywords, 'cloud computing', 'infraestructura cloud', 'escalabilidad'],
    },
  },
  {
    path: '/servicios/hosting&cloud/dominios',
    meta: {
      title: 'Dominios | CODEDMO',
      description: 'Registro y gestión de dominios para fortalecer la presencia digital de tu marca.',
      canonical: withCanonical('/servicios/hosting&cloud/dominios'),
      keywords: [...defaultKeywords, 'dominios', 'registro de dominio', 'marca digital'],
    },
  },
  {
    path: '/servicios/google&microsoft',
    meta: {
      title: 'Google y Microsoft | CODEDMO',
      description: 'Implementación, soporte e integración de Google Workspace y Microsoft 365 para tu empresa.',
      canonical: withCanonical('/servicios/google&microsoft'),
      keywords: [...defaultKeywords, 'Google Workspace', 'Microsoft 365', 'productividad empresarial'],
    },
  },
  {
    path: '/servicios/google&microsoft/workspace',
    meta: {
      title: 'Google Workspace | CODEDMO',
      description: 'Correo, colaboración, archivos y administración empresarial con Google Workspace.',
      canonical: withCanonical('/servicios/google&microsoft/workspace'),
      keywords: [...defaultKeywords, 'Google Workspace', 'Gmail empresarial', 'Google Drive'],
    },
  },
  {
    path: '/servicios/google&microsoft/microsoft365',
    meta: {
      title: 'Microsoft 365 | CODEDMO',
      description: 'Correo, Office, Teams y productividad empresarial con despliegue y soporte especializado.',
      canonical: withCanonical('/servicios/google&microsoft/microsoft365'),
      keywords: [...defaultKeywords, 'Microsoft 365', 'Office 365', 'Teams'],
    },
  },
  {
    path: '/servicios/cotizacion',
    meta: {
      title: 'Cotización de Proyectos | CODEDMO',
      description: 'Solicita una consulta gratuita y recibe una propuesta técnica para tu proyecto digital.',
      canonical: withCanonical('/servicios/cotizacion'),
      keywords: [...defaultKeywords, 'cotización', 'presupuesto de software', 'consulta gratuita'],
    },
  },
  {
    path: '/servicios/cotizacion/consulta',
    meta: {
      title: 'Consulta Gratuita | CODEDMO',
      description: 'Agenda una consulta gratuita para evaluar tu idea, alcance técnico y siguiente paso.',
      canonical: withCanonical('/servicios/cotizacion/consulta'),
      keywords: [...defaultKeywords, 'consulta gratuita', 'asesoría tecnológica'],
    },
  },
  {
    path: '/servicios/cotizacion/estimacion',
    meta: {
      title: 'Estimación Rápida | CODEDMO',
      description: 'Usa nuestras herramientas para estimar tiempo, costo y alcance de tu proyecto.',
      canonical: withCanonical('/servicios/cotizacion/estimacion'),
      keywords: [...defaultKeywords, 'estimación rápida', 'cotizador', 'calculadora de proyectos'],
    },
  },
  {
    path: '/portafolio',
    meta: {
      title: 'Portafolio | CODEDMO',
      description: 'Conoce proyectos y casos de uso desarrollados por CODEDMO para distintos tipos de negocio.',
      canonical: withCanonical('/portafolio'),
      keywords: [...defaultKeywords, 'portafolio', 'casos de éxito', 'proyectos web'],
    },
  },
  {
    path: '/contacto',
    meta: {
      title: 'Contacto | CODEDMO',
      description: 'Contáctanos para iniciar tu proyecto, resolver dudas técnicas o solicitar una propuesta.',
      canonical: withCanonical('/contacto'),
      keywords: [...defaultKeywords, 'contacto', 'consulta técnica', 'proyecto digital'],
    },
  },
  {
    path: '/about',
    meta: {
      title: 'Nosotros | CODEDMO',
      description: 'Conoce la visión, experiencia y enfoque de CODEDMO para construir productos digitales.',
      canonical: withCanonical('/about'),
      keywords: [...defaultKeywords, 'equipo de desarrollo', 'empresa tecnológica'],
    },
  },
  {
    path: '/politicas',
    meta: {
      title: 'Políticas | CODEDMO',
      description: 'Información legal y políticas de privacidad de CODEDMO.',
      canonical: withCanonical('/politicas'),
      keywords: [...defaultKeywords, 'política de privacidad', 'información legal'],
    },
  },
];

export const NOT_FOUND_META: RouteMeta = {
  title: 'Página no encontrada | CODEDMO',
  description: 'La página solicitada no existe o fue movida.',
  canonical: `${SITE_URL}/404`,
  keywords: defaultKeywords,
  noIndex: true,
};

export function getRouteMeta(pathname: string): RouteMeta {
  return APP_ROUTES.find((route) => route.path === pathname)?.meta ?? NOT_FOUND_META;
}
