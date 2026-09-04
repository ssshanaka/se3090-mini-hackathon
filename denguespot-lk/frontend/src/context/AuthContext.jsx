import { createContext, useContext, useState } from 'react';
import { clearSession, getSession, saveSession } from '../services/authService';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);

  const startSession = (account) => {
    saveSession(account);
    setUser(account);
  };

  const register = async (values) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error('Registration failed');
    const account = await response.json();
    startSession(account);
    return account;
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) return { success: false };
      const account = await response.json();
      startSession(account);
      return { success: true, user: account };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  const demoLogin = (role) => {
    // Demo login can be updated later, keeping it simple for now
    return false;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
