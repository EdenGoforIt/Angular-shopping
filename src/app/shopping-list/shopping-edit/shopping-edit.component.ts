import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput') amountInputRef: ElementRef | undefined;
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}
  onAddItem(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.slService.onIngredientAdded(newIngredient);
  }
}
