import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  @Output() ingredientAdded = new BehaviorSubject<Ingredient[]>([]);
  startedEditing = new Subject<number>();
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
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
