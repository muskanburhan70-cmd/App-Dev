import { account, ID } from './config';

class AuthService {
  // Register new user
  async register({ email, password, name }) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      console.log('User registered:', user);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login({ email, password }) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log('User logged in:', session);
      return session;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Logout user
  async logout() {
    try {
      await account.deleteSession('current');
      console.log('User logged out');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Check if user is logged in
  async isLoggedIn() {
    try {
      await account.get();
      return true;
    } catch {
      return false;
    }
  }

  // Update user password
  async updatePassword(oldPassword, newPassword) {
    try {
      await account.updatePassword(newPassword, oldPassword);
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  }

  // Get user sessions
  async getSessions() {
    try {
      const sessions = await account.listSessions();
      return sessions;
    } catch (error) {
      console.error('Get sessions error:', error);
      throw error;
    }
  }
}

export default new AuthService();
