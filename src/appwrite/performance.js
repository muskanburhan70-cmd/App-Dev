import { databases, ID, appwriteConfig } from './config';
import { Query } from 'appwrite';

class PerformanceService {
  // Get all performance reviews
  async getPerformances(employeeId = null) {
    try {
      const queries = employeeId ? [Query.equal('employeeId', employeeId)] : [];
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.performance,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching performances:', error);
      throw error;
    }
  }

  // Get single performance review
  async getPerformance(id) {
    try {
      const performance = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.performance,
        id
      );
      return performance;
    } catch (error) {
      console.error('Error fetching performance:', error);
      throw error;
    }
  }

  // Create performance review
  async createReview(data) {
    try {
      const performance = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.performance,
        ID.unique(),
        {
          employeeId: data.employeeId,
          reviewDate: data.reviewDate,
          rating: data.rating,
          comments: data.comments || '',
          reviewedBy: data.reviewedBy,
          strengths: data.strengths || '',
          areasForImprovement: data.areasForImprovement || '',
          goals: data.goals || '',
        }
      );
      return performance;
    } catch (error) {
      console.error('Error creating performance:', error);
      throw error;
    }
  }

  // Update performance review
  async updatePerformance(id, data) {
    try {
      const performance = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.performance,
        id,
        data
      );
      return performance;
    } catch (error) {
      console.error('Error updating performance:', error);
      throw error;
    }
  }

  // Delete performance review
  async deletePerformance(id) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.performance,
        id
      );
      return true;
    } catch (error) {
      console.error('Error deleting performance:', error);
      throw error;
    }
  }

  // Get average rating for an employee
  async getAverageRating(employeeId) {
    try {
      const reviews = await this.getPerformances(employeeId);
      if (reviews.length === 0) return 0;

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / reviews.length;
    } catch (error) {
      console.error('Error calculating average rating:', error);
      throw error;
    }
  }

  // Get performance trends
  async getPerformanceTrends(employeeId) {
    try {
      const reviews = await this.getPerformances(employeeId);
      return reviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
    } catch (error) {
      console.error('Error fetching performance trends:', error);
      throw error;
    }
  }
}

export default new PerformanceService();
