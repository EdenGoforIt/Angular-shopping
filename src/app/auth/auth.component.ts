import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthData } from './auth-data';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    let authOb: Observable<AuthData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authOb = this.authService.login(email, password);
    } else {
      authOb = this.authService.signup(email, password);
    }

    authOb.subscribe({
      next: (authData: AuthData) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
    form.reset();
  }
}
