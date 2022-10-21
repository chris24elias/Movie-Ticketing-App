import { TMDB_API_KEY } from "../../env";
import axios from "axios";
export const tmdbAPi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPopularMovies = () => {
  return tmdbAPi
    .get(`/movie/popular?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};

export const getConfiguration = () => {
  return tmdbAPi
    .get(`/configuration?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};

export const getMovieGenreList = () => {
  return tmdbAPi
    .get(`/genre/movie/list?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data.genres);
};

export const getMovieCast = (movieId: number) => {
  return tmdbAPi
    .get(`/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};

export const getPersonImages = (personId: number) => {
  return tmdbAPi
    .get(`/person/${personId}/images?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};
export const getMovieDetails = (movieId: number) => {
  return tmdbAPi
    .get(`/movie/${movieId}?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};
