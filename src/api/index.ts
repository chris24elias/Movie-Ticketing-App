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
    .get(`/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`)
    .then((res) => res.data);
};

type ImageObject = {
  path: string;
  height: number;
  aspect_ratio: number;
};

export const getImagesForMovie = async (
  tmdbId: number,
  size = 500
): Promise<{
  posters: ImageObject[];
  backdrops: ImageObject[];
  logos: ImageObject[];
}> => {
  try {
    const response = await tmdbAPi.get(
      `/movie/${tmdbId}/images?api_key=${TMDB_API_KEY}`
    );
    const images = response.data;

    const createImageObj = ({ file_path, aspect_ratio, height }) => ({
      path: `https://image.tmdb.org/t/p/w${size}${file_path}`,
      aspect_ratio,
      height,
    });
    const max = 6;
    const posters = images.posters.slice(0, max).map(createImageObj);
    const backdrops = images.backdrops.slice(0, max).map(createImageObj);
    const logos = images.logos.slice(0, max).map(createImageObj);

    return {
      posters: posters,
      backdrops: backdrops,
      logos,
    };
  } catch (error) {
    throw error;
  }
};

// export const getTrailerForMovie = (movieId) => {
//   return tmdbAPi
//   .get(`/movie/${movieId}?api_key=${TMDB_API_KEY}`)
//   .then((res) => res.data);
// }
