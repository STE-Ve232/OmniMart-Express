"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useCallback } from 'react';
import type { User } from '@/lib/types';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, pass: string) => {
    // This is a mock login. In a real app, you'd verify credentials.
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
