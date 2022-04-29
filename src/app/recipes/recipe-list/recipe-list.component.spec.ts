import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { RecipeListComponent } from './recipe-list.component';
import { getMockStore, MockStore, provideMockStore } from '@ngrx/store/testing';
import { Recipe } from '../recipe.model';
import { RouterTestingModule } from '@angular/router/testing';
import { expectText, click } from '../../helpers/test-helpers/test-helper';
import { of } from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let store: MockStore;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouteStub = {
    paramMap: {
      subscribe() {
        return of();
      },
    },
  };
  const initialState = {
    recipes: [
      {
        name: 'eden',
        description: 'awesome',
        imagePath: 'test',
        ingredients: [],
      },
    ],
  };
  // let userServiceStub : Partial<RecipeService>;

  // let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    store = getMockStore({ initialState });

    await TestBed.configureTestingModule({
      // imports: [RouterTestingModule.withRoutes([])],
      declarations: [RecipeListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it(`should navigate to 'new' page`, () => {
    click(fixture, 'new-recipe-button');
    fixture.detectChanges();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('new');
  });
});
