interface ImportMetaEnv {
  VITE_APP_O_MDB_API_URL: string;
  VITE_APP_O_MDB_API_KEY: string;
  VITE_APP_BUDDY_MOVIE_URL: string;
}

interface ImportMeta {
  url: string
  readonly env: ImportMetaEnv
}