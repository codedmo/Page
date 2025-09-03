// Script para probar el formateo y validación de números de teléfono

const formatPhoneNumber = (phone) => {
  if (!phone) return { formatted: '', whatsappUrl: '', isValid: false };
  
  // Limpiar el número (solo números y +)
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Validar que tenga al menos 7 dígitos y máximo 15 (estándar internacional)
  const isValid = /^\+?[\d]{7,15}$/.test(cleaned);
  
  if (!isValid) return { formatted: phone, whatsappUrl: '', isValid: false };
  
  // Asegurar que tenga código de país
  let formattedPhone = cleaned;
  if (!cleaned.startsWith('+')) {
    // Si no tiene +, asumir que es local y agregar código de Guatemala por defecto
    if (cleaned.length === 8 && (cleaned.startsWith('2') || cleaned.startsWith('3') || cleaned.startsWith('4') || cleaned.startsWith('5') || cleaned.startsWith('6') || cleaned.startsWith('7'))) {
      formattedPhone = '+502' + cleaned;
    } else if (cleaned.length === 10 && cleaned.startsWith('1')) {
      // Número de EE.UU./Canadá
      formattedPhone = '+1' + cleaned;
    } else {
      // Otros casos, agregar + al inicio
      formattedPhone = '+' + cleaned;
    }
  }
  
  // Crear URL de WhatsApp (solo números, sin +)
  const whatsappNumber = formattedPhone.replace(/\+/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola, vi tu mensaje de contacto y me gustaría conversar contigo.`;
  
  return {
    formatted: formattedPhone,
    whatsappUrl,
    isValid: true
  };
};

// Casos de prueba
const testCases = [
  '22334455',        // Guatemala fijo
  '33445566',        // Guatemala móvil
  '12345678901',     // EE.UU.
  '+50233445566',    // Guatemala con código
  '+1234567890',     // Internacional
  '555-123-4567',    // Formato con guiones
  '(555) 123-4567',  // Formato con paréntesis
  '+502 3344 5566',  // Con espacios
  '123',             // Muy corto (inválido)
  '12345678901234567', // Muy largo (inválido)
  '',                // Vacío
  'abc123',          // Con letras (inválido)
];

console.log('🧪 Pruebas de formateo de números de teléfono:\n');

testCases.forEach((phone, index) => {
  const result = formatPhoneNumber(phone);
  console.log(`Caso ${index + 1}: "${phone}"`);
  console.log(`  ✅ Válido: ${result.isValid}`);
  console.log(`  📞 Formateado: ${result.formatted}`);
  console.log(`  💬 WhatsApp: ${result.whatsappUrl}`);
  console.log('');
});

console.log('✨ Todas las pruebas completadas!');
