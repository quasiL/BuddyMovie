export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userNumber: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  sex: string;
}

export interface CreateOfferRequest {
  userNumber: string;
  movies: string[];
}

export interface ApiResponse {
  Title: string;
  Poster: string,
  Year: string;
  Genre: string;
  Director: string;
  Plot: string;
  imdbID: string;
  Response: string;
}

export interface MovieResponse {
  movieNumber: string;
  apiLink: string;
  rating: number;
  isViewed: boolean;
  isCreatorMovie: boolean;
}

export interface MovieInfo {
  poster: string;
  title: string;
  year: string;
  director: string;
  genre: string;
  plot: string;
}

export interface OfferResponse {
  offerNumber: string;
  creator: string;
  applicant: string;
  isActive: boolean;
  isOpened: boolean;
  startTime: string;
  endTime: string;
  movies: MovieResponse[];
}

export interface UpdateOfferRequest {
  userNumber: string;
  offerNumber: string;
}

export interface OfferPagination {
  content: OfferResponse[];
  totalPages: number;
}

export interface UserAbout {
  firstName: string;
  lastName: string;
  userNumber: string;
  about: string;
  publicEmail: string;
  avatar: string;
  discord: string;
  facebook: string;
  twitter: string;
}



