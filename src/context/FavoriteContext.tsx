import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites as fetchFavorites, addFavorite as addFav, removeFavorite as removeFav } from '../services/favoriteServices';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContext = createContext<any>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [version, setVersion] = useState(0);
  const FAVORITES_KEY = 'FAVORITES_CACHE';

  const loadFavorites = async () => {
  if (!user?.uid) {
    console.log('User not logged in - skip loadFavorites.');
    return;
  }

  try {
    //  Încarcă din cache (prioritar)
    const cachedData = await AsyncStorage.getItem(FAVORITES_KEY);
    if (cachedData) {
      console.log('Favorite cache found, loading...');
      setFavorites(JSON.parse(cachedData));
      setVersion(prev => prev + 1);
      return; // Ieși direct, nu mai face fetch din Firebase!
    }

    // Dacă nu există cache, încarcă din Firebase
    console.log('No cache found, loading from Firebase...');
    const data = await fetchFavorites(user.uid);
    setFavorites(data);
    setVersion(prev => prev + 1);

    // Salvează în cache
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
    console.log('Favorite data from Firebase saved to cache.');
  } catch (error) {
    console.warn('Eroare la loadFavorites:', error);
  }
};


  useEffect(() => {
    loadFavorites();
  }, [user]);

  const addFavorite = async (game: any) => {
    if (!user) return;
    await addFav(user.uid, game);

    const updatedFavorites = [...favorites, game];
    setFavorites(updatedFavorites);
    setVersion(prev => prev + 1);

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    console.log('Favorite added and saved to cache:', updatedFavorites);
  };

  const removeFavorite = async (gameId: number) => {
    if (!user) return;
    await removeFav(user.uid, gameId);

    const updatedFavorites = favorites.filter(g => g.id !== gameId);
    setFavorites(updatedFavorites);
    setVersion(prev => prev + 1);

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    console.log('Favorite removed and cache updated:', updatedFavorites);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, version, addFavorite, removeFavorite, loadFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
