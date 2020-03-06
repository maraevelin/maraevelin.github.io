import { createAction } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import { DetailedMovie } from '../../../models/detailed-movie.model';
import { reducer, initialState, MovieState } from './movie.reducer';
import {
  MovieActionTypes,
  search,
  reset,
  searchSuccess,
  searchFail,
  getDetailed,
  getDetailedSuccess,
  getDetailedFail
} from '../actions/movie.actions';

describe('Movie Reducer', () => {
  const movies: Movie[] = [
    { imdbId: 'imdbId1', posterUrl: 'posterUrl1' },
    { imdbId: 'imdbId2', posterUrl: 'posterUrl2' }
  ];

  const detailedMovie: DetailedMovie = {
    imdbId: 'id',
    title: 'title',
    year: 'year',
    rating: 'rating',
    runTime: 'runTime',
    posterUrl: 'posterUrl',
    actors: ['actor1', 'actor2'],
    writers: ['writer1', 'writer2'],
    plot: 'plot'
  };

  const error = new Error('an error occured');

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe(MovieActionTypes.MOVIE_RESET, () => {
    it('should return the default state', () => {
      const state: MovieState = {
        title: 'title',
        isLoading: true,
        errorMessage: error.message,
        movies,
        detailedMovie
      };
      const action = reset;
      const result = reducer(state, action);
      expect(result).toEqual({
        title: '',
        isLoading: false,
        errorMessage: undefined,
        movies: [],
        detailedMovie: undefined
      });
    });
  });

  describe(MovieActionTypes.MOVIE_SEARCH, () => {
    it('should toggle on isLoading and update title in state', () => {
      const state: MovieState = {
        title: '',
        isLoading: false,
        errorMessage: undefined,
        movies: [],
        detailedMovie: undefined
      };
      const title = 'title';
      const action = search({ title });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        title
      });
    });
  });

  describe(MovieActionTypes.MOVIE_SEARCH_SUCCESS, () => {
    it('should toggle off isLoading and update movies in state', () => {
      const state: MovieState = {
        title: '',
        isLoading: true,
        errorMessage: error.message,
        movies: [],
        detailedMovie: undefined
      };
      const action = searchSuccess({ movies });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false,
        movies
      });
    });
  });

  describe(MovieActionTypes.MOVIE_GET_DETAILED, () => {
    it('should toggle on isLoading and remove error message and detailed movie from state', () => {
      const state: MovieState = {
        title: '',
        isLoading: false,
        errorMessage: error.message,
        movies: [],
        detailedMovie
      };
      const id = 'id';
      const action = getDetailed({ id });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        errorMessage: undefined,
        detailedMovie: undefined
      });
    });
  });

  describe(MovieActionTypes.MOVIE_GET_DETAILED_SUCCES, () => {
    it('should toggle off isLoading and update detailed movie in state', () => {
      const state: MovieState = {
        title: '',
        isLoading: true,
        errorMessage: undefined,
        movies: [],
        detailedMovie: undefined
      };
      const action = getDetailedSuccess({ detailedMovie });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false,
        detailedMovie
      });
    });
  });

  describe(`${MovieActionTypes.MOVIE_SEARCH_FAIL}, ${MovieActionTypes.MOVIE_GET_DETAILED_FAIL}`, () => {
    it('should toggle off isLoading and update error in state', () => {
      const state: MovieState = {
        title: '',
        isLoading: true,
        errorMessage: undefined,
        movies: [],
        detailedMovie: undefined
      };

      const actionSearchFail = searchFail({ error });
      const resultSearchFail = reducer(state, actionSearchFail);

      const actionGetDetailedFail = getDetailedFail({ error });
      const resultGetDetailedFail = reducer(state, actionGetDetailedFail);

      [resultSearchFail, resultGetDetailedFail].forEach(result =>
        expect(result).toEqual({
          ...state,
          isLoading: false,
          errorMessage: error.message
        })
      );
    });
  });
});
