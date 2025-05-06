import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import GameDetailsScreen from '../screens/GameDetailsScreen';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/* TabNavigator = ecranul cu Home, Favorites, Settings */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Ecran secundar: Game Details */}
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={{ title: 'Detalii joc' }}
      />
    </Stack.Navigator>
  );
}

