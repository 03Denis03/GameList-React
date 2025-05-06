import { db } from '../config/firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

export const addCommentToGame = async (
  gameId: number,
  userId: string,
  userEmail: string,
  text: string
) => {
  const ref = collection(db, 'comments', gameId.toString(), 'commentList');
  await addDoc(ref, {
    userId,
    userEmail,
    text,
    createdAt: serverTimestamp(),
  });
};

export const fetchCommentsFromFirestore = async (gameId: number) => {
  const ref = collection(db, 'comments', gameId.toString(), 'commentList');
  const q = query(ref, orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};
