import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
import { AppState } from '../../store/app.reducer';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  id!: number;
  private subscriptions: Subscription[] = [];
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params
        .pipe(
          map((params: Params): number => +params['id']),
          switchMap((id: number) => {
            this.id = id;
            return this.store.select('recipes');
          }),
          map((recipeState): Recipe | undefined => {
            return recipeState.recipes.find(
              (recipe, index) => index === this.id
            );
          })
        )
        .subscribe((recipe: Recipe | undefined) => {
          this.recipe = recipe;
        })
    );

    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   // this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store
    //     .select('recipes')
    //     .pipe(
    //       map((recipeState: RecipeState) => {
    //         return recipeState.recipes.find(
    //           (recipe, index) => index === this.id
    //         );
    //       }),
    //       filter((v) => !!v)
    //     )
    //     .subscribe((recipe) => (this.recipe = recipe));
    // });
  }
  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe!.ingredients)
    );
  }
  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }); // this simply ../ and add id then add edit after that
  }
  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }
}
