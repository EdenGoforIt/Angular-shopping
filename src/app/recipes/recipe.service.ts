import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}
  private recipes: Recipe[] = [
    new Recipe(
      'Ddukbokki recipe',
      'you do whatever you want to do',
      'https://image.shutterstock.com/image-photo/hot-spicy-rice-cake-tteokbokki-600w-1989112874.jpg',
      [new Ingredient('meat', 5), new Ingredient('corns', 5)]
    ),
    new Recipe(
      'Whatever recipe',
      'you do whatever you want to do',
      'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken.webp',
      [new Ingredient('fat', 5), new Ingredient('chilli', 5)]
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
