import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  getImagesForMovie,
  getMovieCast,
  getMovieDetails,
  getMovieGenreList,
  getPersonImages,
  getPopularMovies,
} from "../api";
import { Movie, MovieDetails } from "../api/types";

export const usePopularMovies = () =>
  useQuery<{ results: Movie[]; page: number }>(["popular"], getPopularMovies);

export const useMovieGenres = () =>
  useQuery(["movie-genres"], getMovieGenreList);

export const useMovieCast = (movieId: number) =>
  useQuery(["movie-cast", movieId], () => getMovieCast(movieId));

export const usePersonImages = (personId: number) =>
  useQuery(["person-images", personId], () => getPersonImages(personId));

export const useMovieDetails = (movieId: number) =>
  useQuery<MovieDetails>(["movie-details", movieId], () =>
    getMovieDetails(movieId)
  );

export const getUrlForImagePath = (
  filePath: string,
  size = 500,
  original?: boolean
) => {
  let url = "";
  if (original) {
    url = `https://image.tmdb.org/t/p/original${filePath}`;
  } else {
    url = `https://image.tmdb.org/t/p/w${size}${filePath}`;
  }
  return url;
};

export const useMovieImages = (tmdbId: number) =>
  useQuery(["movieImages", tmdbId], () => getImagesForMovie(tmdbId));
