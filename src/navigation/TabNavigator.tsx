import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoriteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '@react-navigation/native'; // ✅ importă tema activă

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme(); // ✅ accesează tema din NavigationContainer

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Favorites: 'heart-outline',
            Settings: 'settings-outline',
          };

          const iconName = icons[route.name] ?? 'ellipse';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,     // 🟣 highlight mov (#5e60ce)
        tabBarInactiveTintColor: theme.colors.text,      // 🌓 alb sau negru, în funcție de temă
        tabBarStyle: {
          backgroundColor: theme.colors.card,            // fundalul barei sincronizat cu tema
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
