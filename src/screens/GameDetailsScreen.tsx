import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/GameDetailsScreen.styles';
import { fetchGameDetails } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStyles } from '../hooks/useThemeStyles'; // ✅ importă tema

export default function GameDetailsScreen({ route }: any) {
  const { game } = route.params;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const theme = useThemeStyles(); // ✅

  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const loadDetails = async () => {
    try {
      const data = await fetchGameDetails(game.id);
      const favIds = favorites.map((f: { id: number }) => f.id);
      setDetails(data);
      setIsFav(favIds.includes(game.id));
    } catch (error) {
      console.error('Eroare la încărcarea detaliilor jocului:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [favorites]);

  const toggleFavorite = async () => {
    if (!user) return;

    if (isFav) {
      await removeFavorite(game.id);
    } else {
      await addFavorite({ id: game.id, name: game.name });
    }

    setIsFav(!isFav);
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
  style={{ flex: 1, backgroundColor: theme.background }}
  contentContainerStyle={{ paddingBottom: 32 }}
>
      <Image source={{ uri: details.background_image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{details.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={28}
            color={isFav ? 'red' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={[styles.description, { color: theme.text }]}>
          {details.description_raw}
        </Text>

        <View style={{ marginTop: 16 }}>
          <Button
            title="Reviews"
            onPress={() => (navigation as any).navigate('GameReview', { game })}
            color="#5e60ce"
          />
        </View>
      </View>
    </ScrollView>
  );
}
