import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventsphere_user');
    return saved ? JSON.parse(saved) : null;
  });

  const saveSession = (data) => {
    // Backend response chahe { token, user: {...} } ho ya flat { _id, name, role, token }
    const userData = data.user ? { ...data.user, token: data.token } : data;
    localStorage.setItem('eventsphere_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return saveSession(data);
  };

  const register = async (payload) => {
    // payload: { name, email, password, role, companyName, companyCategory, interests }
    const { data } = await api.post('/auth/register', payload);
    return saveSession(data);
  };

  const logout = () => {
    localStorage.removeItem('eventsphere_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user?.token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);