import { createReducer, on, Action } from '@ngrx/store';
import { DetailedMovie } from 'src/app/movie/models/detailed-movie.model';
import { Movie } from 'src/app/movie/models/movie.model';
import * as MovieAtions from '../actions/movie.actions';

export interface MovieState {
  readonly title: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly movies: Movie[];
  readonly detailedMovie: DetailedMovie | undefined;
}

export const initialState: MovieState = {
  title: '',
  isLoading: false,
  errorMessage: undefined,
  movies: [],
  detailedMovie: undefined,
};

export function reducer(state: MovieState = initialState, action: Action) {
  return movieReducer(state, action);
}

const movieReducer = createReducer(
  initialState,
  on(MovieAtions.reset, () => ({ ...initialState })),
  on(MovieAtions.search, (state, { title }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    movies: [],
    detailedMovie: undefined,
    title,
  })),
  on(MovieAtions.searchSuccess, (state, { movies }) => ({
    ...state,
    isLoading: false,
    movies,
  })),
  on(
    MovieAtions.searchFail,
    MovieAtions.getDetailedFail,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      errorMessage: error.message,
    })
  ),
  on(MovieAtions.getDetailed, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    detailedMovie: undefined,
  })),
  on(MovieAtions.getDetailedSuccess, (state, { detailedMovie }) => ({
    ...state,
    isLoading: false,
    detailedMovie,
  }))
);