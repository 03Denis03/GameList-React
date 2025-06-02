import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { fetchCommentsFromFirestore, addCommentToGame } from '../services/firebaseServices';
import { fetchGameDetails } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { useThemeStyles } from '../hooks/useThemeStyles';

export default function GameReviewScreen({ route }: any) {
  const { game } = route.params;
  const { user } = useAuth();
  const theme = useThemeStyles();
  const accentColor = '#5e60ce'; // 🎨 buton mov

  const [details, setDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const gameDetails = await fetchGameDetails(game.id);
      const firebaseComments = await fetchCommentsFromFirestore(game.id);
      setDetails(gameDetails);
      setComments(firebaseComments);
    } catch (error) {
      console.error('Eroare la încărcare:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!user || !commentText.trim()) return;

    await addCommentToGame(
      game.id,
      user.uid,
      user.email ?? 'Anonim',
      commentText.trim()
    );

    setCommentText('');
    loadData();
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: theme.text }]}>{details.name}</Text>
      <Text style={[styles.rating, { color: theme.text }]}>
        Rating: {details.rating.toFixed(1)} / 5
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Comments:</Text>
      {comments.map((c, index) => (
        <View key={index} style={[styles.commentBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.commentAuthor, { color: theme.text }]}>
            Comment from: {c.userEmail}
          </Text>
          <Text style={[styles.commentText, { color: theme.text }]}>{c.text}</Text>
        </View>
      ))}

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Add a comment..."
        placeholderTextColor={theme.placeholder}
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button title="Send" onPress={handleSubmit} color={accentColor} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  commentBox: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
