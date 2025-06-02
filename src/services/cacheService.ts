import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_IDS_KEY = 'favorite_ids';

/**
 * Salvează ID-urile favorite în cache (ca array serializat)
 */
export const setFavoriteIds = async (favIds: Set<number>) => {
  try {
    const array = Array.from(favIds);
    await AsyncStorage.setItem(FAVORITE_IDS_KEY, JSON.stringify(array));
  } catch (error) {
    console.error('Eroare la salvarea favorite_ids în cache:', error);
  }
};

/**
 * Returnează ID-urile favorite ca Set<number>
 */
export const getFavoriteIds = async (uid: string): Promise<Set<number>> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITE_IDS_KEY);
    const array = json ? JSON.parse(json) : [];
    return new Set(array);
  } catch (error) {
    console.error('Eroare la încărcarea favorite_ids din cache:', error);
    return new Set();
  }
};
