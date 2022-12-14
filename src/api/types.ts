export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const ex1 = {
  adult: false,
  backdrop_path: "/aTovumsNlDjof7YVoU5nW2RHaYn.jpg",
  belongs_to_collection: {
    backdrop_path: "/d6uWYZe7h7M3F7h4IBjO1jgIkMh.jpg",
    id: 91361,
    name: "Halloween Collection",
    poster_path: "/cq1lf9sUi10faSvqegx8dLDEeZV.jpg",
  },
  budget: 20000000,
  genres: [
    { id: 27, name: "Horror" },
    { id: 53, name: "Thriller" },
  ],
  homepage: "https://www.halloweenmovie.com",
  id: 616820,
  imdb_id: "tt10665342",
  original_language: "en",
  original_title: "Halloween Ends",
  overview:
    "Four years after the events of Halloween in 2018, Laurie has decided to liberate herself from fear and rage and embrace life. But when a young man is accused of killing a boy he was babysitting, it ignites a cascade of violence and terror that will force Laurie to finally confront the evil she can’t control, once and for all.",
  popularity: 4376.852,
  poster_path: "/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg",
  production_companies: [
    {
      id: 14,
      logo_path: "/m6AHu84oZQxvq7n1rsvMNJIAsMu.png",
      name: "Miramax",
      origin_country: "US",
    },
    {
      id: 33,
      logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      name: "Universal Pictures",
      origin_country: "US",
    },
    {
      id: 3172,
      logo_path: "/kDedjRZwO8uyFhuHamomOhN6fzG.png",
      name: "Blumhouse Productions",
      origin_country: "US",
    },
    {
      id: 15822,
      logo_path: "/Aodu1OPI0LHTWYr7Jlm4R2XY2og.png",
      name: "Trancas International Films",
      origin_country: "US",
    },
    {
      id: 20848,
      logo_path: "/htPfdm3yNRVsDz8CyyMozALKOO0.png",
      name: "Rough House Pictures",
      origin_country: "US",
    },
  ],
  production_countries: [
    { iso_3166_1: "US", name: "United States of America" },
  ],
  release_date: "2022-10-12",
  revenue: 63000000,
  runtime: 111,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  status: "Released",
  tagline: "This Halloween, their saga ends.",
  title: "Halloween Ends",
  video: false,
  vote_average: 6.805,
  vote_count: 486,
};

export type MovieDetails = typeof ex1;
