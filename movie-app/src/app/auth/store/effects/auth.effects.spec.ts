import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as AuthStore from '../';
import { AuthService } from '../../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jest-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { Credentials } from '../../models/credentials.model';

const credentials: Credentials = {
  email: 'user@domain.com',
  password: 'password'
};

const error = new Error('an error occured');

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthStore.AuthEffects;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({}),
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            signOut: jest.fn()
          }
        },
        AuthStore.AuthEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get<Actions>(Actions);
    effects = TestBed.get<AuthStore.AuthEffects>(AuthStore.AuthEffects);
    authService = TestBed.get<AuthService>(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('signUp service call, success', () => {
    it(`should return an action of type ${AuthStore.signUpSuccess.type} with credentials`, () => {
      const action = AuthStore.signUp({ credentials });
      const outcome = AuthStore.signUpSuccess({ credentials });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-a', { a: credentials });
      authService.signUp = jest.fn(() => response$);

      const expected$ = cold('--b', { b: outcome });
      expect(effects.signUp$).toBeObservable(expected$);
    });
  });

  describe('signUp service call, fail', () => {
    it(`should return an action of type ${AuthStore.signUpFail}`, () => {
      const action = AuthStore.signUp({ credentials });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-#', {}, error);
      authService.signUp = jest.fn(() => response$);

      const outcome = AuthStore.signUpFail({ error });
      const expected$ = cold('--b', { b: outcome });

      expect(effects.signUp$).toBeObservable(expected$);
    });
  });
});
