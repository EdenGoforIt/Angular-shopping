import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/app.reducer';
import { AuthService } from './auth/auth.service';
import * as authActions from '../app/auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromAuth.AppState>
  ) {}
  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new authActions.AutoLogin());
  }
  loadedFeature = 'recipe';
}
