import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import * as fromRecipes from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url = `https://recipe-book-ffafc-default-rtdb.firebaseio.com/`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`${this.url}/recipes.json`, recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.url}/recipes.json`).pipe(
      map((recipes: Recipe[]) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          } as Recipe;
        });
      }),
      tap((recipes: Recipe[]) => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new fromRecipes.SetRecipe(recipes));
      })
    );
    // return this.authService.user.pipe(
    //     filter((f: any) => !!f),
    //   exhaustMap((user: User | null) => {
    //     return this.http.get<Recipe[]>(`${this.url}/recipes.json`, {
    //       params: new HttpParams().set('auth', user?.token ?? ''),
    //     });
    //   }),
    //   map((recipes: Recipe[]) => {
    //     return recipes.map((recipe: Recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       } as Recipe;
    //     });
    //   }),
    //   tap((recipes: Recipe[]) => {
    //     this.recipeService.setRecipes(recipes);
    //   }),
    //   catchError((err) => {
    //     return of([]);
    //   })
    // );
  }
}
