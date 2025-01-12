import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGRmYWI0MGI0NTJlNDBmNTU5NzJlZmVkNWUwNzBlYyIsIm5iZiI6MTYyNDcxMDg1OC42MzgsInN1YiI6IjYwZDcxZWNhZWY5ZDcyMDA1ZGExNzMwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e7H7wRBO1tJuhc6IoxUj9v7tq9NWFpT_LI7cr7UVBF0';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results || [];
};

export const getMovieById = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast || [];
};

export const getMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.cast || [];
};

export const getMoviesBySearch = async (query) => {
  const response = await api.get(`/search/movie`, { params: { query } });
  return response.data.results || [];
};
