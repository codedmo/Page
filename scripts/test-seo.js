// Script para verificar la implementación SEO
// Ejecutar en la consola del navegador para verificar meta tags

console.log('🔍 VERIFICACIÓN SEO - CODEDMO');
console.log('===============================');

// Verificar título
console.log('📄 TÍTULO:', document.title);

// Verificar meta tags básicos
const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
console.log('📝 DESCRIPCIÓN:', description);

const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
console.log('🏷️ KEYWORDS:', keywords);

const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
console.log('🔗 CANONICAL:', canonical);

const author = document.querySelector('meta[name="author"]')?.getAttribute('content');
console.log('👤 AUTOR:', author);

const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
console.log('🤖 ROBOTS:', robots);

// Verificar Open Graph
console.log('\n🌐 OPEN GRAPH TAGS:');
const ogTags = document.querySelectorAll('meta[property^="og:"]');
ogTags.forEach(tag => {
  console.log(`   ${tag.getAttribute('property')}: ${tag.getAttribute('content')}`);
});

// Verificar Twitter Cards
console.log('\n🐦 TWITTER CARDS:');
const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
twitterTags.forEach(tag => {
  console.log(`   ${tag.getAttribute('name')}: ${tag.getAttribute('content')}`);
});

// Verificar idiomas alternativos
console.log('\n🌍 IDIOMAS ALTERNATIVOS:');
const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
hreflangTags.forEach(tag => {
  console.log(`   ${tag.getAttribute('hreflang')}: ${tag.getAttribute('href')}`);
});

// Verificar datos estructurados
console.log('\n📊 DATOS ESTRUCTURADOS:');
const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
jsonLdScripts.forEach((script, index) => {
  try {
    const data = JSON.parse(script.textContent);
    console.log(`   Schema ${index + 1} (${data['@type']}):`, data);
  } catch (e) {
    console.log(`   Schema ${index + 1}: Error parsing`, e);
  }
});

// Verificar meta tags adicionales
console.log('\n📱 META TAGS ADICIONALES:');
const additionalTags = [
  'HandheldFriendly',
  'MobileOptimized',
  'format-detection',
  'msapplication-TileColor',
  'theme-color',
  'geo.region',
  'geo.placename'
];

additionalTags.forEach(tagName => {
  const tag = document.querySelector(`meta[name="${tagName}"]`);
  if (tag) {
    console.log(`   ${tagName}: ${tag.getAttribute('content')}`);
  }
});

// Verificar atributos del documento
console.log('\n📋 ATRIBUTOS DEL DOCUMENTO:');
console.log('   lang:', document.documentElement.getAttribute('lang'));
console.log('   data-seo-applied:', document.documentElement.getAttribute('data-seo-applied'));
console.log('   data-seo-page:', document.documentElement.getAttribute('data-seo-page'));
console.log('   data-seo-section:', document.documentElement.getAttribute('data-seo-section'));

console.log('\n✅ Verificación completada!');
console.log('💡 Tip: Usa las herramientas de desarrollo de Google para verificar la estructura de datos.');

// Función helper para exportar datos SEO
window.exportSEOData = function() {
  return {
    title: document.title,
    meta: {
      description,
      keywords,
      author,
      robots,
      canonical
    },
    openGraph: Array.from(ogTags).reduce((acc, tag) => {
      acc[tag.getAttribute('property')] = tag.getAttribute('content');
      return acc;
    }, {}),
    twitter: Array.from(twitterTags).reduce((acc, tag) => {
      acc[tag.getAttribute('name')] = tag.getAttribute('content');
      return acc;
    }, {}),
    hreflang: Array.from(hreflangTags).map(tag => ({
      lang: tag.getAttribute('hreflang'),
      href: tag.getAttribute('href')
    })),
    structuredData: Array.from(jsonLdScripts).map(script => {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        return { error: 'Failed to parse JSON-LD' };
      }
    })
  };
};

console.log('🚀 Función exportSEOData() disponible para exportar todos los datos SEO');
