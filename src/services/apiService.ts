import { RAWG_API_KEY } from '@env';

const API_KEY = RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async (page = 1, pageSize = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`);
    const data = await response.json();
    return {
      results: data.results,
      hasNext: !!data.next,
    };
  } catch (error) {
    console.error('Eroare la fetchGames:', error);
    return { results: [], hasNext: false };
  }
};

export const fetchGameDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Eroare la fetchGameDetails:', error);
    return null;
  }
};

export const fetchGameRedditPosts = async (gameId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}/reddit?key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Eroare la fetchGameRedditPosts:', error);
    return [];
  }
};
