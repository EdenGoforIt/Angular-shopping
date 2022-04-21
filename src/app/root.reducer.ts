import { ActionReducerMap } from '@ngrx/store';
import {
  shoppingListReducer,
  ShoppingListState,
} from './shopping-list/store/shopping-list.reducer';

export const rootReducer = [];

export interface AppState {
  shoppingList: ShoppingListState;
}

export const rootReducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
};
