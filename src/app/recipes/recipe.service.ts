import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Ddukbokki recipe',
      'you do whatever you want to do',
      'https://image.shutterstock.com/image-photo/hot-spicy-rice-cake-tteokbokki-600w-1989112874.jpg'
    ),
    new Recipe(
      'Whatever recipe',
      'you do whatever you want to do',
      'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken.webp'
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();
  getRecipes() {
    return this.recipes.slice();
  }
}
