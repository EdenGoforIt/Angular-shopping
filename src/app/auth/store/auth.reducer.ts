import { User } from '../user.model';
import * as authAction from './auth.action';

export interface AuthState {
  user: User | null;
  error: string;
  loading: boolean;
  redirect: boolean;
}

const initialState: AuthState = {
  user: null,
  error: '',
  loading: false,
  redirect: false,
};

export function authReducer(
  state = initialState,
  action: authAction.AuthActionType
): AuthState {
  switch (action.type) {
    case authAction.AUTHENTICATE_SUCCESS:
      const _action = action as authAction.AuthenticateSuccess;
      const user = new User(
        _action.payload.email,
        _action.payload.userId,
        _action.payload.token,
        _action.payload.expirationDate
      );
      return {
        ...state,
        user,
        error: '',
        // loading: false
      };
    case authAction.LOGOUT:
      return { ...state, user: null, error: '', loading: false };

    case authAction.AUTHENTICATE_FAIL:
      return {
        ...state,
        error: (action as authAction.AuthenticateFail).payload,
        user: null,
        loading: false,
      };

    case authAction.LOGIN_START:
    case authAction.SIGNUP_START:
      return { ...state, error: '', loading: true };
    case authAction.CLEAR_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}
