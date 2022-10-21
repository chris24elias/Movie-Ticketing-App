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
    .then((res) => res.data)
    .catch((err) => {
      console.log("ERR", err);
    });
};

// getConfiguration().then((res) => {
//   console.log("RES", res);
// });
