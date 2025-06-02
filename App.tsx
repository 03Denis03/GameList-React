import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { FavoriteProvider } from './src/context/FavoriteContext';
import { ThemeProvider } from './src/context/ThemeContext'; 


export default function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
}

