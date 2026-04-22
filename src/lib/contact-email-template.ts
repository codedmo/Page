import { contactInfo } from '@/data/site';

export interface ContactSubmission {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  mensaje: string;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatSubmittedAt = (date: Date) =>
  new Intl.DateTimeFormat('es-GT', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Guatemala',
  }).format(date);

const normalizePhone = (rawPhone: string) => {
  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return null;
  }

  const cleaned = trimmed.replace(/[^\d+]/g, '');
  if (!/^\+?[\d]{7,15}$/.test(cleaned)) {
    return {
      display: trimmed,
      telHref: '',
      whatsappHref: '',
      isValid: false,
    };
  }

  let formatted = cleaned;
  if (!formatted.startsWith('+')) {
    formatted = cleaned.length === 8 ? `+502${cleaned}` : `+${cleaned}`;
  }

  const digitsOnly = formatted.replace(/\D/g, '');

  return {
    display: formatted,
    telHref: `tel:${formatted}`,
    whatsappHref: `https://wa.me/${digitsOnly}?text=${encodeURIComponent(
      `Hola ${formatted}, te escribimos desde CODEDMO en seguimiento a tu consulta.`
    )}`,
    isValid: true,
  };
};

export const buildContactEmailSubject = (data: ContactSubmission) =>
  `Nuevo contacto de ${data.nombre}${data.empresa ? ` - ${data.empresa}` : ''}`;

export const buildContactEmailTemplate = (data: ContactSubmission, websiteOrigin: string) => {
  const submittedAt = formatSubmittedAt(new Date());
  const phone = normalizePhone(data.telefono ?? '');
  const replySubject = encodeURIComponent(`Re: ${data.nombre} - tu consulta en CODEDMO`);
  const replyBody = encodeURIComponent(
    `Hola ${data.nombre},\n\nGracias por escribir a CODEDMO. Ya revisamos tu mensaje y te estaremos respondiendo en breve.\n\nSaludos,\n${contactInfo.phoneDisplay}`
  );
  const leadType = data.empresa?.trim() ? 'Consulta empresarial' : 'Consulta directa';
  const priorityLabel = data.empresa?.trim() ? 'Alta prioridad' : 'Seguimiento normal';

  const phoneMarkup = phone
    ? `
      <div class="detail-row">
        <span class="detail-label">Teléfono</span>
        <span class="detail-value">${phone.isValid ? escapeHtml(phone.display) : `${escapeHtml(phone.display)} (revisar formato)`}</span>
      </div>`
    : '';

  const whatsappAction = phone?.isValid
    ? `<a class="action secondary" href="${phone.whatsappHref}" target="_blank" rel="noreferrer">Abrir WhatsApp</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(buildContactEmailSubject(data))}</title>
    <style>
      body {
        margin: 0;
        padding: 24px;
        background: #020617;
        color: #e2e8f0;
        font-family: Inter, Segoe UI, Arial, sans-serif;
      }

      .shell {
        max-width: 680px;
        margin: 0 auto;
        background: #081120;
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 28px 80px rgba(2, 6, 23, 0.45);
      }

      .hero {
        padding: 28px 28px 22px;
        background:
          radial-gradient(circle at top right, rgba(34, 211, 238, 0.26), transparent 38%),
          linear-gradient(135deg, #0f172a 0%, #0f3b57 52%, #0f766e 100%);
        border-bottom: 1px solid rgba(148, 163, 184, 0.18);
      }

      .eyebrow {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(14, 165, 233, 0.14);
        border: 1px solid rgba(125, 211, 252, 0.26);
        color: #bae6fd;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .title {
        margin: 18px 0 8px;
        color: #f8fafc;
        font-size: 30px;
        line-height: 1.1;
        font-weight: 800;
      }

      .subtitle {
        margin: 0;
        color: rgba(226, 232, 240, 0.82);
        font-size: 15px;
        line-height: 1.6;
      }

      .hero-grid {
        margin-top: 22px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .hero-card {
        padding: 14px;
        border-radius: 18px;
        background: rgba(15, 23, 42, 0.62);
        border: 1px solid rgba(148, 163, 184, 0.18);
      }

      .hero-label {
        display: block;
        margin-bottom: 6px;
        color: #94a3b8;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero-value {
        color: #f8fafc;
        font-size: 15px;
        font-weight: 700;
        line-height: 1.4;
      }

      .content {
        padding: 24px;
      }

      .section {
        margin-bottom: 18px;
        padding: 20px;
        border-radius: 20px;
        background: rgba(15, 23, 42, 0.68);
        border: 1px solid rgba(148, 163, 184, 0.12);
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section-title {
        margin: 0 0 16px;
        color: #f8fafc;
        font-size: 16px;
        font-weight: 700;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 11px 0;
        border-bottom: 1px solid rgba(148, 163, 184, 0.12);
      }

      .detail-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .detail-label {
        color: #94a3b8;
        font-size: 13px;
      }

      .detail-value {
        color: #e2e8f0;
        font-size: 14px;
        font-weight: 600;
        text-align: right;
      }

      .message-box {
        padding: 18px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(14, 165, 233, 0.08), rgba(15, 23, 42, 0.24));
        border: 1px solid rgba(56, 189, 248, 0.18);
        color: #e2e8f0;
        font-size: 15px;
        line-height: 1.7;
        white-space: pre-wrap;
      }

      .actions {
        margin-top: 18px;
      }

      .action {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 12px 18px;
        border-radius: 999px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 700;
      }

      .action.primary {
        color: #eff6ff;
        background: linear-gradient(135deg, #2563eb, #0891b2);
      }

      .action.secondary {
        color: #d1fae5;
        background: linear-gradient(135deg, #0f766e, #059669);
      }

      .footnote {
        margin-top: 18px;
        color: #94a3b8;
        font-size: 12px;
        line-height: 1.6;
      }

      @media (max-width: 620px) {
        body {
          padding: 12px;
        }

        .hero,
        .content {
          padding: 18px;
        }

        .hero-grid {
          grid-template-columns: 1fr;
        }

        .detail-row {
          display: block;
        }

        .detail-value {
          display: block;
          margin-top: 4px;
          text-align: left;
        }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="hero">
        <span class="eyebrow">Nuevo lead</span>
        <h1 class="title">${escapeHtml(data.nombre)}</h1>
        <p class="subtitle">
          Llegó una nueva consulta desde el formulario principal de CODEDMO. El contenido ya viene
          estructurado para responder rápido y priorizar mejor.
        </p>
        <div class="hero-grid">
          <div class="hero-card">
            <span class="hero-label">Tipo</span>
            <span class="hero-value">${escapeHtml(leadType)}</span>
          </div>
          <div class="hero-card">
            <span class="hero-label">Prioridad</span>
            <span class="hero-value">${escapeHtml(priorityLabel)}</span>
          </div>
          <div class="hero-card">
            <span class="hero-label">Recibido</span>
            <span class="hero-value">${escapeHtml(submittedAt)}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="section">
          <h2 class="section-title">Datos del contacto</h2>
          <div class="detail-row">
            <span class="detail-label">Correo</span>
            <span class="detail-value">${escapeHtml(data.email)}</span>
          </div>
          ${phoneMarkup}
          <div class="detail-row">
            <span class="detail-label">Empresa</span>
            <span class="detail-value">${escapeHtml(data.empresa?.trim() || 'No especificada')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Origen</span>
            <span class="detail-value">${escapeHtml(websiteOrigin)}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Mensaje</h2>
          <div class="message-box">${escapeHtml(data.mensaje)}</div>
          <div class="actions">
            <a class="action primary" href="mailto:${encodeURIComponent(data.email)}?subject=${replySubject}&body=${replyBody}">Responder por correo</a>
            ${whatsappAction}
          </div>
          <p class="footnote">
            Si necesitas seguimiento interno, este lead entró desde ${escapeHtml(websiteOrigin)} y
            puede responderse también desde ${escapeHtml(contactInfo.email)} o ${escapeHtml(contactInfo.phoneDisplay)}.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
