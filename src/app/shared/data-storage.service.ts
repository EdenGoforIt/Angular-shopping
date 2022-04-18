import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url = `https://recipe-book-ffafc-default-rtdb.firebaseio.com/`;
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
  }
}
