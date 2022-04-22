import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.action';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  editMode: Boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  @ViewChild('f') form!: NgForm;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('shoppingList').subscribe((state) => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItemIndex = state.editedIngredientIndex;

          this.editedItem = state.editedIngredient as Ingredient;

          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      })

      // this.slService.startedEditing.subscribe((index: number) => {
      //   this.editMode = true;
      //   this.editedItemIndex = index;
      //   this.editedItem = this.slService.getIngredient(index);
      //   this.form.setValue({
      //     name: this.editedItem.name,
      //     amount: this.editedItem.amount,
      //   });
      // })
    );
  }
  onAddItem(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.slService.onIngredientAdded(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.form.reset();
  }
  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
