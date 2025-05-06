import axios from 'axios';

const API_KEY = 'AIzaSyDyDYLN0q6glY1bnnwvMGLajxgqMlQXaFA'; 

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
