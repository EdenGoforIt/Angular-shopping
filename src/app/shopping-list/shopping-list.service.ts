import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  @Output() ingredientAdded = new BehaviorSubject<Ingredient[]>([]);

  private ingredients: Ingredient[] = [];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
