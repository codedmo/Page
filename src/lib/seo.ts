import { APP_ROUTES } from './route-meta';
import { contactInfo } from '../data/site';

const SITE_URL = 'https://codedmo.dev';

const titleToName = (title: string) => title.replace(/\s+\|\s+CODEDMO$/, '').trim();

const routeNameMap = new Map(APP_ROUTES.map((route) => [route.path, titleToName(route.meta.title)]));
routeNameMap.set('/', 'Inicio');

export function buildBreadcrumbItems(pathname: string) {
  const normalizedPath = pathname && pathname !== '' ? pathname : '/';
  const segments = normalizedPath === '/' ? ['/'] : normalizedPath.split('/').filter(Boolean);
  const paths =
    normalizedPath === '/'
      ? ['/']
      : ['/', ...segments.map((_, index) => `/${segments.slice(0, index + 1).join('/')}`)];

  return paths
    .filter((path, index, all) => all.indexOf(path) === index)
    .map((path) => ({
      name: routeNameMap.get(path) || titleToName(path.split('/').filter(Boolean).slice(-1)[0] || 'Inicio'),
      item: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    }));
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'CODEDMO Solutions',
    alternateName: 'CODEDMO',
    url: SITE_URL,
    logo: `${SITE_URL}/codedmo-logo-blue-square.svg`,
    email: contactInfo.email,
    telephone: '+50237923612',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+50237923612',
      contactType: 'sales',
      areaServed: 'GT',
      availableLanguage: ['es', 'en'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guatemala',
      addressRegion: 'Guatemala',
      addressCountry: 'GT',
    },
    sameAs: [
      'https://github.com/codedmo',
      contactInfo.facebookHref,
      contactInfo.instagramHref,
    ],
  };
}

export function buildWebPageSchema({
  pathname,
  canonical,
  title,
  description,
}: {
  pathname: string;
  canonical: string;
  title: string;
  description: string;
}) {
  const pageName = titleToName(title);
  const breadcrumbs = buildBreadcrumbItems(pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: pageName,
    description,
    inLanguage: 'es-GT',
    isPartOf: {
      '@id': `${SITE_URL}#website`,
    },
    about: {
      '@id': `${SITE_URL}#organization`,
    },
    breadcrumb: {
      '@id': `${canonical}#breadcrumb`,
    },
    ...(breadcrumbs.length > 1
      ? {
          mainEntityOfPage: canonical,
        }
      : {}),
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'CODEDMO',
    inLanguage: 'es-GT',
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(pathname: string, canonical: string) {
  const items = buildBreadcrumbItems(pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
