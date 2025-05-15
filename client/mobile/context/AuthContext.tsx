import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

// ==========================================
// Define the shape of the user object
// ==========================================
interface User {
  token: string;
  username: string;
}

// ==========================================
// Define the structure of the context value
// ==========================================
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => Promise<void>; // Now returns a Promise to match async implementation
}

// ==========================================
// Create the AuthContext with default values
// ==========================================
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: async () => {}, // default is a no-op async function
});

// ==========================================
// Custom hook to access the AuthContext
// ==========================================
export const useAuth = () => useContext(AuthContext);

// ==========================================
// Provider component to wrap the app
// Stores user state and persists it in SecureStore
// ==========================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the current user object
  const [user, setUserState] = useState<User | null>(null);

  // Set the user in state AND persist to SecureStore
  const updateUser = async (newUser: User | null) => {
    setUserState(newUser);

    if (newUser) {
      // Store token and username securely
      await SecureStore.setItemAsync('authToken', newUser.token);
      await SecureStore.setItemAsync('username', newUser.username);
    } else {
      // Clear stored credentials if user logs out
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('username');
    }
  };

  // On mount, restore user session from SecureStore if possible
  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      const username = await SecureStore.getItemAsync('username');

      if (token && username) {
        setUserState({ token, username });
      }
    };
    loadUser();
  }, []);

  // Provide the user and setUser function to child components
  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
