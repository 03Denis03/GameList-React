import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginWithEmail, registerWithEmail } from '../services/authServices';

interface AuthContextProps {
  user: { uid: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ uid: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        // Ensure UID exists even if saved as localId
        const normalizedUser = {
          uid: parsed.uid || parsed.localId,
          email: parsed.email,
        };
        setUser(normalizedUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginWithEmail(email, password);
    const userObj = { uid: data.localId, email: data.email };
    await AsyncStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const register = async (email: string, password: string) => {
    const data = await registerWithEmail(email, password);
    const userObj = { uid: data.localId, email: data.email };
    await AsyncStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
