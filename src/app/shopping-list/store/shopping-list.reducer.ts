import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('New', 10000)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
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
    case ShoppingListActions.UPDATE_INGREDIENT:
      const _action = action as ShoppingListActions.UpdateIngredient;
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ..._action.payload,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== state.editedIngredientIndex;
        }),
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: (action as ShoppingListActions.StartEdit)
          .payload,
        editedIngredient: {
          ...state.ingredients[
            (action as ShoppingListActions.StartEdit).payload
          ],
        },
      };
    case ShoppingListActions.STOP_EDIT:
      return { ...state, editedIngredientIndex: -1, editedIngredient: null };

    default:
      //this is for initial state
      return state;
  }
}
