import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  private url = `https://recipe-book-ffafc-default-rtdb.firebaseio.com/`;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      // filter(([actionData, recipeState]) => !recipeState.recipes?.length),
      switchMap(
        (): Observable<Recipe[]> =>
          this.http.get<Recipe[]>(`${this.url}/recipes.json`)
      ),
      // filter((data) => !!data),
      map((recipes: Recipe[]) => {
        if (!recipes) {
          return [];
        }

        return recipes?.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe?.ingredients ? recipe?.ingredients : [],
          } as Recipe;
        });
      }),
      map((recipes: Recipe[]) => {
        return new RecipeActions.SetRecipe(recipes);
      })
    )
  );

  storeRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipeState]) => {
          return this.http.put(`${this.url}/recipes.json`, recipeState.recipes);
        })
      );
    },
    { dispatch: false }
  );
}
