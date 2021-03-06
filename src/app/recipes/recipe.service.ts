import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Ddukbokki recipe',
  //     'you do whatever you want to do',
  //     'https://image.shutterstock.com/image-photo/hot-spicy-rice-cake-tteokbokki-600w-1989112874.jpg',
  //     [new Ingredient('meat', 5), new Ingredient('corns', 5)]
  //   ),
  //   new Recipe(
  //     'Fried Chicken',
  //     'you do whatever you want to do',
  //     'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken.webp',
  //     [new Ingredient('fat', 5), new Ingredient('chilli', 5)]
  //   ),
  //   new Recipe(
  //     'Sauced Chicken',
  //     'you do whatever you want to do',
  //     'https://picsum.photos/200/100',
  //     [new Ingredient('fat', 5), new Ingredient('chilli', 5)]
  //   ),
  //   new Recipe(
  //     'Soysauce Chicken',
  //     'you do whatever you want to do',
  //     'https://picsum.photos/200/100',
  //     [new Ingredient('fat', 5), new Ingredient('chilli', 5)]
  //   ),
  //   new Recipe(
  //     'Fried Chicken',
  //     'you do whatever you want to do',
  //     'https://picsum.photos/200/100',
  //     [new Ingredient('fat', 5), new Ingredient('chilli', 5)]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
