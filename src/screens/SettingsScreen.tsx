import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';
import styles from '../styles/SettingsScreen.styles';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const themeStyles = useThemeStyles();

  // 🎨 Culori universale pentru dark/light mode
  const logoutColor = '#e63946';   // roșu coral
  const toggleColor = '#5e60ce';   // mov-indigo

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: themeStyles.text }]}>Email utilizator:</Text>
        <Text style={[styles.email, { color: themeStyles.text }]}>
          {user?.email ?? 'Necunoscut'}
        </Text>

        <View style={styles.section}>
          <Button
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onPress={toggleTheme}
            color={toggleColor}
          />
        </View>
      </View>

      <View style={[styles.section, styles.logoutButton]}>
        <Button title="Logout" onPress={logout} color={logoutColor} />
      </View>
    </View>
  );
}
