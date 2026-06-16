/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  /** Production site origin, e.g. https://alimanrouh.com (optional; form uses window.location in browser) */
  readonly VITE_SITE_URL?: string
  /** Full Google Maps embed iframe src (optional; overrides address-based map on contact page) */
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
