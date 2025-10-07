import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('user');
        
        if (storedAuth === 'true' && storedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign In
  const signIn = async (email, password) => {
    try {
      // Simulate API call
      const response = await authAPI.signIn({ email, password });
      
      const userData = {
        id: response.id || Date.now().toString(),
        email: response.email || email,
        name: response.name || 'User',
        avatar: response.avatar || null,
      };

      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      throw new Error(error.message || 'Sign in failed');
    }
  };

  // Sign Up
  const signUp = async (userData) => {
    try {
      // Simulate API call
      const response = await authAPI.signUp(userData);
      
      const newUser = {
        id: response.id || Date.now().toString(),
        email: response.email || userData.email,
        name: response.name || userData.name,
        avatar: response.avatar || null,
      };

      setUser(newUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      throw new Error(error.message || 'Sign up failed');
    }
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Update User Profile
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword({ email });
      return { success: true, message: 'Password reset link sent to your email' };
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  // Reset Password
  const resetPassword = async (token, newPassword) => {
    try {
      await authAPI.resetPassword({ token, password: newPassword });
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API service
const authAPI = {
  signIn: async ({ email, password }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials
    if (email === 'admin@shivai.com' && password === 'Admin123') {
      return {
        id: '1',
        email: 'admin@shivai.com',
        name: 'Admin User',
        avatar: null,
        token: 'demo-token-123'
      };
    }
    
    throw new Error('Invalid email or password');
  },

  signUp: async ({ name, email, password }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful signup
    return {
      id: Date.now().toString(),
      email,
      name,
      avatar: null,
      token: 'demo-token-' + Date.now()
    };
  },

  forgotPassword: async ({ email }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful request
    return { success: true };
  },

  resetPassword: async ({ token, password }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful reset
    return { success: true };
  },

  socialAuth: async (provider) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      email: `user@${provider}.com`,
      name: `${provider} User`,
      avatar: null,
      token: `${provider}-token-` + Date.now()
    };
  }
};

export default AuthContext;