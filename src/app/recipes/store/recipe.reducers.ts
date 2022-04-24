import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};
export function recipeReducer(state = initialState, action: any): RecipeState {
  switch (action.type) {
    case RecipeActions.SET_RECIPE:
      return { ...state, recipes: [...action.payload] };
    case RecipeActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return { ...state, recipes: updatedRecipes };

    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
