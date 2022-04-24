import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[RECIPE] SET_RECIPE ';
export const FETCH_RECIPES = '[RECIPE] Fetch Recipes';
export const ADD_RECIPE = '[RECIPE] Add Recipe';
export const UPDATE_RECIPE = '[RECIPE] Update Recipe';
export const DELETE_RECIPE = '[RECIPE] Delete Recipe';
export const STORE_RECIPES = '[RECIPE] Store Recipe';

export class SetRecipe {
  readonly type: string = SET_RECIPE;
  constructor(public payload: Recipe[]) {}
}
export class FetchRecipes {
  readonly type: string = FETCH_RECIPES;
}

export class AddRecipe {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}
export class UpdateRecipe {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipe {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class StoreRecipes {
  readonly type: string = STORE_RECIPES;
}

export type RecipesActionType =
  | SetRecipe
  | AddRecipe
  | UpdateRecipe
  | StoreRecipes
  | DeleteRecipe;
