import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // return this.dataStorageService.fetchRecipes();

    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPE), take(1));

    //  return this.store.select('recipes').pipe(
    //    map((recipeState) => recipeState.recipes),

    //    switchMap((recipes) => {
    //      if (!recipes || recipes.length === 0) {
    //        this.store.dispatch(new RecipeActions.FetchRecipes());
    //        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPE), take(1));
    //      } else {
    //        return of(recipes);
    //      }
    //    })
    //  );
  }
}
