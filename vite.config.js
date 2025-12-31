import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("YOUR_PROJECT_ID"); // from Appwrite Console

export const databases = new Databases(client);

export const DATABASE_ID = "hr_database";
export const EMPLOYEES_COLLECTION_ID = "employees";
export const ATTENDANCE_COLLECTION_ID = "attendance";
