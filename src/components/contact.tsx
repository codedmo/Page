import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
}

interface ApiResponse {
  success?: boolean;
  status?: string;
  message: string;
  data?: unknown;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para formatear y validar número de teléfono
  const formatPhoneNumber = (phone: string): { formatted: string; whatsappUrl: string; isValid: boolean } => {
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
      if (cleaned.length === 8 && cleaned.startsWith('2') || cleaned.startsWith('3') || cleaned.startsWith('4') || cleaned.startsWith('5') || cleaned.startsWith('6') || cleaned.startsWith('7')) {
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

  const createEmailTemplate = (data: FormData): string => {
    const phoneInfo = formatPhoneNumber(data.telefono);
    
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Cliente Potencial - CodedMo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 15px;
            line-height: 1.4;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #000;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #10b981 100%);
            padding: 20px;
            text-align: center;
            position: relative;
        }
        
        .logo {
            color: white;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .header-subtitle {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .notification-badge {
            background: #ef4444;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }
        
        .content {
            padding: 20px;
            background: #f8fafc;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .info-card {
            background: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border-left: 3px solid #2563eb;
        }
        
        .info-card.message {
            grid-column: 1 / -1;
            border-left-color: #10b981;
        }
        
        .card-title {
            color: #1e293b;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 13px;
        }
        
        .info-item:last-child {
            margin-bottom: 0;
        }
        
        .info-label {
            color: #64748b;
            font-weight: 500;
        }
        
        .info-value {
            color: #1e293b;
            font-weight: 600;
            text-align: right;
            max-width: 60%;
        }
        
        .message-content {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            padding: 12px;
            border-radius: 6px;
            color: #334155;
            font-size: 13px;
            line-height: 1.5;
            margin-top: 8px;
        }
        
        .meta-info {
            background: white;
            padding: 12px;
            border-radius: 8px;
            font-size: 11px;
            color: #64748b;
            border: 1px dashed #cbd5e1;
            margin-top: 15px;
        }
        
        .meta-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        
        .meta-row:last-child {
            margin-bottom: 0;
        }
        
        .footer {
            background: #1e293b;
            padding: 15px;
            text-align: center;
            color: white;
        }
        
        .footer-brand {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .footer-text {
            color: #94a3b8;
            font-size: 11px;
            margin-bottom: 10px;
        }
        
        .action-button {
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            color: white;
            padding: 8px 20px;
            border-radius: 15px;
            text-decoration: none;
            font-weight: 600;
            font-size: 12px;
            display: inline-block;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(37, 99, 235, 0.5);
            background: linear-gradient(135deg, #1d4ed8, #0284c7);
        }
        
        .action-button:active {
            transform: translateY(0);
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
        }
        
        .action-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: all 0.5s;
        }
        
        .action-button:hover::before {
            left: 100%;
        }
        
        /* Estilos para botones de WhatsApp */
        a[href*="wa.me"] {
            animation: pulse 2s infinite;
        }
        
        a[href*="wa.me"]:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(37, 211, 102, 0.6) !important;
            background: linear-gradient(135deg, #128C7E, #075E54) !important;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        
        /* Efecto shimmer para el botón principal */
        @keyframes shimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 100% 0; }
        }
        
        .highlight {
            background: linear-gradient(135deg, #fef3c7, #fbbf24);
            color: #92400e;
            padding: 1px 6px;
            border-radius: 3px;
            font-weight: 600;
            font-size: 11px;
        }
        
        .priority-high {
            color: #dc2626;
            font-weight: 600;
        }
        
        .priority-medium {
            color: #ea580c;
            font-weight: 600;
        }
        
        @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; gap: 10px; }
            .email-container { margin: 5px; }
            .content { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">🚀 CodedMo</div>
            <div class="header-subtitle">Nuevo Cliente Potencial</div>
            <div class="notification-badge">⚡ ¡Acción Requerida!</div>
        </div>
        
        <div class="content">
            <div class="info-grid">
                <div class="info-card">
                    <div class="card-title">👤 Información Personal</div>
                    <div class="info-item">
                        <span class="info-label">Nombre:</span>
                        <span class="info-value">${data.nombre}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></span>
                    </div>
                    ${data.telefono ? `
                    <div class="info-item">
                        <span class="info-label">Teléfono:</span>
                        <span class="info-value">
                            ${phoneInfo.isValid ? 
                              `<a href="tel:${phoneInfo.formatted}" style="color: #2563eb; text-decoration: none;">
                                 <span style="color: #16a34a; font-weight: 500;">${phoneInfo.formatted}</span>
                               </a>` : 
                              `<span style="color: #dc2626;">${data.telefono} (Formato inválido)</span>`
                            }
                            ${phoneInfo.isValid && phoneInfo.whatsappUrl ? 
                              `<br><a href="${phoneInfo.whatsappUrl}" 
                                 style="display: inline-block; 
                                        background: linear-gradient(135deg, #25D366, #128C7E);  
                                        text-decoration: none; 
                                        padding: 6px 12px; 
                                        border-radius: 15px; 
                                        font-size: 12px; 
                                        margin-top: 6px;
                                        font-weight: 600;
                                        box-shadow: 0 3px 6px rgba(37, 211, 102, 0.4);
                                        transition: all 0.3s ease;
                                        border: none;">
                                 📱 WhatsApp
                               </a>` : ''
                            }
                        </span>
                    </div>` : ''}
                </div>
                
                <div class="info-card">
                    <div class="card-title">📊 Detalles del Lead</div>
                    ${data.empresa ? `
                    <div class="info-item">
                        <span class="info-label">Empresa:</span>
                        <span class="info-value"><span class="highlight">${data.empresa}</span></span>
                    </div>` : ''}
                    <div class="info-item">
                        <span class="info-label">Origen:</span>
                        <span class="info-value">${import.meta.env.VITE_WEBSITE_ORIGIN || 'codedmo.dev'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Fecha:</span>
                        <span class="info-value">${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Prioridad:</span>
                        <span class="info-value ${data.empresa ? 'priority-high' : 'priority-medium'}">${data.empresa ? '🔥 Alta' : '⚡ Media'}</span>
                    </div>
                </div>
                
                <div class="info-card message">
                    <div class="card-title">💬 Mensaje del Cliente</div>
                    <div class="message-content">
                        ${data.mensaje.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
            
            <div class="meta-info">
                <div class="meta-row">
                    <span><strong>🎯 Tipo:</strong> Contacto Web Directo</span>
                    <span><strong>⏰ Responder en:</strong> < 2 horas</span>
                </div>
                <div class="meta-row">
                    <span><strong>📈 Conversión:</strong> ${data.empresa ? 'Empresarial' : 'Individual'}</span>
                    <span><strong>🚀 Estado:</strong> Lead Nuevo</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-brand">CodedMo</div>
            <div class="footer-text">
                ¡Responde rápido para no perder esta oportunidad! 💼
            </div>
            <a href="mailto:${data.email}?subject=Re: ${data.nombre} - Respuesta a tu consulta&body=Hola ${data.nombre},%0D%0A%0D%0AGracias por contactarnos..." 
               class="action-button" 
               style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                      color: white;
                      padding: 14px 28px;
                      border-radius: 25px;
                      text-decoration: none;
                      font-weight: 700;
                      font-size: 16px;
                      text-align: center;
                      display: inline-block;
                      box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
                      transform: translateY(0);
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      border: 2px solid #3b82f6;
                      position: relative;
                      overflow: hidden;">
                <span style="position: relative; z-index: 2;">🚀 ¡Responder Ahora!</span>
            </a>
        </div>
    </div>
</body>
</html>`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
      const websiteOrigin = import.meta.env.VITE_WEBSITE_ORIGIN;

      if (!apiUrl || !apiKey || !bearerToken) {
        throw new Error('Configuración de API faltante. Verifica las variables de entorno.');
      }

      const emailTemplate = createEmailTemplate(formData);
      const subject = `Nuevo contacto de ${formData.nombre}${formData.empresa ? ` - ${formData.empresa}` : ''}`;

      const response = await fetch(`${apiUrl}/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'Authorization': `Bearer ${bearerToken}`,
          'Origin': websiteOrigin || 'https://codedmo.dev'
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          subject: subject,
          message: formData.mensaje,
          website: websiteOrigin || 'codedmo.dev',
          customTemplate: emailTemplate,
          templateType: import.meta.env.VITE_EMAIL_TEMPLATE_TYPE || 'custom'
        })
      });

      const result: ApiResponse = await response.json();

      // Debug: mostrar la respuesta completa

      if (response.ok && (result.success === true || result.status === 'success')) {
        setSubmitStatus('success');
        setStatusMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          mensaje: ''
        });
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      // Verificar si el error es realmente un mensaje de éxito mal interpretado
      if (error instanceof Error && error.message.includes('exitosamente')) {
        setSubmitStatus('success');
        setStatusMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          mensaje: ''
        });
        return;
      }
      
      setSubmitStatus('error');
      
      // Mensaje de error más específico basado en el tipo de error
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setStatusMessage('Error de conexión. Verifica tu conexión a internet e inténtalo nuevamente.');
        } else if (error.message.includes('CORS')) {
          setStatusMessage('Error de configuración del servidor. Contacta al administrador.');
        } else if (error.message.includes('variables de entorno')) {
          setStatusMessage('Error de configuración. Contacta al administrador.');
        } else {
          setStatusMessage(error.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
      } else {
        setStatusMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-2xl">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Contáctanos
        </h1>
        <p className="text-xl text-gray-300">
          Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Fila 1: Nombre y Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre completo
              </Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Fila 2: Teléfono y Empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+502 0000-0000"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa" className="text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Empresa (opcional)
              </Label>
              <Input
                id="empresa"
                name="empresa"
                type="text"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <Label htmlFor="mensaje" className="text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensaje
            </Label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Cuéntanos sobre tu proyecto..."
              required
              rows={4}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
            />
          </div>

          {/* Mensaje de estado */}
          {submitStatus !== 'idle' && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              submitStatus === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm">{statusMessage}</span>
            </div>
          )}

          {/* Botón de envío */}
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando...
              </div>
            ) : (
              'Enviar mensaje'
            )}
          </Button>

      </form>

      {/* Información adicional */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          También puedes escribirnos directamente a{' '}
          <a href="mailto:hola@codedmo.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            hola@codedmo.com
          </a>
        </p>
      </div>

    </div>
  );
}
