import { useSEO } from "@/hooks/useSEO"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { themeColors, gradients, borders } from "@/config/theme-colors"

export default function Politicas() {
  // SEO optimizado para la página de Políticas y Términos
  const politicasSEOConfig = {
    title: 'Políticas de Privacidad, Términos y Derechos de Autor | CODEDMO',
    description:
      'Descubre las políticas de privacidad, términos de servicio y normas de propiedad intelectual de CODEDMO. Protegemos tus datos y aclaramos derechos, entregas y garantías para proyectos de software.',
    keywords: [
      'política privacidad',
      'términos y condiciones',
      'derechos de autor software',
      'privacidad datos Guatemala',
      'garantía software',
      'condiciones proyecto desarrollo',
      'CODEDMO políticas'
    ],
    canonical: 'https://codedmo.dev/politicas',
    breadcrumbs: [
      { name: 'Inicio', url: 'https://codedmo.dev' },
      { name: 'Políticas', url: 'https://codedmo.dev/politicas' }
    ]
  }

  // Aplicar SEO
  useSEO({
    ...politicasSEOConfig,
    priority: 'medium',
    pageType: 'about',
    faqData: [
      {
        question: '¿Cómo protege CODEDMO mi información personal?',
        answer:
          'Utilizamos protocolos seguros (SSL/TLS) para transmisión de datos, cifrado en reposo cuando aplica, autenticación robusta para áreas administrativas y revisiones periódicas de seguridad para minimizar riesgos.'
      },
      {
        question: '¿Qué ocurre si cancelo un proyecto en curso?',
        answer:
          'Si el cliente decide interrumpir el proyecto sin que exista incumplimiento por parte de CODEDMO, no procederá el reembolso del anticipo acordado. Esto protege el trabajo ya ejecutado y los recursos asignados.'
      },
      {
        question: '¿Quién posee los derechos del software entregado?',
        answer:
          'Los derechos de explotación y uso se transfieren al cliente una vez que el pago total del proyecto (100%) ha sido recibido; hasta entonces, CODEDMO mantiene la titularidad sobre la solución desarrollada.'
      },
      {
        question: '¿Qué tipo de garantía ofrecen?',
        answer:
          'Ofrecemos una garantía de 3 meses posterior a la entrega para corregir defectos y fallos relacionados con el alcance; además ofrecemos planes de soporte y mantenimiento opcionales.'
      }
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Políticas y Términos | CODEDMO',
      description: 'Políticas de privacidad, términos de servicio y normativas de propiedad intelectual de CODEDMO',
      mainEntity: {
        '@type': 'TermsOfService',
        name: 'Términos y Condiciones CODEDMO',
        dateModified: new Date().toISOString(),
        jurisdiction: 'Guatemala'
      }
    }
  })

  return (
    <>
      <div className="hidden">
        <meta name="DC.title" content="Políticas de Privacidad y Términos - CODEDMO" />
        <meta name="DC.subject" content="privacidad, términos, derechos autor" />
        <meta name="DC.type" content="Text.Legal" />
        <meta name="classification" content="legal" />
      </div>

      <div className={`min-h-screen bg-gradient-to-br ${gradients.backgroundMain}`}>
        {/* Header */}
        <section className="relative py-20 px-4">
          <div className={`absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]`} aria-hidden="true"></div>

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold ${themeColors.text.primary} mb-6`}>
                Políticas y Términos
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients.textPrimary}`}> — Privacidad y Derechos</span>
              </h1>
              <p className={`text-lg ${themeColors.text.secondary} max-w-3xl mx-auto`}>
                Aquí detallamos cómo recopilamos y usamos tus datos, las condiciones de contratación, propiedad intelectual, garantías y procesos de soporte para proyectos de software.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8">

              {/* Privacidad */}
              <Card className={`${borders.neutral} bg-${themeColors.neutral[800]}/50 backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeColors.text.primary} flex items-center gap-3`}>
                    <div className={`w-8 h-8 bg-${themeColors.primary[500]} rounded-lg flex items-center justify-center`}>🔒</div>
                    Política de Privacidad
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${themeColors.text.secondary} space-y-4`}>
                  <p>
                    En <strong>CODEDMO</strong> tratamos los datos personales con responsabilidad y transparencia. Solo recopilamos la información estrictamente necesaria para gestionar proyectos y prestar servicios.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Datos que recopilamos</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Contacto: nombre, correo electrónico y teléfono.</li>
                        <li>Información del proyecto: requerimientos, entregables y documentación técnica.</li>
                        <li>Telemetría y uso del sitio: datos anónimos para mejorar la experiencia.</li>
                        <li>Registros de comunicación y soporte.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Finalidades</h3>
                      <p>
                        Utilizamos los datos para ejecutar proyectos, comunicarnos con clientes, dar soporte, facturación y mejorar nuestros productos. No compartimos información con terceros sin tu consentimiento, salvo obligaciones legales.
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Seguridad y retención</h3>
                      <p>
                        Aplicamos cifrado en tránsito (SSL/TLS), controles de acceso, auditorías y copia de seguridad. Conservamos los datos durante el tiempo necesario para cumplir obligaciones contractuales y legales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Términos */}
              <Card className={`${borders.neutral} bg-${themeColors.neutral[800]}/50 backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeColors.text.primary} flex items-center gap-3`}>
                    <div className={`w-8 h-8 bg-${themeColors.secondary[500]} rounded-lg flex items-center justify-center`}>📋</div>
                    Términos y Condiciones
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${themeColors.text.secondary} space-y-6`}>
                  
                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>1. Validez de la propuesta e inicio del proyecto</h3>
                    <p className="mb-2">
                      Las propuestas comerciales tienen una vigencia de 10 días calendario salvo indicación contraria. Una vez aceptada la propuesta, se procederá a la firma del contrato de servicios donde se detallarán los entregables, cronograma y condiciones específicas del proyecto.
                    </p>
                    <p>
                      El proyecto se considera iniciado una vez recibido el primer pago (20% del valor total) y la información inicial requerida para comenzar el desarrollo. La fecha de inicio será referencia para el cálculo de plazos estimados.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>2. Entrega de información y requerimientos</h3>
                    <p className="mb-2">
                      El cliente debe entregar toda la información, documentación, credenciales, contenidos y requerimientos necesarios para cada etapa del proyecto en el formato solicitado por CODEDMO. Esta información incluye pero no se limita a: textos, imágenes, logos, accesos a servicios, especificaciones técnicas, y cualquier material necesario para el desarrollo.
                    </p>
                    <p className="mb-2">
                      <strong>Política de trabajo por etapas:</strong> CODEDMO no iniciará el trabajo en una etapa específica ni generará entregables parciales hasta recibir la información completa necesaria para esa fase. Esta política garantiza la calidad del trabajo y evita retrabajos.
                    </p>
                    <p>
                      Si la información no se entrega en los plazos acordados, el proyecto podrá pausarse indefinidamente hasta su recepción, ajustándose los plazos de entrega en consecuencia. Los pagos programados y compromisos contractuales permanecerán vigentes durante la pausa.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>3. Plazos de entrega y estimaciones</h3>
                    <p className="mb-2">
                      Los plazos de entrega indicados en la propuesta son <strong>estimaciones</strong> basadas en la experiencia previa en proyectos similares y se utilizan para planificar el trabajo y recursos necesarios. El presupuesto total se calcula considerando el tiempo estimado de desarrollo.
                    </p>
                    <p className="mb-2">
                      <strong>Garantía de precio fijo:</strong> Si el proyecto requiere más tiempo del estimado por razones no atribuibles a cambios de alcance solicitados por el cliente, modificaciones de requerimientos, o entregas tardías de información, no se aplicarán cargos adicionales al presupuesto original acordado.
                    </p>
                    <p>
                      Los plazos pueden verse afectados por: cambios en los requerimientos, entrega tardía de información, disponibilidad de servicios de terceros, o circunstancias de fuerza mayor.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>4. Integraciones y servicios externos</h3>
                    <p className="mb-2">
                      Para integrar servicios externos (APIs, plataformas de pago, servicios de hosting, herramientas de terceros), el cliente debe proporcionar todas las credenciales, API keys, documentación técnica y accesos necesarios. CODEDMO asistirá en la configuración pero no se hace responsable de la disponibilidad, funcionamiento o cambios en los servicios de terceros.
                    </p>
                    <p className="mb-2">
                      El cliente es responsable de mantener activas las licencias, suscripciones y servicios de terceros requeridos para el funcionamiento del proyecto tanto durante el desarrollo como después de la entrega.
                    </p>
                    <p>
                      Si una integración falla debido a cambios en la API o políticas del proveedor externo, la corrección se considerará trabajo adicional fuera del alcance original.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>5. Cambios en el alcance del proyecto</h3>
                    <p className="mb-2">
                      Cualquier solicitud de funcionalidades, características o modificaciones fuera del alcance inicial definido en la propuesta se considerará trabajo adicional. CODEDMO evaluará el impacto en tiempo, recursos y costo, proporcionando una cotización detallada antes de proceder.
                    </p>
                    <p className="mb-2">
                      Los cambios de alcance requieren aprobación escrita del cliente y pueden afectar los plazos de entrega y el presupuesto total del proyecto. Los cambios menores en diseño o funcionalidades ya especificadas no se consideran cambios de alcance.
                    </p>
                    <p>
                      CODEDMO se reserva el derecho a rechazar cambios de alcance que comprometan la integridad técnica del proyecto o que requieran reestructuración significativa del trabajo ya realizado.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>6. Esquema de pagos y facturación</h3>
                    <p className="mb-2">
                      <strong>Modalidad estándar:</strong> 20% al iniciar el proyecto como anticipo, y el 80% restante distribuido en pagos vinculados a la entrega de sprints o entregables funcionales según el cronograma acordado. Cada entregable será demostrado y validado antes de solicitar el pago correspondiente.
                    </p>
                    <p className="mb-2">
                      Los pagos deben realizarse dentro de los 5 días hábiles posteriores a la presentación de cada entregable. El retraso en pagos puede resultar en la suspensión temporal del proyecto hasta la regularización del mismo.
                    </p>
                    <p>
                      Cualquier modalidad de pago diferente (pagos únicos, financiamiento extendido, etc.) deberá acordarse por escrito antes del inicio del proyecto. Todos los precios son en GTQ o USD como segunda opción, salvo acuerdo contrario.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>7. Propiedad intelectual y derechos de autor</h3>
                    <p className="mb-2">
                      Todas las propuestas, diseños, código fuente, documentación y entregables desarrollados serán propiedad exclusiva de CODEDMO hasta que el cliente haya completado el 100% del pago del proyecto. Una vez completado el pago, se transferirán al cliente los derechos de uso, explotación y modificación del software desarrollado.
                    </p>
                    <p className="mb-2">
                      CODEDMO se reserva el derecho de utilizar las técnicas, metodologías y conocimientos generales adquiridos durante el proyecto para futuros desarrollos, sin divulgar información confidencial específica del cliente.
                    </p>
                    <p>
                      Las propuestas no aceptadas por el cliente quedan a disposición de CODEDMO para su uso en otros proyectos. El cliente no podrá utilizar, reproducir o implementar estas propuestas sin autorización escrita y compensación económica correspondiente.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>8. Confidencialidad y protección de información</h3>
                    <p className="mb-2">
                      CODEDMO se compromete a mantener la confidencialidad de toda información comercial, técnica y personal proporcionada por el cliente durante el desarrollo del proyecto. Esta información no será compartida con terceros sin autorización expresa.
                    </p>
                    <p>
                      El cliente igualmente se compromete a no divulgar metodologías, técnicas propietarias o información comercial sensible de CODEDMO conocida durante la ejecución del proyecto.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3`}>9. Cancelaciones y política de reembolsos</h3>
                    <p className="mb-2">
                      <strong>Cancelación por parte del cliente:</strong> Si el cliente decide cancelar un proyecto en curso por motivos no atribuibles a incumplimiento por parte de CODEDMO, no procederá el reembolso del anticipo ni de los pagos por entregables ya completados y aceptados.
                    </p>
                    <p className="mb-2">
                      <strong>Cancelación por incumplimiento de CODEDMO:</strong> Si CODEDMO no puede cumplir con los compromisos contractuales por causas propias, se procederá al reembolso proporcional de los pagos realizados descontando el valor del trabajo ya ejecutado.
                    </p>
                    <p className="mb-2">
                      <strong>Suspensión por falta de pago:</strong> El proyecto se suspenderá automáticamente si los pagos acordados no se reciben en los plazos establecidos. La reactivación requiere la regularización total de pagos pendientes.
                    </p>
                    <p>
                      En caso de cancelación, el cliente conservará los derechos sobre los entregables completados y pagados hasta la fecha de cancelación.
                    </p>
                  </div>

                </CardContent>
              </Card>

              {/* Garantías */}
              <Card className={`${borders.neutral} bg-${themeColors.neutral[800]}/50 backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeColors.text.primary} flex items-center gap-3`}>
                    <div className={`w-8 h-8 bg-${themeColors.success[500]} rounded-lg flex items-center justify-center`}>✅</div>
                    Garantías y Soporte
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${themeColors.text.secondary} space-y-4`}>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Garantía</h3>
                    <p>
                      Ofrecemos una garantía de 3 meses para corregir defectos y fallos relacionados con el alcance entregado. La garantía no cubre funcionalidades añadidas con posterioridad, uso inadecuado ni incidencias causadas por servicios o integraciones de terceros.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Soporte opcional</h3>
                    <p>
                      Disponemos de planes de soporte y mantenimiento (monitoreo, actualizaciones y atención prioritaria) contratables por separado según las necesidades del cliente.
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-2`}>Seguridad</h3>
                    <p>
                      Aplicamos buenas prácticas de seguridad: autenticación segura, cifrado, auditorías y recomendaciones para despliegues en la nube.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto */}
              <Card className={`${borders.neutral} bg-${themeColors.neutral[800]}/50 backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeColors.text.primary} flex items-center gap-3`}>
                    <div className={`w-8 h-8 bg-${themeColors.purple[500]} rounded-lg flex items-center justify-center`}>📞</div>
                    Contacto Legal
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${themeColors.text.secondary}`}>
                  <p className="mb-4">Para dudas o solicitudes relacionadas con estas políticas, contáctanos:</p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> legal@codedmo.dev</p>
                    <p><strong>Teléfono:</strong> +502 3792 3612</p>
                    <p><strong>Dirección:</strong> Ciudad de Guatemala, Guatemala</p>
                    <p><strong>Horario:</strong> Lun-Vie 07:00 - 20:00</p>
                  </div>

                  <div className={`mt-6 p-4 bg-${themeColors.neutral[700]}/50 rounded-lg`}>
                    <p className="text-sm"><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </div>
    </>
  )
}
