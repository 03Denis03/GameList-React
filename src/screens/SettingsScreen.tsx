import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/SettingsScreen.styles';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Change app preferences here.</Text>
    </View>
  );
}
