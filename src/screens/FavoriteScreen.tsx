import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoriteContext';
import { fetchGameDetails } from '../services/apiService';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/FavoriteScreen.styles';
import { useThemeStyles } from '../hooks/useThemeStyles'; // ✅ importă tema

export default function FavoriteScreen() {
  const { favorites, removeFavorite } = useFavorites();
  const [fullDetails, setFullDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useThemeStyles(); // ✅

  const loadDetails = async () => {
    try {
      setLoading(true);
      const results: any[] = [];

      for (const fav of favorites) {
        const data = await fetchGameDetails(fav.id);
        if (data) results.push(data);
      }

      setFullDetails(results);
    } catch (err) {
      console.error('Eroare la detalii jocuri favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (gameId: number) => {
    await removeFavorite(gameId);
    loadDetails();
  };

  useFocusEffect(
    useCallback(() => {
      loadDetails();
    }, [favorites])
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]} // ✅ aplica tema
      onPress={() =>
        (navigation as any).navigate('GameDetails', { game: item })
      }
    >
      <Image source={{ uri: item.background_image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{item.name}</Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            Alert.alert('Ștergere', 'Elimini din favorite?', [
              { text: 'Anulează', style: 'cancel' },
              { text: 'Da', onPress: () => handleRemove(item.id) },
            ]);
          }}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : fullDetails.length === 0 ? (
        <Text style={[styles.noFavorites, { color: theme.text }]}>
          Nu ai jocuri favorite.
        </Text>
      ) : (
        <FlatList
          data={fullDetails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
