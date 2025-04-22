
import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be stored securely

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const login = (password: string): boolean => {
    const isValid = password === ADMIN_PASSWORD;
    if (isValid) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    }
    return isValid;
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
};
