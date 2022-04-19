import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import {
  filter,
  map,
  take,
  tap,
  exhaustMap,
  first,
  catchError,
} from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url = `https://recipe-book-ffafc-default-rtdb.firebaseio.com/`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
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
        this.recipeService.setRecipes(recipes);
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
