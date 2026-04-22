import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { contactInfo } from '@/data/site';

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
  message?: string;
}

interface ContactProps {
  showHeader?: boolean;
}

const initialFormData: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  mensaje: '',
};

export default function Contact({ showHeader = true }: ContactProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !result || (result.success !== true && result.status !== 'success')) {
        throw new Error(result?.message || 'No fue posible enviar el mensaje.');
      }

      setSubmitStatus('success');
      setStatusMessage(result.message || 'Mensaje enviado exitosamente. Te responderemos pronto.');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setStatusMessage('No pudimos conectar con el formulario. Recarga la pagina e intentalo de nuevo.');
        } else {
          setStatusMessage(error.message || 'Error al enviar el mensaje. Intenta nuevamente.');
        }
      } else {
        setStatusMessage('Error al enviar el mensaje. Intenta nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-6">
      {showHeader && (
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">Contáctanos</h1>
          <p className="text-xl text-gray-300">
            Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="flex items-center gap-2 text-white">
              <User className="h-4 w-4" />
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
              className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-white">
              <Mail className="h-4 w-4" />
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
              className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="telefono" className="flex items-center gap-2 text-white">
              <Phone className="h-4 w-4" />
              Teléfono
            </Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="+502 0000-0000"
              className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="flex items-center gap-2 text-white">
              <MessageSquare className="h-4 w-4" />
              Empresa (opcional)
            </Label>
            <Input
              id="empresa"
              name="empresa"
              type="text"
              value={formData.empresa}
              onChange={handleInputChange}
              placeholder="Nombre de tu empresa"
              className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensaje" className="flex items-center gap-2 text-white">
            <MessageSquare className="h-4 w-4" />
            Mensaje
          </Label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Cuéntanos sobre tu proyecto..."
            required
            rows={5}
            className="w-full resize-y rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {submitStatus !== 'idle' && (
          <div
            className={`flex items-center gap-3 rounded-lg border p-4 ${
              submitStatus === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                : 'border-red-500/30 bg-red-500/15 text-red-300'
            }`}
          >
            {submitStatus === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="text-sm">{statusMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:from-blue-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              Enviando...
            </div>
          ) : (
            'Enviar mensaje'
          )}
        </Button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          También puedes escribirnos a{' '}
          <a href={`mailto:${contactInfo.email}`} className="text-blue-400 transition-colors hover:text-blue-300">
            {contactInfo.email}
          </a>{' '}
          o abrir nuestro{' '}
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 transition-colors hover:text-emerald-300"
          >
            chat de WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}
