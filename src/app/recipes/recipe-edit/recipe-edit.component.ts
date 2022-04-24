import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  subscription: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
      return;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let imagePath = 'https://picsum.photos/200/100';
    let desc = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      this.subscription.push(
        this.store
          .select('recipes')
          .pipe(
            map((authState) => {
              return authState.recipes.find(
                (recipe, index) => index === this.id
              );
            })
          )
          .subscribe((recipe: Recipe | undefined): void => {
            name = recipe!.name;
            imagePath = recipe!.imagePath;
            desc = recipe!.description;
            recipe!.ingredients.forEach((ig) => {
              ingredients.push(
                new FormGroup({
                  name: new FormControl(ig.name, Validators.required),
                  amount: new FormControl(ig.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            });
          })
        //
      );
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({ index: this.id, recipe: newRecipe })
      );
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
