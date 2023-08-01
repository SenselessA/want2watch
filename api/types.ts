import {number} from "prop-types";

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterResponse {
  token: string;
}

export type RegisterUserInput = {
  email: string,
  username: string,
  password: string
}

export type LoginUserInput = {
  email: string,
  password: string
}

export type LoginUserOutput = {
  token: string
}

export type RatingInput = {
  movieId: string,
  rating: number
}

export type FavoriteInput = {
  movieId: string
}

export type RatingByUserOutput = {
  rating: null | number
}

export type UserRatedMoviesOutput = {
  "movieId": string,
  "title": string,
  "titleOrig": string,
  "animeKind": string,
  "status": string,
  "year": string,
  "posterUrl": string,
  "rating": number,
}

export type FavoriteByUserIdOutput = {
  isFavorite: boolean
}

export type UserFavoriteMoviesOutput = {
  "movieId": string,
  "title": string,
  "titleOrig": string,
  "animeKind": string,
  "status": string,
  "year": string,
  "posterUrl": string,
  "rating": string
}

export type MovieByIdOutput = {
  "id": string,
  "title": string,
  "titleOrig": string,
  "otherTitle": string,
  "link": string,
  "type": string,
  "episodesCount": number,
  "kinopoiskRating": number,
  "imdbRating": number,
  "kinopoiskVotes": number,
  "imdbVotes": number,
  "posterUrl": string,
  "allStatus": string,
  "year": number,
  "genres": string[],
  "minimalAge": number,
  "description": string,
  "countries": string[] | undefined,
  "actors": string[] | undefined,
  "duration": number
}

export type ProfileInfoOutput = {
  movies: UserRatedMoviesOutput[],
  favorites: UserFavoriteMoviesOutput[],
  user: ProfileInfo ,
}

export type ProfileInfo = {
  id: number,
  username: string,
  email: string,
  registrationTime: string,
}