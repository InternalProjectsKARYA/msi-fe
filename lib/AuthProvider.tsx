"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import jwt from 'jsonwebtoken';

interface AuthContextType {
  Id?: string;
  role?: string;
 
  exp?: number;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Id, setUserId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
 
  const [exp, setExp] = useState<number | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const decodeToken = (token: string): {
    Id: string;
    role: string;
    
    exp?: number;
  } | null => {
    try {
      const decoded: any = jwt.decode(token);
      if (decoded && decoded.Id && decoded.role) {
        return {
          Id: decoded.Id,
          role: decoded.role,
          
          exp: decoded.exp
        };
      } else {
        console.error('Token does not contain Id or role');
        return null;
      }
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  };

  const login = (token: string) => {
    const decoded = decodeToken(token);
    if (decoded) {
      setUserId(decoded.Id);
      setRole(decoded.role);
      
      setExp(decoded.exp);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUserId(undefined);
    setRole(undefined);
   
    setExp(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserId(decoded.Id);
        setRole(decoded.role);
       
        setExp(decoded.exp);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const value = useMemo(() => ({
    Id,
    role,
    
    exp,
    login,
    logout,
    isAuthenticated
  }), [Id, role, exp, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
