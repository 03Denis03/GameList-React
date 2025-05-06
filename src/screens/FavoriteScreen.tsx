import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/FavoriteScreen.styles';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Games</Text>
      <Text style={styles.subtitle}>Games you added to favorites will appear here.</Text>
    </View>
  );
}
