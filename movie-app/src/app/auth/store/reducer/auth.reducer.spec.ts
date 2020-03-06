import { createAction } from '@ngrx/store';
import { reducer, initialState, AuthState } from './auth.reducer';
import {
  AuthActionTypes,
  reset,
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail,
  signOut,
  signOutSuccess,
  signOutFail
} from '../actions/auth.actions';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe(AuthActionTypes.AUTH_RESET, () => {
    it('should return the default state', () => {
      const action = reset;
      const result = reducer(undefined, action);
      expect(result).toEqual({
        isLoading: false,
        errorMessage: undefined,
        user: undefined
      });
    });
  });

  const credentials: Credentials = {
    email: 'user@domain.com',
    password: 'pwd'
  };

  describe(AuthActionTypes.AUTH_SIGN_UP, () => {
    it('should toggle isLoading in state', () => {
      const action = signUp({ credentials });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  const signUpState: AuthState = {
    isLoading: true,
    errorMessage: undefined,
    user: undefined
  };

  describe(AuthActionTypes.AUTH_SIGN_UP_SUCCES, () => {
    it('it should toggle off isLoading', () => {
      const action = signUpSuccess({ credentials });
      const result = reducer(signUpState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_UP_FAIL, () => {
    it('it should toggle off isLoading and update error message and user in state', () => {
      const error = new Error('an error occured');
      const action = signUpFail({ error });
      const result = reducer(signUpState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false,
        errorMessage: error.message
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_IN, () => {
    it('should toggle isLoading in state', () => {
      const action = signIn({ credentials });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  const signInState: AuthState = {
    isLoading: true,
    errorMessage: undefined,
    user: undefined
  };

  const user: User = { id: 'id', email: credentials.email };

  describe(AuthActionTypes.AUTH_SIGN_IN_SUCCES, () => {
    it('it should toggle off isLoading and update user in state', () => {
      const action = signInSuccess({ user });
      const result = reducer(signInState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false,
        user
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_IN_FAIL, () => {
    it('it should toggle off isLoading and update error message and user in state', () => {
      const error = new Error('an error occured');
      const action = signInFail({ error });
      const result = reducer(signInState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false,
        errorMessage: error.message
      });
    });
  });

  const signedInState: AuthState = {
    isLoading: false,
    errorMessage: undefined,
    user
  };

  describe(AuthActionTypes.AUTH_SIGN_OUT, () => {
    it('it should toggle isLoading and update error message in state', () => {
      const action = signOut();
      const result = reducer(signedInState, action);
      expect(result).toEqual({
        ...signedInState,
        isLoading: true,
        errorMessage: undefined
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_OUT_SUCCESS, () => {
    it('it should return the default state', () => {
      const action = signOutSuccess();
      const result = reducer(signInState, action);
      expect(result).toEqual({
        ...initialState
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_OUT_FAIL, () => {
    it('it should toggle off isLoading and update error message in state', () => {
      const error = new Error('an error occured');
      const action = signOutFail({ error });
      const result = reducer(signedInState, action);
      expect(result).toEqual({
        ...signedInState,
        isLoading: false,
        errorMessage: error.message
      });
    });
  });
});