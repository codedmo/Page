export const reactIslandPaths = [
  '/servicios/desarrollo/web',
  '/servicios/desarrollo/software',
  '/servicios/desarrollo/movil',
  '/servicios/desarrollo/api',
  '/servicios/hosting&cloud/hosting',
  '/servicios/hosting&cloud/cloud',
  '/servicios/hosting&cloud/dominios',
  '/servicios/google&microsoft/workspace',
  '/servicios/google&microsoft/microsoft365',
  '/servicios/cotizacion/consulta',
  '/servicios/cotizacion/estimacion',
] as const;

export type ReactIslandRoutePath = (typeof reactIslandPaths)[number];
