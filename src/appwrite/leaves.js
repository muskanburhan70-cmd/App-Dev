import { databases, ID, appwriteConfig } from './config';
import { Query } from 'appwrite';

class LeaveService {
  // Get all leave requests
  async getLeaves(employeeId = null, status = null) {
    try {
      const queries = [];
      if (employeeId) queries.push(Query.equal('employeeId', employeeId));
      if (status) queries.push(Query.equal('status', status));

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        'leave_requests',
        queries
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching leaves:', error);
      throw error;
    }
  }

  // Get single leave request
  async getLeave(id) {
    try {
      const leave = await databases.getDocument(
        appwriteConfig.databaseId,
        'leave_requests',
        id
      );
      return leave;
    } catch (error) {
      console.error('Error fetching leave:', error);
      throw error;
    }
  }

  // Create leave request
  async createLeave(data) {
    try {
      const leave = await databases.createDocument(
        appwriteConfig.databaseId,
        'leave_requests',
        ID.unique(),
        {
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          leaveType: data.leaveType,
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason || '',
          status: data.status || 'Pending',
          requestDate: data.requestDate || new Date().toISOString(),
        }
      );
      return leave;
    } catch (error) {
      console.error('Error creating leave:', error);
      throw error;
    }
  }

  // Update leave request
  async updateLeave(id, data) {
    try {
      const leave = await databases.updateDocument(
        appwriteConfig.databaseId,
        'leave_requests',
        id,
        data
      );
      return leave;
    } catch (error) {
      console.error('Error updating leave:', error);
      throw error;
    }
  }

  // Delete leave request
  async deleteLeave(id) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        'leave_requests',
        id
      );
      return true;
    } catch (error) {
      console.error('Error deleting leave:', error);
      throw error;
    }
  }

  // Update leave status (Approve/Reject)
  async updateLeaveStatus(id, status, reviewedBy = null) {
    try {
      const updateData = { 
        status,
        reviewDate: new Date().toISOString()
      };
      if (reviewedBy) updateData.reviewedBy = reviewedBy;

      const leave = await databases.updateDocument(
        appwriteConfig.databaseId,
        'leave_requests',
        id,
        updateData
      );
      return leave;
    } catch (error) {
      console.error('Error updating leave status:', error);
      throw error;
    }
  }

  // Get leave statistics for an employee
  async getLeaveStats(employeeId, year) {
    try {
      const leaves = await this.getLeaves(employeeId);
      const yearLeaves = leaves.filter(leave => {
        const leaveYear = new Date(leave.startDate).getFullYear();
        return leaveYear === year;
      });

      const stats = {
        total: yearLeaves.length,
        approved: yearLeaves.filter(l => l.status === 'Approved').length,
        pending: yearLeaves.filter(l => l.status === 'Pending').length,
        rejected: yearLeaves.filter(l => l.status === 'Rejected').length,
      };

      return stats;
    } catch (error) {
      console.error('Error calculating leave stats:', error);
      throw error;
    }
  }
}

export default new LeaveService();
