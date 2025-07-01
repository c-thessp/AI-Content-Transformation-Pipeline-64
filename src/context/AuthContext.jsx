import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userId && token) {
      setUser({
        id: userId,
        email: userEmail,
        token: token
      });
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = ({ userId, token, email, newUser = false }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    if (email) localStorage.setItem('userEmail', email);
    
    setUser({
      id: userId,
      email: email,
      token: token,
      isNewUser: newUser
    });
    setIsAuthenticated(true);
    
    return { newUser };
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('onboardingComplete');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setUser(prev => ({ ...prev, onboardingComplete: true }));
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};