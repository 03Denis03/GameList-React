import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import styles from '../styles/GameDetailsScreen.styles';
import { fetchGameDetails } from '../services/apiService';
import { fetchCommentsFromFirestore, addCommentToGame } from '../services/firebaseServices';
import { useAuth } from '../context/AuthContext';

export default function GameDetailsScreen({ route }: any) {
  const { game } = route.params;
  const { user } = useAuth();

  const [details, setDetails] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDetails = async () => {
    const data = await fetchGameDetails(game.id);
    const firebaseComments = await fetchCommentsFromFirestore(game.id);
    setDetails(data);
    setComments(firebaseComments);
    setLoading(false);
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleSubmit = async () => {
    if (!user || !commentText.trim()) return;

    console.log('Trimitem comentariu:', {
        gameId: game.id,
        userId: user.localId,
        email: user.email,
        text: commentText.trim(),
      });

    await addCommentToGame(
      game.id,
      user.localId,
      user.email ?? 'Anonim',
      commentText.trim()
    );

    setCommentText('');
    loadDetails(); // Reîncarcă detaliile și comentariile
  };

  if (loading || !details) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: details.background_image }} style={styles.image} />
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.info}>Rating: {details.rating}</Text>
      <Text style={styles.info}>Released: {details.released}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{details.description_raw}</Text>

      <Text style={styles.sectionTitle}>Comments</Text>
      {comments.length > 0 ? (
        comments.map((c, i) => (
          <View key={i} style={styles.comment}>
            <Text style={styles.commentTitle}>{c.userEmail}</Text>
            <Text style={styles.commentText}>{c.text}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.info}>No comments yet.</Text>
      )}

      <Text style={styles.sectionTitle}>Write a comment</Text>
      <TextInput
        value={commentText}
        onChangeText={setCommentText}
        placeholder="Your comment..."
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}
