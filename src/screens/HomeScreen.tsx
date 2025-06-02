import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/HomeScreen.styles';
import { fetchGames } from '../services/apiService';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import debounce from 'lodash.debounce';
import { useThemeStyles } from '../hooks/useThemeStyles'; // ✅ adăugat

export default function HomeScreen() {
  const { user, loading: authLoading } = useAuth();
  const navigation = useNavigation();
  const theme = useThemeStyles(); // ✅ hook pentru dark mode

  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    if (authLoading || !user || !user.uid) return;
    resetAndLoadGames();
  }, [user, authLoading]);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearch(text);
      resetAndLoadGames(text);
    }, 500),
    [user]
  );

  const resetAndLoadGames = async (query = '') => {
    setLoading(true);
    setGames([]);
    setPage(1);
    setHasNext(true);

    const data = await fetchGames(1, 20, query);
    setGames(data.results);
    setHasNext(data.hasNext);
    setPage(2);
    setLoading(false);
  };

  const loadMoreGames = async () => {
    if (!hasNext || loadingMore) return;

    setLoadingMore(true);
    const data = await fetchGames(page, 20, search);
    setGames((prev) => [...prev, ...data.results]);
    setHasNext(data.hasNext);
    setPage((prev) => prev + 1);
    setLoadingMore(false);
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={() =>
          (navigation as any).navigate('GameDetails', { game: item })
        }
      >
        <Image source={{ uri: item.background_image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Search games..."
        placeholderTextColor={theme.placeholder}
        onChangeText={debouncedSearch}
        style={[
          styles.searchInput,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={games}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreGames}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={{ margin: 10 }} /> : null
          }
        />
      )}
    </View>
  );
}
