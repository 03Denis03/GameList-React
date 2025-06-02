import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeStyles } from '../hooks/useThemeStyles';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useThemeStyles();

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert('Error', 'All fields are required');
    try {
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.response?.data?.error?.message || 'Unexpected error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.placeholder}
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text style={[styles.link, { color: '#007bff' }]} onPress={() => navigation.navigate('Register')}>
        Nu ai cont? Creează unul
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});
