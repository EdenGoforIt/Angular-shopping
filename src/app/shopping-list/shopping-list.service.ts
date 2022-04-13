import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  @Output() ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
