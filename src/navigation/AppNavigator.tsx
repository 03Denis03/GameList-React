import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useThemeContext } from '../context/ThemeContext'; // ✅ adăugat

// ✅ Temă custom Light
const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: '#5e60ce',
    card: '#f5f5f5',
  },
};

// ✅ Temă custom Dark
const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#eeeeee',
    primary: '#5e60ce',
    card: '#1e1e1e',
  },
};

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { theme } = useThemeContext(); // ✅ obținem tema curentă

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme === 'dark' ? MyDarkTheme : MyLightTheme}>
      {user ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
