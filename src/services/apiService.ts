import { RAWG_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.rawg.io/api';
const GAMES_CACHE_KEY = 'GAMES_CACHE'; // Cheie pentru cache
const GAME_DETAILS_CACHE_PREFIX = 'GAME_DETAILS_'; // Prefix cache pentru detalii jocuri

export const fetchGames = async (page = 1, pageSize = 40, search = '') => {
  try {
    const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log("URL:", url);
    console.log("Răspuns API:", data);

    // Salvează în cache doar prima pagină (sau datele esențiale)
    if (!search && page === 1) {
      await AsyncStorage.setItem(GAMES_CACHE_KEY, JSON.stringify(data.results || []));
    }

    return {
      results: data.results || [],
      hasNext: !!data.next,
    };
  } catch (error) {
    console.error('Eroare la fetchGames:', error);

    // În caz de eroare (ex. offline), încearcă să folosești datele din cache
    if (!search && page === 1) {
      const cachedData = await AsyncStorage.getItem(GAMES_CACHE_KEY);
      if (cachedData) {
        console.log('Date încărcate din cache (fallback)!');
        return {
          results: JSON.parse(cachedData),
          hasNext: false,
        };
      }
    }

    return {
      results: [],
      hasNext: false,
    };
  }
};

export const fetchGameDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`);
    const data = await response.json();

    // Salvează detaliile în cache
    await AsyncStorage.setItem(`${GAME_DETAILS_CACHE_PREFIX}${id}`, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Eroare la fetchGameDetails:', error);

    // Fallback pe cache pentru detalii
    const cachedData = await AsyncStorage.getItem(`${GAME_DETAILS_CACHE_PREFIX}${id}`);
    if (cachedData) {
      console.log('Detalii încărcate din cache (fallback)!');
      return JSON.parse(cachedData);
    }

    return null;
  }
};
