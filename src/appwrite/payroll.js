import { databases, ID, appwriteConfig } from './config';
import { Query } from 'appwrite';

class PayrollService {
  // Get all payroll records
  async getPayrolls(month = null) {
    try {
      const queries = month ? [Query.equal('month', month)] : [];
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching payrolls:', error);
      throw error;
    }
  }

  // Get single payroll
  async getPayroll(id) {
    try {
      const payroll = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        id
      );
      return payroll;
    } catch (error) {
      console.error('Error fetching payroll:', error);
      throw error;
    }
  }

  // Get payroll by employee
  async getPayrollByEmployee(employeeId) {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        [Query.equal('employeeId', employeeId)]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching employee payroll:', error);
      throw error;
    }
  }

  // Create payroll
  async createPayroll(data) {
    try {
      const netSalary = parseFloat(data.grossSalary || 0) - parseFloat(data.deductions || 0);

      const payroll = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        ID.unique(),
        {
          employeeId: data.employeeId,
          month: data.month,
          grossSalary: parseFloat(data.grossSalary || 0),
          deductions: parseFloat(data.deductions || 0),
          netSalary: netSalary,
          status: data.status || 'Pending',
          paymentDate: data.paymentDate || null,
        }
      );
      return payroll;
    } catch (error) {
      console.error('Error creating payroll:', error);
      throw error;
    }
  }

  // Update payroll
  async updatePayroll(id, data) {
    try {
      if (data.grossSalary || data.deductions) {
        data.netSalary = parseFloat(data.grossSalary || 0) - parseFloat(data.deductions || 0);
      }

      const payroll = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        id,
        data
      );
      return payroll;
    } catch (error) {
      console.error('Error updating payroll:', error);
      throw error;
    }
  }

  // Delete payroll
  async deletePayroll(id) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        id
      );
      return true;
    } catch (error) {
      console.error('Error deleting payroll:', error);
      throw error;
    }
  }

  // Mark payroll as paid
  async markAsPaid(id) {
    try {
      const payroll = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.payroll,
        id,
        {
          status: 'Paid',
          paymentDate: new Date().toISOString(),
        }
      );
      return payroll;
    } catch (error) {
      console.error('Error marking payroll as paid:', error);
      throw error;
    }
  }
}

export default new PayrollService();
