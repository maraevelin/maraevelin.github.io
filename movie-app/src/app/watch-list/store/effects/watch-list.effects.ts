import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { WatchListService } from '../../services/watch-list.service';

import * as WatchListActions from '../actions/watch-list.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import * as SnackBarActions from '../../../core/store/snack-bar/actions/snack-bar.actions';

@Injectable()
export class WatchListEffects {
  constructor(private actions$: Actions, private service: WatchListService) {}

  loadOnSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      map(() => WatchListActions.load()),
      catchError((error) =>
        of(
          SnackBarActions.notify({
            message: error,
            cssClass: SnackBarActions.SnackBarCSS.error,
          })
        )
      )
    )
  );

  resetOnSignOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOutSuccess),
      map(() => WatchListActions.reset()),
      catchError((error) =>
        of(
          SnackBarActions.notify({
            message: error,
            cssClass: SnackBarActions.SnackBarCSS.error,
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.load),
      switchMap(() =>
        this.service.load().pipe(
          map((data) => {
            return WatchListActions.loadSuccess({ data });
          }),
          catchError((error) =>
            of(
              SnackBarActions.notify({
                message: error,
                cssClass: SnackBarActions.SnackBarCSS.error,
              }),
              WatchListActions.loadFail({ error })
            )
          )
        )
      )
    )
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.addMovie),
      switchMap((action) => {
        return this.service.addMovie(action.data).pipe(
          map((dataDetailed) =>
            WatchListActions.addMovieSuccess({
              data: dataDetailed,
            })
          ),
          catchError((error) =>
            of(
              SnackBarActions.notify({
                message: error,
                cssClass: SnackBarActions.SnackBarCSS.error,
              }),
              WatchListActions.addMovieFail({ error })
            )
          )
        );
      })
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.updateMovie),
      switchMap((action) => {
        const data = action.data;
        return this.service.updateMovie(data).pipe(
          map(() => WatchListActions.updateMovieSuccess({ data })),
          catchError((error) =>
            of(
              SnackBarActions.notify({
                message: error,
                cssClass: SnackBarActions.SnackBarCSS.error,
              }),
              WatchListActions.updateMovieFail({ error })
            )
          )
        );
      })
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.deleteMovie),
      switchMap((action) => {
        const id = action.id;
        return this.service.deleteMovie(id).pipe(
          map(() => WatchListActions.deleteMovieSuccess({ id })),
          catchError((error) =>
            of(
              SnackBarActions.notify({
                message: error,
                cssClass: SnackBarActions.SnackBarCSS.error,
              }),
              WatchListActions.deleteMovieFail({ error })
            )
          )
        );
      })
    )
  );
}
