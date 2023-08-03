import axios, {AxiosPromise} from 'axios';
import {
  FavoriteByUserIdOutput,
  FavoriteInput,
  ILoginResponse,
  LoginUserInput,
  LoginUserOutput, MovieByIdOutput, ProfileInfoOutput, RatingByUserOutput,
  RatingInput,
  RegisterUserInput, UserFavoriteMoviesOutput, UserRatedMoviesOutput
} from "./types";

const BASE_URL = 'http://localhost:8080/api/v1/';
const API_URL = 'https://want2watch.store/api/v1/'

export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export class MoviesApi {
  static getMovieById = (id: string): AxiosPromise<MovieByIdOutput> => {
    return api.get(`/movies/${id}`)
  }
}

const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
}

authApi.interceptors.request.use(authInterceptor)

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response);
  }
);

// authApi.defaults.headers.common['Content-Type'] = 'application/json';

// export const refreshAccessTokenFn = async () => {
//   const response = await authApi.get<ILoginResponse>('auth/refresh');
//   return response.data;
// };

// authApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const errMessage = error.response.data.message as string;
//     if (errMessage.includes('not logged in') && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshAccessTokenFn();
//       return authApi(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );



// response
//   :
//   config
//     :
//   {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
//   :
//   "Cannot POST /api/auth/register"
// headers
//   :
//   AxiosHeaders {content-length: '30', content-type: 'text/plain; charset=utf-8'}
// request
//   :
//   XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
//   :
//   404
// statusText
//   :
//   "Not Found"


export class AuthApi {
  static signUpUser(user: RegisterUserInput): AxiosPromise<LoginUserOutput> {
    return authApi.post('auth/register', user);
  };

  static loginUser (user: LoginUserInput): AxiosPromise<LoginUserOutput> {
    return authApi.post<ILoginResponse>('auth/login', user);
  };

  static logoutUser ()  {
    window.localStorage.removeItem('token')
  };
}

export class RatingApi {
  static addRating (ratingData: RatingInput): AxiosPromise {
    return authApi.post('ratings', ratingData)
  }

  static getRatingByUser (movieId): AxiosPromise<RatingByUserOutput> {
    return authApi.get(`ratings/ratedByUser/${movieId}`)
  }

  static getUserRatedMovies (userId): AxiosPromise<UserRatedMoviesOutput[]> {
    return api.get(`ratings/${userId}`)
  }
}

export class FavoriteApi {
  static addFavoriteMovie (movieId: string): AxiosPromise {
    const favoriteData: FavoriteInput = {movieId}
    return authApi.post('favorites', favoriteData)
  }

  static removeFavoriteMovie (movieId: string): AxiosPromise {
    return authApi.delete(`favorites/${movieId}`)
  }

  static isFavoriteMovieByUser (movieId): AxiosPromise<FavoriteByUserIdOutput> {
    return authApi.get(`favorites/${movieId}`)
  }

  static getUserFavoriteMovies (userId): AxiosPromise<UserFavoriteMoviesOutput[]> {
    return api.get(`favorites/profile/${userId}`)
  }
}

export class ProfileApi {
  static getProfileInfo (userId): AxiosPromise<ProfileInfoOutput> {
    return api.get(`profiles/${userId}`)
  }
}

