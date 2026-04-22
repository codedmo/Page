/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_API_KEY?: string;
  readonly VITE_BEARER_TOKEN?: string;
  readonly VITE_WEBSITE_ORIGIN?: string;
  readonly VITE_EMAIL_TEMPLATE_TYPE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
