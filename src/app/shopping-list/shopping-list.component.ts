import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../root.reducer';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListState } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;
  private subscriptions: Subscription[] = [];
  constructor(
    private slService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();

    // this.subscriptions.push(
    //   this.slService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
  }
}
