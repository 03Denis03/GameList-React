
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import * as Updates from 'expo-updates';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
      } else {
        const system = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
        setTheme(system);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
    await AsyncStorage.setItem('theme', newTheme);
    await Updates.reloadAsync(); // restart app
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
