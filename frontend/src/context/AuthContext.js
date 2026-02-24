import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Auth Context
 * Manages user authentication state globally
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set default axios header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token by fetching user data
          const response = await axios.get('/api/auth/me');
          
          if (response.data.success) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Register new user
   */
  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update user state
        setUser(userData);
        
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update user state
        setUser(userData);
        
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
