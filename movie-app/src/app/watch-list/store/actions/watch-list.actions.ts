import { createAction, props } from '@ngrx/store';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';
import { WatchListData } from '../../models/watch-list-data.model';

export const reset = createAction('[WATCH LIST] Reset');

export const load = createAction('[WATCH LIST] Load');
export const loadSuccess = createAction(
  '[WATCH LIST] Load Success',
  props<{ data: Record<string, WatchListDataDetailed> }>()
);
export const loadFail = createAction(
  '[WATCH LIST] Load Fail',
  props<{ error: Error }>()
);

export const addMovie = createAction(
  '[WATCH LIST] Add',
  props<{ data: WatchListData }>()
);
export const addMovieSuccess = createAction(
  '[WATCH LIST] Add Success',
  props<{ data: WatchListDataDetailed }>()
);
export const addMovieFail = createAction(
  '[WATCH LIST] Add Fail',
  props<{ error: Error }>()
);

export const updateMovie = createAction(
  '[WATCH LIST] Update',
  props<{ data: WatchListData }>()
);
export const updateMovieSuccess = createAction(
  '[WATCH LIST] Update Success',
  props<{ data: WatchListData }>()
);
export const updateMovieFail = createAction(
  '[WATCH LIST] Update Fail',
  props<{ error: Error }>()
);

export const deleteMovie = createAction(
  '[WATCH LIST] Delete',
  props<{ id: string }>()
);
export const deleteMovieSuccess = createAction(
  '[WATCH LIST] Delete Success',
  props<{ id: string }>()
);
export const deleteMovieFail = createAction(
  '[WATCH LIST] Delete Fail',
  props<{ error: Error }>()
);
