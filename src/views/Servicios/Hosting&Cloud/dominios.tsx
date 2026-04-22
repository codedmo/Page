import { type FormEvent, useState } from 'react';
import { AlertCircle, ArrowUpRight, Globe, Search, Shield, CheckCircle, Clock, LoaderCircle, Star } from 'lucide-react';
import { gradients } from '@/config/theme-colors';
import { useSEO } from '@/hooks/useSEO';
import { contactInfo } from '@/data/site';

interface DomainLookupResult {
  domain: string;
  available: boolean;
  statuses: string[];
  handle?: string;
  registrar?: string;
  createdAt?: string;
  expiresAt?: string;
  updatedAt?: string;
  nameservers: string[];
  dnssecSigned?: boolean;
  sourceHost?: string;
  sourceUrl: string;
}

type LookupState =
  | { status: 'idle' }
  | { status: 'loading'; domain: string }
  | { status: 'success'; result: DomainLookupResult }
  | { status: 'error'; message: string; domain?: string };

interface RdapEvent {
  eventAction?: string;
  eventDate?: string;
}

interface RdapEntity {
  roles?: string[];
  vcardArray?: unknown[];
}

interface RdapNameserver {
  ldhName?: string;
}

interface RdapSecureDNS {
  delegationSigned?: boolean;
}

interface RdapResponse {
  handle?: string;
  ldhName?: string;
  status?: string[];
  events?: RdapEvent[];
  entities?: RdapEntity[];
  nameservers?: RdapNameserver[];
  secureDNS?: RdapSecureDNS;
}

const DEFAULT_EXTENSION = '.com';
const WHATSAPP_NUMBER = '50237923612';

function normalizeDomainInput(rawValue: string, selectedExtension: string): string | null {
  let value = rawValue.trim().toLowerCase();

  value = value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  value = value.replace(/\s+/g, '').replace(/\.+$/, '');

  if (!value) {
    return null;
  }

  if (!value.includes('.')) {
    value = `${value}${selectedExtension}`;
  }

  if (!/^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/.test(value)) {
    return null;
  }

  return value;
}

function formatLookupDate(value?: string): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('es-GT', { dateStyle: 'long' }).format(date);
}

function formatStatusLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getEventDate(events: RdapEvent[] | undefined, action: string): string | undefined {
  return events?.find((item) => (item.eventAction ?? '').toLowerCase() === action.toLowerCase())?.eventDate;
}

function getEntityDisplayName(entity: RdapEntity | undefined): string | undefined {
  if (!entity || !Array.isArray(entity.vcardArray) || entity.vcardArray.length < 2) {
    return undefined;
  }

  const entries = entity.vcardArray[1];

  if (!Array.isArray(entries)) {
    return undefined;
  }

  const fullNameEntry = entries.find(
    (entry): entry is [string, Record<string, unknown>, string, string] =>
      Array.isArray(entry) && entry[0] === 'fn' && typeof entry[3] === 'string',
  );

  return fullNameEntry?.[3];
}

function getRegistrarName(entities: RdapEntity[] | undefined): string | undefined {
  const registrarEntity = entities?.find((entity) =>
    entity.roles?.some((role) => role.toLowerCase() === 'registrar'),
  );

  return getEntityDisplayName(registrarEntity);
}

function buildDomainWhatsAppHref(domain: string, available: boolean): string {
  const message = available
    ? `Hola, quiero registrar el dominio ${domain}.`
    : `Hola, quiero revisar alternativas o transferencia para el dominio ${domain}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Dominios() {
  const [domainQuery, setDomainQuery] = useState('');
  const [selectedExtension, setSelectedExtension] = useState(DEFAULT_EXTENSION);
  const [lookupState, setLookupState] = useState<LookupState>({ status: 'idle' });

  // SEO para Dominios
  useSEO({
    title: 'Registro de Dominios - Tu Identidad Online | CODEDMO',
    description: 'Registro de dominios .com, .net, .org y más. Renovación automática, gestión DNS y soporte técnico especializado.',
    keywords: ['registro dominios', 'dominios baratos', 'com net org', 'dns gratuito', 'whois privacy'],
    canonical: 'https://codedmo.dev/servicios/hosting&cloud/dominios'
  });

  const features = [
    'Registro inmediato',
    'DNS management gratuito',
    'Whois privacy incluido',
    'Renovación automática',
    'Email forwarding',
    'Subdominios ilimitados',
    'Soporte técnico 24/7',
    'Panel de control fácil'
  ];

  const domainExtensions = [
    { extension: '.com', note: 'Consultar tarifa vigente', description: 'El más popular para empresas' },
    { extension: '.net', note: 'Consultar tarifa vigente', description: 'Ideal para tecnología' },
    { extension: '.org', note: 'Consultar tarifa vigente', description: 'Perfecto para organizaciones' },
    { extension: '.info', note: 'Consultar tarifa vigente', description: 'Para sitios informativos' },
    { extension: '.biz', note: 'Consultar tarifa vigente', description: 'Enfocado en negocios' },
    { extension: '.gt', note: 'Consultar tarifa vigente', description: 'Dominio de Guatemala' },
    { extension: '.co', note: 'Consultar tarifa vigente', description: 'Alternativa moderna al .com' },
    { extension: '.io', note: 'Consultar tarifa vigente', description: 'Popular entre startups tech' }
  ];

  const services = [
    {
      title: 'Registro de Dominio',
      description: 'Registra tu dominio ideal en segundos',
      icon: Globe,
      features: ['Búsqueda instantánea', 'Registro automático', 'Certificado SSL incluido', 'DNS configurado']
    },
    {
      title: 'Transferencia de Dominio',
      description: 'Transfiere tu dominio existente',
      icon: Shield,
      features: ['Proceso simplificado', 'Sin downtime', 'Extensión gratuita 1 año', 'Soporte completo']
    },
    {
      title: 'Gestión DNS',
      description: 'Control total de tu dominio',
      icon: Search,
      features: ['Panel intuitivo', 'Registros A, CNAME, MX', 'Subdominios ilimitados', 'Cambios instantáneos']
    }
  ];

  const additionalServices = [
    'Whois Privacy Protection',
    'Domain Lock Security',
    'Email Forwarding',
    'Subdomain Management',
    'DNS Zone Editor',
    'Domain Parking',
    'Bulk Domain Registration',
    'Domain Monitoring'
  ];

  const domainTips = [
    {
      title: 'Elige el nombre correcto',
      description: 'Corto, memorable y relacionado con tu marca',
      icon: Star
    },
    {
      title: 'Registra variaciones',
      description: 'Protege tu marca registrando .com, .net, .org',
      icon: Shield
    },
    {
      title: 'Renueva a tiempo',
      description: 'Activa la renovación automática',
      icon: Clock
    }
  ];

  const handleDomainLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const domain = normalizeDomainInput(domainQuery, selectedExtension);

    if (!domain) {
      setLookupState({
        status: 'error',
        message: 'Escribe un dominio válido. Ejemplo: miempresa o miempresa.com',
      });
      return;
    }

    setLookupState({ status: 'loading', domain });

    try {
      const response = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
        headers: {
          Accept: 'application/rdap+json',
        },
      });

      const sourceUrl = `https://rdap.org/domain/${encodeURIComponent(domain)}`;

      if (response.status === 404) {
        setLookupState({
          status: 'success',
          result: {
            domain,
            available: true,
            statuses: [],
            nameservers: [],
            sourceHost: new URL(sourceUrl).hostname,
            sourceUrl,
          },
        });
        return;
      }

      if (response.status === 400) {
        throw new Error('El formato del dominio no es válido.');
      }

      if (response.status === 429) {
        throw new Error('El servicio RDAP está temporalmente saturado. Inténtalo de nuevo en unos minutos.');
      }

      if (!response.ok) {
        throw new Error('No pudimos consultar el dominio en este momento.');
      }

      const data = (await response.json()) as RdapResponse;
      const finalSourceUrl = response.url || sourceUrl;
      const expirationEvent = getEventDate(data.events, 'expiration');
      const createdEvent = getEventDate(data.events, 'registration');
      const updatedEvent =
        getEventDate(data.events, 'last changed') ??
        getEventDate(data.events, 'last update of RDAP database');

      setLookupState({
        status: 'success',
        result: {
          domain: data.ldhName ?? domain,
          available: false,
          statuses: data.status ?? [],
          handle: data.handle,
          registrar: getRegistrarName(data.entities),
          createdAt: createdEvent,
          expiresAt: expirationEvent,
          updatedAt: updatedEvent,
          nameservers: data.nameservers?.map((item) => item.ldhName).filter(Boolean) as string[] ?? [],
          dnssecSigned: data.secureDNS?.delegationSigned,
          sourceHost: new URL(finalSourceUrl).hostname,
          sourceUrl: finalSourceUrl,
        },
      });
    } catch (error) {
      const fallbackMessage =
        'No pudimos verificar el dominio en línea. Puede ser un bloqueo temporal del registry o de CORS para ese TLD.';

      setLookupState({
        status: 'error',
        domain,
        message: error instanceof Error ? error.message || fallbackMessage : fallbackMessage,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${gradients.primary} text-white rounded-full text-sm font-medium mb-6`}>
          <Globe className="w-4 h-4 mr-2" />
          Registro de Dominios
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Tu <span className={`bg-gradient-to-r ${gradients.textPrimary} bg-clip-text text-transparent`}>identidad digital</span> empieza aquí
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Registra el dominio perfecto para tu proyecto con acompañamiento técnico, renovación automática y control total de DNS.
        </p>
      </div>

      {/* Domain Search */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Busca tu dominio ideal</h2>
        <form onSubmit={handleDomainLookup} className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={domainQuery}
              onChange={(event) => setDomainQuery(event.target.value)}
              placeholder="Escribe tu dominio o nombre de marca"
              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={lookupState.status === 'loading'}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${gradients.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {lookupState.status === 'loading' ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Consultando
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Buscar
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {domainExtensions.map((domain) => (
              <button
                key={domain.extension}
                type="button"
                onClick={() => setSelectedExtension(domain.extension)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  selectedExtension === domain.extension
                    ? 'border-purple-400 bg-purple-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                {domain.extension}
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            Si escribes solo el nombre, usamos <span className="text-white">{selectedExtension}</span>. También puedes escribir el dominio completo.
          </p>
        </form>

        {lookupState.status === 'loading' && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-slate-300">
            Consultando disponibilidad para <span className="font-semibold text-white">{lookupState.domain}</span>.
          </div>
        )}

        {lookupState.status === 'error' && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-red-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              <div>
                <p className="font-semibold">No pudimos completar la búsqueda</p>
                <p className="mt-1 text-sm text-red-100/80">{lookupState.message}</p>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  Consultarlo por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {lookupState.status === 'success' && (
          <div
            className={`mt-6 rounded-2xl border p-5 ${
              lookupState.result.available
                ? 'border-emerald-400/25 bg-emerald-500/10'
                : 'border-cyan-400/20 bg-cyan-500/10'
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Resultado</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{lookupState.result.domain}</h3>
                <p className="mt-2 text-sm text-slate-200/85">
                  {lookupState.result.available
                    ? 'No encontramos un registro activo en RDAP para este dominio.'
                    : 'RDAP reporta que el dominio ya está registrado.'}
                </p>
              </div>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                  lookupState.result.available
                    ? 'bg-emerald-400/15 text-emerald-200'
                    : 'bg-cyan-400/15 text-cyan-200'
                }`}
              >
                {lookupState.result.available ? 'Disponible' : 'Registrado'}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Registrar</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {lookupState.result.registrar ?? (lookupState.result.available ? 'Listo para registro' : 'No disponible')}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Creado</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {formatLookupDate(lookupState.result.createdAt) ?? 'Sin dato'}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Vencimiento</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {formatLookupDate(lookupState.result.expiresAt) ?? 'Sin dato'}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">DNSSEC</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {lookupState.result.dnssecSigned === undefined
                    ? 'Sin dato'
                    : lookupState.result.dnssecSigned
                      ? 'Activo'
                      : 'No firmado'}
                </p>
              </div>
            </div>

            {!lookupState.result.available && (
              <>
                <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
                  <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Estados RDAP</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {lookupState.result.statuses.length > 0 ? (
                        lookupState.result.statuses.map((status) => (
                          <span
                            key={status}
                            className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100"
                          >
                            {formatStatusLabel(status)}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-300">Sin estados reportados.</span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Metadatos</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-200">
                      <p>
                        <span className="text-slate-400">Handle:</span>{' '}
                        <span className="font-medium text-white">{lookupState.result.handle ?? 'Sin dato'}</span>
                      </p>
                      <p>
                        <span className="text-slate-400">Actualizado:</span>{' '}
                        <span className="font-medium text-white">
                          {formatLookupDate(lookupState.result.updatedAt) ?? 'Sin dato'}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-400">Fuente:</span>{' '}
                        <span className="font-medium text-white">{lookupState.result.sourceHost ?? 'RDAP'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Nameservers</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lookupState.result.nameservers.length > 0 ? (
                      lookupState.result.nameservers.map((nameserver) => (
                        <span
                          key={nameserver}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                        >
                          {nameserver.toLowerCase()}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-300">No se reportaron nameservers.</span>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={buildDomainWhatsAppHref(lookupState.result.domain, lookupState.result.available)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  lookupState.result.available
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                }`}
              >
                {lookupState.result.available ? 'Quiero registrarlo' : 'Quiero alternativas'}
              </a>
              <a
                href={lookupState.result.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
              >
                Ver fuente RDAP
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-white text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Domain Extensions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Extensiones Disponibles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domainExtensions.map((domain, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">{domain.extension}</div>
              <div className="text-sm font-semibold text-purple-200 mb-2">{domain.note}</div>
              <div className="text-sm text-gray-400">{domain.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios de Dominio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <service.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Consejos para tu Dominio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {domainTips.map((tip, index) => (
            <div key={index} className="text-center">
              <tip.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Servicios Adicionales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalServices.map((service, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
              <Shield className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white text-sm">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
