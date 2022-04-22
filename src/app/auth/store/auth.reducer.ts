import { User } from '../user.model';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export function authReducer(state = initialState, action: any): AuthState {
  return state;
}
