import type { APIRoute } from 'astro';
import {
  buildContactEmailSubject,
  buildContactEmailTemplate,
  type ContactSubmission,
} from '@/lib/contact-email-template';

export const prerender = false;

interface ApiResponse {
  success?: boolean;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

const json = (status: number, body: ApiResponse) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

const readTextField = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const POST: APIRoute = async ({ request, url }) => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json(400, {
      status: 'error',
      message: 'No se pudo leer la solicitud del formulario.',
    });
  }

  if (!payload || typeof payload !== 'object') {
    return json(400, {
      status: 'error',
      message: 'La solicitud del formulario no es valida.',
    });
  }

  const submission: ContactSubmission = {
    nombre: readTextField((payload as Record<string, unknown>).nombre, 120),
    email: readTextField((payload as Record<string, unknown>).email, 160),
    telefono: readTextField((payload as Record<string, unknown>).telefono, 40),
    empresa: readTextField((payload as Record<string, unknown>).empresa, 120),
    mensaje: readTextField((payload as Record<string, unknown>).mensaje, 4000),
  };

  if (!submission.nombre || !submission.email || !submission.mensaje) {
    return json(400, {
      status: 'error',
      message: 'Completa nombre, correo y mensaje antes de enviar.',
    });
  }

  if (!isValidEmail(submission.email)) {
    return json(400, {
      status: 'error',
      message: 'Ingresa un correo valido.',
    });
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const templateType = import.meta.env.VITE_EMAIL_TEMPLATE_TYPE || 'custom';
  const websiteOrigin = import.meta.env.VITE_WEBSITE_ORIGIN || url.origin;

  if (!apiUrl || !apiKey || !bearerToken) {
    console.error('Missing contact mail environment configuration.');

    return json(500, {
      status: 'error',
      message: 'La configuracion del servicio de correo no esta disponible.',
    });
  }

  const subject = buildContactEmailSubject(submission);
  const customTemplate = buildContactEmailTemplate(submission, websiteOrigin);

  try {
    const upstreamResponse = await fetch(`${apiUrl}/sendEmail`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        Authorization: `Bearer ${bearerToken}`,
        Origin: websiteOrigin,
      },
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        name: submission.nombre,
        email: submission.email,
        subject,
        message: submission.mensaje,
        website: websiteOrigin,
        customTemplate,
        templateType,
      }),
    });

    const result = (await upstreamResponse.json().catch(() => null)) as ApiResponse | null;

    if (!upstreamResponse.ok || !result || (result.success !== true && result.status !== 'success')) {
      console.error('Contact mail upstream error:', upstreamResponse.status, result);

      return json(upstreamResponse.status || 502, {
        status: 'error',
        message: result?.message || 'No fue posible enviar el mensaje en este momento.',
      });
    }

    return json(200, {
      success: true,
      status: 'success',
      message: 'Mensaje enviado exitosamente. Te responderemos pronto.',
    });
  } catch (error) {
    console.error('Contact mail network error:', error);

    if (error instanceof Error && error.name === 'TimeoutError') {
      return json(504, {
        status: 'error',
        message: 'El servicio de correo tardó demasiado en responder. Intenta nuevamente en un momento.',
      });
    }

    return json(502, {
      status: 'error',
      message: 'No fue posible conectar con el servicio de correo. Intenta nuevamente en un momento.',
    });
  }
};
