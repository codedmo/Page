// Script rápido para verificar título optimizado
console.log('🔍 VERIFICACIÓN TÍTULO OPTIMIZADO');
console.log('================================');
console.log('📄 TÍTULO ACTUAL:', document.title);
console.log('📏 LONGITUD:', document.title.length, 'caracteres');

// Verificar que el título sea apropiado para pestañas
if (document.title.length <= 30) {
  console.log('✅ PERFECTO: Título corto y legible en pestañas');
} else if (document.title.length <= 50) {
  console.log('✅ BUENO: Título apropiado para la mayoría de navegadores');
} else {
  console.log('⚠️ MEJORABLE: Título un poco largo para pestañas');
}

// Mostrar cómo se vería truncado en diferentes navegadores
console.log('\n📱 SIMULACIÓN PESTAÑAS:');
console.log('Chrome (30 chars):', document.title.substring(0, 30) + (document.title.length > 30 ? '...' : ''));
console.log('Firefox (35 chars):', document.title.substring(0, 35) + (document.title.length > 35 ? '...' : ''));
console.log('Safari (40 chars):', document.title.substring(0, 40) + (document.title.length > 40 ? '...' : ''));

console.log('\n🎯 ANÁLISIS SEO:');
console.log('- Marca presente:', document.title.includes('CODEDMO') ? '✅' : '❌');
console.log('- Palabra clave principal:', document.title.includes('Desarrollo') ? '✅' : '❌');
console.log('- Separador pipe (|):', document.title.includes('|') ? '✅' : '❌');
console.log('- Legible y claro:', document.title.length <= 50 ? '✅' : '❌');
