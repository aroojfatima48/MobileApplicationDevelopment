import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@naqsh_current_user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to load user', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // SIGN UP: Naye user ko users list mein add karo
  const signUp = async (name, email, password) => {
    try {
      const existingUsersRaw = await AsyncStorage.getItem('@naqsh_users');
      let users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const alreadyExists = users.find(u => u.email === email);
      if (alreadyExists) {
        return { success: false, message: 'This email is already registered. Please login.' };
      }

      const newUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem('@naqsh_users', JSON.stringify(users));
      
      return { success: true, message: 'Account created successfully!' };
    } catch (e) {
      return { success: false, message: 'Something went wrong.' };
    }
  };

  // LOGIN: Users list mein check karo
  const login = async (email, password) => {
    try {
      const existingUsersRaw = await AsyncStorage.getItem('@naqsh_users');
      const users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        await AsyncStorage.setItem('@naqsh_current_user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // LOGOUT: Sirf current session hatao, user ka data MAT delete karo
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@naqsh_current_user');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);