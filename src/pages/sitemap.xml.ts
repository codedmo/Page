import type { APIRoute } from 'astro';
import { APP_ROUTES } from '../lib/route-meta';

const SITE_URL = 'https://codedmo.dev';

const staticUrls = APP_ROUTES
  .filter((route) => !route.meta.noIndex)
  .map((route) => route.meta.canonical);

const uniqueUrls = [...new Set([SITE_URL, ...staticUrls])];

export const GET: APIRoute = () => {
  const lastModified = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
