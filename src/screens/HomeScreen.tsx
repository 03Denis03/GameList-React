import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { fetchGames } from '../services/apiService';
import styles from '../styles/HomeScreen.styles';

export default function HomeScreen({ navigation }: any) {
  const [games, setGames] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadGames = async (pageToLoad = 1) => {
    if (!hasNext && pageToLoad !== 1) return;
    if (pageToLoad === 1) setLoading(true);
    else setLoadingMore(true);

    const data = await fetchGames(pageToLoad);
    setGames(prev => pageToLoad === 1 ? data.results : [...prev, ...data.results]);
    setHasNext(data.hasNext);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleLoadMore = () => {
    if (hasNext && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadGames(nextPage);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('GameDetails', { game: item })}
    >

      <Image source={{ uri: item.background_image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.info}>Rating: {item.rating}</Text>
        <Text style={styles.info}>Released: {item.released}</Text>
      </View>

    </TouchableOpacity>
  );

  if (loading && page === 1) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}
