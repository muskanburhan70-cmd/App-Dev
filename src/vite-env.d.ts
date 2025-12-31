/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string
  readonly VITE_APPWRITE_PROJECT_ID: string
  readonly VITE_APPWRITE_DATABASE_ID: string
  readonly VITE_APPWRITE_EMPLOYEES_COLLECTION_ID: string
  readonly VITE_APPWRITE_ATTENDANCE_COLLECTION_ID: string
  readonly VITE_APPWRITE_PAYROLL_COLLECTION_ID: string
  readonly VITE_APPWRITE_PERFORMANCE_COLLECTION_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
