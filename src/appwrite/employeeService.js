import { databases, DATABASE_ID, EMPLOYEES_COLLECTION_ID } from "./config";
import { ID } from "appwrite";

// CREATE employee
export const createEmployee = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    EMPLOYEES_COLLECTION_ID,
    ID.unique(),
    data
  );
};

// READ all employees
export const getEmployees = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      EMPLOYEES_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// READ single employee
export const getEmployeeById = async (id) => {
  return await databases.getDocument(
    DATABASE_ID,
    EMPLOYEES_COLLECTION_ID,
    id
  );
};

// UPDATE employee
export const updateEmployee = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    EMPLOYEES_COLLECTION_ID,
    id,
    data
  );
};

// DELETE employee
export const deleteEmployee = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    EMPLOYEES_COLLECTION_ID,
    id
  );
};

// Default export as an object
export default {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
