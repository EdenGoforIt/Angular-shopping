import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('New', 10000)],
};

export interface ShoppingListState {
  ingredients: Ingredient[];
}

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActionType
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          (action as ShoppingListActions.AddIngredient).payload,
        ],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(action as ShoppingListActions.AddIngredients).payload,
        ],
      };
    default:
      //this is for initial state
      return state;
  }
}
