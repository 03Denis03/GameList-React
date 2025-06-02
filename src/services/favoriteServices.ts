import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Adaugă un joc în favorite în Firestore
 */
export const addFavorite = async (userId: string, game: { id: number; name: string }) => {
  const ref = doc(db, 'users', userId, 'favorites', game.id.toString());
  await setDoc(ref, {
    id: game.id,
    name: game.name,
  });
};

/**
 * Șterge un joc din favorite în Firestore
 */
export const removeFavorite = async (userId: string, gameId: number) => {
  const ref = doc(db, 'users', userId, 'favorites', gameId.toString());
  await deleteDoc(ref);
};

/**
 * Obține toate jocurile favorite (doar id + name) din Firestore
 */
export const getFavorites = async (userId: string) => {
  if (!userId) throw new Error('userId este undefined!');
  const ref = collection(db, 'users', userId, 'favorites');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => doc.data());
};
