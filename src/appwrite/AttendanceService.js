import { databases, DATABASE_ID, ATTENDANCE_COLLECTION_ID } from "./config";
import { ID, Query } from "appwrite";

// CREATE attendance record
export const createAttendance = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    ATTENDANCE_COLLECTION_ID,
    ID.unique(),
    data
  );
};

export const markAttendance = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    ATTENDANCE_COLLECTION_ID,
    ID.unique(),
    data
  );
};

// READ attendance records (with optional date filter)
export const getAttendance = async (date) => {
  try {
    const queries = date ? [Query.equal('date', date)] : [];
    const response = await databases.listDocuments(
      DATABASE_ID,
      ATTENDANCE_COLLECTION_ID,
      queries
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
};

// UPDATE attendance record
export const updateAttendance = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    ATTENDANCE_COLLECTION_ID,
    id,
    data
  );
};

// DELETE attendance record
export const deleteAttendance = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    ATTENDANCE_COLLECTION_ID,
    id
  );
};

// Default export as an object
export default {
  createAttendance,
  markAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
};
