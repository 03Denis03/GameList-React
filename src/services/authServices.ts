import axios from 'axios';
import { FIREBASE_API_KEY } from '@env';

const API_KEY = FIREBASE_API_KEY;
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const registerWithEmail = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}:signUp?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data;
};

export const loginWithEmail = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data;
};
