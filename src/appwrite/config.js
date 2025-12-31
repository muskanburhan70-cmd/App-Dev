import { Client, Account, Databases, ID } from 'appwrite';

// Appwrite configuration
export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  
  // Collection IDs
  collections: {
    employees: import.meta.env.VITE_APPWRITE_EMPLOYEES_COLLECTION_ID,
    attendance: import.meta.env.VITE_APPWRITE_ATTENDANCE_COLLECTION_ID,
    payroll: import.meta.env.VITE_APPWRITE_PAYROLL_COLLECTION_ID,
    performance: import.meta.env.VITE_APPWRITE_PERFORMANCE_COLLECTION_ID,
  }
};

// Debug: Log configuration to check if env vars are loaded
console.log('Appwrite Config:', {
  endpoint: appwriteConfig.endpoint,
  projectId: appwriteConfig.projectId,
  databaseId: appwriteConfig.databaseId,
  collections: appwriteConfig.collections
});

// Export individual constants for easier importing
export const DATABASE_ID = appwriteConfig.databaseId;
export const EMPLOYEES_COLLECTION_ID = appwriteConfig.collections.employees;
export const ATTENDANCE_COLLECTION_ID = appwriteConfig.collections.attendance;
export const PAYROLL_COLLECTION_ID = appwriteConfig.collections.payroll;
export const PERFORMANCE_COLLECTION_ID = appwriteConfig.collections.performance;

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

export { ID };
export default client;
