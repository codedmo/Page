  const generatePDF = async () => {
    try {
      // Cargar la plantilla PDF existente
      const existingPdfBytes = await fetch('/PDF/Cotizacion.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Obtener la página 8 (índice 7)
      const page = pdfDoc.getPage(7);
      
      // Configurar dimensiones basadas en 1920x1080px
      const { width, height } = page.getSize();
      
      // Configurar fuente y colores
      const fontSize = 14;
      const fontColor = rgb(0, 0, 0); // Negro para texto
      
      // Calcular posiciones proporcionalmente (suponiendo que la plantilla está diseñada para estas coordenadas)
      // Estos valores deberán ajustarse según la plantilla real
      
      // Datos del cliente y fecha
      const currentDate = new Date().toLocaleDateString('es-GT');
      page.drawText(`Fecha: ${currentDate}`, {
        x: width * 0.7, // 70% del ancho
        y: height * 0.9, // 90% de la altura
        size: fontSize,
        color: fontColor,
      });
      
      // Elementos seleccionados
      let yPosition = height * 0.75; // Comenzar al 75% de la altura
      const lineHeight = 25;
      
      selectedItemsList.forEach((item, index) => {
        if (yPosition > height * 0.2) { // No escribir muy abajo
          // Nombre del elemento
          page.drawText(item.name, {
            x: width * 0.1,
            y: yPosition,
            size: fontSize,
            color: fontColor,
          });
          
          // Horas
          page.drawText(`${item.hours}h`, {
            x: width * 0.6,
            y: yPosition,
            size: fontSize,
            color: fontColor,
          });
          
          // Costo individual
          const itemCost = item.hours * adminSettings.hourlyRate;
          page.drawText(`${adminSettings.currency}${itemCost.toLocaleString()}`, {
            x: width * 0.75,
            y: yPosition,
            size: fontSize,
            color: fontColor,
          });
          
          yPosition -= lineHeight;
        }
      });
      
      // Resumen financiero
      const summaryY = height * 0.25; // Al 25% de la altura
      const summaryX = width * 0.6; // Al 60% del ancho
      
      // Costo
      page.drawText(`Costo: ${adminSettings.currency}${subtotalPrice.toLocaleString()}`, {
        x: summaryX,
        y: summaryY,
        size: fontSize + 2,
        color: fontColor,
      });
      
      // IVA
      page.drawText(`IVA (${adminSettings.billingPercentage}%): ${adminSettings.currency}${billingAmount.toLocaleString()}`, {
        x: summaryX,
        y: summaryY - 25,
        size: fontSize + 2,
        color: fontColor,
      });
      
      // Total
      page.drawText(`TOTAL: ${adminSettings.currency}${totalPrice.toLocaleString()}`, {
        x: summaryX,
        y: summaryY - 50,
        size: fontSize + 4,
        color: rgb(0.6, 0.1, 0.1), // Color rojo para el total
      });
      
      // Información adicional
      page.drawText(`Total de elementos: ${selectedItemsList.length}`, {
        x: width * 0.1,
        y: summaryY,
        size: fontSize,
        color: fontColor,
      });
      
      page.drawText(`Total de horas: ${totalHours}h`, {
        x: width * 0.1,
        y: summaryY - 25,
        size: fontSize,
        color: fontColor,
      });
      
      page.drawText(`Días estimados: ${estimatedDays}`, {
        x: width * 0.1,
        y: summaryY - 50,
        size: fontSize,
        color: fontColor,
      });
      
      // Guardar el PDF modificado
      const pdfBytes = await pdfDoc.save();
      
      // Crear blob y descargar
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Cotizacion-CODEDMO-${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Verifique que el archivo de plantilla existe.');
    }
  };
