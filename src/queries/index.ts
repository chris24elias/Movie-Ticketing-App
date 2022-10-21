import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getPopularMovies } from "../api";
import { Movie } from "../api/types";

export const usePopularMovies = () =>
  useQuery<{ results: Movie[]; page: number }>(["popular"], getPopularMovies);

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
  console.log("url", url);
  return url;
};
